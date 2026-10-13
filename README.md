# DataDrop

The marketing site and lead intake for DataDrop, which matchmakes companies with AI labs and data buyers. It's built with Next.js 16 and Tailwind v4, and it sends leads to Attio. Research lives in `reports/` and `research_notes/`.

## Pages

- `/`: interactive data-field hero, matchmaking graph, two-door hero (sell or source), market proof bar, what sells, how it works, FAQ
- `/sell`: seller valuation intake → Attio Deal
- `/buy`: buyer reverse-RFP → Attio Brief
- `/trust`: provenance and compliance gates

Copy and market figures are in `lib/content.ts`. Form options and validation are in `lib/leads.ts`.

## Attio setup

Leads are written to the DataDrop Attio workspace:

| Form | Records created |
|---|---|
| `/sell` | Company (asserted by email domain) → Person (asserted by email) → **Deal** in stage *Lead*, linked to both, with a note holding the full submission |
| `/buy` | Company → Person → **Brief** (status *Open*, broker = company, data categories mapped from the form) with a note |

People who sign up with a free email address (Gmail, Outlook and so on) get a company record by name only, because there's no domain to match on.

1. In Attio go to **Workspace settings › Developers**, create an access token, and give it read-write access to records and notes.
2. In Vercel, add these environment variables:
   - `ATTIO_API_KEY`: the token
   - `ATTIO_OWNER_EMAIL`: the Attio login email of the person who should own new Deals (an owner is required for Deals)
   - `NEXT_PUBLIC_SITE_URL` (optional): your domain, used for OG metadata
3. Redeploy.

The mapping from the website's data types to Brief categories is in `lib/attio.ts`.

## Deploy to Vercel

Import the repo in Vercel. Next.js is detected automatically, so no config is needed. Add the environment variables above, then deploy.

## Local

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

`npm run lint` type-checks the code and `npm run build` builds for production.
