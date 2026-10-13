# Supply Side and Competitive Landscape: Brokering Enterprise Data to Frontier AI Labs

Research date: 2026-10-13. Method note: WebFetch could not resolve any host in this environment (DNS errors on fastcompany.com, fortune.com, extruct.ai, letsdatascience.com), so every finding below comes from search-result summaries of the cited pages, not from reading the full articles. Treat exact numbers as "reported" and check the primary article before using them in outbound material. Items dated before 2025 are marked [older].

## 1. Which organizations hold valuable, licensable proprietary data, and which sectors yield the most value?

### Takeaway
In 2026 the hottest supply is "operational exhaust": the Slack, Jira, email, Drive and code archives of shut-down or acquired companies. Labs want it to build agent and RL training environments ("RL gyms"). Prices run from $10K–$100K for small startups up to roughly $10M+ for a large bankrupt enterprise (Spirit Airlines). Other proven categories:
- premium video and media (film/TV, creator footage, sports);
- de-identified health records and imaging;
- news and publisher archives (deals worth $20M–$250M);
- books;
- stock and creative imagery;
- records from professional-services firms (vendor claims only).

### Cited Findings
**Defunct and acquired startups (workplace data and code)**
- Defunct companies are selling Slack messages, Jira tickets, emails and Google Drive files to AI firms. SimpleClosure, a wind-down service, says it has closed about 100 such deals in the past year, at $10,000–$100,000 per company and over $1M in total to founders. — [Forbes, Apr 16 2026](https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/); [Gizmodo](https://gizmodo.com/failed-companies-are-selling-old-slack-chats-and-email-archives-to-train-ai-2000747916)
- Example: the former CEO of Cielo24, Shanna Johnson, sold 13 years of Slack, Jira, email and Google Drive files for "hundreds of thousands of dollars." — [Forbes via search summary](https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/); [AI Weekly](https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives)
- Why labs want it: agentic models need examples of real work. One quote: "Model companies are realizing the noise in the real-world environments is required to accurately test models." The data stocks "RL gyms," which are simulated workplaces built from a real company's Slack threads, Jira tickets and emails. — [TechSpot summary](https://www.techspot.com/community/topics/slack-chats-and-internal-data-from-failed-startups-are-finding-a-second-life-in-ai-training.297197/); [AI Weekly](https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives)
- Turing is reportedly buying codebases from failed startups for "tens of thousands of dollars" each. The source says this rests on company reports and lacks broad independent verification. — [Let's Data Science](https://letsdatascience.com/news/turing-buys-failed-startup-codebases-for-training-7bb0d84f)
- Leaders at Anthropic have reportedly discussed spending more than $1B on RL environments over the next year. — [AI Weekly, summarizing The Information](https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives)

**Bankrupt large enterprises**
- Spirit Airlines' internal data was auctioned in its bankruptcy:
  - Mercor bid $7.5M (the backup bid), Google bid $10M, and Micro1 later bid $12.5M (Sept 2026).
  - The Association of Flight Attendants-CWA objected over employee data.
  - Final court approval was still unresolved in the sources found.
  - Google said a third party would "rigorously scrub" personal information and that no customer data was included.
  — [Fortune, Sep 14 2026](https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/); [Bloomberg Law](https://news.bloomberglaw.com/esg/spirit-data-sale-to-google-shows-gaps-in-employee-protections); [FourWeekMBA](https://fourweekmba.com/ai-spirit-airlines-data-auction-ai-training-distressed-assets/); [VisaVerge](https://www.visaverge.com/travel/google-buys-spirit-airlines-internal-data-in-10m-bankruptcy-deal-for-ai-training/)
- A Bloomberg Law commentator called the Spirit deal the first bankruptcy sale he had seen of "information for information's sake," as opposed to customer data. — [Bloomberg Law](https://news.bloomberglaw.com/esg/spirit-data-sale-to-google-shows-gaps-in-employee-protections)
- SpaceXAI (the xAI/SpaceX unit behind Grok) has reportedly held informal talks about buying data from failed startups. — [TFTC](https://www.tftc.io/spacexai-dead-startup-data-grok-training-consent)

**Media and video**
- Troveo had paid out more than $20M to content owners from an 8M-hour licensed video library as of May 2026. It has expanded into audio, text, agentic workflows, gameplay data and robot data. Its network is 1,300 licensors per Variety, or 7,000+ per Troveo's own page. — [Techstrong.ai, May 2026](https://techstrong.ai/features/troveo-expands-types-of-licensed-content-available-for-training-ai-models/); [Variety](https://variety.com/vip/creators-are-licensing-content-to-train-ai-video-models-1236336720/)
- AI companies pay creators thousands of dollars for unused footage, such as B-roll and raw clips. — [AI News](https://www.artificialintelligence-news.com/news/ai-giants-pay-thousands-for-creators-unused-footage-to-train-models/)
- Protege signed a deal for footage from Ekstraklasa, the Polish soccer league. Sports video is a supply category. — [The Information (paywalled; search summary)](https://feature.theinformation.com/newsletters/ai-agenda/one-year-old-startup-notching-data-deals-model-makers)

**Health**
- Protege licenses de-identified health records and medical imaging. — [SiliconANGLE, Jan 2026](https://siliconangle.com/2026/01/08/protege-raises-30m-grow-governed-marketplace-ai-training-data/)
- Hospitals are being paid for de-identified EHR data that intermediaries resell for AI training. A bioethicist calls the practice legal but ethically fraught. — [STAT, Jan 2025](https://www.statnews.com/2025/01/16/health-ai-electronic-health-records-hipaa-deidentified-data-market/)

**Publishers and news**
- Meta–News Corp: up to $50M a year for 3 years, starting March 2026 (reported). — [LLM Pulse](https://llmpulse.ai/blog/ai-content-deals-beyond-openai/); [Media and the Machine, Jun 2026](https://mediaandthemachine.substack.com/p/ai-content-licensing-deals-june-2026)
- Amazon–NYT: about $20–25M a year (reported). — same sources
- OpenAI–News Corp: up to $250M over 5 years. — same sources
- OpenAI had about 24 publicly announced publisher deals as of June 2026; another tracker counts 18. — same sources
- Reddit, Shutterstock and News Corp each make "hundreds of millions" a year licensing data. — [The Information search summary](https://feature.theinformation.com/newsletters/ai-agenda/one-year-old-startup-notching-data-deals-model-makers)

**Books**
- Created by Humans lets authors claim books by ISBN and license training and reference rights on a non-exclusive basis. At the January 2025 launch, no deals had closed. [older/2025] — [Publishers Weekly](https://www.publishersweekly.com/pw/print/20250120/96846-created-by-humans-launches-ai-rights-platform-for-authors.html); [WFAE/NPR](https://www.wfae.org/2025-01-17/major-authors-hope-new-ai-licensing-site-will-help-them-keep-control-of-their-books)

**Stock and creative imagery**
- Wirestock raised a $23M Series A in May 2026. It has about $40M annual run-rate revenue from supplying creative, multimodal data to AI labs and has paid $15M to contributors. — [TechCrunch, May 14 2026](https://techcrunch.com/2026/05/14/wirestock-raises-23m-to-supply-multi-modal-data-to-ai-labs/)

**Professional-services firms and call centers (vendor claims, unverified)**
- Pewter claims US firms are paid six and seven figures for de-identified records, including a 60-person accounting firm paid $350K. It says it excludes firms whose records are mostly client or patient files. — [Pewter (vendor site)](https://pewterdata.com/)
- License My Data positions itself for "video, clinical and business data you already own." — [licensemydata.com](https://licensemydata.com/)
- Data Licensing Advisors offers advisory work for data holders. — [datalicensingadvisors.com](https://datalicensingadvisors.com/)
- Shaip sells licensed call-center datasets (transcribed conversations in 65+ languages) and medical datasets. — [Shaip](https://www.shaip.com/offerings/call-center-dataset/)

### Inferences
- **Value ranking for a broker (inferred):**
  1. Large bankrupt or wind-down enterprises with years of internal comms and workflow data ($1M–$12M+; rare but big).
  2. Mid-size acquired or shut-down SaaS and AI startups with code, tickets and Slack ($10K–$500K; high volume).
  3. Owners of premium video, sports and film libraries (large, recurring revenue-share).
  4. Health data holders (high value, heavy compliance).
  5. Publishers (mostly already served by direct lab deals or marketplaces such as Microsoft's and ProRata).
  6. Long-tail professional-services firms (accounting, engineering, insurance), if consent and confidentiality allow.
- Workplace and agentic data is the fastest-growing demand category in 2026, driven by RL environments. Text corpora for pretraining are increasingly commoditized or already locked up.
- Legal and medical practices are tricky sources. Their records are dominated by privileged or patient data, and at least one broker excludes such firms.

### Gaps
- No verified per-category price benchmarks beyond the anecdotes above. No public data on game-studio, engineering-firm, forum or government/academic archive deals in 2025–26 turned up in the searches run.
- Whether the Spirit sale closed, and at what price, was unresolved in the sources found.

## 2. Trigger signals for a likely seller, and the public data sources that capture them

### Takeaway
The clearest triggers are:
- the end of a company's life: bankruptcy (Chapter 7 or 11), wind-down or dissolution, an acqui-hire or acquisition that orphans a product, and asset sales;
- peer deals that set a price reference (publisher deals);
- fresh M&A, which buyers already target (Mercor contacted Warmly 8 days after HubSpot acquired it).

Bankruptcy dockets are now an explicit venue: the Spirit data auction ran through the court.

### Cited Findings
- Mercor emailed Warmly's CEO 8 days after HubSpot acquired the company in late June 2026, offering to buy or license its codebase and task records. Acquisition announcements are a working trigger. — [AI Weekly / The Information](https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives)
- SimpleClosure's Asset Hub lets a closing company sell source code, domains, hardware and workspace data (Slack, Drive, email, Notion, Figma). The wind-down service itself is the point of entry. SimpleClosure said in September 2026 that its AI buyers had grown ninefold versus 2025. — [SimpleClosure Asset Hub](https://simpleclosure.com/product/assethub/); [search summary of coverage](https://migratorg.substack.com/p/the-startup-that-makes-money-when)
- How bankruptcy law treats data sales:
  - Selling personal data must be consistent with the debtor's privacy policy, or a consumer privacy ombudsman must be appointed and the court must find no violation of applicable law (the 23andMe precedent).
  - In Spirit, the court relied on the parties rather than an ombudsman to explain how the data would be protected.
  — [Spencer Fane](https://www.spencerfane.com/insight/the-new-distressed-asset-navigating-the-unique-complexities-of-ai-company-bankruptcies/); [Bloomberg Law](https://news.bloomberglaw.com/esg/spirit-data-sale-to-google-shows-gaps-in-employee-protections)
- Law-firm analysis flags two open issues: how an ombudsman should assess AI-training privacy risk, and the risk of transferring privileged communications in bulk data sales. — [Spencer Fane](https://www.spencerfane.com/insight/the-new-distressed-asset-navigating-the-unique-complexities-of-ai-company-bankruptcies/); [Baker Donelson](https://www.bakerdonelson.com/bankruptcy-issues-raised-by-generative-ai-ownership-licensing-and-asset-values)
- Peer publisher deals keep being publicized and tracked, which creates fear of missing out and price anchors among peers. — [Media and the Machine](https://mediaandthemachine.substack.com/p/ai-content-licensing-deals-june-2026); [Everything-PR tracker](https://everything-pr.com/ai-licensing-tracker); [LLM Pulse](https://llmpulse.ai/blog/ai-content-licensing-deals/)

### Inferences
Signal to source mapping (my synthesis; not cited as a system anyone uses):

| Signal | Where to find it |
|---|---|
| Chapter 7 or 11 filing; Section 363 asset-sale motions; "sale of books and records / data" motions | PACER/CourtListener and RECAP; claims-agent sites (Kroll, Stretto, Epiq, Omni) |
| Startup shutdowns | Wind-down providers (SimpleClosure, Sunset) as channel partners; dissolution filings (Delaware franchise-tax and dissolution certificates); shutdown blog posts and "we're shutting down" posts on LinkedIn and X |
| Acquisitions and acqui-hires that sunset a product | Crunchbase/PitchBook M&A feeds; TechCrunch; sunset announcements on product sites; status-page and website shutdown notices |
| Distress | Layoffs (layoffs.fyi, WARN Act notices filed with state labor departments); no new funding for 24+ months (Crunchbase); falling headcount (LinkedIn); domains near expiry or DNS changes; GitHub orgs archived or repos made read-only |
| PE ownership or cost pressure in data-rich firms (BPOs, call centers, publishers, stock libraries) | PE portfolio pages; SEC 8-K/10-K mentions of "data monetization" or "AI licensing" |
| Peer deals | The publisher deal trackers above. A new deal in a vertical justifies outreach to that vertical's runners-up. |

- Watch competitor activity too: Mercor, Micro1, Turing and SpaceXAI are directly approaching sellers, so speed after a trigger matters. Mercor moved within 8 days in the Warmly case.

### Gaps
- No source quantified which trigger best predicts a completed sale.
- No public dataset of "data assets sold in bankruptcy" was found. It would have to be built from dockets.

## 3. Seller-side decision makers and their objections

### Takeaway
Who decides depends on the company's state:
- **Wind-downs:** the founder or CEO, often working with a wind-down service. Once a company is in liquidation, the liquidator or founder controls the assets.
- **Bankruptcies:** the debtor in possession or trustee, with court approval. Unions, privacy ombudsmen, state attorneys general and the FTC can intervene.
- **Operating companies:** the CEO, GC or CDO, and BD.

The main objections are:
- privacy (employee and customer PII);
- confidentiality and trade-secret leakage;
- contractual restrictions (customer contracts, privacy policies);
- privileged material;
- reputational backlash;
- giving up exclusivity forever, since a model can't "unlearn."

### Cited Findings
- The data belongs to the company, not its employees. In liquidation, the liquidator or founder effectively controls it. SimpleClosure strips PII before a sale, but the content of the messages stays intact. Critics argue anonymized data can still contain PII. — [TechSpot/Forbes summary](https://www.techspot.com/community/topics/slack-chats-and-internal-data-from-failed-startups-are-finding-a-second-life-in-ai-training.297197/); [Gizmodo](https://gizmodo.com/failed-companies-are-selling-old-slack-chats-and-email-archives-to-train-ai-2000747916)
- In Spirit, the flight attendants' union (AFA-CWA) objected and sought protections for employee data, which delayed the hearing. — [FourWeekMBA](https://fourweekmba.com/ai-spirit-airlines-data-auction-ai-training-distressed-assets/); [Bloomberg Law](https://news.bloomberglaw.com/esg/spirit-data-sale-to-google-shows-gaps-in-employee-protections)
- The FTC warned in February 2024 that a company cannot unilaterally change its privacy commitments to allow AI training. Doing so may be unfair or deceptive. [older] — [PYMNTS 2026](https://www.pymnts.com/artificial-intelligence-2/2026/enterprise-saas-contracts-are-secret-ai-training-licenses/)
- Exposure of confidential information and trade secrets is "one of the most significant concerns." Broad training rights let a buyer keep the learnings indefinitely, even if the seller keeps ownership of the raw data. — [Morgan Lewis, Jun 2026](https://www.morganlewis.com/blogs/sourcingatmorganlewis/2026/06/key-considerations-when-allowing-a-vendor-to-train-its-ai-models-on-customer-data)
- A broker's caveat: de-identification cannot "create permission that was never captured." Firms whose records are mostly client or patient files often don't qualify. — [Pewter (vendor)](https://pewterdata.com/)
- Bulk data sales risk transferring privileged communications. — [Spencer Fane](https://www.spencerfane.com/insight/the-new-distressed-asset-navigating-the-unique-complexities-of-ai-company-bankruptcies/)
- The LinkedIn suit alleged that private InMail was disclosed for AI training; LinkedIn denies it. This illustrates the litigation risk. [Jan 2025] — [Slashdot](https://yro.slashdot.org/story/25/01/22/236253/microsofts-linkedin-sued-for-disclosing-customer-information-to-train-ai-models)
- News publishers face a "double bind": they license to the same platforms that erode their traffic. — [Nieman Lab, May 2026](https://www.niemanlab.org/2026/05/the-emerging-ai-content-licensing-market-puts-news-publishers-in-a-double-bind-a-new-report-warns/)

### Inferences
- Likely objections and how a broker could answer each (inferred):
  - "Is it legal and do we own it?" → a rights and consent audit, and a review of customer contracts and the privacy policy.
  - "PII and employee privacy" → third-party scrubbing, as in the Spirit deal.
  - "Reputation" → anonymous or undisclosed buyer terms.
  - "Leaving value on the table" → competitive bids (Spirit went from $7.5M to $12.5M through competition).
  - "Exclusivity and competitor use" → field-of-use limits and non-exclusive or time-boxed licenses.
  - "Effort" → turnkey extraction.
- For bankruptcies, also map the trustee's professionals: the investment banker, the claims agent and the debtor's counsel. They run the 363 process and are the real gatekeepers.

### Gaps
- No direct interviews were found with seller CEOs or GCs listing their objections. The list above is drawn from legal commentary and press.

## 4. Competitors and incumbents (status as of 2026)

### Takeaway
The landscape splits into four groups:
1. **Rights and data brokers or marketplaces** working with existing data holders: Protege, Troveo, Wirestock, Created by Humans, SimpleClosure Asset Hub, Datarade, Defined.ai, and Human Native (now part of Cloudflare).
2. **Publisher monetization and pay-per-crawl layers:** TollBit, ProRata, Cloudflare Pay-per-crawl, and Microsoft's Publisher Content Marketplace.
3. **Expert-labor data factories** that are now also buying archives directly: Mercor, Micro1, Turing, Surge, Handshake AI and Scale.
4. **Small enterprise-records licensing intermediaries:** Pewter, License My Data and Data Licensing Advisors.

The data factories are the biggest threat. They have the lab relationships and the cash, and they are already bidding on distressed data.

### Cited Findings
**Protege**
- Founded in 2024.
- $25M Series A (August 2025), led by Footwork with CRV and Bloomberg Beta.
- $30M extension (January 2026), led by a16z.
- About $65M total per SiliconANGLE and Tracxn; $40M per PitchBook; $55M per another tracker. Dealroom lists a $120M valuation.
- Covers healthcare (EHR, imaging) and media. Pays data partners a revenue share.
- Acquired Calliope Networks (film/TV and creator video aggregator) on December 18, 2024 [older]. Calliope's CEO Davis became GM of Protege's media vertical. Variety calls the unit "Protege Media."
— [SiliconANGLE](https://siliconangle.com/2026/01/08/protege-raises-30m-grow-governed-marketplace-ai-training-data/); [PR Newswire](https://www.prnewswire.com/news-releases/protege-acquires-calliope-networks-unlocking-premium-video-data-for-ai-training-302335162.html); [Dealroom](https://app.dealroom.co/news/feed/protege-acquires-calliope-networks-for-ai); [Variety](https://variety.com/vip/creators-are-licensing-content-to-train-ai-video-models-1236336720/)

**Human Native AI**
- London-based, founded 2024, backed by LocalGlobe and Mercuri.
- Acquired by Cloudflare in January 2026 for an undisclosed price. It is being folded into Cloudflare's AI Crawl Control and Pay-per-crawl to help AI developers "find, access and purchase" licensed data.
— [SiliconANGLE, Jan 15 2026](https://siliconangle.com/2026/01/15/cloudflare-buys-human-native-strengthen-licensed-data-access-ai-developers/); [IT Brief](https://itbrief.co.uk/story/cloudflare-buys-human-native-to-reshape-ai-data-deals); [Fortune 2024](https://fortune.com/2024/10/15/human-native-ai-startup-building-marketplace-for-data-hires-veteran-google-execs-top-ip-lawyer)

**Troveo**
- Video-first, expanding into other modalities.
- More than $20M paid to licensors (May 2026).
- Deals with AI companies are priced per model or per year. Creators are paid a revenue share.
— [Techstrong](https://techstrong.ai/features/troveo-expands-types-of-licensed-content-available-for-training-ai-models/); [Publish Press](https://news.thepublishpress.com/p/how-to-make-money-when-ai-uses-your-content)

**Avail's Corpus**
- Another creator-video sourcing marketplace. — [Variety](https://variety.com/vip/creators-are-licensing-content-to-train-ai-video-models-1236336720/)

**Wirestock**
- $23M Series A (May 2026); about $40M run-rate revenue; $15M paid to contributors.
- Legacy stock-marketplace commission: 15% on agency-distributed sales and 30% on direct sales.
- AI-data revenue-share terms are undisclosed.
— [TechCrunch](https://techcrunch.com/2026/05/14/wirestock-raises-23m-to-supply-multi-modal-data-to-ai-labs/); [Wirestock blog](https://wirestock.io/gen-ai-resources/earn-money-ai-training-datasets-creators)

**Created by Humans**
- Books and author rights. Backed by David Sacks, Garry Tan and Walter Isaacson; founder Trip Adler (Scribd).
- Licenses are non-exclusive; the revenue split is undisclosed.
— [TechCrunch 2024](https://techcrunch.com/2024/06/25/backed-by-david-sacks-garry-tan-and-walter-isaacson-created-by-humans-helps-authors-license-their-creative-work-to-ai-models); [Publishers Weekly 2025](https://www.publishersweekly.com/pw/print/20250120/96846-created-by-humans-launches-ai-rights-platform-for-authors.html)

**SimpleClosure (Asset Hub)**
- A wind-down service that doubles as a data-sale channel: about 100 deals, $10K–$100K each, and AI buyers up ninefold.
- Removes PII before sale. Parts of Asset Hub are in beta per CEO Dori Yona.
— [SimpleClosure](https://simpleclosure.com/product/assethub/); [Forbes](https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/)

**Mercor**
- $350M Series C at a $10B valuation (October 2025). A round at $20B was reported in talks in mid-2026, with no close confirmed.
- About $2B annualized gross revenue (June 2026); net revenue estimated at $600–800M.
- Bid $7.5M for Spirit's data; approached Warmly after its acquisition.
— [ValueAddVC](https://valueaddvc.com/blog/how-does-mercor-make-money-2b-arr-20b-valuation-and-the-expert-data-marketplace-explained); [36Kr](https://eu.36kr.com/en/p/3904682268034947); [AI Weekly](https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives)

**Micro1**
- Bid $12.5M for Spirit's data.
- Its website advertises $100K to more than $2M for approved data packages (marketing claim).
— [Fortune](https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/); [search summary](https://completeaitraining.com/news/defunct-startups-sell-employee-slack-messages-and-emails-to/)

**Turing**
- About $300M ARR, reportedly profitable. Raised $111M Series E at a $2.2B valuation (March 2025).
- Reportedly buys failed-startup codebases.
— [HeroHunt](https://www.herohunt.ai/blog/mercor-vs-surge-vs-scale-ai-2026-buyer-guide/); [Let's Data Science](https://letsdatascience.com/news/turing-buys-failed-startup-codebases-for-training-7bb0d84f)

**Handshake AI**
- About $1–1.1B gross annualized revenue (April 2026); about $450M net per Sacra. — [X/The Information](https://x.com/MunshiPremChnd/status/2043862153501773894); [HeroHunt](https://www.herohunt.ai/blog/mercor-vs-surge-vs-scale-ai-2026-buyer-guide/)

**Surge AI**
- About $1.4B run-rate per third-party trackers; funding talks reported at a $25–30B valuation. — [Contrary Research](https://research.contrary.com/company/surge-ai); [HeroHunt](https://www.herohunt.ai/blog/mercor-vs-surge-vs-scale-ai-2026-buyer-guide/)

**Scale AI**
- Its market position changed after the Meta deal. — [Teahose](https://www.teahose.com/guides/scale-ai-competitors)

**Datarade**
- A general data marketplace. A third-party review reports a 30% commission on facilitated transactions for providers on its Standard plan. — [ZoomInfo Pipeline review](https://pipeline.zoominfo.com/sales/datarade-pricing)

**TollBit**
- Publishers keep 100% of revenue; AI companies pay a transaction fee. Publishers set prices per 1,000 pages crawled. — [Nieman Lab correction via Media Copilot](https://mediacopilot.ai/ai-revenue-platforms-comparison/); [News Media Help Desk](https://www.newsmediahelpdesk.org/tollbit-getting-started-guide/)

**ProRata.ai (Gist)**
- Splits subscription and ad revenue 50/50 with publishers, by attribution. Had 500+ publishers. — [Media Copilot](https://mediacopilot.ai/ai-revenue-platforms-comparison/); [Nieman Lab](https://www.niemanlab.org/2026/05/the-emerging-ai-content-licensing-market-puts-news-publishers-in-a-double-bind-a-new-report-warns/)

**Microsoft Publisher Content Marketplace**
- Announced February 2026. Publishers set terms and are paid by usage. — [Media Copilot](https://mediacopilot.ai/microsoft-publisher-content-marketplace-ai-licensing/)

**Other entrants**
- RSL (Really Simple Licensing) protocol from the co-creator of RSS (Sept 2025). — [TechCrunch](https://techcrunch.com/2025/09/10/rss-co-creator-launches-new-protocol-for-ai-data-licensing/embed/)
- Poindexter Labs: £2M seed; expert data production and licensing. — [IT Brief](https://itbrief.co.uk/story/poindexter-labs-raises-gbp-2-million-seed-funding)
- Shaip: catalog datasets. — [Shaip](https://www.shaip.com/solutions/healthcare-ai/)

**Market sizing**
- One tracker counts 15 active AI-data marketplace companies with more than $178M in disclosed funding: 9 "collect & license" and 3 "rights/IP brokerage." — [Extruct (search summary)](https://www.extruct.ai/data-room/ai-training-data-marketplaces/)

### Inferences
- **Open lane for a new broker (inferred).** Distressed or orphaned enterprise data and mid-market operating-company records are served only by SimpleClosure (startup wind-downs only), small vendors (Pewter and similar) and the data factories bidding directly. No one clearly dominates sourcing from bankruptcy dockets or from mid-market PE portfolios.
- **Partner or threat:** Mercor, Micro1 and Turing are both possible buyers and rivals. A broker's value to sellers is running a competitive process across several labs and factories (the Spirit precedent). Its value to buyers is pre-cleared, scrubbed, packaged data.
- **Cloudflare is now the main web-publisher channel** after buying Human Native. Competing there for long-tail web publishers looks unattractive.

### Gaps
- No 2026 information was found on Defined.ai (funding, model or split), Narrative, Story Protocol's data business, or Handshake's sourcing of archives.
- Micro1's 2026 funding was not found.
- Scale AI's 2026 status is covered only by an aggregator.

## 5. Broker economics: take rates, exclusivity, revenue share vs flat fee

### Takeaway
Public take rates cluster at:
- **About 30%** for general marketplaces (Datarade's Standard plan; Wirestock on direct sales).
- **15%** on agency-distributed stock sales (Wirestock).
- **50/50** for ProRata's attribution revenue share.
- **0% seller-side** at TollBit, which charges the buyer a fee instead.

Deal structures range:
- one-time flat buyouts for distressed data ($10K–$12.5M);
- per-model or per-year licenses (Troveo);
- multi-year annual fees for publishers ($20–50M a year);
- recurring revenue share (Protege, Troveo).

Non-exclusive licensing is the norm for creator and author platforms.

### Cited Findings
- Datarade: 30% commission on facilitated transactions (Standard plan, third-party review). — [ZoomInfo Pipeline](https://pipeline.zoominfo.com/sales/datarade-pricing)
- Wirestock: 15% commission on agency-distributed sales, 30% on direct sales (legacy stock model). AI-data split undisclosed. — [Wirestock](https://wirestock.io/gen-ai-resources/earn-money-ai-training-datasets-creators); [TechCrunch](https://techcrunch.com/2026/05/14/wirestock-raises-23m-to-supply-multi-modal-data-to-ai-labs/)
- ProRata: 50/50 revenue share. — [Media Copilot](https://mediacopilot.ai/ai-revenue-platforms-comparison/)
- TollBit: publishers keep 100%; fee charged to AI companies. — [Media Copilot / Nieman Lab correction](https://mediacopilot.ai/ai-revenue-platforms-comparison/)
- Troveo: per-model or per-year deals; creators paid a revenue share (split undisclosed). — [Publish Press](https://news.thepublishpress.com/p/how-to-make-money-when-ai-uses-your-content)
- Protege: revenue share to data partners. — [SiliconANGLE](https://siliconangle.com/2026/01/08/protege-raises-30m-grow-governed-marketplace-ai-training-data/)
- Created by Humans: non-exclusive contracts. — [WFAE/NPR 2025](https://www.wfae.org/2025-01-17/major-authors-hope-new-ai-licensing-site-will-help-them-keep-control-of-their-books)
- Flat-price distressed sales: $10K–$100K (SimpleClosure); $7.5M–$12.5M bids (Spirit). — [Forbes](https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/); [Fortune](https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/)
- Data factories report gross revenue that includes contractor payouts. Mercor's net is roughly 30–40% of gross ($600–800M net on $2B gross). This gives a rough benchmark for intermediation margins in the adjacent labor market. — [ValueAddVC](https://valueaddvc.com/blog/how-does-mercor-make-money-2b-arr-20b-valuation-and-the-expert-data-marketplace-explained)

### Inferences
- A plausible broker model (inferred):
  - 20–30% commission on a non-exclusive license, or a higher fee for running a competitive auction.
  - A premium for exclusivity or time-boxed exclusivity, since labs pay more for data competitors can't get. The Spirit bidding war suggests exclusivity carries real value.
  - Flat buyouts suit wind-downs, where the seller wants cash now and the entity will be dissolved. Revenue-share or recurring licenses suit going concerns.
- Extra charges for preparation work (PII scrubbing, packaging) are common in this space, but no published figures were found.

### Gaps
- No published take rates were found for Protege, Troveo, Created by Humans, SimpleClosure, Human Native/Cloudflare or Defined.ai. SimpleClosure's cut of its $10K–$100K deals is unknown.
- No data on how exclusive and non-exclusive pricing compare in enterprise data deals.
