# Broker distressed enterprise data to frontier labs

The opening for a new data broker in late 2026 is **not** news or web text, which incumbents and Cloudflare-style marketplaces already serve. It is **"operational exhaust"**: the Slack, Jira, email, Drive and code archives of shut-down, acquired and bankrupt companies, which labs now buy to build RL gyms and agent-training environments. Deals in this category run from **$10K–$100K for a small startup** to a **$12.5M bid for Spirit Airlines' internal data** ([Forbes](https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/); [Fortune](https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/)). Buyers are few. A handful of frontier labs and roughly a dozen well-funded "data factories" (Mercor, Micro1, Turing, Surge) each spend at the scale of $1B+ a year on data. Sellers are many, scattered, and identifiable from public trigger signals: bankruptcy dockets, wind-downs, acquisitions, layoffs. The binding constraint is not finding data. It is **clearing it**: chain of title, PII, privileged material, privacy-policy limits, and state data-broker laws. Clean provenance is therefore the product a broker actually sells, and since *Bartz v. Anthropic* it carries a dollar value. The company should run as a **disclosed agent of the seller**, never taking title to data. It should be built around a two-sided pipeline. On the supply side, high-volume, signal-driven sourcing is mostly automated. On the demand side, a low-volume, account-based lab pipeline is human-led and agent-assisted. Between them sit hard compliance gates and a deterministic quotation engine anchored on published comparables. A stack of Supabase, Inngest, the Claude API and the Gmail API runs the agent layer for roughly **$500–2,000 a month** before legal costs. The MVP is buildable in about 8 weeks, but the first deals should be done by hand to calibrate prices and diligence.

*Scope note: this report reads "frontend labs" as frontier AI labs. All figures are as reported by the cited sources. Many are press or vendor claims rather than filings, and the report says so where it matters.*

## Labs now buy post-training raw material, not bulk text

