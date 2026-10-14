"""CLI.

  python -m leadgen check                         # which sources are configured, quota left
  python -m leadgen enrich --all-suppliers        # dry run over Attio Supplier companies
  python -m leadgen enrich --targets t.csv        # dry run over a CSV (name,domain,hq_country)
  python -m leadgen enrich --all-suppliers --write   # also write people to Attio
  python -m leadgen enrich --all-suppliers --people found.csv   # add names found by research
  python -m leadgen leads --days 30               # new shutdown/insolvency leads -> CSV
"""

from __future__ import annotations

import argparse
import csv
import datetime as dt
import logging
import sys
from pathlib import Path

from . import compliance, leadsources
from .attio import Attio
from .config import Settings
from .models import Candidate, Company
from .pipeline import Pipeline


def _out_dir(settings: Settings) -> Path:
    d = settings.data_dir.parent / "out" / dt.datetime.now().strftime("%Y%m%d-%H%M")
    d.mkdir(parents=True, exist_ok=True)
    return d


def cmd_check(s: Settings, _args) -> int:
    p = Pipeline(s)
    rows = [
        ("SEC EDGAR Form D (free)", p.edgar.enabled, "set SEC_USER_AGENT='DataDrop you@domain'"),
        ("Companies House (free)", p.ch.enabled, "COMPANIES_HOUSE_API_KEY"),
        ("Company websites (free)", True, ""),
        ("DNS MX check (free)", True, ""),
        ("Hunter (free tier)", p.hunter.enabled, "HUNTER_API_KEY"),
        ("Tomba (free tier)", p.tomba.enabled, "TOMBA_API_KEY + TOMBA_API_SECRET"),
        ("Prospeo (free tier)", p.prospeo.enabled, "PROSPEO_API_KEY"),
        ("Reoon verifier (free tier)", p.reoon.enabled, "REOON_API_KEY"),
        ("ZeroBounce verifier (free tier)", p.zb.enabled, "ZEROBOUNCE_API_KEY"),
        ("CourtListener leads (free)", bool(s.courtlistener_token), "COURTLISTENER_TOKEN"),
        ("Attio read/write", bool(s.attio_key), "ATTIO_API_KEY"),
    ]
    for name, ok, hint in rows:
        print(f"  [{'x' if ok else ' '}] {name}" + ("" if ok else f"   <- {hint}"))
    print("\nMonthly credits used / cap:")
    for bucket, used, cap in p.quota.summary():
        print(f"  {bucket:20s} {used:4d} / {cap}")
    return 0


def _targets(s: Settings, args, attio: Attio) -> list[Company]:
    if args.targets:
        with open(args.targets, newline="") as f:
            return [Company(name=r["name"], domain=(r.get("domain") or None),
                            hq_country=(r.get("hq_country") or None)) for r in csv.DictReader(f)]
    if not attio.enabled:
        sys.exit("ATTIO_API_KEY not set: pass --targets FILE.csv instead")
    cos = attio.supplier_companies()
    if args.company:
        cos = [c for c in cos if args.company.lower() in c.name.lower()]
    return cos


def _extra_people(path: str) -> dict[str, list[Candidate]]:
    """CSV: company,first_name,last_name,title,country,source_url (names found by the agent)."""
    out: dict[str, list[Candidate]] = {}
    with open(path, newline="") as f:
        for r in csv.DictReader(f):
            url = r.get("source_url") or ""
            if compliance.is_blocked_source(url):
                print(f"skipping {r.get('first_name')} {r.get('last_name')}: blocked source {url}")
                continue
            out.setdefault(r["company"].lower(), []).append(Candidate(
                r["first_name"], r["last_name"], title=r.get("title") or "",
                country=r.get("country") or None, sources=[f"web:{url}" if url else "manual"]))
    return out


def cmd_enrich(s: Settings, args) -> int:
    p = Pipeline(s)
    attio = Attio(p.http, s.attio_key)
    if args.write and not attio.enabled:
        sys.exit("--write needs ATTIO_API_KEY")
    companies = _targets(s, args, attio)[: args.max_companies]
    extra = _extra_people(args.people) if args.people else {}
    out = _out_dir(s)
    rows = []
    for co in companies:
        existing = attio.people_at(co) if attio.enabled else []
        existing += extra.get(co.name.lower(), [])
        r = p.enrich(co, existing)
        print(f"\n== {co.name} ({co.domain or 'no domain'}, {co.hq_country or '?'}) pattern={r.pattern}")
        for n in r.notes:
            print(f"   note: {n}")
        for c in r.people:
            basis = compliance.lawful_basis(c, co, s.infer_country_from_company)
            print(f"   - {c.full_name:28s} {c.title[:30]:30s} {c.email or '-':38s} {c.email_status:8s} {basis}")
            rows.append({"company": co.name, "domain": co.domain, "person": c.full_name, "title": c.title,
                         "email": c.email or "", "email_status": c.email_status, "email_source": c.email_source or "",
                         "lawful_basis": basis, "sources": ";".join(c.sources), "notes": "; ".join(c.notes)})
            if args.write and co.attio_id:
                prov = (f"leadgen {dt.date.today()}: name via {', '.join(c.sources)}; "
                        f"email via {c.email_source or 'n/a'} ({c.email_status}). No LinkedIn/GitHub data used.")
                p._safe(attio.write_person, co, c, basis, prov)
    path = out / "people.csv"
    with path.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]) if rows else ["company"])
        w.writeheader()
        w.writerows(rows)
    print(f"\nWrote {len(rows)} rows to {path}" + ("" if args.write else "  (dry run: Attio untouched)"))
    return 0


def cmd_leads(s: Settings, args) -> int:
    p = Pipeline(s)
    leads = []
    leads += p._safe(leadsources.hn_shutdowns, p.http, args.days, default=[]) or []
    leads += p._safe(leadsources.uk_insolvencies, p.ch, default=[]) or []
    leads += p._safe(leadsources.us_bankruptcies, p.http, s.courtlistener_token, args.days, default=[]) or []
    path = _out_dir(s) / "leads.csv"
    with path.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["name", "source", "event", "date", "country", "url", "detail"])
        w.writeheader()
        for l in leads:
            w.writerow({k: getattr(l, k) for k in w.fieldnames})
    print(f"{len(leads)} leads -> {path}  (review before adding to Attio)")
    return 0


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(prog="leadgen")
    ap.add_argument("-v", "--verbose", action="store_true")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("check")
    e = sub.add_parser("enrich")
    g = e.add_mutually_exclusive_group(required=True)
    g.add_argument("--all-suppliers", action="store_true")
    g.add_argument("--company")
    g.add_argument("--targets")
    e.add_argument("--max-companies", type=int, default=50)
    e.add_argument("--people", help="CSV of extra named people found by research (see README)")
    e.add_argument("--write", action="store_true", help="write people to Attio (default: dry run)")
    l = sub.add_parser("leads")
    l.add_argument("--days", type=int, default=30)
    args = ap.parse_args(argv)
    logging.basicConfig(level=logging.INFO if args.verbose else logging.WARNING, format="%(levelname)s %(message)s")
    s = Settings.from_env()
    return {"check": cmd_check, "enrich": cmd_enrich, "leads": cmd_leads}[args.cmd](s, args)


if __name__ == "__main__":
    raise SystemExit(main())
