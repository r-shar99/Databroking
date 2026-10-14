"""Enrichment waterfall: free sources -> pattern guess + cheap verify -> paid finders."""

from __future__ import annotations

import logging
from dataclasses import dataclass, field

from . import compliance, patterns
from .config import Settings
from .http import Http
from .models import Candidate, Company
from .providers import INVALID, MX, VALID, Hunter, Prospeo, Reoon, Tomba, ZeroBounce, _norm_status
from .quota import Quota, QuotaExceeded
from .sources import CompaniesHouse, Edgar, Website

log = logging.getLogger("leadgen")

RANK = ["founder", "ceo", "chief executive", "trustee", "administrator", "assignee", "president",
        "coo", "chief operating", "cto", "chief technology", "cfo", "chief financial", "general counsel",
        "managing director", "owner", "director"]


def _rank(c: Candidate) -> int:
    t = c.title.lower()
    for i, k in enumerate(RANK):
        if k in t:
            return i
    return len(RANK)


@dataclass
class CompanyResult:
    company: Company
    people: list[Candidate] = field(default_factory=list)
    pattern: str | None = None
    notes: list[str] = field(default_factory=list)


class Pipeline:
    def __init__(self, settings: Settings, http: Http | None = None):
        self.s = settings
        self.http = http or Http(cache_dir=settings.data_dir / "cache")
        self.quota = Quota(settings.data_dir / "quota.json", settings.caps)
        h = self.http
        self.edgar = Edgar(h, settings.sec_user_agent)
        self.ch = CompaniesHouse(h, settings.companies_house_key)
        self.web = Website(h)
        self.mx = MX(h)
        self.hunter = Hunter(h, self.quota, settings.hunter_key)
        self.tomba = Tomba(h, self.quota, settings.tomba_key, settings.tomba_secret)
        self.prospeo = Prospeo(h, self.quota, settings.prospeo_key)
        self.reoon = Reoon(h, self.quota, settings.reoon_key)
        self.zb = ZeroBounce(h, self.quota, settings.zerobounce_key)

    # ------------------------------------------------------------ helpers --

    def _safe(self, fn, *a, default=None):
        try:
            return fn(*a)
        except QuotaExceeded as e:
            log.info("quota: %s", e)
        except Exception as e:  # one bad source must not sink the run
            log.warning("%s failed: %s", getattr(fn, "__qualname__", fn), e)
        return default

    def verify(self, email: str) -> str | None:
        """Cheapest verifier first. Returns valid | risky | invalid | None (no verifier available)."""
        for v in (self.reoon.verify, self.zb.verify, self.tomba.verify, self.hunter.verify):
            r = self._safe(v, email)
            if r:
                return r
        return None

    @staticmethod
    def _merge(pool: dict[str, Candidate], new: list[Candidate]) -> None:
        for c in new:
            if c.key() in pool:
                pool[c.key()].merge(c)
            else:
                pool[c.key()] = c

    # -------------------------------------------------------------- main ---

    def enrich(self, company: Company, existing: list[Candidate] | None = None) -> CompanyResult:
        res = CompanyResult(company)
        if not compliance.company_allowed(company):
            res.notes.append("Germany-HQ company: skipped (rule 6)")
            return res

        pool: dict[str, Candidate] = {}
        self._merge(pool, existing or [])
        country = compliance.normalize_country(company.hq_country)

        # 1. Free registries.
        if country in (None, "US"):
            self._merge(pool, self._safe(self.edgar.people, company, default=[]) or [])
        if country in (None, "UK"):
            self._merge(pool, self._safe(self.ch.people, company, default=[]) or [])

        if not company.domain:
            res.notes.append("no domain: emails not attempted")
        elif self._safe(self.mx.has_mx, company.domain) is False:
            res.notes.append(f"{company.domain} has no MX record: mail is dead, use registries/trustee instead")
            company = Company(**{**company.__dict__, "domain": None})

        # 2. Pattern evidence: the company's own site (free), then Hunter domain search (1 credit).
        if company.domain:
            examples: list[tuple[str, str, str]] = []
            site_emails = self._safe(self.web.emails, company, default=[]) or []
            for e in site_emails:
                for c in pool.values():
                    if any(patterns.render(p, c.first_name, c.last_name, company.domain) == e
                           for p in patterns.PATTERNS):
                        examples.append((c.first_name, c.last_name, e))
            res.pattern = patterns.infer(examples)
            needs_email = [c for c in pool.values() if c.email_status != VALID]
            if not res.pattern and (needs_email or not pool):
                pat, hp = self._safe(self.hunter.domain_search, company.domain, default=(None, [])) or (None, [])
                res.pattern = pat
                for p in hp:
                    if not (p["first"] and p["last"] and p["email"]):
                        continue
                    status = _norm_status(p["status"]) if p["status"] else "found"
                    self._merge(pool, [Candidate(p["first"], p["last"], title=p["position"], sources=["hunter-domain"],
                                                 email=p["email"].lower(), email_source="hunter-domain",
                                                 email_status=status, email_score=p["confidence"])])

        # 3. Pick decision-makers.
        chosen = [c for c in pool.values()
                  if "SUPPRESSED" not in c.notes and compliance.title_matches(c.title, self.s.target_titles)]
        chosen.sort(key=lambda c: (_rank(c), c.email_status != VALID))
        chosen = chosen[: self.s.max_candidates_per_company]

        # 4. Find + verify emails.
        for c in chosen:
            if company.domain and c.email_status != VALID:
                self._email_for(c, company, res.pattern)
            if c.email:
                ok, why = compliance.acceptable_email(c.email, company)
                if not ok:
                    c.notes.append(f"dropped email {c.email}: {why}")
                    c.email, c.email_status = None, "none"
                elif compliance.is_role_address(c.email):
                    c.notes.append("role address")
        res.people = chosen
        return res

    def _email_for(self, c: Candidate, company: Company, pattern: str | None) -> None:
        domain = company.domain
        # 4a. Already have an unverified address (e.g. Hunter domain search): verify it.
        if c.email and c.email_status in ("found", "risky"):
            status = self.verify(c.email)
            if status:
                c.email_status = status
            if c.email_status == VALID:
                return
        # 4b. Pattern guesses: free to generate, one cheap verify each (max 3).
        for guess in patterns.candidates(c.first_name, c.last_name, domain, known=pattern, limit=1 if pattern else 3):
            status = self.verify(guess)
            if status is None:
                if pattern and not c.email:  # no verifier left: keep the guess, unverified
                    c.email, c.email_source, c.email_status = guess, f"pattern:{pattern}", "guessed"
                break
            if status == VALID:
                c.email, c.email_source, c.email_status = guess, f"pattern:{pattern or 'probe'}", VALID
                return
            if status != INVALID:  # catch-all domain: a probe can't tell, go to finders
                break
        # 4c. Finders, cheapest free tier first.
        for finder in (self.tomba.find, self.prospeo.find, self.hunter.find):
            found = self._safe(finder, c.first_name, c.last_name, domain)
            if not found:
                continue
            status = _norm_status(found.status) if found.status else self.verify(found.email) or "found"
            c.email, c.email_source, c.email_status, c.email_score = found.email, found.source, status, found.score
            if status == VALID:
                return
