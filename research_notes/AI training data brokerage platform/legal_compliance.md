# Legal, Compliance & Diligence Requirements for an AI Training-Data Brokerage Platform (US/EU, as of 2026-10-13)

Source-quality note: Most sources are law-firm alerts, trade press and secondary trackers, plus some vendor blogs (flagged). Direct fetches of primary sources (LinkedIn User Agreement, WilmerHale) failed with DNS errors, so primary text was not checked. Treat vendor-blog items as directional only.

## 1. Data rights / chain of title: how to verify a seller can license data

### Takeaway
Buyers (AI labs) now expect per-asset provenance and tailored "right to license for AI training" warranties, because generic IP warranties miss AI-specific risks. The usual chain-of-title breaks are restrictive customer contracts and ToS, privacy-law limits on reuse, layered third-party rights in content, and trade-secret or confidentiality obligations. A broker platform therefore needs a structured provenance/rights intake, not a checkbox attestation.

### Cited Findings
- Buyers in AI deals look for audits of training data and of data consents, plus review of licensing arrangements. Generic IP warranties often miss AI-specific risks, so deals need tailored representations about the right to use training data. — [MinterEllison](https://www.minterellison.com/articles/expert-guide-legal-issues-in-acquiring-ai-companies)
- A single asset (e.g., one video or track) can carry several layers of rights. A license protects the licensee only if the paper trail for each asset can be produced, so the licensor's warranty that it holds the granted rights is central. — [Troveo](https://www.troveo.ai/resources/ai-data-licensing) (vendor)
- Buyers check whether third-party licenses, customer agreements or regulations (GDPR, CCPA, HIPAA) restrict commercial licensing, and unclear ownership can kill a deal. — [Beyond Elevation](https://beyondelevation.com/blog/posts/how-to-license-data-to-ai-companies/) (vendor blog; low weight)
- Review dependence on third-party models, APIs or datasets, because these affect licensing rights. — [Koley Jessen](https://www.koleyjessen.com/insights/publications/ai-contracting-practical-legal-guidance-for-growing-businesses)
- Review assignability, indemnification and data-use restrictions in key vendor agreements. Putting trade-secret material into an AI dataset can jeopardize trade-secret protection. — [Bricker Graydon](https://www.bricker.com/all-things-tech/ai-in-m-a-emerging-due-diligence-and-liability-considerations)
- A diligence checklist should cover title or licensed rights for code, model weights, datasets and documentation. — [Licentium](https://www.licentium.io/solutions/ai-due-diligence) (vendor)
- **FTC position on repurposing collected data:** In its February 2024 business blog post ("AI (and other) Companies: Quietly Changing Your Terms of Service Could Be Unfair or Deceptive"), the FTC said that using data for AI training or sharing it with third parties, when the only disclosure is a retroactive change to terms or privacy policy, may be unfair or deceptive. A company cannot unilaterally abandon the privacy commitments it collected data under. — [Consumer Finance Monitor (Ballard Spahr)](https://www.consumerfinancemonitor.com/2024/02/28/ftc-warns-quietly-changing-privacy-policies-may-be-an-unfair-or-deceptive-practice/); [Sheppard Mullin](https://www.sheppard.com/insights/blogs/ftc-warns-about-changing-terms-of-service-or-privacy-policy-to-train-ai-on-previously-collected-data)
- The FTC's algorithmic disgorgement remedy requires deletion of the data and of the models and algorithms built with it. Example: the 2021 Everalbum settlement. It has been used only a handful of times. — [Sheppard Mullin](https://www.sheppard.com/insights/blogs/ftc-warns-about-changing-terms-of-service-or-privacy-policy-to-train-ai-on-previously-collected-data)
- Source legality matters on its own: in Bartz v. Anthropic, building a library from pirated "shadow library" copies created liability even though training itself was held fair use (see Q3). — [Authors Alliance](https://www.authorsalliance.org/2025/06/26/meta-wins-on-fair-use-for-now-but-court-leaves-door-open-for-market-dilution/)

### Inferences
- **Common chain-of-title problems the platform should screen for:**
  - (a) Seller's data is really customer data held under SaaS/MSA terms that limit use to providing the service, or that give the customer ownership of its data.
  - (b) Privacy policies or ToS in force when the data was collected did not disclose AI training or third-party licensing (FTC "retroactive change" risk; disgorgement exposure that flows to the buyer's model).
  - (c) User-generated or third-party content embedded in the corpus, such as emails, documents, licensed news or images, or vendor reports.
  - (d) Code repositories containing open-source components under copyleft or attribution licenses, or vendored third-party code.
  - (e) Work product by contractors without IP assignment.
  - (f) Data obtained from scraping, or from sources whose terms forbid redistribution.
  - (g) NDA or confidentiality obligations to counterparties.
  - (h) Data from acquired companies where assignability of consents is unclear.
- **Platform features this implies:**
  - Seller questionnaire covering source, collection date, governing ToS/privacy-policy version, and the counterparty contracts touching the data.
  - Upload of the relevant contract clauses.
  - Automated scans: PII, secrets/credentials, OSS license detection (SPDX/ScanCode-style) on code, copyrighted third-party content fingerprinting, and watermark/CMI detection.
  - Per-asset provenance manifest that the buyer can inspect.
  - Rep-and-warranty attestation signed by an officer.
  - Option for a third-party legal opinion or title review on high-value deals.

### Gaps
- No authoritative source was found that specifically addresses open-source license implications of training on code (e.g., GPL/AGPL obligations, or the Doe v. GitHub status) or employee/contractor invention-assignment gaps for data. Both need a targeted search.
- No source was found on standard industry "data provenance" frameworks, such as the Data Provenance Initiative or the Data & Trust Alliance provenance standards, as buyer requirements.

## 2. Privacy: GDPR, CCPA/CPRA, HIPAA, state data broker laws; de-identification

### Takeaway
Data broker registration laws (CA, VT, TX, OR) turn on selling or licensing personal data about people the seller has no direct relationship with. No clear B2B exemption was found, so a platform brokering datasets that contain any consumer or employee PII may itself be, or make its sellers into, a "data broker." California's DROP deletion mechanism has been live since 1 Aug 2026.

GDPR treats training as processing that needs a lawful basis. Per EDPB Opinion 28/2024, legitimate interest is possible but not a default, and models are rarely "anonymous." HIPAA data must be de-identified via Safe Harbor or Expert Determination.

The practical answer for the platform is a PII-free default (de-identification with documented methodology), with gated workflows for datasets containing personal data.

### Cited Findings
**State data broker laws**
- **Which states:** California, Oregon, Texas and Vermont have generally applicable data broker registration laws. — [Stoel Rives](https://www.stoel.com/insights/publications/data-broker-privacy-compliance-our-top-5-list); [Davis+Gilbert](https://www.dglaw.com/u-s-data-broker-legislation-expands-to-include-texas-and-oregon/)
- **Vermont definition:** A business, or unit of a business, that knowingly collects and sells or licenses to third parties the brokered personal information of a consumer with whom it has no direct relationship. — [Hintze Law](https://hintzelaw.com/new-page-3); [California Lawyers Association](https://calawyers.org/privacy-law/wake-now-discover-that-you-are-a-data-broker/)
- **Texas:** Drops the "direct relationship" test and instead covers data "that the entity did not collect directly from the individual." It is limited to entities whose principal source of revenue is derived from such data. — [Davis+Gilbert](https://www.dglaw.com/u-s-data-broker-legislation-expands-to-include-texas-and-oregon/); [Hintze Law](https://hintzelaw.com/new-page-3)
- **Oregon:** Covers a business that "collects and sells or licenses brokered personal data to another person." Oregon and Vermont use "business or unit of a business" language. — [Hintze Law](https://hintzelaw.com/new-page-3)
- **Exemptions:** Common exemptions cover entities subject to FCRA, GLBA and certain HIPAA-covered entities and business associates. Vermont has broader carve-outs. — [Hintze Law](https://hintzelaw.com/new-page-3)
- **California regulations narrow "direct relationship":** Even where a business has a first-party relationship, it has no direct relationship for personal information obtained outside the consumer's intentional interaction with the business. Vermont amendments defining "direct relationship" take effect 1 Jan 2027. — [Hintze Law](https://hintzelaw.com/new-page-3)
- **No B2B carve-out found:** None of the searched sources identified a clear B2B exemption in the four states. The statutes (Cal. Civ. Code §1798.99.80; 9 V.S.A. ch. 62; Oregon HB 2052; Texas SB 2105) need direct review. — search synthesis across [DataGrail](https://www.datagrail.io/blog/data-privacy/data-broker-compliance/), [Hintze](https://hintzelaw.com/new-page-3)
- **California Delete Act / DROP:**
  - Brokers had to begin processing DROP deletion requests on 1 Aug 2026, must access DROP at least every 45 days, and must process verified deletions within 45 days. — [CPPA announcement](https://cppa.ca.gov/announcements/2025/20251113.html); [Fenwick](https://www.fenwick.com/insights/publications/dont-drop-ball-upcoming-changes-california-delete-act-five-key-steps-companies)
  - Unverifiable requests must still be treated as opt-outs of sale/sharing. — [Freshfields](https://www.freshfields.com/en/our-thinking/blogs/a-fresh-take/the-delete-act-calprivacy-seeks-input-on-data-broker-audit-requirements-102mqe8)
  - Brokers must register annually by 31 Jan. Failure to register carries a $200/day fine. Each entity must register independently rather than relying on a parent's registration. Independent third-party audits every 3 years begin in 2028. — [TrustArc](https://trustarc.com/resource/california-delete-act-drop-platform-data-brokers/); [Freshfields](https://www.freshfields.com/en/our-thinking/blogs/a-fresh-take/the-delete-act-calprivacy-seeks-input-on-data-broker-audit-requirements-102mqe8)
  - In Aug 2026 CalPrivacy reported about 500,000 Californians signed up for DROP. — [privacy.ca.gov](https://privacy.ca.gov/2026/08/half-a-million-californians-have-signed-up-for-drop-to-delete-their-personal-information-from-data-brokers/)
  - A search summary attributed to a CalPrivacy release says 654 brokers are in the system. This figure was not independently verified.

**GDPR**
- **EDPB Opinion 28/2024 (Dec 2024, at the Irish DPC's request)** — [CMS](https://cms.law/en/int/legal-updates/edpb-opinion-28-2024-key-takeaways-on-processing-personal-data-in-the-context-of-ai-models); [Fieldfisher](https://www.fieldfisher.com/en-be/locations/belgium/insights/edpb-issues-opinion-on-processing-of-personal-data); [Securiti](https://securiti.ai/summary-of-edpb-opinion-282024-concerning-ai-models-processing-of-personal-data):
  - A model is anonymous only if the likelihood of extracting personal data, and of obtaining it via queries, is "insignificant."
  - Legitimate interest is possible only after a documented three-step test (legitimate interest, necessity, balancing). Reasonable expectations of data subjects matter.
  - Mitigations include pseudonymisation, synthetic data and fuller transparency about datasets.
  - "Development" broadly includes collecting training data, pre-processing and training.
  - Unlawful processing during development can affect the lawfulness of later deployment.

**HIPAA**
- **Two de-identification paths:**
  - Safe Harbor: remove 18 identifier categories and have no actual knowledge of re-identifiability. It is often too lossy for ML.
  - Expert Determination: a qualified expert documents that re-identification risk is "very small" for the anticipated recipient.
  - PHI sharing with business associates requires BAAs. De-identified data sharing is commonly governed by data use agreements.
  - [AccountableHQ](https://www.accountablehq.com/post/what-is-hipaa-de-identification-definition-safe-harbor-vs-expert-determination-and-compliance-requirements); [Tonic.ai](https://www.tonic.ai/guides/hipaa-ai-compliance) (vendor sources; verify against 45 CFR §164.514)

### Inferences
- **Data broker status:**
  - A platform that only facilitates seller-to-buyer licensing of PII-free enterprise data is probably outside the broker laws.
  - Once datasets contain personal data of consumers who did not deal with the seller (e.g., customers' end-users, contacts in CRM exports, or support tickets naming third parties), sellers and possibly the platform (if it takes title or resells) could be "data brokers."
  - This argues for an agent/marketplace structure (not reseller) plus a hard PII gate.
- **Required features:**
  - Automated PII/PHI detection and redaction, with a documented de-identification method per dataset (HIPAA Expert Determination report option for health data).
  - Contractual no-re-identification clauses binding buyers.
  - Personal-data flag that triggers a GDPR lawful-basis record (LIA, Art. 14 transparency plan), DPA/SCCs for EU→US transfers, and a data broker registration check.
  - Deletion-request propagation (DROP/DSAR) through to buyers.
- Under the CCPA, licensing personal information for money is a "sale." The CCPA's "deidentified" standard requires public commitment and contractual no-re-identification terms. This is background knowledge and is not sourced here (see Gaps).

### Gaps
- The CCPA/CPRA definition of "deidentified" (§1798.140(m)) and its contract requirements were not retrieved.
- Whether B2B contact data (employee names and emails) triggers broker registration in each state could not be confirmed.
- No sources were found on CPPA enforcement against AI-training data sellers specifically.
- Other states with broker laws or pending ones (e.g., New Jersey, Connecticut mentions in DataGrail) were not verified.

## 3. Copyright & AI-training litigation status (as of Oct 2026) and implications

### Takeaway
US law is split. Training on lawfully acquired works has been held fair use (Bartz, Kadrey, district level). The first appellate ruling (3rd Cir., Thomson Reuters v. Ross, Sept 2026) rejected fair use for non-generative training that built a competing product. Acquisition via piracy produced a record $1.5B settlement. Judges are signalling that "market dilution" and licensing markets matter.

Net effect: there is strong demand for clean, documented, licensed data, and buyers will insist on provenance warranties and IP indemnities. The licensing market itself is evidence plaintiffs use, which raises the value of licensed data.

### Cited Findings
- **Bartz v. Anthropic:**
  - $1.5B class settlement granted final approval on 20 July 2026 (N.D. Cal.). All 53 objections were overruled.
  - The class covers about 482,460 works from LibGen/PiLiMi, at about $3,000 per work. Anthropic must destroy the torrented files and derived copies.
  - Fees were cut to about $101.6M (about 6.8%). The claims rate is about 91–93%.
  - Judge named in reporting: Araceli Martínez-Olguín. The original rulings were by Judge Alsup.
  - Sources: [JURIST](https://www.jurist.org/news/2026/07/judge-approves-record-1-5-billion-settlement-involving-anthropic/); [Authors Guild](https://authorsguild.org/news/court-grants-final-approval-anthropic-copyright-settlement/); [AAP](https://publishers.org/news/aap-welcomes-courts-final-settlement-approval-in-bartz-v-anthropic/); [Pearl Cohen](https://pearlcohen.com/federal-court-approves-1-5-billion-anthropic-copyright-settlement-largest-in-history)
- **Bartz underlying ruling (June 2025, Alsup J.):** Training on lawfully acquired books was transformative fair use. Building a central library from pirated copies created liability. — [Authors Alliance](https://www.authorsalliance.org/2025/06/26/meta-wins-on-fair-use-for-now-but-court-leaves-door-open-for-market-dilution/)
- **Kadrey v. Meta (25 June 2025, Chhabria J.):**
  - Summary judgment for Meta on fair use for training, but only because the plaintiffs failed to develop a market-dilution record.
  - Chhabria wrote that companies "will generally need to pay copyright holders" to avoid liability, and that the ruling stands only for the proposition that these plaintiffs made the wrong arguments.
  - Distribution (torrent seeding) claims continue.
  - Sources: [Authors Alliance](https://www.authorsalliance.org/2025/06/26/meta-wins-on-fair-use-for-now-but-court-leaves-door-open-for-market-dilution/); [FisherBroyles](https://fisherbroyles.com/news/client-alert-summary-and-strategic-analysis-of-judge-chhabrias-fair-use-ruling-in-kadrey-v-meta)
- **Kadrey status 2026:** Discovery continues. Meta was granted further discovery on a new contributory-infringement claim on 11 Aug 2026. — [AI Lawsuit Tracker](https://ailawsuittracker.com/ai-copyright-lawsuits/) (secondary tracker)
- **US Copyright Office report (May 2025):** Advanced the market-dilution theory, arguing that the speed and scale of AI output risks diluting markets for similar works. — [Authors Alliance](https://www.authorsalliance.org/2025/06/26/meta-wins-on-fair-use-for-now-but-court-leaves-door-open-for-market-dilution/)
- **Thomson Reuters v. ROSS (3rd Cir., No. 25-2153, 29 Sept 2026):**
  - Affirmed that 2,243 Westlaw headnotes are copyrightable and that copying them to train a legal-research AI was not fair use.
  - Three of four factors went against ROSS. The intermediate-copying defense was rejected because the copying was for ease, not necessity.
  - Generative AI was expressly set aside in a footnote.
  - Commentators call it the first federal appellate fair-use ruling on AI training. ROSS plans to seek Supreme Court review. Remaining issues (some copyrights, damages) go to trial in Delaware.
  - Sources: [Ballard Spahr](https://www.ballardspahr.com/insights/alerts-and-articles/2026/10/third-circuit-addresses-fair-use-in-ai-training-but-leaves-generative-ai-questions-unresolved); [Haynes Boone](https://www.haynesboone.com/news/alerts/third-circuit-rejects-fair-use-for-rosss-copying-of-westlaw-headnotes); [LawNext](https://www.lawnext.com/2026/09/3rd-circuit-rules-for-thomson-reuters-in-its-copyright-fight-against-legal-research-startup-ross.html); [Patently-O](https://patentlyo.com/patent/2026/10/ease-is-not-necessity-third-circuit-affirms-no-fair-use-in-thomson-reuters-v-ross.html); [IPWatchdog](https://ipwatchdog.com/2026/09/30/third-circuit-affirms-revised-fair-use-ruling-against-ross-ai-legal-research-platform-in-sealed-opinion/)
- **NYT v. OpenAI/Microsoft:** Part of the consolidated MDL in S.D.N.Y. (25-md-03143). Cross-motions for summary judgment were filed on 4 Sept 2026. — [AI Lawsuit Tracker](https://ailawsuittracker.com/ai-copyright-lawsuits/) (secondary)
- **USA Today Co. and 13 affiliated papers:** Sued OpenAI in New York in Oct 2026, seeking over $250M. — [Hoodline](https://hoodline.com/2026/10/usa-today-sues-openai-demands-250-million-over-copied-articles) (low-tier outlet; verify)
- **Getty v. Stability (US, refiled N.D. Cal. Aug 2025):** On 23 Apr 2026 the DMCA §1202(a) claim was dismissed without prejudice. Direct copyright, trademark (watermark in outputs) and UCL claims survive. — [AI Lawsuit Tracker](https://ailawsuittracker.com/ai-copyright-lawsuits/) (secondary)
- **Getty v. Stability (UK High Court):** Stability won the core secondary-infringement claim. Model weights are not an "infringing copy" under CDPA 1988. Getty reportedly got permission to appeal. — [AI Lawsuit Tracker](https://ailawsuittracker.com/ai-copyright-lawsuits/) (secondary)
- One tracker counts about 144 AI copyright suits and about 248 AI lawsuits overall as of Oct 2026. — [AI Lawsuit Tracker](https://ailawsuittracker.com/); [ExplainX](https://www.explainx.ai/blog/ai-lawsuit-tracker-248-cases-76-companies-copyright-ross-third-circuit-2026)

### Inferences
- The "how acquired" question (Bartz) is now as important as the "how used" question. Labs will pay a premium for data with documented lawful acquisition, and they will demand:
  - acquisition-method warranties;
  - no-piracy and no-scraping-in-breach-of-ToS reps;
  - destruction/deletion mechanics (mirroring the Bartz destruction order).
- Ross means non-generative or competing-use training (e.g., training a tool that substitutes for the seller's product) is high-risk. Sellers will likewise want "no competing product" use restrictions.
- Bartz's statutory-damages-per-work exposure (about $3,000 per work) gives buyers a concrete benchmark for sizing IP indemnity caps and insurance.
- A functioning licensing market strengthens plaintiffs' factor-4 (market harm) arguments. This is a structural tailwind for licensed-data brokers.

### Gaps
- NYT/OpenAI, Kadrey and Getty-US statuses come from secondary trackers, not dockets.
- The Getty UK appeal status is unconfirmed.
- Other active cases (e.g., Concord/UMG v. Anthropic, Disney/Universal v. Midjourney, music-label deals with Suno/Udio) were not researched.

## 4. EU AI Act training-data transparency (GPAI)

### Takeaway
Since 2 Aug 2025, every GPAI provider placing a model on the EU market must publish a public "sufficiently detailed summary" of training content using the Commission's mandatory template (published 24 July 2025). The Commission's enforcement powers apply from 2 Aug 2026, and legacy models have until 2 Aug 2027.

Licensed datasets must be described at a category level, so buyers will need seller-provided metadata (modality, size, source type, date range, TDM opt-out compliance) delivered in a template-ready form.

### Cited Findings
- **Template and scope:** The AI Office published the training-content summary template on 24 July 2025 under Art. 53(1)(d). It applies to all GPAI models, including open-source ones. — [WilmerHale (via Mondaq)](https://admin.mondaq.com/unitedstates/new-technology/1666198/european-commission-releases-mandatory-template-for-public-disclosure-of-ai-training-data); [Securiti](https://securiti.ai/eu-publishes-template-for-public-summaries-of-ai-training-content/)
- **Timeline:** Obligations apply from 2 Aug 2025. Models already on the market before then have until 2 Aug 2027. Commission enforcement powers apply from 2 Aug 2026. — [Securiti](https://securiti.ai/eu-publishes-template-for-public-summaries-of-ai-training-content/); [Shoosmiths](https://www.shoosmiths.com/insights/articles/ai-confessions-what-your-model-did-last-summer)
- **Updates:** Summaries must be updated every 6 months where post-release training occurs, or sooner on a material change. Downstream modifiers report only their modification data. — [Securiti](https://securiti.ai/eu-publishes-template-for-public-summaries-of-ai-training-content/)
- **Level of detail:** The summary should be "generally comprehensive" rather than technically detailed, so that rightsholders can exercise their rights, while protecting trade secrets. Section 1 covers provider and model information plus modalities (text, image, audio, video, other) with size ranges per modality. An AI Office FAQ was adopted on 31 July 2025. — [ISMS.online](https://www.isms.online/iso-42001/eu-ai-act-the-new-content-training-summary-template-for-gpai-providers/); [Streamlex FAQ](https://streamlex.eu/law-resources/gpai-training-content-template-faq/)
- **Penalties:** Reported maximum fine for GPAI providers is up to 3% of global annual turnover or €15M, whichever is higher. — [casrai summary](https://casrai.org/news/eu-ai-act-gpai-obligations-code-of-practice-august-2025) (secondary; verify against Art. 101)

### Inferences
- **Platform feature:** A per-dataset "AI Act summary card" capturing:
  - data modality, volume, collection period and source category (licensed private dataset vs. public vs. user data vs. synthetic);
  - whether the data is personal data;
  - how TDM opt-outs (Art. 4(3) DSM Directive) were respected.
  This lets the buyer populate its public summary without exposing confidential deal terms.
- Contracts should address whether the buyer may name the seller or dataset publicly. Many sellers will want anonymised category-level disclosure only, and the template is reported to protect trade secrets.
- The copyright-policy obligation (Art. 53(1)(c)) and the GPAI Code of Practice push labs toward documented rights clearance, which supports demand for brokered, cleared data.

### Gaps
- The template's exact treatment of licensed private datasets (whether licensors must be named), the "top domain names" scraping disclosure threshold, and the TDM opt-out section were not verified from the primary text. Fetches failed.
- Any 2026 "digital omnibus" changes to AI Act timelines were not researched.

## 5. Typical data license agreement terms and the broker's role

### Takeaway
AI training-data licenses center on a precisely defined grant (training vs. fine-tuning vs. eval vs. RAG/retrieval vs. display), licensor warranties of title and lawful collection, IP and privacy indemnities (the core negotiation), deletion and post-termination model treatment, and output provisions. Brokers should standardize these as configurable term sheets and sit as the seller's agent or as a marketplace with escrow, rather than taking title.

### Cited Findings
- **Licensor warranties:** Licensees want warranties that the licensor owns or can license the data and that training uses won't infringe third-party rights. Some also want a warranty that personal data was collected and licensed lawfully under CCPA/GDPR, plus ongoing compliance representations. — [Galkin Law](https://galkinlaw.com/data-license-for-ai-training/); [Darrow Everett](https://darroweverett.com/ai-technology-agreements-licensing-legal-analysis/); [terms.law](https://terms.law/insights/ai-training-data-licensing-usable-agreement.html)
- **Indemnity:** The indemnity is the bulk of negotiation in a substantial training-data license. Licensees seek coverage of privacy violations and regulatory penalties, not just IP. Licensors try to limit it to third-party IP claims and expect the licensee to indemnify for out-of-scope use. — [terms.law](https://terms.law/insights/ai-training-data-licensing-usable-agreement.html); [Margolis PLLC](https://www.margolispllc.com/post/ai-terms-and-indemnity-in-commercial-contracts)
- **Deletion and post-termination:** Licensees must stop new training and delete or return data within a set period, including backups, caches and shadow copies. The key negotiated point is whether already-trained models may continue in use. — [terms.law](https://terms.law/insights/ai-training-data-licensing-usable-agreement.html); [ezel.ai template](https://ezel.ai/templates/ai-training-data-license-agreement)
- **Outputs:** Licensor first drafts often say nothing about outputs. Some data providers have tried output royalties or reserved rights over commercial use of models trained on their data. These may be hard to enforce but create litigation risk. — [terms.law](https://terms.law/insights/ai-training-data-licensing-usable-agreement.html); [Darrow Everett](https://darroweverett.com/ai-technology-agreements-licensing-legal-analysis/)
- **Drafting principle:** Draft so that the license works whether or not fair use ultimately favors the licensee. — [terms.law](https://terms.law/insights/ai-training-data-licensing-usable-agreement.html)

### Inferences
- **Term-sheet fields the platform should support:**
  - permitted uses (pre-training / fine-tuning / RLHF / evaluation-only / RAG-retrieval / internal-only), with explicit exclusions such as no competing product (Ross lesson) and no re-identification;
  - exclusivity (none / time-limited / field-of-use / first-look);
  - term and renewal;
  - delivery format and refresh cadence;
  - deletion SLA and certificate of destruction; model-survival election (models may persist / must be retrained / must be withdrawn);
  - warranties (title, lawful acquisition, no piracy, privacy compliance, no malware/secrets, accuracy disclaimers);
  - indemnity scope and cap (IP, privacy, regulatory), with optional insurance;
  - audit rights (usage logs, a security standard such as SOC 2);
  - output restrictions (no verbatim regurgitation, memorization testing);
  - attribution/publicity and EU AI Act disclosure consent;
  - confidentiality and security;
  - governing law.
  These are standard practice inferred from the sources and broader market knowledge.
- **Payment structures** to support: flat fee, annual subscription, per-token/per-record, milestone or tranche on delivery, revenue share or royalty (rarer and hard to enforce), and equity or compute credits.
- **Broker role options:**
  - Disclosed agent of the seller, paid commission: lowest liability, and keeps the platform out of the chain of title.
  - Reseller or sublicensor that takes a license and sublicenses: higher liability, and may trigger data broker status.
  - Marketplace plus escrow agent: holds funds until acceptance, and possibly holds data in a clean room.

  Recommend agent/marketplace with escrow of both funds and data. Data escrow or a clean room lets buyers evaluate samples under NDA without taking copies, and supports deletion verification.

### Gaps
- No public sources were found on actual broker/agent contract structures in AI data deals, typical commission rates, or data-escrow providers.
- No sourced figures were found for market deal prices or terms (e.g., publicised Reddit/Google or News Corp/OpenAI deals). These need a separate market-research pass.

## 6. Bankruptcy sales of data assets

### Takeaway
Selling personally identifiable customer data in a US bankruptcy (§363) can trigger appointment of a consumer privacy ombudsman (11 U.S.C. §332). Sales inconsistent with the debtor's privacy policy face heavy scrutiny. In the 23andMe case (2025) this led to recommendations of separate affirmative consent and to state AG litigation.

Distressed-asset data deals are therefore available but carry consent and privacy-policy constraints. Non-personal enterprise data is far cleaner.

### Cited Findings
- **Ombudsman appointment in 23andMe:** A consumer privacy ombudsman was appointed via a settlement with states, approved by Bankruptcy Judge Brian Walsh (E.D. Mo.). — [Freevacy/Reuters](https://www.freevacy.com/news/reuters/us-court-appoints-genetic-data-ombudsman-during-23andme-bankruptcy/6346); [CSLR](https://www.cslawreport.com/21140026/sale-of-23andmes-genetic-data-implications-of-the-motions-for-a-privacy-ombudsman-andstate-laws.thtml)
- **Ombudsman's recommendation:** The ombudsman (Neil Richards) recommended that customers give "separate and affirmative" consent before their genetic data is sold. A sale without consent may conflict with 23andMe's privacy policy and public statements, and he "cannot conclude that certain non-bankruptcy laws would not be violated" absent consent. He found state comprehensive privacy and health laws less likely to be violated because of bankruptcy-transaction carve-outs. — [The Record](https://therecord.media/23andme-privacy-ombudsman-recommends-consent-sale); [Loeb & Loeb](https://www.loeb.com/en/insights/publications/2025/07/23andme-bankruptcy-the-privacy-ombudsmans-report)
- **State litigation:** Dozens of states sued to block the sale of genetic data. — [BABL AI](https://babl.ai/?p=7712)
- **Later reporting:** The restructuring plan was amended so that no identifiable genetic or personal data would be conveyed without further court order. This is reported as of late 2025; current status is unverified. — search summary (secondary; see Gaps)

### Inferences
- **Diligence feature for distressed data sellers:** Flag bankruptcy/insolvency status, require the privacy policy in effect at collection, check whether it allowed transfer in a sale or bankruptcy, and require a court order or ombudsman clearance for any PII.
- For trade-secret or non-personal enterprise data (logs, code, documents), the §363 sale is mainly a title and assignability question. Buyers get "free and clear" title, which can actually be attractive, but contract restrictions on customer data can still apply.

### Gaps
- §363(b)(1) and §332 text and FTC letters in prior cases (e.g., RadioShack, Toysmart) were not pulled in this pass. These are background knowledge only.
- The current (Oct 2026) status of 23andMe's data disposition is unverified.

## 7. Automated B2B outreach compliance (CAN-SPAM, GDPR/PECR, LinkedIn, deliverability)

### Takeaway
US cold B2B email is legal under CAN-SPAM's opt-out regime. In the UK, corporate subscribers can be emailed without consent but need UK GDPR legitimate interests. EU rules vary by country: Germany is notably strict, effectively requiring consent.

LinkedIn prohibits automated scraping and bot activity and actively litigates (Proxycurl permanent injunction, 2025). Mailbox providers (Google/Yahoo since Feb 2024, Microsoft since May 2025) require SPF/DKIM/DMARC, easy unsubscribe and low complaint rates for senders above 5,000 messages/day.

The outreach engine needs jurisdiction-aware rules, suppression lists, authentication and volume throttling, and no LinkedIn automation.

### Cited Findings
- **UK:**
  - Emails to corporate subscribers are generally outside PECR's consent requirement, but a UK GDPR lawful basis (usually legitimate interests, with a documented assessment, privacy notice and objection handling) is still needed.
  - Sole traders and unincorporated partnerships (outside Scotland) are individual subscribers and need prior consent.
  - Sources: [Hybrid Legal](https://www.hybridlegal.co.uk/blog/using-business-emails-for-b2b-cold-outreach-in-the-uk-what-you-can-and-cant-do); [Leadistry](https://leadistry.co.uk/blog/cold-email-uk-gdpr-legitimate-interest); [salespeople.co.uk](https://www.salespeople.co.uk/explained/cold-email-pecr-regulation-22)
- **EU:** B2B cold email can rest on GDPR Art. 6(1)(f) legitimate interests, but national ePrivacy implementations decide whether unsolicited email is allowed. Germany and Italy are described as stricter, and France as permitting B2B under legitimate interest with opt-out. These are vendor blogs; verify with CNIL and German UWG §7. — [Ripe Leads](https://ripeleads.eu/resources/gdpr-compliant-cold-email-europe); [Overloop](https://overloop.com/blog/cold-email-illegal)
- **LinkedIn litigation:**
  - LinkedIn sued Proxycurl (N.D. Cal. No. 3:25-cv-00828, Jan 2025) for fake accounts and scraping in breach of its User Agreement. The resolution imposed a permanent injunction requiring deletion of all scraped data and an end to unauthorized access.
  - Proxycurl shut down in July 2025, and a similar suit was filed against ProAPIs in Oct 2025.
  - LinkedIn says fake accounts are usually detected and restricted within about a day.
  - Sources: [LinkedIn newsroom](https://news.linkedin.com/2025/linkedin-takes-legal-action-to-defend-member-privacy); [Social Media Today](https://www.socialmediatoday.com/news/linkedin-wins-legal-case-data-scrapers-proxycurl/756101/); [Bloomberg Law](https://news.bloomberglaw.com/artificial-intelligence/linkedins-war-against-bot-scrapers-ramps-up-as-ai-gets-smarter)
- **hiQ precedent:** Courts allowed some public-data scraping, but breach-of-contract claims remain viable against logged-in scraping. — [Bloomberg Law](https://news.bloomberglaw.com/ip-law/linkedin-battles-online-scrapers-in-perpetual-struggle-over-data)
- **Microsoft (Outlook.com/Hotmail/Live) bulk-sender rules:**
  - Enforced from 5 May 2025 for senders of over 5,000 messages/day: SPF, DKIM, and DMARC at least p=none aligned with SPF or DKIM, a functional unsubscribe link, valid From/Reply-To, and list hygiene.
  - Sources conflict on whether non-compliant mail goes to Junk or is rejected (550 5.7.515), and on whether RFC 8058 one-click is mandatory for Outlook.
  - Sources: [Mailgun](https://www.mailgun.com/blog/deliverability/microsoft-sender-requirements/); [Resend](https://resend.com/blog/microsoft-bulk-sending-requirements-2025.md); [Spam Resource](https://www.spamresource.com/2025/04/microsoft-joins-club-top-four-b2c-mbps.html); [BuzzStream](https://buzzstream.com/blog/microsoft-email-requirements/)
- **Google/Yahoo (from Feb 2024):** Require RFC 8058 one-click unsubscribe for bulk senders. A 0.3% spam-complaint threshold is cited and reported as shared by Microsoft (single source). — [Mailgun](https://www.mailgun.com/blog/deliverability/microsoft-sender-requirements/); [InboxAlly](https://docs.inboxally.com/support/microsoft-outlook-changes-for-bulk-senders-in-2025)

### Inferences
- **Outreach module requirements:**
  - Per-recipient jurisdiction detection: US → CAN-SPAM; UK corporate vs. individual subscriber; EU country rules, with Germany treated as consent-only).
  - Legitimate-interest assessment template and Art. 14 privacy notice in the first message (where personal data was sourced from third parties).
  - Global suppression list honoring opt-outs within 10 business days (CAN-SPAM) or immediately for GDPR objections.
  - Physical postal address and accurate headers/subject.
  - Separate sending domains/subdomains with SPF/DKIM/DMARC alignment.
  - One-click List-Unsubscribe headers.
  - Complaint-rate monitoring, kept well below 0.3% (target <0.1%).
  - Volume caps and warm-up.
  - No LinkedIn automation or scraping. Use manual or LinkedIn-sanctioned tools (Sales Navigator / official APIs) only.
- Contact data sourced from vendors (Apollo, ZoomInfo, etc.) should come with documented provenance. The platform's own prospect database may itself contain personal data subject to data broker and GDPR rules.

### Gaps
- No primary sources were retrieved for:
  - CAN-SPAM specifics (FTC compliance guide: no consent needed, opt-out honored within 10 business days, physical address, no deceptive headers or subjects, penalties per email; current per-violation penalty amount not verified);
  - the LinkedIn User Agreement §8.2 text (fetch failed);
  - Germany UWG §7 and CNIL guidance;
  - the Google sender guidelines page itself.
- The Microsoft spam-rate threshold and enforcement mode are unresolved in the sources.
