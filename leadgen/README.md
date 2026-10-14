# leadgen: free multi-source lead discovery and contact enrichment

`leadgen` finds decision-makers at the Supplier companies in Attio, and work emails for them, using only free sources and free tiers. It never sends email.

## How it works

Each target company goes through these steps in order. The cheapest step that works wins.

| # | Step | Sources | Cost |
|---|---|---|---|
| 1 | Who are the decision-makers? | SEC EDGAR Form D lists the executive officers and directors of US companies that raised money. UK Companies House lists active directors and their country of residence. People already in Attio are included. Names that the Enricher agent finds by web research come in via `--people`. | Free |
| 2 | Is the company's mail still alive? | A DNS MX lookup through dns.google. If the domain has no mail server, every address bounces, so the email steps are skipped. | Free |
| 3 | What is the email pattern? | Work emails published on the company's own site (robots.txt is respected). If there are none, one Hunter domain search. | Free, then 1 Hunter credit |
| 4 | Guess and verify | Builds the address from the pattern and checks it with Reoon, then ZeroBounce, then Tomba, then Hunter. | 1 verification credit |
| 5 | Email finders | Tomba, then Prospeo, then Hunter. Used only if guessing fails or the domain accepts all mail (catch-all). | 1 search credit |
| 6 | Compliance gate | Drops personal webmail and addresses at another domain. Drops LinkedIn and GitHub sources. Skips German companies. Sets the lawful basis by person country (unknown means "Do not email"). Never touches people marked suppressed. | Free |

Every paid response is cached on disk, so a re-run never spends the same credit twice. `data/quota.json` holds the monthly caps, and `leadgen` refuses any call that would go over a cap.

## New-lead sources (`leads` command)
- **Hacker News (Algolia API, free, no key):** founders' "shutting down" posts.
- **Companies House advanced search (free key):** UK software companies (by industry code) that are in administration or liquidation.
- **CourtListener (free token):** recent Chapter 7 and Chapter 11 bankruptcy dockets in Delaware, N.D. Cal., S.D.N.Y., S.D. Tex. and N.J.

The leads go to a CSV for a person to review. Nothing is created in Attio automatically.

## Free accounts to create

The limits below come from third-party reviews in 2026. Check each vendor's dashboard: free tiers change often, and caps are set in `config.py` or `LEADGEN_CAP_*` environment variables.

| Service | Variable(s) | Free tier (approx.) | Notes |
|---|---|---|---|
| SEC EDGAR | `SEC_USER_AGENT="DataDrop you@yourdomain"` | Unlimited, ~10 requests/s | No key. A User-Agent with a contact email is required. |
| Companies House | `COMPANIES_HOUSE_API_KEY` | Free, 600 requests per 5 min | developer.company-information.service.gov.uk |
| Hunter | `HUNTER_API_KEY` | ~25–50 searches + 50 verifications/month | Default cap is 25. Check whether your plan includes API access. |
| Tomba | `TOMBA_API_KEY`, `TOMBA_API_SECRET` | ~25 searches + 50 verifications/month | The API works on the free plan. |
| Prospeo | `PROSPEO_API_KEY` | ~75 credits/month | Sources disagree on whether the free plan includes the API. If it doesn't, leave the key unset. |
| Reoon | `REOON_API_KEY` | ~600/month (about 20 a day) | The cheapest verifier, so it is used first. |
| ZeroBounce | `ZEROBOUNCE_API_KEY` | 100/month | Needs a business-domain signup. |
| CourtListener | `COURTLISTENER_TOKEN` | Free | For the `leads` command. |
| Attio | `ATTIO_API_KEY` | – | Needs scopes: record read/write, note write. |

**Left out on purpose:**
- Apollo: its free plan blocks people search.
- People Data Labs: its free tier hides emails.
- Snov.io: no API on the free plan.
- Anything that scrapes LinkedIn.
- GitHub commit emails: GitHub's terms forbid using them for outreach.

Together the free tiers give roughly 100–150 email lookups a month, which is plenty for an account-based list of 30–50 companies.

## Run
```bash
cd leadgen
pip install -r requirements.txt
cp .env.example .env          # fill in the keys you have
python -m leadgen check
python -m leadgen enrich --all-suppliers                     # dry run, writes out/<ts>/people.csv
python -m leadgen enrich --all-suppliers --people found.csv  # add names found by research
python -m leadgen enrich --all-suppliers --write             # write people to Attio
python -m leadgen leads --days 30
python -m unittest discover -s tests
```

## Network allowlist (Claude Code cloud environments)
efts.sec.gov, www.sec.gov, api.company-information.service.gov.uk, dns.google, api.hunter.io, api.tomba.io, api.prospeo.io, emailverifier.reoon.com, api.zerobounce.net, hn.algolia.com, www.courtlistener.com, api.attio.com. Add the target company domains too, or allow all domains, for the website step.

## Agent
`agents/enricher.md` is the prompt for a Claude Code session or weekly routine. It runs the pipeline, fills gaps with web research, sanity-checks the results, writes them to Attio and reports. It sends nothing.
