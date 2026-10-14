"""Scout hard rules, enforced in code rather than only in prompts."""

from __future__ import annotations

import re

from .models import Candidate, Company

# Webmail is personal, not B2B: never stored as a work contact.
FREE_MAIL = {
    "gmail.com", "googlemail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com",
    "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com", "gmx.com", "gmx.de",
    "yandex.com", "mail.com", "zoho.com",
}
# Rule 3 (no LinkedIn) and GitHub's Acceptable Use Policy (no emailing users
# from GitHub data): these never count as a source.
BLOCKED_SOURCE_HOSTS = ("linkedin.com", "github.com", "githubusercontent.com", "users.noreply.github.com")
GERMANY = {"DE", "DEU", "GERMANY", "DEUTSCHLAND"}
EU_NON_DE = {
    "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "GR", "HU", "IE", "IT", "LV", "LT",
    "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
}
_COUNTRY_ALIASES = {
    "UNITED STATES": "US", "USA": "US", "UNITED STATES OF AMERICA": "US",
    "UNITED KINGDOM": "UK", "GB": "UK", "GBR": "UK", "ENGLAND": "UK", "SCOTLAND": "UK",
    "WALES": "UK", "NORTHERN IRELAND": "UK", "GREAT BRITAIN": "UK",
    "FRANCE": "FR", "NETHERLANDS": "NL", "IRELAND": "IE", "SPAIN": "ES", "ITALY": "IT",
    "SWEDEN": "SE", "DENMARK": "DK", "FINLAND": "FI", "BELGIUM": "BE", "PORTUGAL": "PT",
    "POLAND": "PL", "AUSTRIA": "AT",
}
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
ROLE_LOCALPARTS = {"info", "hello", "contact", "support", "admin", "sales", "team", "press", "jobs",
                   "careers", "help", "office", "privacy", "legal", "noreply", "no-reply"}


def normalize_country(value: str | None) -> str | None:
    if not value:
        return None
    v = value.strip().upper()
    if v in GERMANY:
        return "DE"
    return _COUNTRY_ALIASES.get(v, v if len(v) == 2 else None)


def is_blocked_source(url: str) -> bool:
    return any(h in url.lower() for h in BLOCKED_SOURCE_HOSTS)


def email_domain(email: str) -> str:
    return email.rsplit("@", 1)[-1].lower()


def acceptable_email(email: str, company: Company) -> tuple[bool, str]:
    if not EMAIL_RE.fullmatch(email or ""):
        return False, "malformed"
    dom = email_domain(email)
    if dom in FREE_MAIL:
        return False, "personal webmail"
    if "noreply" in dom or dom.endswith("github.com"):
        return False, "blocked domain"
    if company.domain and not (dom == company.domain or dom.endswith("." + company.domain)):
        return False, f"domain {dom} != company domain {company.domain}"
    return True, ""


def is_role_address(email: str) -> bool:
    return email.split("@", 1)[0].lower() in ROLE_LOCALPARTS


def title_matches(title: str, targets: list[str]) -> bool:
    t = (title or "").lower()
    return any(k in t for k in targets)


def lawful_basis(person: Candidate, company: Company, infer_from_company: bool = False) -> str:
    """Rule 6: Germany never contactable; unknown country => Do not email."""
    country = normalize_country(person.country)
    if country is None and infer_from_company:
        country = normalize_country(company.hq_country)
    if country is None or country == "DE":
        return "Do not email"
    if country == "US":
        return "US opt-out"
    if country == "UK":
        return "UK corporate"
    if country in EU_NON_DE:
        return "EU legitimate interest"
    return "Do not email"


def company_allowed(company: Company) -> bool:
    return normalize_country(company.hq_country) != "DE"