Lab data spend has shifted from pretraining corpora toward **post-training inputs**: expert-written and preference data, RL environments with verifiers, and agent trajectories built from real enterprise work. The Information reported that Anthropic leaders discussed spending **more than $1B on RL environments** over a year ([TechCrunch](https://techcrunch.com/2025/09/21/silicon-valley-bets-big-on-environments-to-train-ai-agents/)). OpenAI has reportedly signed multiple seven-figure RL and human-data contracts, while smaller labs sign **$300K–$500K per quarter** ([Troveo](https://www.troveo.ai/resources/sell-rl-environments)). Vendor revenue shows the scale. Mercor booked **$614M in H1 2026**, mostly from OpenAI and Anthropic ([AI Weekly](https://aiweekly.co/alerts/mercor-books-614m-in-h1-2026-leaning-on-openai-anthropic)). Surge reportedly passed $1B in revenue with about 110 employees ([HeroHunt](https://www.herohunt.ai/blog/mercor-vs-surge-vs-scale-ai-2026-buyer-guide/)). Labelbox's CEO puts each leading lab's data spend above **$1B a year** (same source). Analyst reports size the narrow "AI training dataset" market at only $1.5–2.5B growing ~21% a year ([PR Newswire / Verified Market Research](https://prnewswire.co.uk/news-releases/ai-training-dataset-market-is-expected-to-generate-a-revenue-of-usd-7564-52-million-by-2031--globally-at-21-86-cagr-verified-market-research-302427553.html)), which understates real spend. Lab budgets and vendor revenue suggest **$10B+ a year** flows through human data, RL and licensing combined.

Inside that spend, the category most relevant to a broker is enterprise operational data. Fast Company and Forbes documented AI labs paying **hundreds of thousands of dollars** for defunct startups' email, Slack and Jira archives to feed RL gyms. The former CEO of Cielo24 sold 13 years of company records this way ([Fast Company](https://www.fastcompany.com/91528808/shuttered-startups-are-selling-old-slack-chats-and-emails-to-ai-companies)). The logic, in one industry quote, is that "the noise in the real-world environments is required to accurately test models" ([TechSpot summary](https://www.techspot.com/community/topics/slack-chats-and-internal-data-from-failed-startups-are-finding-a-second-life-in-ai-training.297197/)). Three other categories have proven demand: **unpublished video** ($1–$4 per minute from OpenAI, Google and Moonvalley ([AI News](https://www.artificialintelligence-news.com/news/ai-giants-pay-thousands-for-creators-unused-footage-to-train-models/))), **verifiable expert-domain data** in finance, law, medicine and science, and **scholarly content** (Wiley's AI licensing revenue grew from $23M in FY2024 to $40M in FY2025 ([Wiley](https://newsroom.wiley.com/press-releases/press-release-details/2025/Research-Growth-and-AI-Licensing-Drive-Wileys-Third-Quarter-2025-Results/default.aspx))). Deals are also moving from one-time dumps toward live or attribution-based access. Microsoft's Publisher Content Marketplace pilot, for example, pays publishers per use ([Search Engine Roundtable](https://seroundtable.com/microsoft-publisher-content-marketplace-40875.html)).

Headline deals show the ceiling but are mostly out of reach for a startup broker. Reddit's S-1 disclosed **$203M** in data-licensing contracts over 2–3 years ([SEC](https://www.sec.gov/Archives/edgar/data/1713445/000162828024006294/reddits-1q423.htm)). Amazon–NYT is reported at $20–25M a year ([Axios](https://www.axios.com/2025/06/04/nyt-amazon-ai-licensing-deal)). Shutterstock's deals initially ran $25–50M per tech buyer ([The Grain AI](https://thegrainai.substack.com/p/shutterstock-made-104-million-last)). More telling is the trend. One tracker counts deals per quarter rising from 3 in Q1 2023 to **39 in Q3 2026**, while the **median annual deal value fell from $9.4M to $3.6M** ([AI Industry Reviews](https://ai-industry-reviews.com/research/ai-training-data-licensing-deal-statistics-2026/)). The market is widening into the long tail, where a broker earns its keep through aggregation and process. Anthropic stands out among buyers. It has signed almost no public publisher deals ([Adweek](https://www.adweek.com/media/anthropic-content-licensing-lawsuits-publishers/)) and settled the book-piracy class action for $1.5B ([Axios](https://axios.com/2025/09/05/anthropic-ai-copyright-settlement)). Its data buying runs through "data partnerships" and RL vendors rather than press releases.

### Who inside a lab actually buys

OpenAI is the only lab with a well-documented buying function. Its **Foundations Data and Operations** team is responsible for "acquiring the data OpenAI needs to build frontier models." Its program managers evaluate suppliers, negotiate and manage delivery, and the role draws hires with 8+ years in ops, strategy, VC/PE or consulting ([OpenAI careers](https://openai.com/careers/program-manager-foundations-data-and-operations-san-francisco/)). OpenAI has also posted "Business Operations Manager, Data Acquisition" and "Partner Director, Data Partners" roles ([Thrive listing](https://jobs.thrivecap.com/companies/openai/jobs/85551375-partner-director-data-partners)). Labs are also hiring "RL environment engineers," who form a technical evaluation layer ([HeroHunt](https://www.herohunt.ai/blog/hiring-rl-environment-engineers-2026-labs-guide/)). The working model has three seats. **Data-partnership BD owns commercial terms, post-training and RL research leads own technical fit, and legal/privacy is a veto gate.** Titles at Google DeepMind, Meta, xAI and Anthropic were not found and must be mapped by hand.

A second buyer class matters as much as the labs: **the data factories themselves**. Mercor contacted Warmly eight days after HubSpot acquired it, offering to buy its codebase and task records ([AI Weekly](https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives)). Turing reportedly buys failed-startup codebases for tens of thousands of dollars ([Let's Data Science](https://letsdatascience.com/news/turing-buys-failed-startup-codebases-for-training-7bb0d84f)). Micro1 advertises **$100K to $2M+** for approved data packages ([completeaitraining summary](https://completeaitraining.com/news/defunct-startups-sell-employee-slack-messages-and-emails-to/)). These firms package raw archives into RL environments and resell them to labs. For a broker they are simultaneously **buyers, channel partners and rivals**. Selling to them shortens sales cycles compared with going to labs directly.

Buyer requirements are consistent across sources: documented license, source and consent per dataset; PII removal; a representative **1–5% sample** for evaluation; non-exclusive rights by default with **exclusivity priced as a premium**; and, for RL data, verifiers that cannot be gamed ([beyondelevation](https://beyondelevation.com/insights/how-to-license-data-to-ai-companies); [Troveo](https://www.troveo.ai/resources/sell-rl-environments)). Buyers also care about vendor neutrality. OpenAI and Google DeepMind reportedly cut ties with Scale after Meta's 49% stake ([TechCrunch](https://techcrunch.com/2025/12/04/micro1-a-scale-ai-competitor-touts-crossing-100m-arr)). A broker that is visibly lab-neutral has a structural selling point.

## Sellers surface through bankruptcy dockets, wind-downs and acquisitions

The supply side is a long tail of companies that hold years of real work records and suddenly have reason to monetize them. Ranked by deal value, the most promising sources are as follows. Each ranking is an inference from the cited deals.

**Large bankrupt enterprises** are rare but worth seven or eight figures. In Spirit Airlines' bankruptcy, Mercor bid **$7.5M**, Google **$10M** and Micro1 **$12.5M** for internal data. A Bloomberg Law commentator called it the first bankruptcy sale he had seen of "information for information's sake" ([Fortune](https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/); [Bloomberg Law](https://news.bloomberglaw.com/esg/spirit-data-sale-to-google-shows-gaps-in-employee-protections)). **Shut-down and acquired SaaS and AI startups** are the volume segment. SimpleClosure processed about **100 deals in a year at $10K–$100K each** and says its AI buyers grew ninefold over 2025 ([Forbes](https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/); [SimpleClosure Asset Hub](https://simpleclosure.com/product/assethub/)). **Premium video, sports and film libraries** pay recurring revenue: Troveo has paid out more than **$20M** from an 8M-hour library ([Techstrong.ai](https://techstrong.ai/features/troveo-expands-types-of-licensed-content-available-for-training-ai-models/)). **Health data holders** have high value and heavy compliance ([STAT](https://www.statnews.com/2025/01/16/health-ai-electronic-health-records-hipaa-deidentified-data-market/)). **Mid-market professional-services firms** are the most speculative: one vendor claims a 60-person accounting firm was paid $350K, but excludes firms whose records are mostly client or patient files ([Pewter](https://pewterdata.com/)). Publishers are largely served already by direct deals and by Microsoft's and ProRata's marketplaces.

Seller leads are found through **trigger events**, not cold firmographic lists. The table below maps each trigger to the public source an agent can monitor. The mapping is a synthesis; no source quantifies which trigger best predicts a closed sale.

| Trigger | Where agents look | Who decides on the seller side |
|---|---|---|
| Chapter 7/11 filing; §363 sale motions; "books and records" asset sales | PACER/CourtListener (RECAP), claims-agent sites (Kroll, Stretto, Epiq, Omni) | Debtor-in-possession or trustee, their investment banker and counsel, with court approval |
| Startup shutdown or dissolution | "We're shutting down" posts, Delaware dissolution filings, wind-down providers (SimpleClosure, Sunset) as channel partners | Founder/CEO, often with a wind-down service |
| Acquisition or acqui-hire that orphans a product | Crunchbase/PitchBook M&A feeds, TechCrunch, product sunset notices | Acquirer's corp-dev or GC |
| Distress | layoffs.fyi, state WARN notices, no funding for 24+ months, archived GitHub orgs | CEO/board |
| PE ownership of data-rich firms (BPOs, call centers, stock libraries) | PE portfolio pages; SEC filings mentioning "AI licensing" | Operating partner, CEO, CDO |
| Peer deals in a vertical | Deal trackers ([LLM Pulse](https://llmpulse.ai/blog/ai-content-licensing-deals/), [Everything-PR](https://everything-pr.com/ai-licensing-tracker)) | CEO/BD of the runners-up |

Speed is decisive because data factories already work these triggers: Mercor moved **within 8 days** on Warmly ([AI Weekly](https://aiweekly.co/alerts/mercor-chases-shuttered-startups-slack-and-jira-archives)). In bankruptcies the real gatekeepers are the trustee's professionals, not the company. Seller objections follow predictable lines, and each maps to a platform feature:

| Objection | Platform answer |
|---|---|
| Employee and customer privacy | Scrubbing by a third party, as in Spirit |
| Confidentiality and trade-secret leakage | Field-of-use limits and anonymous-buyer terms. Morgan Lewis calls this "one of the most significant concerns," because a model keeps what it learned indefinitely ([Morgan Lewis](https://www.morganlewis.com/blogs/sourcingatmorganlewis/2026/06/key-considerations-when-allowing-a-vendor-to-train-its-ai-models-on-customer-data)) |
| Privileged material | Pre-sale review ([Spencer Fane](https://www.spencerfane.com/insight/the-new-distressed-asset-navigating-the-unique-complexities-of-ai-company-bankruptcies/)) |
| Reputational backlash | Anonymous or undisclosed buyer terms |
| Leaving money on the table | A competitive process. Spirit's price rose 67%, from $7.5M to $12.5M, under competition |

The flight attendants' union objection in Spirit shows that **employees are a stakeholder even when they do not own the data** ([Bloomberg Law](https://news.bloomberglaw.com/esg/spirit-data-sale-to-google-shows-gaps-in-employee-protections)).

## Data factories, not marketplaces, are the competitive threat

The landscape splits into four groups:

1. **Rights brokers and marketplaces.** Protege (about $65M raised; health and media; acquired Calliope) ([SiliconANGLE](https://siliconangle.com/2026/01/08/protege-raises-30m-grow-governed-marketplace-ai-training-data/)), Troveo, Wirestock (about $40M run-rate) ([TechCrunch](https://techcrunch.com/2026/05/14/wirestock-raises-23m-to-supply-multi-modal-data-to-ai-labs/)), Created by Humans, Datarade, and Human Native, now owned by Cloudflare ([SiliconANGLE](https://siliconangle.com/2026/01/15/cloudflare-buys-human-native-strengthen-licensed-data-access-ai-developers/)).
2. **Publisher pay-per-crawl layers.** TollBit, ProRata, Cloudflare and Microsoft.
3. **Expert-labor data factories that now also buy archives.** Mercor (about $2B annualized gross revenue) ([ValueAddVC](https://valueaddvc.com/blog/how-does-mercor-make-money-2b-arr-20b-valuation-and-the-expert-data-marketplace-explained)), Micro1, Turing, Surge and Handshake AI.
4. **Small enterprise-records intermediaries.** Pewter, License My Data and Data Licensing Advisors.

The third group is the real threat. These firms already have lab relationships and cash, and they are bidding directly on distressed data. One tracker counts only 15 active AI-data marketplace companies with $178M of disclosed funding ([Extruct](https://www.extruct.ai/data-room/ai-training-data-marketplaces/)). That is a thin field next to the factories' revenue.

The **open lane** is distressed and orphaned enterprise data beyond startup wind-downs, plus mid-market operating-company records. SimpleClosure covers only its own wind-down clients. Nobody visibly dominates sourcing from bankruptcy dockets or PE portfolios. A broker's value differs by side. To sellers, it runs a **competitive process across several labs and factories**, which no single factory will do. To buyers, it delivers **pre-cleared, scrubbed, documented packages**. The long-tail web-publisher channel is not worth contesting after Cloudflare's acquisition of Human Native.

## Prices anchor on comparables, cost-to-recreate and competitive tension

No public price list exists, but enough benchmarks have been reported to anchor a quoting engine.

| Category | Reported benchmark | Source |
|---|---|---|
| Startup workplace archive (Slack/Jira/email/Drive) | $10K–$100K per company; "hundreds of thousands" for a 13-year archive | [Forbes](https://www.forbes.com/sites/annatong/2026/04/16/ais-new-training-data-your-old-work-slacks-and-emails/) |
| Large-enterprise archive (bankruptcy) | $7.5M–$12.5M bids (Spirit) | [Fortune](https://fortune.com/2026/09/14/micro1-tries-to-beat-googles-bid-to-buy-bankrupt-spirit-airlines-data-for-12-5-million-highlighting-value-of-data-to-ai-companies/) |
| Code repository | ~$5K baseline, graded up or down | [Troveo](https://www.troveo.ai/resources/sell-code-to-ai-companies) |
| RL task | $200–$2,000 typical; up to $20K for complex SWE work | [Epoch AI](https://epoch.ai/gradient-updates/state-of-rl-envs) |
| Images | $0.02–$0.04 (Freepik bulk) to $1–$2 (curated) | [The Decoder](https://the-decoder.com/tech-giants-are-on-a-billion-dollar-shopping-spree-for-ai-training-data/); [OODA Loop/Reuters](https://www.oodaloop.com/briefs/2024/04/05/inside-big-techs-underground-race-to-buy-ai-training-data) |
| Video | $1–$2/min standard, up to $4 for 4K/drone; $6.25/min curated HD; $100–$300/hr long-form | [The Decoder](https://the-decoder.com/openai-and-google-are-buying-youtubers-unpublished-videos-for-up-to-4-per-minute/); [Italy Meets Hollywood](https://italymeetshollywood.com/2024/08/content-licensing-for-training-ai-how-licensing-deals-look/) |
| Speech audio | $5–$25/hr off-the-shelf; $50–$300/hr custom | [AIxBlock](https://aixblock.io/blogs/off-the-shelf-call-center-audio-vs-custom) |
| Books | $5,000/title for 3 years, non-exclusive (HarperCollins) | [Authors Guild](https://authorsguild.org/news/harpercollins-ai-licensing-deal/) |
| Expert labor (cost-to-create) | $30–$220/hr | [Sacra](https://sacra.com/research/linkedin-for-data-labelers/) |
| Exclusive domain license | $200K–$5M/yr (low reliability) | [Beyond Elevation](https://beyondelevation.com/insights/how-to-license-data-to-ai-companies) |

The price drivers recur across modalities: technical quality, rarity, **novelty** (unpublished, not already scraped), annotation depth, volume, task complexity, licensing scope and term, and exclusivity ([AI News](https://www.artificialintelligence-news.com/news/ai-giants-pay-thousands-for-creators-unused-footage-to-train-models/); [CXO Digital Pulse/Epoch](https://www.cxodigitalpulse.com/?p=42733)). Exclusivity is the only multiplier with even a weak published number, a claimed **4–5x for exclusive RL environments** ([FourWeekMBA](https://fourweekmba.com/rl-environment-pricing-the-cost-architecture/)). The other multipliers must be calibrated from the broker's own closed deals. Provenance also carries economic weight. Anthropic's ~$3,000 per pirated work settlement turned on *how data was acquired*, so documented lawful acquisition is worth a premium over scraped equivalents ([WHRO/NPR](https://www.whro.org/2025-09-05/anthropic-to-pay-authors-1-5b-to-settle-lawsuit-over-pirated-chatbot-training-material)). Academic valuation methods such as Shapley-style pricing exist ([arXiv 2502.00198](https://arxiv.org/abs/2502.00198v2)), but there is no evidence labs use them in negotiations.

Published take rates set the broker's own economics:

| Intermediary | Take rate or model | Source |
|---|---|---|
| Troveo | 40% (60% to the creator) | [WSJ podcast summary](https://pod.wave.co/podcast/wsj-tech-news-briefing/the-new-ai-data-trade-part-2-lets-make-a-deal-75aa2a4e) |
| Bria (News/Media Alliance deal) | 50/50 | [wpfolio](https://wpfolio.beehiiv.com/p/publishers-split-revenue-50-50-with-ai-creators-get-zero) |
| HarperCollins, as publisher intermediary | 50% | [Authors Guild](https://authorsguild.org/news/harpercollins-ai-licensing-deal/) |
| Datarade | ~30% | [ZoomInfo Pipeline](https://pipeline.zoominfo.com/sales/datarade-pricing) |
| Wirestock | 15–30% | [Wirestock](https://wirestock.io/gen-ai-resources/earn-money-ai-training-datasets-creators) |
| Mercor (adjacent labor market) | Net revenue about 30–40% of gross | [ValueAddVC](https://valueaddvc.com/blog/how-does-mercor-make-money-2b-arr-20b-valuation-and-the-expert-data-marketplace-explained) |

The 40–50% splits apply to aggregated creator supply. A single enterprise selling one valuable archive will resist that, so **20–30% commission** is the defensible band for enterprise mandates. Structures in the market vary by seller. **Flat buyouts** suit wind-downs, because the entity is about to dissolve. **Annual access fees with refresh** suit going concerns, mirroring the Reddit and News Corp deals. **Quarterly contracts** are the norm for RL data ([Epoch FAQ](https://epochai.substack.com/p/an-faq-on-reinforcement-learning)).

## Provenance is the product: the legal constraints that shape every deal

### Copyright law rewards lawfully acquired data

US courts have held training on *lawfully acquired* works to be fair use. In *Bartz* and *Kadrey*, both at district level, piracy-based acquisition still produced the record $1.5B settlement, finally approved on 20 July 2026 ([JURIST](https://www.jurist.org/news/2026/07/judge-approves-record-1-5-billion-settlement-involving-anthropic/)). Judge Chhabria wrote that companies "will generally need to pay copyright holders" ([Authors Alliance](https://www.authorsalliance.org/2025/06/26/meta-wins-on-fair-use-for-now-but-court-leaves-door-open-for-market-dilution/)). The first appellate ruling, *Thomson Reuters v. ROSS* (3rd Cir., 29 Sept 2026), **rejected fair use** for non-generative training that built a competing product ([Ballard Spahr](https://www.ballardspahr.com/insights/alerts-and-articles/2026/10/third-circuit-addresses-fair-use-in-ai-training-but-leaves-generative-ai-questions-unresolved)).

Two consequences follow for a broker. First, buyers will demand acquisition-method warranties, no-piracy and no-ToS-breach representations, and deletion mechanics. Second, sellers will want **"no competing product" field-of-use limits**. A functioning licensing market is also evidence plaintiffs use on market harm. That is a structural tailwind for licensed data.

### The FTC limits repurposing of previously collected data

The FTC warned in February 2024 that using data for AI training under a **retroactively changed privacy policy** may be unfair or deceptive ([Sheppard Mullin](https://www.sheppard.com/insights/blogs/ftc-warns-about-changing-terms-of-service-or-privacy-policy-to-train-ai-on-previously-collected-data)). Its algorithmic-disgorgement remedy can force deletion of models trained on tainted data, so the risk flows to the buyer's model. The privacy policy in force *at collection time* must therefore be part of every diligence file.

### Bankruptcy sales carry consent and privacy-policy constraints

Selling personal data in bankruptcy can trigger a consumer privacy ombudsman. In 23andMe, the ombudsman recommended "separate and affirmative" consent before genetic data was sold ([The Record](https://therecord.media/23andme-privacy-ombudsman-recommends-consent-sale)). Non-personal enterprise data sold under §363 is mainly a title and assignability question, and free-and-clear title can actually help the buyer ([Spencer Fane](https://www.spencerfane.com/insight/the-new-distressed-asset-navigating-the-unique-complexities-of-ai-company-bankruptcies/)).

### Data-broker registration laws turn on custody and personal data

California, Oregon, Texas and Vermont regulate businesses that sell or license personal data of people they have no direct relationship with. **No clear B2B exemption was found** ([Hintze Law](https://hintzelaw.com/new-page-3)). California's DROP deletion platform went live on **1 Aug 2026**: brokers must process deletions within 45 days and register annually, with a $200/day fine for failing to register ([Fenwick](https://www.fenwick.com/insights/publications/dont-drop-ball-upcoming-changes-california-delete-act-five-key-steps-companies); [TrustArc](https://trustarc.com/resource/california-delete-act-drop-platform-data-brokers/)). This is the strongest argument for two structural choices. The broker should be a **disclosed agent that never takes title**, and **PII-free should be the default**. If the company resells personal data, it risks becoming a registered data broker itself.

### GDPR and HIPAA require a lawful basis and de-identification

Under GDPR, EDPB Opinion 28/2024 treats training as processing that needs a documented lawful basis, and models are rarely "anonymous" ([CMS](https://cms.law/en/int/legal-updates/edpb-opinion-28-2024-key-takeaways-on-processing-personal-data-in-the-context-of-ai-models)). HIPAA data requires Safe Harbor or Expert Determination de-identification ([AccountableHQ](https://www.accountablehq.com/post/what-is-hipaa-de-identification-definition-safe-harbor-vs-expert-determination-and-compliance-requirements)).

### The EU AI Act creates a metadata deliverable

GPAI providers must publish a training-content summary on the Commission's template. Commission enforcement began **2 Aug 2026** ([Securiti](https://securiti.ai/eu-publishes-template-for-public-summaries-of-ai-training-content/)). Every delivered dataset should therefore ship with a template-ready "summary card" covering modality, volume, period, source category and personal-data status. The card lets the lab fill in its disclosure without naming the seller.

### Outreach has its own rules

US cold B2B email is legal under CAN-SPAM's opt-out regime. The UK needs a documented legitimate interest, and Germany is effectively consent-only ([Hybrid Legal](https://www.hybridlegal.co.uk/blog/using-business-emails-for-b2b-cold-outreach-in-the-uk-what-you-can-and-cant-do); [Ripe Leads](https://ripeleads.eu/resources/gdpr-compliant-cold-email-europe)). LinkedIn litigates against scraping and automation. Its Proxycurl case ended in a permanent injunction ([LinkedIn](https://news.linkedin.com/2025/linkedin-takes-legal-action-to-defend-member-privacy)). Mailbox providers require SPF, DKIM, DMARC, one-click unsubscribe and complaint rates below 0.3% ([Mailgun](https://www.mailgun.com/blog/deliverability/microsoft-sender-requirements/)).

### What a standard license must cover

A standard license has a precise grant: pre-training, fine-tuning, RLHF, eval-only or RAG. It carries title and lawful-collection warranties, and indemnities, which are "the bulk of negotiation." It sets deletion SLAs, and it states whether models already trained may survive termination ([terms.law](https://terms.law/insights/ai-training-data-licensing-usable-agreement.html)).

## The platform design: a two-sided pipeline run by agents, gated by humans

### Two pipelines that meet at the match

The business has two pipelines with opposite shapes, and the platform should model them as such rather than forcing both into one CRM funnel.

**The demand pipeline is account-based and small.** It covers roughly 10–40 frontier labs and neolabs plus about 10–15 data factories, a few hundred relevant people in total. Here agents do deep research and drafting, and founders own every relationship.

**The supply pipeline is signal-driven and large.** It covers hundreds to thousands of candidate sellers a year, discovered through triggers. Agents screen, enrich and draft. Founders approve outreach and run the diligence conversations that matter.

The two pipelines meet at a **Match**: one cleared dataset paired with one or more buyer requirements. Revenue is earned when a match becomes a signed license. Demand also drives supply. When a buyer states a requirement ("multi-year Jira and code history from a fintech company"), the requirement becomes a *reverse RFQ*, and it spawns new supply hypotheses. That loop is the main reason to own both sides.

The recommended commercial model has five parts. The first three are revenue. **(1)** The broker acts as the seller's **disclosed exclusive agent for a mandate period** and earns a **20–30% success commission** on gross license value. Distressed-asset auctions earn the top of the band, and repeat non-exclusive resales the bottom. **(2)** A fixed **preparation fee** for scrubbing and packaging on small deals, charged to the seller or netted from proceeds. **(3)** Optionally, a **buyer-side transaction fee** in the TollBit style, where the seller's take is a selling point. The other two are structural. **(4)** Funds are held in **escrow** until delivery acceptance. **(5)** Buyers evaluate samples in a **clean room or data-escrow environment** rather than taking copies, which also supports deletion verification.

A non-exclusive archive can be licensed to several labs and factories. That makes the broker's catalog a compounding asset, and the main reason its economics beat a one-shot buyout by a single factory.

### The lifecycle: eight stages, each with an owner and a gate

The user-specified lifecycle maps cleanly onto both pipelines. In the table, supply-side and demand-side variants are separated by "/".

| Stage | What exists | Created by | Exit gate (human or deterministic) |
|---|---|---|---|
| **1. Hypothesis** | A falsifiable statement of where value sits. Supply example: "Series B–C SaaS companies acquired in the last 90 days hold orphaned Jira and code histories." Demand example: "Lab X is short on multi-year enterprise workflow data because it is hiring RL environment engineers and has announced an agent product." | Hypothesis Strategist agent, scored by the Critic | Founder approves the hypothesis and sets its budget (accounts, tokens, weeks) |
| **2. Signal** | A dated, sourced observation that instantiates a hypothesis: a docket entry, shutdown post, job post or model card | Signal Sweeper agents (nightly) | Deterministic: source URL, timestamp, entity resolved |
| **3. Lead** | An organization plus target people, scoped to a hypothesis, with a dossier | Account Researcher and Enrichment | Eligibility screen (G1) passed. Contact verified. Confidence above threshold |
| **4. Outreach** | An approved message thread from a founder inbox | Outreach Drafter, then the approval queue | Outreach compliance (G0). Founder approval on every first touch |
| **5. Opportunity** | A qualified conversation. Supply side: seller intake, inventory and rights questionnaire. Demand side: written buyer requirement | Reply Triage, Meeting agent and a founder | Supply: rights and diligence gates G2–G5. Demand: buyer KYC (G6) |
| **6. Quote** | A versioned quote with deterministic line items and terms. One or several buyers per match | Quote Composer | One founder below $50K. Two founders above $50K, or for any exclusivity or non-standard terms |
| **7. Contract** | Agent mandate (seller side) and license agreement (buyer side) drafted from templates | Deal Desk agent; outside counsel | Contract gate G7. Counsel sign-off. Founder signature |
| **8. Delivery** | Manifest, scrubbed package, AI Act summary card, escrow release, deletion obligations scheduled | Delivery agent | Delivery gate G8. Buyer acceptance. Post-delivery obligations (G9) tracked |

A rejected hypothesis is data, not waste. Every stage records which hypothesis produced it, so the platform can report conversion and revenue **by hypothesis**. The Strategist learns from this metric and reallocates effort.

### The agent roster: fourteen agents, most of them workflows

Anthropic's guidance is the organizing principle. Use deterministic **workflows** for predictable steps and **agents** only for open-ended research. Use orchestrator–worker fan-out for breadth-first research. Multi-agent runs consume about **15x the tokens of a chat**, so they belong on high-value accounts ([Anthropic, multi-agent research](https://www.anthropic.com/engineering/multi-agent-research-system); [Anthropic, building effective agents](https://www.anthropic.com/engineering/building-effective-agents)). Model tiers use October 2026 list prices per million tokens (input/output): **Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 5.5 $0.10/$0.50**, with Batch at 50% off ([Anthropic pricing](https://www.anthropic.com/pricing#api)).

| Agent | Side | Responsibilities | Inputs | Outputs | Tools | Model / mode |
|---|---|---|---|---|---|---|
| **Hypothesis Strategist** | Both | Proposes and refreshes hypotheses about where sellers and buyer needs are. Reallocates effort using conversion-by-hypothesis | Pipeline metrics, won/lost reasons, buyer requirements, deal trackers, sweep summaries | `hypothesis` rows with evidence, expected value and proposed budget | DB read, web search, deal-tracker fetch | Opus 5.5 (high effort), weekly agentic run |
| **Hypothesis Critic** | Both | Scores specificity, evidence quality, legal risk and overlap with existing hypotheses. Rejects vague ones | Draft hypotheses | Score 0–1, critique, pass/fail | DB read | Sonnet 5.5, evaluator–optimizer loop |
| **Supply Signal Sweeper** | Supply | Monitors dockets, dissolutions, shutdown posts, M&A feeds, layoffs and WARN notices, archived GitHub orgs | Active supply hypotheses (as query specs) | `signal` rows (typed, dated, URL), linked to hypotheses | CourtListener/RECAP API, RSS, Crunchbase API, layoffs.fyi, state WARN pages, web fetch | Haiku 5.5 extraction inside a cron workflow. Batch API |
| **Demand Signal Sweeper** | Demand | Monitors lab job posts (data acquisition, RL environments, human data), model and system cards, papers, product launches, funding, deal announcements | Account list of labs and factories | `signal` rows linked to buyer orgs and persons | Careers pages, arXiv, company blogs, web search | Haiku 5.5 extraction, Sonnet 5.5 for summarization. Nightly |
| **Account Researcher** | Both | Builds a cited dossier per lead. Seller side: data holdings, years of operation, tools used, ownership and legal state, decision makers. Buyer side: data gaps, team map, prior deals, procurement path | Lead and its signals | Dossier document, proposed target persons, risk flags | Web search and fetch, DB, Apollo MCP | Opus 5.5 lead with capped Sonnet/Haiku workers (max ~5 subagents and a tool-call budget). Citation-verification pass |
| **Enrichment & Entity Resolver** | Both | Waterfall enrichment, email verification, de-duplication, parent/subsidiary mapping | Person and org candidates | Canonical `organization`, `person`, `contact_point` rows with field-level provenance | Public sources, then Apollo, then PDL, then email finder, then verifier. Trigram match | Deterministic workflow. Haiku 5.5 adjudicates ambiguous merges. Humans handle the merge queue |
| **Eligibility Screener** | Supply | Applies G1: excludes sellers whose data is mostly client or patient files, flags bankruptcy, health, EU or minors' data, estimates deal size | Dossier | Eligible / needs review / excluded, with reasons | Rules engine, DB | Deterministic rules plus Sonnet 5.5 for narrative cases |
| **Outreach Drafter** | Both | Drafts first-touch and follow-up emails and LinkedIn notes (for manual sending) in the founder's voice. Cites the specific signal | Dossier, hypothesis, founder style examples, past approved edits | Draft in the approval queue, with confidence and risk flags | DB, template library | Sonnet 5.5. Opus 5.5 for tier-1 lab accounts |
| **Outreach Compliance Checker** | Both | Applies G0: recipient jurisdiction, suppression list, unsubscribe and footer, claims check (no confidential or unverified claims), send-volume caps | Draft, recipient record | Pass/block, with fixes | Suppression DB, jurisdiction rules | Deterministic rules plus Haiku 5.5 claims check |
| **Reply Triage** | Both | Classifies inbound replies and routes them. Handles unsubscribes and bounces immediately | Gmail push events | Label (`interested`, `meeting_request`, `referral`, `not_now`, `objection_pricing`, `objection_provenance`, `unsubscribe`, `OOO`, `bounce`), drafted response into the queue, stage change | Gmail API, DB | Haiku 5.5 with structured output |
| **Meeting & Notes Agent** | Both | Turns call transcripts into structured fields: seller inventory, buyer requirements, objections, next steps. Drafts the follow-up | Transcripts (e.g. Granola), calendar events | Updated opportunity, `data_requirement` or `dataset` drafts, follow-up draft | Transcript API, Cal.com webhooks, DB | Sonnet 5.5 |
| **Rights & Diligence Analyst** | Supply | Runs G2–G5: reviews the seller questionnaire, uploaded contracts, privacy policy versions, MSA clauses and bankruptcy status. Orchestrates scans. Writes a diligence memo with an issues list | Seller intake, documents, scan results | `diligence_case` with findings, severity, remediation and recommended terms | Document parsing, PII/PHI detectors, secrets scanner, OSS-license scanner (ScanCode-style), DB | Opus 5.5 for the memo. Scanners are deterministic. **Always ends in human and counsel review** |
| **Matchmaker & Quote Composer** | Both | Matches cleared datasets to buyer requirements. Runs the deterministic pricing engine. Writes the quote narrative and term summary | `dataset`, `data_requirement`, comparables table, deal history | `match` rows, `quote` and `quote_line` drafts in the approval queue | Pricing engine (code), DB | Engine is code. Opus 5.5 writes narrative only and **never sets numbers** |
| **Deal Desk & Delivery Agent** | Both | Assembles the agent mandate and license from clause templates. Tracks redlines. Prepares delivery: manifest, AI Act summary card, sample room access, escrow milestones, deletion and renewal reminders | Accepted quote, diligence memo, term sheet | Contract drafts for counsel, delivery checklist, obligation calendar | Template engine, e-signature, escrow API, storage | Sonnet 5.5 for assembly, Opus 5.5 for redline summaries. Deterministic delivery workflow |
| **Chief of Staff / Pipeline Analyst** | Both | Daily founder briefing: queue backlog, stuck deals, cost per stage, conversion by hypothesis, eval results, anomalies | Event log, metrics | Briefing email or Slack post, dashboard annotations | DB (read-only) | Sonnet 5.5, scheduled daily |

Four design rules keep this roster from collapsing into the failure modes others have hit. First, **no agent sends anything externally**. Sending is a deterministic step that runs only after a recorded approval. This reflects the 2025–26 market lesson: autonomous AI SDRs failed at the "send under the company's name" step, not at research ([Salesmotion](https://salesmotion.io/blog/what-is-an-ai-sdr)). Even SaaStr's successful deployment needed humans reading every message for the first 30 days ([SaaStr](https://www.saastr.com/6-months-of-ai-sdrs-whats-worked)). Second, **no LLM ever produces a price**. Third, every agent run has a **token and tool-call budget and a stopping condition**. This guards against the documented failure of spawning ~50 subagents or searching endlessly for nonexistent sources. Fourth, agents read curated **dossiers**, not raw history, which keeps context and cost bounded.

### Core data model

Postgres is the system of record. A CRM UI such as Attio is optional, because HubSpot gates the custom objects this business needs behind its Enterprise tier ([Softr](https://www.softr.io/blog/attio-vs-hubspot)).

| Entity | Key fields | Notes |
|---|---|---|
| `organization` | id, domains[], legal_name, aliases[], parent_org_id, side[seller\|buyer\|channel\|both], org_type[frontier_lab\|neolab\|big_tech\|data_factory\|startup\|enterprise\|debtor\|wind_down_service\|law_firm], legal_state[operating\|acquired\|winding_down\|ch7\|ch11\|dissolved], jurisdiction, owner_user_id, tier | Parent links (DeepMind→Alphabet) and debtor→trustee relationships |
| `person` / `employment` | name, linkedin_url, function[data_partnerships\|research\|procurement\|legal\|exec\|trustee_professional], seniority; employment(person, org, title, start, end) | Tracks job changes, which are a signal in themselves |
| `contact_point` | person_id, type, value, verification_status, verified_at, source, confidence, jurisdiction | Feeds the suppression and compliance checks |
| `hypothesis` | side, statement, category, rationale, evidence_signal_ids[], confidence, critic_score, status[proposed\|approved\|testing\|validated\|rejected], budget, created_by_run, approved_by | The unit of strategy, with conversion tracked against it |
| `signal` | org_id, person_id, type[docket\|dissolution\|shutdown_post\|m_and_a\|layoff\|job_post\|model_card\|paper\|deal_announcement\|reply\|web_visit], url, observed_at, extracted_json, hypothesis_ids[] | Immutable, always sourced |
| `lead` | org_id, hypothesis_id, side, target_person_ids[], stage[researching\|ready\|in_outreach\|engaged\|qualified\|disqualified], eligibility_status, dossier_id, confidence | Hypothesis-scoped working item |
| `activity` | lead/opportunity, channel, direction, thread_id, body_ref, classification, occurred_at | Email, meeting and call records |
| `opportunity` | side, org_id, lead_id, stage (supply: intake→diligence→packaging→listed; demand: discovery→requirement→sample→eval→negotiation→contract→closed), est_value, close_date, loss_reason | Two stage sets on one table |
| `data_requirement` | buyer_opportunity_id, modality, domain, min_volume, time_span, language, use_type[pretrain\|finetune\|rl_env\|eval\|rag], exclusivity_wanted, budget_signal, deadline | Doubles as the reverse RFQ that spawns supply hypotheses |
| `dataset` | supplier_org_id, modality, domain, components[] (slack/jira/email/code/video…), volume (messages, repos, hours, tokens), time_span, collection_basis, privacy_policy_version_ids[], pii_status[none\|scrubbed\|present], phi_flag, eu_data_flag, exclusivity_available, novelty_score, quality_grade, ai_act_card_json, diligence_case_id, status[draft\|in_diligence\|cleared\|listed\|withdrawn] | The catalog object |
| `dataset_sample` | dataset_id, pct, location (clean room), access_log | 1–5% evaluation sample |
| `diligence_case` | dataset_id, gate_results{G1..G5}, findings[] (severity, remediation), documents[], officer_attestation_ref, counsel_signoff_by, status | One per dataset |
| `match` | dataset_id, data_requirement_id, fit_score, rationale, status | Many-to-many join of supply and demand |
| `quote` / `quote_line` | quote: match/opportunity, version, structure[flat\|annual\|per_unit\|quarterly\|rev_share], currency, terms_json (grant, exclusivity, term, field_of_use, deletion, model_survival, indemnity_cap), valid_until, status, approvals[]; line: dataset_component, unit, qty, base_unit_price, multipliers_json, comp_refs[], floor, ceiling, price, seller_net, commission | Every number traces back to comparables |
| `contract` | type[agent_mandate\|license\|nda\|dpa], parties, template_version, redlines_ref, signed_at, obligations[] | Obligations feed the delivery calendar |
| `delivery` | contract_id, manifest_ref, package_hash, escrow_status, acceptance_at, deletion_due_at, deletion_certificate_ref | Post-delivery obligations |
| `approval_request` | kind[email\|quote\|stage_change\|contract\|outreach_policy], payload, draft_version, model, prompt_hash, confidence, risk_flags[], requested_by_run, required_approvers, decisions[] (user, verdict, reason, edit_diff, at), status | The human-in-the-loop spine |
| `agent_run` | agent, version, input_refs, tool_calls, tokens, cost, outcome, eval_scores | For cost control and evals |
| `event` | actor (user or run), action, entity, before/after, source_urls, at | Append-only audit log, itself a diligence asset |

Every field populated by enrichment carries **field-level provenance** (source, fetched_at, confidence). This lets waterfalls re-run and conflicts resolve. It also lets the company prove to a lab's vendor-diligence team where every fact came from.

### The quotation engine

The quotation engine is deterministic code. It triangulates three anchors, which the pricing research supports: a **comparables floor**, a **cost-to-recreate ceiling**, and a **competitive-tension adjustment**. It never lets the LLM invent a number. The multipliers below are a starting design to be recalibrated after the first 10–20 closed deals. Only the exclusivity range has any published basis, and that one is weak.

**Step 1: Decompose and price at base.** Each dataset is split into priced components, and each component is valued at the midpoint of its comparable band:

| Component | Base price |
|---|---|
| Code repositories | $5,000 per graded repo, with a quality grade of 0.3–2.0x |
| Workplace archive (Slack, Jira, email, Drive) | Positioned inside the $10K–$100K small-company band by years of history and headcount. Large enterprises are priced as a scaled case against the $7.5–12.5M Spirit anchor |
| RL tasks | $200–$2,000 per task by complexity tier, with ~$500 as the floor Mechanize argues below which tasks waste compute ([Mechanize](https://www.mechanize.work/blog/cheap-rl-tasks-will-waste-compute/)) |
| Video | $1–$6.25 per minute by resolution tier |
| Audio | $5–$25 per hour (off-the-shelf) or $50–$300 per hour (custom) |
| Books | ~$5,000 per title-term |

**Step 2: Apply multipliers.** The quote is `base × quality × novelty × annotation × scope/use × term × exclusivity × freshness × volume_discount`. Each multiplier comes from a lookup table with founder-editable values:

| Multiplier | Starting values |
|---|---|
| Novelty | 0.5x if largely public, 1.0x if unpublished, up to 1.5x if unpublished and rare in domain or language |
| Use scope | Eval-only 0.5x, fine-tune/RL 1.0x, pre-train with broad rights 1.2x |
| Exclusivity | Non-exclusive 1.0x, time-boxed field-of-use 1.5–2.5x, full exclusive up to 4x. Kept below the claimed 4–5x RL figure until the broker has its own evidence |
| Freshness | One-time 1.0x. Recurring refresh priced as an annual fee |

**Step 3: Check against bounds.** The engine computes a ceiling from cost-to-recreate: estimated expert hours × $50–$150 per hour plus QA, for data a buyer could commission instead. It warns if the quote sits outside the floor-ceiling band. It also warns if a quote exceeds the comparables band by more than a set ratio.

**Step 4: Choose a structure.** Wind-down and bankruptcy sellers get a flat fee, or a competitive auction with a reserve. Going concerns get an annual access fee. RL-environment-ready data gets quarterly pricing. A non-exclusive dataset generates **one quote per buyer**, and the engine tracks cumulative seller proceeds across buyers.

**Step 5: Compute the split.** For each quote the engine computes seller net, commission at 20–30% depending on mandate type, preparation fee, and escrow milestones.

**Step 6: Write the narrative.** Opus writes the cover narrative and term summary, citing each comparable (`comp_refs`). Every quote is versioned, then approved under the thresholds above.

**Worked example (illustrative only, not a sourced deal).** Take a 60-person SaaS company acquired after six years. It has 30 graded repositories averaging 0.8x, and a six-year Slack/Jira/email archive positioned at $60K within the small-company band. That gives a non-exclusive base of about $120K + $60K = **$180K**. With novelty 1.2x for unpublished data, the quote reaches **$216K per non-exclusive buyer**. Two buyers (a lab and a factory) would gross about $430K. At a 25% commission, the seller nets about $324K and the broker earns about $108K. An exclusive offer at 2.5x ($540K) is generated alongside, so the seller sees the trade-off. That sits plausibly next to Cielo24's "hundreds of thousands" outcome, which is the sanity check.

The engine logs each quote's outcome (won, lost or countered, plus the final price). These records become the broker's private comparables table, its most defensible long-run asset.

### Compliance and diligence gates built into the workflow

The gates are blocking states in the workflow engine, not advisory checklists. A dataset cannot reach `listed`, and a quote cannot reach `sent`, until the relevant gates are green. Every gate writes to the event log.

| Gate | Where it sits | Checks | Who clears |
|---|---|---|---|
| **G0 Outreach compliance** | Before any send | Recipient jurisdiction (US CAN-SPAM; UK corporate vs individual; EU by country, with Germany treated as consent-only), suppression list, unsubscribe and physical address, no LinkedIn automation, SPF/DKIM/DMARC, per-inbox caps, complaint rate below 0.1% target | Automatic block. Founder approval of content |
| **G1 Seller eligibility** | Lead → outreach | Excluded categories (client- or patient-file-dominated firms, minors' data, anything sourced by scraping in breach of ToS), legal state, rough value above minimum deal size | Screener agent. Founder for borderline cases |
| **G2 Rights and chain of title** | Supply opportunity | Seller questionnaire (source, dates, governing ToS and privacy-policy versions), customer MSA data-use clauses, contractor IP assignment, NDAs, third-party content, acquired-company consents. Retroactive-policy-change check, per the FTC | Diligence agent memo. Founder review. Counsel for deals above a threshold |
| **G3 Content scans** | After data access, before packaging | PII/PHI detection and redaction, secrets and credentials, OSS-license scan on code, privileged-communication flags (counsel email domains, "privileged" markers), third-party copyrighted content | Deterministic scanners plus sampling review by a human |
| **G4 Personal-data path** | If any personal data remains | De-identification method documented (HIPAA Expert Determination for health), no-re-identification clause, GDPR lawful-basis record and transfer mechanism for EU data, data-broker-law check, DROP/DSAR propagation plan. **Default is to refuse rather than proceed** | Founder plus counsel |
| **G5 Distressed-asset path** | Debtor sellers | Privacy policy at collection versus the proposed sale, need for court order or ombudsman, union or employee objections, sale through the §363 process | Counsel. Trustee's professionals |
| **G6 Buyer KYC and policy** | Demand opportunity | Buyer identity, intended use matches the grant, conflict check (competing-product use by the buyer against this seller), company policy on foreign-lab buyers and lab neutrality | Founder |
| **G7 Contract terms** | Quote → contract | Permitted uses, no competing product, no re-identification, deletion SLA and model-survival election, indemnity scope and cap (sized with reference to the ~$3,000-per-work Bartz benchmark), audit rights, publicity and AI Act disclosure consent | Counsel. Two founders |
| **G8 Delivery** | Contract → delivery | Manifest and hash, AI Act summary card, scrubbed package re-scanned, escrow conditions, sample access revoked | Delivery workflow. Founder sign-off |
| **G9 Post-delivery** | Ongoing | Deletion certificates on termination, deletion-request propagation, renewal and refresh SLAs, incident response | Automated calendar. Founder escalation |

These gates double as the sales pitch. A lab's data-acquisition team spends its diligence effort on exactly these questions. Handing over a completed diligence file, with a provenance manifest and officer attestation, is the broker's real value-add over a factory that buys "as is."

### Human-in-the-loop controls and multi-founder collaboration

Autonomy is tiered by risk:

| Tier | What it covers | Approval |
|---|---|---|
| **Auto** | Sweeps, enrichment, dossiers, reply classification, internal tasks, unsubscribe and bounce handling | None |
| **Single-founder** | First-touch and follow-up emails, meeting follow-ups, stage changes into `opportunity`, quotes under $50K, hypothesis approvals and budgets | One founder |
| **Two-founder** | Quotes of $50K or more, any exclusivity, any non-standard indemnity or use grant, any dataset with residual personal data, any debtor-seller deal, any buyer that triggers the G6 policy | Two founders |

Every approval request carries the draft, the sources it relies on, the model and prompt hash, a confidence score and risk flags. Confidence combines the model's self-rating, a judge score and deterministic checks (verified email, signal recency, seniority). Drafts below threshold go back to research instead of entering the queue. **Edit diffs and rejection reasons** feed few-shot examples and the eval set. Human edit distance on approved drafts is the online quality metric. The SaaStr rule applies to each new agent: **read every message for 30 days**, then loosen the rules for categories with low edit rates.

For collaboration, every organization has an owner. All founders share one approval inbox with assignment and Slack notifications. Supabase row-level security handles any future restricted roles, such as a contractor diligence analyst. Drafts and quotes carry a version field with optimistic locking so two founders cannot overwrite each other. Long-running work (diligence cases, auctions) gets threaded comments on the entity. The append-only event log records every human and agent action with before/after state. That serves internal accountability, and it also serves as evidence for buyers' and regulators' provenance questions.

### Recommended stack and monthly cost

The platform should **compose** commodity layers and **build** the differentiated ones. The commodity layers are data, sending, scheduling and an optional CRM UI. The differentiated layers are hypotheses, research, diligence, matching and quotes. A volume AI SDR product is the wrong tool for a market of a few hundred buyer contacts, where every mistake costs an account ([Naoma](https://naoma.ai/articles/ai-sdr-dying-2026); [SaaStr](https://www.saastr.com/6-months-of-ai-sdrs-whats-worked)).

| Layer | Recommendation | Est. $/month |
|---|---|---|
| System of record, auth, vectors, realtime | Supabase (Postgres, RLS, pgvector) | ~$25–100 (not verified) |
| Internal app (approval inbox, pipeline boards, dossiers, quote builder) | Next.js on Vercel | ~$20–60 (not verified) |
| Durable workflows (gates, sweeps, sends, retries) | Inngest or Trigger.dev; Temporal if the team prefers it ([AutomationAtlas](https://automationatlas.io/guides/inngest-vs-temporal-2026-comparison/)) | $0–100 |
| LLMs | Claude API: Haiku 5.5 for extraction and classification, Sonnet 5.5 for drafting and workers, Opus 5.5 for hypotheses, dossiers, diligence memos and quote narratives. Batch and prompt caching | ~$200–800 |
| Scheduled agent runtime | Claude Managed Agents for nightly sweeps and hypothesis refresh, $0.08 per active session-hour plus tokens ([TrueFoundry](https://www.truefoundry.com/blog/claude-managed-agents-pricing)), or Inngest cron | ~$3–8 plus tokens |
| Enrichment | Apollo (1–2 seats, $59–149 each) plus PDL pay-as-you-go ($0.01–0.05/record) plus an email verifier ([Knowlee](https://www.knowlee.ai/compare/zoominfo-vs-apollo-io)) | ~$120–450 |
| Sending | Founders' Google Workspace inboxes via the Gmail API; optional Smartlead ($39+) on 1–2 warmed secondary domains ([Valley](https://www.joinvalley.co/blog/instantly-vs-smartlead-vs-lemlist)) | ~$0–150 |
| CRM UI (optional) | Attio, about $34–79 per seat | ~$100–240 |
| Meetings | Cal.com plus a notetaker such as Granola | ~$0–100 |
| **Software total** | | **~$500–2,000** |

Two costs are not in that table and will dominate it: **outside counsel** (template drafting, plus per-deal review above a threshold) and **secure data handling**, meaning clean-room or escrow storage for samples and packages. Neither was priced in the research.

The LLM line holds up on rough arithmetic using list prices. Suppose the supply sweep extracts 3,000 signals a day at ~3K input tokens each on Haiku 5.5. That is about 270M tokens a month, or roughly **$27 of input before Batch discounts**. Deep multi-agent dossiers at an estimated $1–5 each, for 200 accounts a month, stay under $1,000. ZoomInfo's ~$33.5K median annual contract ([Knowlee](https://www.knowlee.ai/compare/zoominfo-vs-apollo-io)) is unjustifiable when the buyer universe is a few hundred people.

### Phased build plan: concierge first, software second

| Phase | Timing | What gets built or done | Exit criterion |
|---|---|---|---|
| **0. Concierge and paper** | Weeks 0–4 | Pick one wedge: shut-down and acquired software companies (workplace archive plus code), the highest-volume category with the clearest comps. Engage counsel. Draft the agent-mandate template, NDA, license term sheet and seller questionnaire. Hand-build a list of ~30 buyer contacts across labs and factories. Run 10–20 seller conversations by hand from a spreadsheet | 3+ buyers have confirmed written demand specs. 2+ sellers signed mandates |
| **1. MVP: lead engine with approvals** | Weeks 2–8 | Supabase schema and event log. Approval inbox. Supply Signal Sweeper on 3 sources (shutdown posts, M&A feeds, CourtListener). Hypothesis Strategist and Critic. Enrichment waterfall and entity resolution. Outreach Drafter, G0 and Gmail send. Reply Triage. Simple pipeline board. Quote engine v0 (comps table plus multipliers in code, single-founder approval) | Founders spend under 1 hour a day on the queue. Edit distance is falling. First broker-sourced deal is in diligence |
| **2. Diligence and demand intelligence** | Months 3–5 | Seller intake portal with document upload. Rights & Diligence Analyst and scanners (G2–G4). Demand Signal Sweeper and buyer dossiers. `data_requirement` and Matchmaker. Clean-room sample access. Quote engine v1 with two-founder thresholds | First dataset cleared through the gates without counsel finding a missed issue. First quote accepted |
| **3. Deal desk and delivery** | Months 6–9 | Contract assembly from clause templates. E-signature and escrow integration. Delivery manifests, AI Act summary card, obligation calendar (G7–G9). Multi-buyer resale of non-exclusive datasets. Auction mode for larger assets | First non-exclusive dataset sold to a second buyer. First escrow release |
| **4. Scale and calibrate** | Months 9–12+ | Recalibrate multipliers from closed deals. Eval suite (golden set of 20–50 past accounts and emails, LLM-judge rubrics). Bankruptcy desk with relationships with claims agents and investment banks. Second wedge (PE-owned BPOs and call centers, or a video library). Graduated autonomy for low-edit categories | Win rate and cycle time measured by hypothesis. Positive contribution margin per deal after legal costs |

The order is deliberate. **Do the first deals by hand.** The quotation engine has no calibration data, the diligence gates have no tested failure cases, and agent outreach into a tiny buyer universe cannot afford a learning curve on live accounts. Software then encodes what the founders learned, rather than guessing at it.

## Disintermediation and privacy blowback are the risks that matter

The **largest strategic risk is disintermediation**. Mercor, Micro1 and Turing are already contacting sellers directly within days of a trigger, and labs like Google bid in bankruptcy court themselves. The broker survives only if sellers believe a competitive process beats the first inbound offer. Spirit's 67% price lift is the proof point. Exclusive mandates, speed, and a diligence package factories don't bother to produce make the belief durable. Closely related is **buyer concentration**. A few labs and factories make up the entire demand side, so one buyer pausing purchases, or bringing sourcing in-house, can halve revenue.

The **largest legal and reputational risk is privacy blowback**. Critics note that scrubbed workplace data can still identify long-tenured employees, and Marc Rotenberg called the privacy issues "quite substantial" ([Fast Company](https://www.fastcompany.com/91528808/shuttered-startups-are-selling-old-slack-chats-and-emails-to-ai-companies)). Unions have already intervened (Spirit). The FTC has investigated Reddit's data sales ([CorpWatch](https://www.corpwatch.org/archive/reddits-sale-user-data-ai-training-draws-ftc-inquiry)). One bad deal involving re-identifiable employee or customer data could end the company. The PII-free default and refuse-by-default G4 gate are existential, not cosmetic.

**Regulatory status** is a live uncertainty. The data-broker statutes need direct legal review because no B2B carve-out was found. Copyright law is also shifting: *Ross* is heading toward a Supreme Court petition, and the NYT MDL is at summary judgment. A ruling against fair use for generative training would *raise* demand for licensed data. It would also raise buyers' indemnity demands on brokers.

**Price discovery is thin.** Most enterprise-data deals are undisclosed, so early quotes risk being badly wrong in either direction. **Operational risk** sits in agent mistakes made to a small, well-connected buyer community, and in **security**: holding other companies' internal archives makes the broker a breach target. That argues for clean-room vendors and minimal custody. Finally, **synthetic data and in-house environment building** could cap what labs pay for raw archives over time. That is a medium-term demand risk no source quantified.

### Open questions for the founders

**Wedge.** Start with startup wind-downs, where volume is high, deals are small and SimpleClosure competes? Or with bankruptcies and mid-market enterprises, where deals are rare and large and the lane is uncontested? The research favors wind-downs for learning and bankruptcies for revenue.

**Custody.** Will the company ever take title to or custody of data? Agent-only keeps it outside data-broker statutes and the chain of title. But it limits packaging margin and makes clean rooms a vendor dependency.

**Buyer policy.** Will the company sell to data factories, which are fast channels but also competitors? Will it sell to non-US labs, given reported buyer concern over Surge and Mercor selling to Chinese labs ([AI Weekly](https://aiweekly.co/alerts/surge-ai-mercor-reportedly-sell-training-data-to-chinese-labs))? Will it offer exclusivity at all, given that multi-buyer resale is where catalog economics compound?

**Fee design.** Pure seller commission, a buyer-side fee, preparation fees, or a hybrid? And what minimum deal size makes counsel review economic?

**Jurisdiction.** US-only at launch, or EU sellers too, with GDPR lawful-basis and transfer work on every dataset?

**Insurance and indemnity.** How much indemnity exposure will the company accept as agent, and is IP/privacy insurance available at a sane price?

**Brand.** Will sellers want the company's name kept off the deal entirely? Many will want anonymous-buyer and anonymous-seller terms, which shapes how the company markets its track record.

**Autonomy.** What edit-rate threshold earns an agent a looser approval rule, and who owns agent evals week to week?

## Conclusion

The research reframes what this company sells. Data is abundant: thousands of companies die or get acquired every year with a decade of real work records on their servers, and the data factories are already scooping them up at five- and six-figure prices. **What is scarce is cleared data plus a competitive process.** Labs pay up for provenance they can defend after *Bartz* and *Ross*. Sellers earn more when multiple buyers compete, as Spirit showed. A broker that combines automated signal capture on the supply side, founder-owned relationships on the demand side, and diligence gates encoded as workflow occupies a position neither a factory nor a marketplace currently holds.

The agent design follows from that. Agents should be cheap and tireless where the work is breadth: sweeping dockets, researching, drafting, scanning. Humans should hold every point where the company makes a promise: a sent email, a price, a warranty. Every approval should leave a trail that becomes part of the product. The decisive early metric is not lead volume. It is **how many datasets clear the gates and sell to more than one buyer**, because that number determines whether the company compounds into a catalog or stays a deal-by-deal agency competing against Mercor's checkbook.
