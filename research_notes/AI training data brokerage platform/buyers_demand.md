# Demand Side: Frontier AI Labs as Buyers of Licensed / Proprietary Data (as of 2026-10-13)

Method note: Research was done on 2026-10-13. WebFetch failed with DNS errors (ENOTFOUND) for most domains: corpusbridge, epoch.ai, techcrunch, llmpulse, substack, thrivecap and others. Most findings below therefore come from search-engine summaries of the cited pages, not from full-page reads. Items marked **[prior knowledge, 2023-24]** are well-documented deals I know from before this session and did not re-verify this session. The URLs given for them are the official announcement pages as I recall them. Treat every dollar figure as press-reported unless it comes from an SEC filing.

## 1. What data categories are labs buying in 2025-2026, and what is shifting?

### Takeaway
Spend has moved from bulk pretraining corpora (news, forums, images, books) toward post-training data:
- expert-written data and preference data
- RL environments and "gyms" that simulate real work, with verifiers
- agent trajectories built from real enterprise operational data (Slack, Jira, email, code)

Bulk content licensing still happens, but each deal is smaller, and the newer deals buy real-time or attribution access rather than one-time training dumps. Video is a hot multimodal category, priced per minute.

### Cited Findings
**RL environments and post-training (2025-2026):**
- The Information (Sept 2025) reported that Anthropic leaders discussed spending more than $1B on RL environments over the following year. Epoch AI notes this is still a fraction of compute costs. — [Epoch AI FAQ on RL environments](https://epoch.ai/gradient-updates/state-of-rl-envs); [TechCrunch, 2025-09-21](https://techcrunch.com/2025/09/21/silicon-valley-bets-big-on-environments-to-train-ai-agents/)
- Data-labeling companies are the main suppliers of RL environments. Surge set up a new internal organization to build them. Mercor, valued at $10B, has worked with OpenAI, Meta and Anthropic. — [TechCrunch](https://techcrunch.com/2025/09/21/silicon-valley-bets-big-on-environments-to-train-ai-agents/)
- OpenAI has reportedly signed multiple seven-figure contracts for RL environments and human data. Smaller labs report contracts of $300K-$500K per quarter. This comes from vendor and analyst sources, so it is indicative only. — [Troveo: How to sell RL environments](https://www.troveo.ai/resources/sell-rl-environments); [datagravity.dev](https://www.datagravity.dev/p/rl-environments-for-agentic-ai-who); [SemiAnalysis on RL environments / data foundries](https://newsletter.semianalysis.com/p/rl-environments-and-rl-for-science)
- Frontier labs are currently the strongest buyers of RL environments. Enterprises form a second, later-arriving buyer group. — [Sapphire Ventures](https://sapphireventures.com/blog/reinforcement-learning-environments-ai-agents/); [Heavybit](https://www.heavybit.com/library/article/how-to-build-a-rl-startup-company)

**Enterprise operational data ("operational exhaust"), 2026:**
- Forbes (2026) reported that AI labs pay hundreds of thousands of dollars for email, Slack and Jira archives from defunct startups. The data feeds "RL gyms" that simulate real work environments.
  - Cielo24's former CEO Shanna Johnson sold every Slack message, email and Jira ticket for "hundreds of thousands of dollars."
  - SimpleClosure, a startup shutdown service, built a tool for these sales and processed about 100 such deals in a year, with payouts of $10K-$100K.
  - AfterQuery builds digital office "worlds" that labs buy.
  - Data resellers strip personally identifiable information (PII).

  Sources: [Fast Company](https://www.fastcompany.com/91528808/shuttered-startups-are-selling-old-slack-chats-and-emails-to-ai-companies); [Forbes on X](https://x.com/Forbes/status/2048511057384100045); [Iain Martin on X](https://x.com/_IainMartin/status/2044758204773486925); [Kim Zetter on X](https://x.com/KimZetter/status/2044890143308263756); [completeaitraining summary ("up to $100,000")](https://completeaitraining.com/news/defunct-startups-sell-employee-slack-messages-and-emails-to/)
- HUD publishes a guide on selling startup assets to model labs, which suggests the channel is becoming standard. — [hud.ai](https://www.hud.ai/resources/how-to-sell-startup-assets-model-labs)

**Expert and human data spend (2025-2026):**
- Labelbox's CEO says each leading lab spends more than $1B a year on data. Forbes estimates the top six Chinese labs spend about $500M a year with US data labelers. These numbers come from aggregators. — [HeroHunt buyer guide](https://www.herohunt.ai/blog/mercor-vs-surge-vs-scale-ai-2026-buyer-guide/); [AI Weekly: Surge/Mercor sell to Chinese labs](https://aiweekly.co/alerts/surge-ai-mercor-reportedly-sell-training-data-to-chinese-labs)
- Mercor booked $614M in H1 2026, mostly from OpenAI and Anthropic. Its reported run rate passed $1B in early 2026, and one Chinese outlet claims ARR above $2B. — [AI Weekly](https://aiweekly.co/alerts/mercor-books-614m-in-h1-2026-leaning-on-openai-anthropic); [36kr](https://eu.36kr.com/en/p/3904682268034947)
- Surge AI reportedly passed $1B in revenue with about 110 employees. It is said to be the preferred vendor for Anthropic and Google's Gemini team, and lists Anthropic, OpenAI, Microsoft and Meta as customers. — [HeroHunt](https://www.herohunt.ai/blog/mercor-vs-surge-vs-scale-ai-2026-buyer-guide/); [Wikipedia: Surge AI](https://en.wikipedia.org/wiki/Surge_AI)
- After Meta bought 49% of Scale AI for about $14B (June 2025), OpenAI and Google DeepMind reportedly cut ties with Scale. Labs moved to vendors not tied to a competing lab. — [TechCrunch on Micro1](https://techcrunch.com/2025/12/04/micro1-a-scale-ai-competitor-touts-crossing-100m-arr); [Teahose](https://www.teahose.com/guides/scale-ai-competitors)

**Video (2024-early 2025; no current 2026 rate data found):**
- OpenAI, Google and Moonvalley pay $1-$4 per minute for unpublished footage. Most footage sells for $1-$2 per minute; 4K, drone and 3D footage gets the higher rates. Brokers include Troveo (which says it has paid creators more than $5M) and Calliope. Labs want raw, unused footage such as B-roll. — [AI News](https://www.artificialintelligence-news.com/news/ai-giants-pay-thousands-for-creators-unused-footage-to-train-models/); [Variety VIP+](https://variety.com/vip/creators-are-licensing-content-to-train-ai-video-models-1236336720/); [SCMP](https://www.scmp.com/lifestyle/entertainment/article/3294646/ai-video-arms-race-and-why-google-and-others-are-paying-youtube-creators-footage)
- Image and video was the largest share (41%) of the AI training dataset market in 2024 (Grand View Research). — [GII / Grand View summary](https://www.giikorea.co.kr/report/grvi1611213-ai-training-dataset-market-size-share-trends.html)

**Shift from training dumps to real-time and attribution access:**
- Deals that include attribution or live access: 2 in 2023, 11 in 2024, 18 in 2025, with 34 projected for 2026. This is a blog analysis, so lower confidence. — [Pebblous](https://blog.pebblous.ai/report/ai-data-licensing-realtime-shift-2026/en/); [sellyourinfo](https://sellyourinfo.com/news/ai-data-licensing-shift-real-time-2026.html)
- Microsoft launched a Publisher Content Marketplace pilot on 2026-02-04. Publishers set their own terms and are paid per use, with usage reporting. Pilot partners include Business Insider, People Inc. and Vox Media. Axios likened it to programmatic advertising. — [Search Engine Roundtable](https://seroundtable.com/microsoft-publisher-content-marketplace-40875.html); [Cloud Wars](https://cloudwars.com/ai/as-ai-becomes-agentic-microsoft-bets-on-premium-content-with-publisher-marketplace/); [Media Copilot](https://mediacopilot.ai/microsoft-publisher-content-marketplace-ai-licensing/)

**Scientific, academic and pharma:**
- Wiley's AI licensing revenue was $23M in FY2024 and $40M in FY2025. A secondary source reports $49M in FY2026 (up 23%) and more than $110M in total. FY2025 included an $18M deal with a "new multinational tech customer." — [Wiley Q3 FY25 press release](https://newsroom.wiley.com/press-releases/press-release-details/2025/Research-Growth-and-AI-Licensing-Drive-Wileys-Third-Quarter-2025-Results/default.aspx); [CFO Dive](https://www.cfodive.com/news/xerox-alum-joins-wiley-publisher-sees-ai-licensing-revenue/751400/); [CASRAI (secondary, FY26)](https://casrai.org/news/scholarly-publisher-ai-licensing-deals-2026)
- Pharma data licensing deals are growing. Incyte is cited at $30M upfront (2025), expanding to $120M upfront (2026). The source is a secondary blog; this is a pharma AI collaboration, not necessarily a frontier-lab deal. — [IntuitionLabs](https://intuitionlabs.ai/articles/pharma-ai-data-licensing-deal-structures)

### Inferences
- The highest-value openings for a startup broker in 2026 are:
  - enterprise operational archives (communications, tickets, code and the commit history behind it, CRM and ERP logs), sold as raw material for RL gyms and agent trajectories
  - domain-expert data where the answer can be checked (finance, legal, medical, science)
  - unpublished video and audio

  Generic web-like text faces price pressure and competition from synthetic data.
- Many labs buy RL environments and expert data through intermediaries (Surge, Mercor, Scale, Micro1, AfterQuery, Turing, HUD). Those firms are also buyers or channel partners for raw proprietary data, not only competitors.

### Gaps
- No primary 2026 price benchmarks for audio, call transcripts, multilingual data or code repositories were found.
- No lab-confirmed breakdown of spend between pretraining and post-training data was found.

## 2. Publicly known data licensing deals with labs

### Takeaway
Disclosed headline deals cluster at $10M-$60M a year for major publishers and platforms. Deal count has risen sharply since 2023 while median deal value has fallen. Anthropic has signed almost no public content deals; it settled a $1.5B book-copyright class action instead. OpenAI, Google, Amazon, Meta, Microsoft and Apple are the most active disclosed buyers.

### Cited Findings
**Aggregate trackers (secondary, lower confidence):**
- Quarterly deal count rose from 3 (Q1 2023) to 39 (Q3 2026). Median annual deal value fell from $9.4M (Q2 2023) to $3.6M. The tracker counts 312 agreements from January 2023 to September 2026, of which only a subset disclose values. — [AI Industry Reviews, Oct 2026](https://ai-industry-reviews.com/research/ai-training-data-licensing-deal-statistics-2026/)
- Deal maps: [LLM Pulse map 2023-2026](https://llmpulse.ai/blog/ai-content-licensing-deals/); [Corpus Bridge deal list](https://corpusbridge.com/learn/ai-data-licensing-deals); [Everything-PR tracker](https://everything-pr.com/ai-licensing-tracker); [Media and the Machine: 7 deal points](https://mediaandthemachine.substack.com/p/the-7-deal-points-of-ai-content-licensing). None of these could be fetched this session.

**Reddit [2024]:**
- Reddit's S-1 (Feb 2024) disclosed data licensing contracts signed in January 2024: $203.0M aggregate contract value, terms of 2-3 years, and at least $66.4M to be recognized as revenue in 2024. — [Reddit S-1, SEC](https://www.sec.gov/Archives/edgar/data/1713445/000162828024006294/reddits-1q423.htm); [TechCrunch](https://techcrunch.com/2024/02/22/reddit-says-its-made-203m-so-far-licensing-its-data/)
- Reuters reported the Google deal at about $60M a year. — [Verdict](https://www.verdict.co.uk/newsletters/reddit-signs-ai-licensing-deal-with-google-ahead-of-stock-market-debut); [Computing](https://www.computing.co.uk/news/4184517/reddit-seeks-usd-5bn-valuation-float)
- The FTC opened an inquiry into Reddit's sale of user data. — [CorpWatch](https://www.corpwatch.org/archive/reddits-sale-user-data-ai-training-draws-ftc-inquiry)
- **[prior knowledge, 2024]** Reddit and OpenAI announced a partnership in May 2024 giving OpenAI access to Reddit's Data API. Terms were not disclosed. — [OpenAI announcement](https://openai.com/index/openai-and-reddit-partnership/)
- An expanded Anthropic-Reddit deal (April 2026) is claimed by a single blog only and is unverified. — [CallSphere](https://callsphere.ai/blog/td30-rp-anthropic-reddit-licensing-update)

**News:**
- **News Corp-OpenAI [2024]:** reported at about $250M over 5 years, including cash and credits. — [OpenAI announcement (prior knowledge)](https://openai.com/index/news-corp-and-openai-sign-landmark-multi-year-global-partnership/); figure as cited in [Maestros AI](https://investors.maestrosai.com/blog/ai-data-licensing-price-tag-2026)
- **Meta-News Corp:** up to $50M a year over 3 years (about $150M total), plus a multi-publisher portfolio of CNN, Fox News, USA Today, People and NBC News (2024-25). This is secondary tracker data. — [Everything-PR tracker](https://everything-pr.com/ai-licensing-tracker); [AI Industry Reviews](https://ai-industry-reviews.com/research/ai-training-data-licensing-deal-statistics-2026/)
- **Amazon-New York Times (May 2025):** a multiyear deal and the Times' first AI deal. It covers NYT editorial content, NYT Cooking and The Athletic, for both product use and training of Amazon's own models. The WSJ reported $20-25M a year; terms were not disclosed. — [Axios](https://www.axios.com/2025/06/04/nyt-amazon-ai-licensing-deal); [Digiday](https://digiday.com/media/amazon-and-the-new-york-times-ai-deal-signals-a-new-wave-of-publisher-partnerships/); [TechCrunch](https://techcrunch.com/2025/05/29/the-new-york-times-and-amazon-ink-ai-licensing-deal)
- **AP-OpenAI (July 2023), Axel Springer-OpenAI (Dec 2023):** [prior knowledge, 2023]. Terms undisclosed; Axel Springer was widely reported as "tens of millions of euros" a year. I did not re-verify that figure this session. — [OpenAI-Axel Springer announcement](https://openai.com/index/axel-springer-partnership/)

**Images:**
- Shutterstock licensed to Meta, Google, Amazon, Apple and OpenAI. The OpenAI deal runs six years. Its CFO said deals initially ranged from $25M to $50M per tech buyer, and most were later expanded. AI licensing revenue was $104M in 2023, with about $138M expected for 2024. Apple's deal was reportedly up to $50M. Getty and Shutterstock have since merged. — [The Grain AI](https://thegrainai.substack.com/p/shutterstock-made-104-million-last); [PhoneArena](https://www.phonearena.com/news/apple-licenses-millions-of-shutterstock-images-to-train-its-ai-models_id157040); [Media and the Machine](https://mediaandthemachine.substack.com/p/5-takeaways-from-the-ai-content-licensing)
- **Photobucket [prior knowledge, 2024]:** Reuters reported talks to sell 13B photos and videos at 5 cents to $1 per photo, and more than $1 per video. — [Reuters, "Inside Big Tech's underground race to buy AI training data," 2024-04-05](https://www.reuters.com/technology/inside-big-techs-underground-race-buy-ai-training-data-2024-04-05/)

**Code and Q&A:**
- **Stack Overflow-OpenAI (May 2024) [prior knowledge]:** OverflowAPI access. Terms were not disclosed; Stack Overflow also has a Google Cloud deal. — [Stack Overflow press](https://stackoverflow.co/company/press/archive/openai-partnership)

**Scholarly publishing:**
- **Taylor & Francis:** expected about $75M in AI licensing revenue in 2024. **[prior knowledge]** This included a reported $10M Microsoft deal. — [Inside Higher Ed, Jan 2025](https://www.insidehighered.com/opinion/views/2025/01/07/ai-deals-underscore-importance-open-access-opinion)
- **Wiley:** see Section 1. — [Wiley](https://newsroom.wiley.com/press-releases/press-release-details/2025/Research-Growth-and-AI-Licensing-Drive-Wileys-Third-Quarter-2025-Results/default.aspx)

**Anthropic:**
- $1.5B settlement with book authors, about $3,000 per book (Sept 2025). This compensates for past use and is not a forward license. — [Axios](https://axios.com/2025/09/05/anthropic-ai-copyright-settlement)
- Adweek reports Anthropic has never signed a digital-publisher licensing deal. A spokesperson said it has unspecified "data partnerships." — [Adweek](https://www.adweek.com/media/anthropic-content-licensing-lawsuits-publishers/)
- A "$100M LetsRun-Anthropic deal" was dated April 1, 2026 and appears to be an April Fools piece. Disregard it. — [LetsRun](https://www.letsrun.com/news/2026/04/letsrun-com-anthropic-agree-to-100m-licensing-deal-gault-rojo-to-depart-at-years-end/)

### Inferences
- Public headline deals are almost all with large media, platform or publishing incumbents. Proprietary enterprise data deals (operational archives, RL data) are mostly undisclosed and smaller, from $10K to low seven figures. That is the realistic band for a startup broker.
- A median annual deal of about $3.6M suggests mid-tier datasets reach seven figures. Long-tail sellers get five to six figures unless they are aggregated.

### Gaps
- No verified 2026 deals between labs and xAI, Mistral, Cohere, Reka, Thinking Machines or SSI were found.
- No confirmed figures for the Reddit-OpenAI, AP or Stack Overflow deals were found.
- HarperCollins-Microsoft book licensing was not verified this session. Prior knowledge: reported at $5,000 per title split author/publisher, from 2024.

## 3. Buyer personas and buying process inside labs

### Takeaway
At OpenAI, buying sits in a "Foundations Data and Operations" / Data Acquisition group. That group runs the web crawler and data partnerships, and staffs program managers, business-operations managers and partner directors drawn from ops, strategy, VC/PE and consulting backgrounds. Research teams (post-training, RL, multimodal) set requirements. Diligence centers on samples, provenance and legal review.

### Cited Findings
- OpenAI's Foundations Data and Operations team is responsible for "acquiring the data OpenAI needs to build frontier models." It runs the web crawler and data partnerships programs.
  - The Program Manager role leads training-data acquisition: evaluating suppliers, negotiating agreements and managing delivery.
  - The role requires 8+ years of experience in operations, strategy, VC, PE or consulting, with salary listed at $162K-$240K.

  — [OpenAI careers](https://openai.com/careers/program-manager-foundations-data-and-operations-san-francisco/); [Thrive portfolio listing](https://jobs.thrivecap.com/companies/openai/jobs/82928178-program-manager-foundations-data-and-operations)
- OpenAI also posted "Business Operations Manager, Data Acquisition" (dated around 2025-11-18) and "Partner Director, Data Partners." — [choppingblock](https://www.choppingblock.ai/jobs/business-operations-manager-at-openai); [Thrive listing, Partner Director](https://jobs.thrivecap.com/companies/openai/jobs/85551375-partner-director-data-partners)
- Labs are hiring "RL environment engineers," suggesting technical buyers who evaluate environments. — [HeroHunt 2026 guide](https://www.herohunt.ai/blog/hiring-rl-environment-engineers-2026-labs-guide/)
- Diligence practice comes from vendor and legal guides, so treat it as industry opinion:
  - share a representative 1-5% sample
  - document licence, source and consent basis for each dataset
  - buyers run legal due diligence before signing
  - deals are non-exclusive by default

  — [beyondelevation](https://beyondelevation.com/insights/how-to-license-data-to-ai-companies); [Papermark](https://www.papermark.com/blog/ai-due-diligence); [fileyield](https://fileyield.com/data-buyers)
- Quarterly contracts of $300K-$500K are reported at smaller labs; OpenAI signs multiple seven-figure RL and human-data contracts. — [Troveo](https://www.troveo.ai/resources/sell-rl-environments)

### Inferences
- Likely entry points:
  - data partnerships and acquisition business-development staff, for commercial terms
  - post-training and RL research leads, for technical fit
  - legal and privacy, as a gate

  At Google, Amazon, Meta, Microsoft and Apple, content and data partnership or BD functions probably play this role; this was not verified.
- Selling through labeling and RL vendors (Surge, Mercor, Scale, Turing, AfterQuery) may cut cycle time compared with going to labs directly.

### Gaps
- No public data on typical deal cycle length, minimum deal size, or preferred delivery formats (e.g., Parquet or JSONL in S3/GCS buckets) at specific labs.
- Titles at Anthropic, Google DeepMind, Meta, xAI and others were not found this session.

## 4. Size of the AI training data market and growth

### Takeaway
Narrow "AI training dataset" market reports put the market at about $1.5-2.5B in 2023-24, growing about 20-22% a year to $7.5-11B by 2030-32. Those figures badly understate actual lab spend on human, expert and RL data, which runs into billions per year (more than $1B per leading lab).

### Cited Findings
- Verified Market Research: $1.56B (2023) growing to $7.56B by 2031, a 21.86% CAGR. — [PR Newswire](https://prnewswire.co.uk/news-releases/ai-training-dataset-market-is-expected-to-generate-a-revenue-of-usd-7564-52-million-by-2031--globally-at-21-86-cagr-verified-market-research-302427553.html)
- Grand View Research: $8.60B by 2030, a 21.9% CAGR over 2025-30; image and video held a 41% share in 2024. — [GII](https://www.giikorea.co.kr/report/grvi1611213-ai-training-dataset-market-size-share-trends.html)
- SkyQuest: $2.1B (2023) growing to $11.08B by 2032, a 20.3% CAGR. — [GII / SkyQuest](https://giikorea.co.kr/report/sky1678095-ai-training-dataset-market-size-share-growth.html)
- Labs spend more than $1B a year each on data (Labelbox CEO). A startup founder estimates the market at $10-15B now, heading toward about $100B. These are projections and opinion. — [HeroHunt](https://www.herohunt.ai/blog/mercor-vs-surge-vs-scale-ai-2026-buyer-guide/); [BigGo Finance](https://finance.biggo.com/news/99fca087-237a-48f3-ab02-30289cb7d364)
- Vendor revenue is a proxy for spend: Mercor $614M in H1 2026, Surge more than $1B, Micro1 more than $100M ARR (Dec 2025). — [AI Weekly](https://aiweekly.co/alerts/mercor-books-614m-in-h1-2026-leaning-on-openai-anthropic); [TechCrunch](https://techcrunch.com/2025/12/04/micro1-a-scale-ai-competitor-touts-crossing-100m-arr)

### Inferences
- The addressable market is better sized from lab budgets and vendor revenues (around $10B+ a year across human data, RL and licensing) than from "dataset market" reports.

### Gaps
- No rigorous market sizing found for raw proprietary-data licensing as distinct from labeling and services.

## 5. What buyers complain about and require

### Takeaway
Buyers want:
- clean legal provenance and consent
- PII removal
- non-exclusive rights by default, with exclusivity priced as a premium
- representative samples for quality evaluation
- data not already in their corpora
- for RL environments, verifiers that can't be gamed

### Cited Findings
- RL buyers ask first how a verifier was tested, because a scorer that can be gamed teaches agents to cheat. — [Troveo](https://www.troveo.ai/resources/sell-rl-environments)
- Provenance is traced back to the origin of each dataset. Sellers who disclose gaps up front and price the remediation negotiate better. The EU AI Act's Article 10 (data governance) adds pressure for documented provenance chains; this is a vendor interpretation. — [Papermark](https://www.papermark.com/blog/ai-due-diligence); [beyondelevation](https://beyondelevation.com/insights/how-to-license-data-to-ai-companies)
- Exclusivity terms define scope, duration and markets and drive price. Labs assume non-exclusive unless they pay for exclusivity. — [beyondelevation](https://beyondelevation.com/insights/how-to-license-data-to-ai-companies)
- PII and privacy risk: anonymized workplace data can still identify long-tenured employees. Marc Rotenberg (Center for AI and Digital Policy) called the privacy issues "quite substantial." — [Fast Company](https://www.fastcompany.com/91528808/shuttered-startups-are-selling-old-slack-chats-and-emails-to-ai-companies)
- Regulatory scrutiny exists: the FTC inquiry into Reddit's data sales. — [CorpWatch](https://www.corpwatch.org/archive/reddits-sale-user-data-ai-training-draws-ftc-inquiry)
- Buyers worry about vendor neutrality: labs left Scale after Meta's stake, and there are reports of Surge and Mercor selling to Chinese labs. — [TechCrunch](https://techcrunch.com/2025/12/04/micro1-a-scale-ai-competitor-touts-crossing-100m-arr); [AI Weekly](https://aiweekly.co/alerts/surge-ai-mercor-reportedly-sell-training-data-to-chinese-labs)

### Inferences
- A broker that offers provenance documentation, PII scrubbing, overlap or dedup reports against Common Crawl and public corpora, and lab-neutral or exclusive-option terms would address the main buyer objections.

### Gaps
- No primary source was found on dedup or overlap testing against labs' existing corpora as a buyer requirement, though it is very likely in practice.
- No first-hand interviews with lab data-acquisition leads were retrieved.
