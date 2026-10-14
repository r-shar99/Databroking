"""Quota-capped email finders and verifiers.

Response shapes for Tomba, Prospeo, Reoon and ZeroBounce are parsed
defensively; run `python -m leadgen check` against the live APIs once keys
are set, and adjust if a vendor has changed its schema.
"""

from __future__ import annotations

from dataclasses import dataclass

from .http import Http
from .quota import Quota

VALID, RISKY, INVALID = "valid", "risky", "invalid"


@dataclass
class Found:
    email: str
    source: str
    score: int | None = None
    status: str | None = None  # verification status if the finder returned one


def _norm_status(raw: str | None) -> str:
    s = (raw or "").lower().replace("-", "_")
    if s in ("valid", "deliverable", "safe", "ok"):
        return VALID
    if s in ("invalid", "undeliverable", "disabled", "spamtrap", "abuse", "do_not_mail", "disposable"):
        return INVALID
    return RISKY  # accept_all, catch_all, unknown, webmail, role, ...


# ------------------------------------------------------------------ Hunter --

class Hunter:
    BASE = "https://api.hunter.io/v2"

    def __init__(self, http: Http, quota: Quota, key: str | None):
        self.http, self.quota, self.key = http, quota, key

    @property
    def enabled(self) -> bool:
        return bool(self.key)

    def domain_search(self, domain: str) -> tuple[str | None, list[dict]]:
        """1 search credit. Returns (pattern, [ {first,last,email,position,confidence,status} ])."""
        if not self.enabled or not self.quota.can_spend("hunter.search"):
            return None, []
        self.quota.spend("hunter.search")
        res = self.http.get_json(f"{self.BASE}/domain-search",
                                 params={"domain": domain, "type": "personal", "limit": 10, "api_key": self.key},
                                 cache=True)
        data = res.get("data", {})
        people = []
        for e in data.get("emails", []):
            people.append({
                "first": e.get("first_name") or "", "last": e.get("last_name") or "",
                "email": e.get("value"), "position": e.get("position") or "",
                "confidence": e.get("confidence"),
                "status": (e.get("verification") or {}).get("status"),
                # Hunter returns LinkedIn URLs: deliberately discarded (rule 3).
            })
        return data.get("pattern"), people

    def find(self, first: str, last: str, domain: str) -> Found | None:
        if not self.enabled or not self.quota.can_spend("hunter.search"):
            return None
        self.quota.spend("hunter.search")
        res = self.http.get_json(f"{self.BASE}/email-finder",
                                 params={"domain": domain, "first_name": first, "last_name": last,
                                         "api_key": self.key}, cache=True)
        d = res.get("data") or {}
        if not d.get("email"):
            return None
        return Found(d["email"].lower(), "hunter", d.get("score"), (d.get("verification") or {}).get("status"))

    def verify(self, email: str) -> str | None:
        if not self.enabled or not self.quota.can_spend("hunter.verify"):
            return None
        self.quota.spend("hunter.verify")
        res = self.http.get_json(f"{self.BASE}/email-verifier", params={"email": email, "api_key": self.key},
                                 cache=True)
        return _norm_status((res.get("data") or {}).get("status"))


# ------------------------------------------------------------------- Tomba --

class Tomba:
    BASE = "https://api.tomba.io/v1"

    def __init__(self, http: Http, quota: Quota, key: str | None, secret: str | None):
        self.http, self.quota = http, quota
        self.headers = {"X-Tomba-Key": key, "X-Tomba-Secret": secret} if key and secret else None

    @property
    def enabled(self) -> bool:
        return bool(self.headers)

    def find(self, first: str, last: str, domain: str) -> Found | None:
        if not self.enabled or not self.quota.can_spend("tomba.search"):
            return None
        self.quota.spend("tomba.search")
        res = self.http.get_json(f"{self.BASE}/email-finder",
                                 params={"domain": domain, "first_name": first, "last_name": last},
                                 headers=self.headers, cache=True)
        d = res.get("data") or {}
        email = d.get("email")
        if not email:
            return None
        ver = d.get("verification") or {}
        return Found(email.lower(), "tomba", d.get("score"), ver.get("status") or ver.get("result"))

    def verify(self, email: str) -> str | None:
        if not self.enabled or not self.quota.can_spend("tomba.verify"):
            return None
        self.quota.spend("tomba.verify")
        res = self.http.get_json(f"{self.BASE}/email-verifier/{email}", headers=self.headers, cache=True)
        e = (res.get("data") or {}).get("email") or {}
        return _norm_status(e.get("result") or e.get("status"))


# ----------------------------------------------------------------- Prospeo --

class Prospeo:
    URL = "https://api.prospeo.io/email-finder"

    def __init__(self, http: Http, quota: Quota, key: str | None):
        self.http, self.quota, self.key = http, quota, key

    @property
    def enabled(self) -> bool:
        return bool(self.key)

    def find(self, first: str, last: str, domain: str) -> Found | None:
        if not self.enabled or not self.quota.can_spend("prospeo.search"):
            return None
        self.quota.spend("prospeo.search")
        res = self.http.post_json(self.URL, {"first_name": first, "last_name": last, "company": domain},
                                  headers={"X-KEY": self.key, "Content-Type": "application/json"}, cache=True)
        if res.get("error"):
            return None
        e = ((res.get("response") or {}).get("email")) or {}
        if not e.get("email"):
            return None
        return Found(e["email"].lower(), "prospeo", None, e.get("email_status"))


# --------------------------------------------------------------- Verifiers --

class Reoon:
    URL = "https://emailverifier.reoon.com/api/v1/verify"

    def __init__(self, http: Http, quota: Quota, key: str | None):
        self.http, self.quota, self.key = http, quota, key

    @property
    def enabled(self) -> bool:
        return bool(self.key)

    def verify(self, email: str) -> str | None:
        if not self.enabled or not self.quota.can_spend("reoon.verify"):
            return None
        self.quota.spend("reoon.verify")
        res = self.http.get_json(self.URL, params={"email": email, "key": self.key, "mode": "power"}, cache=True)
        return _norm_status(res.get("status"))


class ZeroBounce:
    URL = "https://api.zerobounce.net/v2/validate"

    def __init__(self, http: Http, quota: Quota, key: str | None):
        self.http, self.quota, self.key = http, quota, key

    @property
    def enabled(self) -> bool:
        return bool(self.key)

    def verify(self, email: str) -> str | None:
        if not self.enabled or not self.quota.can_spend("zerobounce.verify"):
            return None
        self.quota.spend("zerobounce.verify")
        res = self.http.get_json(self.URL, params={"api_key": self.key, "email": email, "ip_address": ""},
                                 cache=True)
        return _norm_status(res.get("status"))


class MX:
    """Free domain check via DNS-over-HTTPS: no MX record => every address bounces."""

    URL = "https://dns.google/resolve"

    def __init__(self, http: Http):
        self.http = http

    def has_mx(self, domain: str) -> bool | None:
        try:
            res = self.http.get_json(self.URL, params={"name": domain, "type": "MX"}, cache=True)
        except Exception:
            return None
        return any(a.get("type") == 15 for a in res.get("Answer", []) or [])
