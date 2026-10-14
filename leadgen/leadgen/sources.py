"""Free people-discovery sources (no paid credits).

- SEC EDGAR Form D: US issuers list executive officers and directors.
- UK Companies House: officers (directors) with country of residence.
- Company website: visible work emails, used only to learn the email pattern.
"""

from __future__ import annotations

import re
import xml.etree.ElementTree as ET
from urllib.parse import urljoin

from .compliance import EMAIL_RE, email_domain, is_role_address
from .http import Http, HttpError
from .models import Candidate, Company

_SUFFIX = re.compile(r"[,.]?\s+(inc|inc\.|llc|ltd|limited|corp|corporation|co|plc|gmbh|labs?)\.?$", re.I)


def _norm_company(name: str) -> str:
    name = re.sub(r"\(.*?\)", "", name).strip()
    prev = None
    while prev != name:
        prev, name = name, _SUFFIX.sub("", name).strip()
    return re.sub(r"[^a-z0-9]", "", name.lower())


def _tidy(n: str) -> str:
    n = n.strip()
    return n.title() if n.isupper() or n.islower() else n


# ---------------------------------------------------------------- EDGAR -----

class Edgar:
    SEARCH = "https://efts.sec.gov/LATEST/search-index"
    ARCHIVE = "https://www.sec.gov/Archives/edgar/data/{cik}/{adsh}/primary_doc.xml"

    def __init__(self, http: Http, user_agent: str | None):
        self.http = http
        # The SEC requires a descriptive User-Agent with a contact email.
        self.headers = {"User-Agent": user_agent} if user_agent else None

    @property
    def enabled(self) -> bool:
        return bool(self.headers)

    def latest_form_d(self, company: Company) -> tuple[str, str] | None:
        res = self.http.get_json(self.SEARCH, params={"q": f'"{company.name}"', "forms": "D"},
                                 headers=self.headers, cache=True)
        want = _norm_company(company.name)
        best = None
        for hit in res.get("hits", {}).get("hits", []):
            src = hit.get("_source", {})
            names = [_norm_company(d.split("(CIK")[0]) for d in src.get("display_names", [])]
            if want not in names or not src.get("ciks") or not src.get("adsh"):
                continue
            date = src.get("file_date", "")
            if best is None or date > best[2]:
                best = (src["ciks"][0].lstrip("0"), src["adsh"].replace("-", ""), date)
        return (best[0], best[1]) if best else None

    def people(self, company: Company) -> list[Candidate]:
        if not self.enabled:
            return []
        found = self.latest_form_d(company)
        if not found:
            return []
        cik, adsh = found
        xml = self.http.get_text(self.ARCHIVE.format(cik=cik, adsh=adsh), headers=self.headers, cache=True)
        return parse_form_d(xml, f"sec-form-d:{cik}/{adsh}")


def parse_form_d(xml: str, source: str) -> list[Candidate]:
    root = ET.fromstring(xml)
    out = []
    for info in root.iter("relatedPersonInfo"):
        first = info.findtext("relatedPersonName/firstName") or ""
        last = info.findtext("relatedPersonName/lastName") or ""
        rels = [r.text for r in info.iter("relationship") if r.text]
        clar = info.findtext("relationshipClarification") or ""
        country = info.findtext("relatedPersonAddress/stateOrCountry") or ""
        if not (first and last):
            continue
        title = ", ".join(rels) + (f" ({clar})" if clar else "")
        # Form D gives US state codes for US addresses (e.g. "CA"); treat any
        # two-letter US state code as US.
        cand = Candidate(_tidy(first), _tidy(last), title=title,
                         country="US" if country.upper() in US_STATES else None, sources=[source])
        if "Promoter" in rels and "Executive Officer" not in rels:
            cand.notes.append("Promoter only")
        out.append(cand)
    return out


US_STATES = set("AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV "
                "NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY PR".split())


# ------------------------------------------------------- Companies House ----

class CompaniesHouse:
    BASE = "https://api.company-information.service.gov.uk"

    def __init__(self, http: Http, api_key: str | None):
        self.http = http
        self.auth = (api_key, "") if api_key else None

    @property
    def enabled(self) -> bool:
        return bool(self.auth)

    def find_number(self, company: Company) -> str | None:
        if company.uk_company_number:
            return company.uk_company_number
        res = self.http.get_json(f"{self.BASE}/search/companies", params={"q": company.name, "items_per_page": 10},
                                 auth=self.auth, cache=True)
        want = _norm_company(company.name)
        for item in res.get("items", []):
            if _norm_company(item.get("title", "")) == want:
                return item.get("company_number")
        return None

    def people(self, company: Company) -> list[Candidate]:
        if not self.enabled:
            return []
        number = self.find_number(company)
        if not number:
            return []
        company.uk_company_number = number
        res = self.http.get_json(f"{self.BASE}/company/{number}/officers", params={"items_per_page": 50},
                                 auth=self.auth, cache=True)
        out = []
        for o in res.get("items", []):
            if o.get("resigned_on") or o.get("officer_role") not in ("director", "llp-designated-member"):
                continue
            last, _, rest = o.get("name", "").partition(",")
            first = rest.strip().split(" ")[0] if rest.strip() else ""
            if not first:
                continue
            out.append(Candidate(_tidy(first), _tidy(last), title="Director",
                                 country=o.get("country_of_residence"),
                                 sources=[f"companies-house:{number}"]))
        return out

    def advanced_search(self, statuses: list[str], sic_codes: list[str], incorporated_from: str | None = None,
                        size: int = 100) -> list[dict]:
        params = {"company_status": ",".join(statuses), "sic_codes": ",".join(sic_codes), "size": size}
        if incorporated_from:
            params["incorporated_from"] = incorporated_from
        res = self.http.get_json(f"{self.BASE}/advanced-search/companies", params=params, auth=self.auth)
        return res.get("items", [])


# --------------------------------------------------------------- Website ----

class Website:
    PATHS = ["", "about", "team", "about-us", "company", "contact", "press"]

    def __init__(self, http: Http):
        self.http = http

    def _allowed(self, base: str, path: str) -> bool:
        try:
            robots = self.http.get_text(urljoin(base, "/robots.txt"), cache=True)
        except (HttpError, Exception):
            return True
        agent_all, disallow = False, []
        for line in robots.splitlines():
            k, _, v = line.partition(":")
            k, v = k.strip().lower(), v.strip()
            if k == "user-agent":
                agent_all = v == "*"
            elif k == "disallow" and agent_all and v:
                disallow.append(v)
        return not any(("/" + path).startswith(d) for d in disallow)

    def emails(self, company: Company) -> list[str]:
        """Work emails visible on the company's own site (pattern evidence only)."""
        if not company.domain:
            return []
        base = f"https://{company.domain}/"
        found: set[str] = set()
        for p in self.PATHS:
            if not self._allowed(base, p):
                continue
            try:
                html = self.http.get_text(urljoin(base, p), cache=True)
            except Exception:
                continue
            for e in EMAIL_RE.findall(html):
                e = e.lower().rstrip(".")
                if email_domain(e) == company.domain and not is_role_address(e):
                    found.add(e)
        return sorted(found)
