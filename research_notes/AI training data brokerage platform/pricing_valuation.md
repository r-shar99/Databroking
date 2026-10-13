# Pricing and Valuation of AI Training Datasets (for a data-broker quoting model)

Research date: 2026-10-13. Prioritizes 2024-2026; older items marked. Many URLs are secondary aggregators because primary paywalled sources (Bloomberg, Reuters, The Information) could not be fetched directly; this is flagged per item. Several fetches (gwern Reuters mirror, epoch.ai, troveo.ai, substack) failed with DNS errors, so figures from those come from search-result summaries, not full-text reads.

## Q1. Published / reported per-unit price benchmarks

### Takeaway
No public price list exists. Reported benchmarks cluster as follows. Images cost $0.02-$2 each. Video costs $1-$6.25 per minute, or $100-$300 per hour for long-form. Audio costs $5-$25 per hour off-the-shelf and $50-$300 per hour for custom collection. Books run about $3,000-$5,000 per title. Code is about $5,000 per repo, with archives at $10k-$100k. RL tasks run $200-$2,000 each, and occasionally up to $20k. Platform-scale text deals cost $10M-$70M per year. Expert human labor costs $30-$220 per hour. I found no credible published per-token price for licensed text corpora.

### Cited Findings

**Images**
- Photobucket's CEO said he was discussing $0.05-$1 per photo, with videos priced above $1, while in talks to license 13B photos and videos. He said one buyer wanted more than 1B videos. Reported by Reuters on 2024-04-05 ("Inside Big Tech's underground race to buy AI training data"). These are discussed rates, not a confirmed closed deal. — [OODA Loop summary of Reuters](https://www.oodaloop.com/briefs/2024/04/05/inside-big-techs-underground-race-to-buy-ai-training-data); [Australian Photography](https://australianphotography.com/news/photobucket-in-negotiations-to-licence-13-billion-images-to-ai-companies)
- Freepik licensed most of its 200M-image archive to 2 large tech companies at $0.02-$0.04 per image (Reuters, 2024-04). — [StratNews Global summary of Reuters](https://stratnewsglobal.com/europe/how-big-techs-are-in-a-race-to-buy-ai-training-data/); [The Decoder](https://the-decoder.com/tech-giants-are-on-a-billion-dollar-shopping-spree-for-ai-training-data/)
- Defined.ai quoted $1-$2 per image (Reuters, 2024-04). — [OODA Loop / Reuters](https://www.oodaloop.com/briefs/2024/04/05/inside-big-techs-underground-race-to-buy-ai-training-data)
- Adobe reportedly paid $0.06-$0.16 per photo (Bloomberg, 2024). — [Red Sky Alliance summary](https://redskyalliance.org/xindustry/adobe-is-buying-videos-to-train-its-new-ai-tool)
- Futurezone reported prices up to about $7 for certain niche images, such as nude images. — [futurezone.at](https://futurezone.at/b2b/7-dollar-fuer-nacktbild-kosten-trainingsdaten-ki-chatgpt-sora-openai-shutterstock-axel-springer/402849706)

**Video**
- Bloomberg (2024) reported that OpenAI, Google and others pay creators $1-$4 per minute for unpublished footage. Ordinary unused YouTube/TikTok-style footage gets $1-$2 per minute. 4K, drone and 3D animation footage gets more. — [The Decoder](https://the-decoder.com/openai-and-google-are-buying-youtubers-unpublished-videos-for-up-to-4-per-minute/); [AI News](https://www.artificialintelligence-news.com/news/ai-giants-pay-thousands-for-creators-unused-footage-to-train-models/)
- Adobe paid an average of $2.62 per minute of video, with about $3 per minute in some batches (Bloomberg, April 2024). — [Red Sky Alliance](https://redskyalliance.org/xindustry/adobe-is-buying-videos-to-train-its-new-ai-tool)
- Calliope Networks reportedly charges $6.25 per minute for HD, with surcharges for 4K and 3D. This likely covers curated film/TV catalog footage. — [Italy Meets Hollywood, Aug 2024](https://italymeetshollywood.com/2024/08/content-licensing-for-training-ai-how-licensing-deals-look/)
- Defined.ai quoted $2-$4 per short-form video and $100-$300 per hour of long-form film (Reuters, 2024-04). — [OODA Loop / Reuters](https://www.oodaloop.com/briefs/2024/04/05/inside-big-techs-underground-race-to-buy-ai-training-data)
- RHEI (formerly BBTV) uses per-hour pricing and claims creators can earn up to $100,000 per 1,000 hours, which works out to about $100 per hour paid to the creator. This is a company claim. — [Tubefilter, 2025-04-30](https://www.tubefilter.com/2025/04/30/rhei-data-pro-creator-payouts/amp/); [BetaKit](https://betakit.com/bbtv-rebrands-to-rhei-launches-new-ai-training-licensing-platform-for-creator-content/)
- Troveo's CEO says the company has paid creators more than $5M. — [AI News](https://www.artificialintelligence-news.com/news/ai-giants-pay-thousands-for-creators-unused-footage-to-train-models/)

**Audio / speech**
- Off-the-shelf call-center audio sells for $5-$25 per audio hour. Custom collection runs $50-$300 per delivered hour, depending on language scarcity and annotation. This comes from a vendor blog. — [AIxBlock](https://aixblock.io/blogs/off-the-shelf-call-center-audio-vs-custom)
- A Datarade listing for an English-accent conversational dataset (1,000 hours) starts at $20 per hour, with a 10% platform discount. — [Datarade listing](https://datarade.ai/data-products/english-accent-speech-dataset-central-america-authentic-l-filemarket)
- Nexdata lists a 35,000-hour multilingual conversational corpus at $5,000 per purchase, which is under $0.15 per hour. This indicates commodity/legacy pricing for non-exclusive bulk data. — [Datarade/Nexdata](https://datarade.ai/data-products/nexdata-multilingual-conversational-speech-data-16khz-mob-nexdata)
- David AI (a conversational speech "data farm" whose Converse dataset has 15k+ hours) raised a $50M Series B in Oct 2025, $80M in total. It competes on research-grade quality and premium pricing rather than cost per hour. No rates are disclosed. Contributors are reportedly paid up to $50 per hour (Babel Audio). — [Sacra](https://sacra.com/c/david-ai); [jwatte blog](https://jwatte.com/blog/blog-babel-audio-get-paid-train-ai-voice/)

**Books / long-form text**
- HarperCollins (Nov 2024) licensed select nonfiction backlist titles for $5,000 per title, split 50/50 between author and publisher ($2,500 each). The term is 3 years and authors must opt in. Output is capped at 200 consecutive words or 5% of the book. Bloomberg reports the buyer was Microsoft. — [Publishers Weekly](https://www.publishersweekly.com/pw/print/20241125/96533-agents-authors-question-harpercollins-ai-deal.html); [Authors Guild](https://authorsguild.org/news/harpercollins-ai-licensing-deal/); [eMarketer](https://www.emarketer.com/content/microsoft-harpercollins-sign-ai-licensing-deal--author-opt-in-still-required)
- The Anthropic Bartz settlement paid $1.5B, about $3,000 per work for roughly 482-500k books. It was announced Sept 2025 and approved July 2026, with about 91% of works claimed. This is a damages benchmark for pirated acquisition, not a license price, but it is a widely cited per-title anchor. — [WIFR/AP, 2026-07-21](https://www.wifr.com/2026/07/21/judge-approves-15b-anthropic-settlement-over-pirated-books-used-train-claude-chatbot/); [WHRO/NPR, 2025-09-05](https://www.whro.org/2025-09-05/anthropic-to-pay-authors-1-5b-to-settle-lawsuit-over-pirated-chatbot-training-material)
- Wiley and Taylor & Francis signed multimillion-dollar AI deals in 2024. Values were undisclosed. An aggregator reports that Wiley had $49M of AI revenue in FY2026, which is unverified against Wiley filings. (From my background knowledge rather than a source fetched here: T&F reported about $10M from Microsoft, and Wiley reported $44M of AI deals in 2024. These are not verified in this session.) — [PW AI licensing primer](https://publishersweekly.com/pw/print/20241125/96590-an-ai-licensing-primer-for-book-publishers.html); [Slashdot/PW Sept 2026](https://tech.slashdot.org/story/26/09/21/0551218/)

**Platform / news text (deal-level, not per unit)**
- Reddit-Google is reported at about $60M per year (2024). Reddit disclosed more than $200M in combined data-licensing contracts (TechCrunch, via tracker). One tracker lists an estimated $70M per year for Reddit-OpenAI, which is uncorroborated. — [Every AI Content Licensing Deal (LLM Pulse)](https://llmpulse.ai/blog/ai-content-licensing-deals/); [everything-pr tracker](https://everything-pr.com/ai-licensing-tracker)
- News Corp-OpenAI is reported at up to $250M over 5 years, about $50M per year (2024). News Corp-Meta is reported at up to $50M per year for 3 years. Trackers disagree on the date. — [LLM Pulse](https://llmpulse.ai/blog/ai-content-licensing-deals/); [Digiday 2025 timeline](https://digiday.com/media/a-timeline-of-the-major-deals-between-publishers-and-ai-tech-companies-in-2025/)
- One tracker estimates the first 34 deals at about $816M per year and $2.92B in total commitments. Another counts 91 deals by end-2025. — [Media and the Machine (Rob Kelly)](https://mediaandthemachine.substack.com/p/5-takeaways-from-the-ai-content-licensing); [Ithaka S+R tracker](https://sr.ithaka.org/our-work/generative-ai-licensing-agreement-tracker/)
- Disclosed deals range from about $10M for a company archive to more than $250M over 5 years for a major publisher catalog. — [Troveo, AI Training Data Cost](https://www.troveo.ai/resources/ai-training-data-cost) (fetch failed; per search summary)

**Code**
- One codebase-buying platform uses a baseline of about $5,000 per repository, adjusted up or down after quality grading. Startup wind-down code and workspace archives sell for about $10k-$100k per deal (SimpleClosure, as reported). Full company archives can reach hundreds of thousands of dollars. Troveo cites a $10M Google bid for a Spirit Airlines operational archive in bankruptcy court, which is unverified. — [Troveo: sell code to AI companies](https://www.troveo.ai/resources/sell-code-to-ai-companies); [Troveo: how much is company data worth](https://www.troveo.ai/resources/how-much-is-company-data-worth)
- Exclusive or limited-exclusive domain data licenses are cited at $200K-$5M per year. This is a general playbook figure, not code-specific, with low reliability. — [Beyond Elevation](https://beyondelevation.com/insights/how-to-license-data-to-ai-companies)

**RL environments / agent tasks**
- An Epoch AI interviewee said per-task prices are mostly $200-$2,000, with $20k per task rare and reserved for complex SWE work. Contracts are often six to seven figures per quarter. One neolab cited $300k-$500k contracts. Size is driven by task count, customization and exclusivity. — [Epoch AI, state of RL envs](https://epoch.ai/gradient-updates/state-of-rl-envs); [Epoch FAQ on RL environments](https://epochai.substack.com/p/an-faq-on-reinforcement-learning); [CXO Digital Pulse summary](https://www.cxodigitalpulse.com/?p=42733)
- SemiAnalysis puts website "UI gym" environments at about $20,000 per website (via secondary). — [FourWeekMBA](https://fourweekmba.com/rl-environment-pricing-the-cost-architecture/)
- Mechanize argues that spending well under about $500 per RL task wastes compute, and that efficient prices may rise to a few thousand dollars per task. This is normative, not observed. — [Mechanize](https://www.mechanize.work/blog/cheap-rl-tasks-will-waste-compute/)
- The Information reported that Anthropic discussed spending more than $1B on RL environments and related infrastructure. — [FourWeekMBA citing The Information](https://fourweekmba.com/understanding-the-rl-environment-market-structure/)
- A 4-5x premium for exclusivity of environments is claimed by a secondary source. It is unverified against Epoch. — [FourWeekMBA](https://fourweekmba.com/rl-environment-pricing-the-cost-architecture/)

**Expert-labeled data (labor-cost basis)**
- Mercor postings: STEM research PhDs earn $30-$60 per hour, biology PhDs $60-$80, physics $60-$75, and a CS expert $140. Third-party reports say $60-$220 per hour with about a $120 per hour average, and Sacra says experts average $85+ per hour. Early RLHF labor cost about $1 per hour, versus $50-$100 per hour now for doctors, lawyers and PhDs. — [Sacra: LinkedIn for data labelers](https://sacra.com/research/linkedin-for-data-labelers/); [Sacra Mercor](https://sacra.com/c/mercor/); [jobRxiv postings](https://jobrxiv.org/job/research-phd-stem)

### Inferences
- The quoting model could use these per-unit price bands as starting points before multipliers:
  - Commodity image $0.02-$0.10; curated or rare image $0.50-$2.
  - Creator video $1-$2 per minute; premium (4K, drone, 3D) $3-$6 per minute.
  - Long-form film $100-$300 per hour (about $1.7-$5 per minute, which is consistent).
  - Commodity speech $5-$25 per hour; custom speech $50-$300 per hour.
  - Book about $3k-$5k per title for a 3-year non-exclusive license.
  - Code repo about $5k baseline.
  - RL task $200-$2k.
  - Expert annotation priced at cost-plus on $50-$150 per hour of expert labor, with typical vendor markup unknown.
- Implied text per-token ranges can be derived but are not reported anywhere. For example, $5,000 for a 100k-word book is about 133k tokens, or roughly $37 per 1k tokens ($37,000 per 1M tokens). Reddit's $60M per year over an unknown corpus size cannot be converted. Book prices imply that curated long-form text is priced per title, not per token.
- Large platform deals are priced as annual access fees for the whole corpus plus a firehose, not per unit.

### Gaps
- No credible published per-token or per-million-token price for licensed text corpora was found. Defined.ai and Datarade text listings were not surfaced.
- I could not fetch the original Reuters, Bloomberg or The Information articles. Figures come via aggregators.
- No Shutterstock AI licensing revenue figure was surfaced in this session. Prior reporting of about $104M in 2023 is from memory and unverified here.
- No per-line-of-code price, and no reported per-trajectory price for agent trajectories distinct from RL tasks.
- No vendor markup data for Scale, Surge or Mercor on customer price versus worker pay.

## Q2. Factors that drive price

### Takeaway
The recurring price drivers are these: resolution/technical quality, rarity/scarcity (language, domain, niche content), exclusivity, unpublished/novel status (not already scraped), metadata/annotation depth, volume, task complexity (for RL), and licensing scope and term.

### Cited Findings
- Resolution and format drive video price: 4K, drone and 3D footage command more than standard footage at $1-$2 per minute. Calliope adds fees for 4K and 3D. — [AI News](https://www.artificialintelligence-news.com/news/ai-giants-pay-thousands-for-creators-unused-footage-to-train-models/); [Italy Meets Hollywood](https://italymeetshollywood.com/2024/08/content-licensing-for-training-ai-how-licensing-deals-look/)
- Novelty matters: labs are specifically buying *unpublished* creator footage, meaning content not already on the open web. — [The Decoder](https://the-decoder.com/openai-and-google-are-buying-youtubers-unpublished-videos-for-up-to-4-per-minute/)
- Prices vary widely by buyer and by the type of imagery sought (Photobucket, Reuters 2024). — [OODA Loop / Reuters](https://www.oodaloop.com/briefs/2024/04/05/inside-big-techs-underground-race-to-buy-ai-training-data)
- For audio, price varies with language, domain, license tier, language scarcity and annotation complexity. Total hours heavily influence cost, with volume discounts. — [AIxBlock](https://aixblock.io/blogs/off-the-shelf-call-center-audio-vs-custom); [Macgence](https://macgence.com/?p=106122)
- For RL environments, price is driven by task count, customization and exclusivity, and task complexity (complex SWE tasks reach $20k). — [CXO Digital Pulse / Epoch](https://www.cxodigitalpulse.com/?p=42733)
- Quality grading moves code repo prices up or down from the $5k baseline. Buyers value a single repo differently from a multi-year org history. — [Troveo code](https://www.troveo.ai/resources/sell-code-to-ai-companies)
- Licensing scope: the HarperCollins license limits model output (200 words or 5%) and is time-limited to 3 years. — [Publishers Weekly](https://www.publishersweekly.com/pw/print/20241125/96533-agents-authors-question-harpercollins-ai-deal.html)
- Freshness: trackers project growth in "live-access" and attribution deals, such as news and Reddit firehoses, versus one-time archive dumps. — [LLM Pulse](https://llmpulse.ai/blog/ai-content-licensing-deals/)
- Labor quality: pricing for expert work has shifted from about $1 per hour offshore labeling to $50-$100+ per hour for credentialed experts. — [Sacra](https://sacra.com/research/linkedin-for-data-labelers/)
- Provenance and legal risk: the $1.5B Anthropic settlement turned on *pirated acquisition* rather than training itself. Clean, documented provenance therefore has economic value as litigation-risk avoidance. — [WHRO/NPR](https://www.whro.org/2025-09-05/anthropic-to-pay-authors-1-5b-to-settle-lawsuit-over-pirated-chatbot-training-material)

### Inferences
- Suggested multiplier structure for the quoting model: base unit price × quality tier × rarity/novelty (overlap with Common Crawl) × annotation depth × exclusivity × term/scope × freshness (one-time vs recurring) × volume discount.
- Only the exclusivity multiplier has any (weak) reported number, a 4-5x claim for RL environments. The others need to be calibrated from the broker's own closed deals.
- PII/regulated data (health) likely carries both a cost (de-identification, as Protege sells it as a service) and a premium. No numbers were found.

### Gaps
- No quantified multipliers for exclusivity, freshness or PII were found in reliable sources.
- No published measure of "novelty vs Common Crawl" used in price-setting.

## Q3. Valuation methodologies (literature and practice)

### Takeaway
Academic work centers on Shapley-style and marginal-contribution valuation, now made tractable for LLMs. Practice relies on comparables (per-unit market rates), cost-to-create (labor hours × rate), compute-efficiency arguments (for RL), and annual-access pricing benchmarked against peers. Formal Shapley pricing is not documented in real deals.

### Cited Findings
- Fairshare Data Pricing (Zhang et al., arXiv 2502.00198, NeurIPS 2025) proposes a mechanism where buyers decide purchases using data valuation and sellers set prices to maximize profit. It argues that prices tied to valuation and buyer budgets are optimal for both sides. — [arXiv 2502.00198](https://arxiv.org/abs/2502.00198v2)
- Tamine, Sakhi and Heymann (Criteo, arXiv 2512.15765, Dec 2025) make Shapley tractable for LLM fine-tuning. They fine-tune one DPO model per source and combine them by model arithmetic, which reduces cost from exponential to linear in the number of sources. — [arXiv 2512.15765](https://arxiv.org/abs/2512.15765v1)
- Unlearning Shapley (arXiv 2505.16147, 2025) values data by unlearning it from a pretrained model and measuring the performance shift. It is positioned for data markets with partial valuation. — [arXiv 2505.16147](https://www.arxiv.org/abs/2505.16147?context=cs)
- Fast-DataShapley (arXiv 2506.05281, 2025) frames data value and copyright attribution as linked concerns. — [arXiv 2506.05281](https://arxiv.org/abs/2506.05281v1)
- Compute-efficiency valuation: Mechanize prices RL tasks against the compute spent training on them. If a task is too cheap relative to compute, the compute is wasted, which implies a floor of about $500 per task. — [Mechanize](https://www.mechanize.work/blog/cheap-rl-tasks-will-waste-compute/)
- Cost-to-create: expert data is priced from labor rates ($30-$220 per hour), and custom audio from collection cost ($50-$300 per hour). — [Sacra](https://sacra.com/research/linkedin-for-data-labelers/); [AIxBlock](https://aixblock.io/blogs/off-the-shelf-call-center-audio-vs-custom)
- Comparables: brokers such as Troveo publish market-rate tables and grade-adjusted baselines (for example, $5k per repo). — [Troveo](https://www.troveo.ai/resources/how-much-is-company-data-worth)
- Litigation-cost anchor: statutory damages minimum of $750 per work, and a settlement of about $3,000 per work. — [WHRO/NPR](https://www.whro.org/2025-09-05/anthropic-to-pay-authors-1-5b-to-settle-lawsuit-over-pirated-chatbot-training-material)
- Protege (raised $25M Series A Aug 2025 and $30M A-1 led by a16z Jan 2026, $65M total) runs a two-sided marketplace. It monetizes value-added services (curation, de-identification, benchmarks, analytics) on top of licensing. Its catalog reportedly includes 3B+ clinical notes. No price schedule is public. — [BusinessWire, 2026-01-08](https://businesswire.com/news/home/20260108257753/en/Protege-Raises-%2430-Million-Led-by-a16z-to-Unlock-Access-to-Data-for-AI-Development); [Pulse 2.0 interview](https://pulse2.com/protege-profile-bobby-samuels-interview/)
- Datarade listings show list prices per hour or per dataset, with platform discounts (10%), and invite negotiation. — [Datarade listing](https://datarade.ai/data-products/english-accent-speech-dataset-central-america-authentic-l-filemarket)

### Inferences
- A practical quoting model should triangulate between three approaches:
  - (a) a comparables floor from the per-unit bands in Q1;
  - (b) cost-to-recreate as a ceiling or anchor for buyers who could commission it themselves (expert hours × rate, plus QA);
  - (c) a value-based adjustment when the buyer shares eval uplift, where Shapley or marginal-uplift methods could formalize a premium.
- Litigation-avoidance value (clean provenance) is a credible argument for pricing above scraped-equivalent.

### Gaps
- No evidence that frontier labs use formal Shapley values in commercial negotiations.
- Defined.ai and AWS Data Exchange pricing frameworks were not surfaced in this session.

## Q4. Deal structures and broker commissions

### Takeaway
Observed structures include flat archive fees, per-unit fees (per minute, image, title or task), multi-year annual access fees (often for recurring firehose data), quarterly contracts for RL, and revenue share. Broker splits seen run from 40% (Troveo) to 50% (Bria/publisher, HarperCollins publisher/author).

### Cited Findings
- Common structures are flat licenses for a defined dataset and use, per-unit pricing by hour, asset or volume tier, recurring annual licenses, and revenue share. — [Troveo, AI Training Data Cost](https://www.troveo.ai/resources/ai-training-data-cost)
- Multi-year annual access: News Corp-OpenAI (up to $250M over 5 years), Reddit-Google (about $60M per year), News Corp-Meta (up to $50M per year for 3 years). — [LLM Pulse](https://llmpulse.ai/blog/ai-content-licensing-deals/)
- Per-title with term: HarperCollins pays $5k per title for 3 years. — [Authors Guild](https://authorsguild.org/news/harpercollins-ai-licensing-deal/)
- RL environments are sold in quarterly contracts of six to seven figures, from about $300k to more than $1M. — [Epoch FAQ](https://epochai.substack.com/p/an-faq-on-reinforcement-learning)
- Broker commission: a Troveo contract viewed by a WSJ reporter gave 60% to the creator and 40% to Troveo. The CEO says the split varies, and payouts are rev share on gross. — [WSJ Tech News Briefing podcast summary](https://pod.wave.co/podcast/wsj-tech-news-briefing/the-new-ai-data-trade-part-2-lets-make-a-deal-75aa2a4e)
- The News/Media Alliance-Bria deal splits revenue 50/50 between Bria and publishers. — [wpfolio](https://wpfolio.beehiiv.com/p/publishers-split-revenue-50-50-with-ai-creators-get-zero)
- In HarperCollins, the publisher keeps 50% as rights intermediary. The Authors Guild called that too high for a pure training license. — [Authors Guild](https://authorsguild.org/news/harpercollins-ai-licensing-deal/)
- Datarade applies a 10% buyer discount on some listings, suggesting a marketplace fee structure. — [Datarade](https://datarade.ai/data-products/english-accent-speech-dataset-central-america-authentic-l-filemarket)
- Exclusive data licenses: $200K-$5M per year (playbook figure, low reliability). — [Beyond Elevation](https://beyondelevation.com/insights/how-to-license-data-to-ai-companies)

### Inferences
- Broker take rates of about 30-50% appear normal for aggregated creator supply. Single-enterprise data sold through a broker probably commands lower take rates, but no source confirms this.
- For recurring enterprise data, an annual access fee with a refresh SLA plus a multi-year term mirrors the Reddit and News Corp deals.

### Gaps
- No public data on minimum guarantees, milestone payments or usage-based (per-training-run) structures.
- Calliope, Created by Humans and Protege commission rates not found.

## Q5. How buyers evaluate samples before quoting

### Takeaway
Little public documentation exists. What is reported is quality grading of supplied assets (code), gold-standard and inter-annotator QA (labeling vendors), and the general practice of small-model data ablations. Eval-uplift-based pricing is proposed academically, but there is no evidence it is used in contracts.

### Cited Findings
- Code platforms grade repositories and adjust the $5k baseline up or down after grading. — [Troveo code](https://www.troveo.ai/resources/sell-code-to-ai-companies)
- Surge-style vendors monitor workers on gold-standard accuracy, annotator agreement and trust scores in real time. — [Sacra, Mercor vs Scale and Surge](https://sacra.com/chat/h/788a8536-fc24-4b8d-a389-3318e4f79b68)
- Labs run small-model, limited-token ablations to evaluate data strategies (for example, the 360Zhinao technical report, 2024). This is the plausible mechanism for sample evaluation. — [arXiv 2405.13386](https://arxiv.org/pdf/2405.13386)
- Valuation-based pricing mechanisms (Fairshare) assume buyers can estimate value from data before purchase. — [arXiv 2502.00198](https://arxiv.org/abs/2502.00198v2)

### Inferences
- The quoting tool should support a paid or free sample tier (for example, 1-5% of the corpus). Buyers would run ablations or evals on it, and the final price could be adjusted on demonstrated uplift. This is inferred, not documented practice.

### Gaps
- No primary source describing frontier-lab procurement steps (sample size, eval benchmarks, acceptance criteria) was found.
