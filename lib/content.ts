// Site copy and market data. Edit here; pages read from this file.

export const proof = [
  {
    stat: "$12.5M",
    label: "top bid for Spirit Airlines' internal data in bankruptcy",
    source: "Fortune, Sep 2026",
    href: "https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/",
  },
  {
    stat: "$10K–$100K",
    label: "typical price for a startup's Slack, Jira and email archive",
    source: "Forbes, Apr 2026",
    href: "https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/",
  },
  {
    stat: "+67%",
    label: "price lift when buyers were made to compete ($7.5M to $12.5M)",
    source: "Fortune, Sep 2026",
    href: "https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/",
  },
  {
    stat: "8 days",
    label: "how fast a data factory moved on one shuttered startup",
    source: "AI Weekly",
    href: "https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives",
  },
];

export const dataTypes = [
  { name: "Workplace archives", detail: "Slack, Teams, email, Jira, Linear, Drive, Notion", range: "$10K–$100K+ per company", hot: true },
  { name: "Code history", detail: "Repos with commits, PRs, reviews and linked tickets", range: "~$5K baseline per repo, graded up or down", hot: true },
  { name: "Support & ops", detail: "Tickets, CRM notes, runbooks, incident logs", range: "Priced with the archive" },
  { name: "Video", detail: "Unpublished, raw or 4K footage", range: "$1–$4 per minute" },
  { name: "Speech & calls", detail: "Consented call-center and meeting audio", range: "$5–$300 per hour" },
  { name: "Expert & domain data", detail: "Finance, legal, medical and scientific work product", range: "Custom, often exclusive" },
];

export const steps = [
  {
    n: "01",
    title: "Intake",
    body: "Tell us what you have. We map your systems, the years they cover and your headcount, then give you an indicative range within 48 hours.",
  },
  {
    n: "02",
    title: "Clear & scrub",
    body: "Counsel checks chain of title and privacy-policy limits. Then a multi-pass pipeline removes PII, secrets, customer identifiers and privileged material.",
  },
  {
    n: "03",
    title: "Match & compete",
    body: "We send anonymized samples to vetted labs and data factories. Competing bids raise the price, and you pick who you're comfortable with.",
  },
  {
    n: "04",
    title: "Close & get paid",
    body: "A licence with field-of-use limits, scheduled delivery and a provenance packet for the buyer. You're paid on signing or on delivery.",
  },
];

export const sellerPromises = [
  ["You approve every buyer", "Nothing ships to anyone you haven't signed off on. Anonymous-buyer terms are available."],
  ["We never take title", "We act as your disclosed agent. We never buy, warehouse or resell your data."],
  ["Employees are stakeholders", "We scrub people out before any buyer sees a sample, and we flag sensitive channels for you to exclude."],
  ["No upfront cost", "We earn a success fee when you close. If there's no deal, you owe nothing."],
];

export const buyerPromises = [
  ["Clean provenance", "Each dataset comes with a chain-of-title memo, a record of the seller's authority to sell, and a scrub report."],
  ["Real operational noise", "Messy, multi-year, multi-tool records of real work, ready to build RL gyms, agent environments and evals."],
  ["Reverse RFP", "Describe what you need once. We source it from shutdowns, acquisitions and operating companies."],
  ["Fast, structured deals", "Standard licence terms, defined field-of-use and delivery formats your pipeline can ingest."],
];

export const faqs = [
  {
    q: "Is it legal to sell my company's old Slack and email?",
    a: "Often, yes, but only once it has been checked. That means confirming the company owns the data, reading what your privacy policy and customer contracts allow, and removing personal and privileged information. Counsel reviews every deal before anything ships.",
  },
  {
    q: "We already shut down. Is it too late?",
    a: "Usually not. If the workspace exports or backups still exist and someone holds authority over the company's assets (a founder, an acquirer or a trustee), the data can still be sold. Move quickly, though. Exports get deleted and buyers move fast.",
  },
  {
    q: "What is my data worth?",
    a: "Reported startup deals run from $10K to $100K. Large archives sold in bankruptcy have drawn seven- and eight-figure bids. Price depends on headcount, years covered, tool diversity, links between code and tickets, and how much buyers compete.",
  },
  {
    q: "Who are the buyers?",
    a: "Frontier AI labs and the data and RL vendors that supply them. They use real workplace data to train and evaluate agents. You see every buyer before you agree to anything.",
  },
  {
    q: "Will my customers or former employees be identifiable?",
    a: "No. Names, emails, phone numbers, customer identifiers, secrets and credentials are replaced with consistent placeholders, so the data stays coherent and the people in it stay anonymous. You review a scrubbed sample first.",
  },
];
