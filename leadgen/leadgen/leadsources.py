"""Free sources of NEW company leads (shutdowns and insolvencies)."""

from __future__ import annotations

import datetime as dt
import re

from .http import Http
from .models import Lead
from .sources import CompaniesHouse

SHUTDOWN_RE = re.compile(
    r"\b(shutting down|shut down|winding down|wind[- ]down|sunsetting|we're closing|ceasing operations|"
    r"farewell|end of the road|goodbye)\b", re.I)

# Software / data SIC codes for UK insolvency searches.
UK_SOFTWARE_SIC = ["62011", "62012", "62020", "62090", "58290", "63110", "63120"]


def hn_shutdowns(http: Http, days: int = 30, min_points: int = 20) -> list[Lead]:
    """Hacker News (Algolia API, free, no key): founder shutdown posts."""
    since = int((dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=days)).timestamp())
    out, seen = [], set()
    for q in ['"shutting down"', '"winding down"', '"sunsetting"']:
        res = http.get_json("https://hn.algolia.com/api/v1/search_by_date",
                            params={"query": q, "tags": "story",
                                    "numericFilters": f"created_at_i>{since},points>={min_points}",
                                    "hitsPerPage": 50})
        for h in res.get("hits", []):
            title = h.get("title") or ""
            if h.get("objectID") in seen or not SHUTDOWN_RE.search(title):
                continue
            seen.add(h.get("objectID"))
            out.append(Lead(name=title, source="hn", event="shutdown post",
                            date=(h.get("created_at") or "")[:10],
                            url=h.get("url") or f"https://news.ycombinator.com/item?id={h.get('objectID')}",
                            detail=f"{h.get('points', 0)} points"))
    return out


def uk_insolvencies(ch: CompaniesHouse, incorporated_from: str = "2014-01-01") -> list[Lead]:
    """Companies House advanced search: software companies in administration/liquidation."""
    if not ch.enabled:
        return []
    items = ch.advanced_search(["administration", "liquidation", "insolvency-proceedings"],
                               UK_SOFTWARE_SIC, incorporated_from=incorporated_from)
    return [Lead(name=i.get("company_name", ""), source="companies-house", event=i.get("company_status", ""),
                 date=i.get("date_of_creation", ""), country="UK",
                 url=f"https://find-and-update.company-information.service.gov.uk/company/{i.get('company_number')}",
                 detail="SIC " + ",".join(i.get("sic_codes", []))) for i in items]


def us_bankruptcies(http: Http, token: str | None, days: int = 30,
                    query: str = '("software" OR "technologies" OR "labs" OR "AI") AND ("chapter 7" OR "chapter 11")'
                    ) -> list[Lead]:
    """CourtListener RECAP search (free token): recent bankruptcy dockets."""
    if not token:
        return []
    since = (dt.date.today() - dt.timedelta(days=days)).isoformat()
    res = http.get_json("https://www.courtlistener.com/api/rest/v4/search/",
                        params={"type": "r", "q": query, "court": "deb canb nysb txsb njb",
                                "filed_after": since, "order_by": "dateFiled desc"},
                        headers={"Authorization": f"Token {token}"})
    out = []
    for r in res.get("results", []):
        out.append(Lead(name=r.get("caseName", ""), source="courtlistener", event="bankruptcy docket",
                        date=(r.get("dateFiled") or "")[:10], country="US",
                        url="https://www.courtlistener.com" + (r.get("docket_absolute_url") or ""),
                        detail=f"{r.get('court', '')} {r.get('docketNumber', '')}"))
    return out
