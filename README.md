# DataDrop

The marketing site and lead intake for DataDrop, which matchmakes companies with AI labs and data buyers. It's built with Next.js 16 and Tailwind v4, and it sends leads to Google Sheets. Research lives in `reports/` and `research_notes/`.

## Pages

- `/`: two-door hero (sell or source), market proof bar, what sells, how it works, FAQ
- `/sell`: seller valuation intake → **Sellers** tab
- `/buy`: buyer reverse-RFP → **Buyers** tab
- `/trust`: provenance and compliance gates

Copy and market figures are in `lib/content.ts`. Form options and validation are in `lib/leads.ts`.

## Google Sheets setup (5 min)

1. Create a Google Sheet, then open **Extensions › Apps Script**.
2. Paste in `google-apps-script/Code.gs` and change `SECRET` to a long random string.
3. Go to **Deploy › New deployment › Web app**. Set Execute as: *Me* and Who has access: *Anyone*. Copy the `/exec` URL.
4. The script creates the `Sellers` and `Buyers` tabs, with headers and a `status` column, on the first submission.

If you change the script later, use **Deploy › Manage deployments › Edit › New version**. That keeps the URL the same.

## Deploy to Vercel

1. Import this repo in Vercel. The framework (Next.js) is detected automatically, so no config is needed.
2. Add these environment variables:
   - `SHEETS_WEBHOOK_URL`: the Apps Script `/exec` URL
   - `SHEETS_WEBHOOK_SECRET`: the same value as `SECRET`
   - `NEXT_PUBLIC_SITE_URL` (optional): your domain, used for OG metadata
3. Deploy.

## Local

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

`npm run lint` type-checks the code and `npm run build` builds for production.
