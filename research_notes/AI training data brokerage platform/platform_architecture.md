# Architecting an Agentic Sales/BD Operating Platform (data brokerage selling to frontier AI labs), as of 2026-10-13

Source-quality caveat for the whole file: most 2026 GTM-tool content is written by vendors or competitors (Clay rivals, Instantly, ZoomInfo's "pipeline" blog, Prospeo, etc.). Figures from them are marked "vendor-reported". Several primary-looking pages (aceverse.co, revenuesystemslab.substack.com) could not be fetched, so their claims come from search snippets only.

## 1. Existing AI SDR/GTM tools: what they do well or badly, build vs buy vs compose, and how autonomous AI SDRs fail

### Takeaway
The 2025-26 market has moved away from "fully autonomous AI SDR replaces humans" (11x, Artisan) toward human-in-the-loop copilots, signal platforms (Unify, Common Room, Amplemarket Duo), and composable data/workflow layers (Clay plus a sequencer plus a flexible CRM). The research and drafting steps work well with AI. Sending under the company's name without review is where it breaks. For a business whose market is a few dozen frontier labs, the volume-oriented AI SDR products are a poor fit. The best approach is to compose bought data and sending infrastructure with a custom agent layer that does research, hypotheses and quotes.

### Cited Findings
**Failure modes of autonomous AI SDRs**
- Claim: 50-70% annual churn for AI SDR products, and "only 2% of deployments sticking". The source is a vendor selling an AI demo agent, and I found no independent source for these numbers — [Naoma](https://naoma.ai/articles/ai-sdr-dying-2026)
- The same source claims that by late 2025 "significant customer cohorts" had gone back to human SDRs using AI as a copilot, and that Artisan and 11x repositioned as hybrid human copilots — [Naoma](https://naoma.ai/articles/ai-sdr-dying-2026)
- 11x "faced public reporting on inflated customer claims and churn" (secondary, no specifics given) — [Salesmotion](https://salesmotion.io/blog/what-is-an-ai-sdr)
- Salesmotion argues the weak point is the last step, sending outreach under the company's name, not the research steps — [Salesmotion](https://salesmotion.io/blog/what-is-an-ai-sdr)
- Other reasons cited: falling reply rates as buyers learn to spot AI-written email, weak handling of objections and pricing pushback, and per-seat contracts that showed no attributable pipeline — [Aceverse (snippet)](https://www.aceverse.co/en/blog/ai-sdr-bdr-2026); [AI SDR Tools Buyer's Guide, Autobound](https://autobound.ai/blog/ai-sdr-tools-buyers-guide)
- SaaStr's own AI SDR deployment (mainly Artisan) failed for its first 30 days: generic messaging, terrible response rates, and prospects marking it as spam. It recovered only after the team cloned their best human SDR's cadence and messaging into the agent. After about 6 months: a 6.7% response rate on about 20,000 messages (vs about 3% industry average), and 11-12% positive response on warm lists (event attendees, known website visitors) vs about 5.5% on colder lists. SaaStr says the AI "isn't truly autonomous" and recommends reading every message for the first 30 days of a new agent — [SaaStr, 6 months of AI SDRs](https://www.saastr.com/6-months-of-ai-sdrs-whats-worked); [SaaStr 4,495 emails](https://www.saastr.com/we-sent-4495-ai-sdr-emails-in-2-weeks-and-got-the-1-response-rate-heres-how-its-not-what-you-think). Caveat: SaaStr has a large brand and database, so these results may not carry over to cold outreach.
- An analysis that coded 18 Reddit threads on AI SDR tools found 22% positive, 46% mixed or conditional, and 32% negative sentiment. Common complaints were unmet expectations of autonomy and deliverability problems. One cited chain of failure: unverified emails bounce, ISPs flag the domain, and then even human reps' mail lands in spam — [Revenue Systems Lab (search snippet; page not fetchable)](https://revenuesystemslab.substack.com/p/ai-sdr-tools)

**Tool-by-tool notes**
- **Clay** (data orchestration and waterfall enrichment). 2026 plans as reported: Launch about $185/mo ($167 annual) with 2,500 data credits and 15,000 actions; Growth about $495/mo ($446 annual) with 6,000 data credits and 40,000 actions; Enterprise custom. CRM integrations are reportedly locked to Growth. Top-up credits reportedly carry about a 50% markup. Under the new model, data credits are reportedly charged only when data is found. Waterfalls cost several credits per row (one competitor estimates 10-25 per row) — [Zeliq](https://www.zeliq.com/blog/clay-pricing); [Prospeo](https://prospeo.io/s/clay-pricing); [Bitscale (competitor)](https://ghost.bitscale.ai/clay-pricing-2026-the-hidden-cost-of-building-your-gtm-stack-on-one-tool). The figures disagree across blogs, so check clay.com/pricing.
- **Apollo**: has a database, a sequencer and an API. Reported 2026 seat prices: Free (100 mobile and 300 export credits a month), Basic $59, Professional $99, Organization $149 per user per month (annual, 5-seat minimum on Organization). Apollo claims 97% email accuracy; a third-party review puts it closer to 79% — [Knowlee](https://www.knowlee.ai/compare/zoominfo-vs-apollo-io); [Apollo](https://apollo.io/insights/apollo-vs-zoominfo); [Crustdata](https://crustdata.com/blog/zoominfo-vs-apollo). Apollo also ships an MCP server (it is connected in this environment), which lets agents call search and enrichment directly.
- **Attio**: a flexible-schema CRM with custom objects on paid plans (reported from $34/user/mo; another source says Pro is $79/seat) and a native MCP server. It has fewer native integrations than HubSpot — [Softr](https://www.softr.io/blog/attio-vs-hubspot); [GTM Directory](https://thegtmdirectory.com/compare/attio-vs-hubspot)
- **HubSpot**: over 2,000 integrations and good marketing automation, but custom objects require an Enterprise tier (Sales Hub Enterprise reportedly $150/user/mo, up to 10 object definitions) — [Softr](https://www.softr.io/blog/attio-vs-hubspot). I found no usable independent review of the **Breeze** prospecting agent (gap).
- **Amplemarket Duo**: watches buying signals, drafts outreach and proposes multichannel sequences that reps review and approve. Its database is reportedly 200M+ profiles (smaller than enterprise vendors) and Growth/Elite pricing is not public — [ZoomInfo pipeline blog (competitor)](https://pipeline.zoominfo.com/sales/amplemarket-review)
- **Common Room**: signal capture from 50+ sources plus activation agents. A June 2026 snapshot lists Starter at about $1k/mo (35k contacts) and Team at about $2.5k/mo — [MarketBetter](https://marketbetter.ai/blog/common-room-review-2026/); [Salesgear](https://www.salesgear.io/sales-tools/lead-intelligence/common-room)
- **Unify**: agents, B2B data, signals, sequencing and research in one layer. "Automated Plays" use credits for reveals, enrichment and agent runs, and can produce overage spikes. Calibrating it needs RevOps or GTM-engineering time — [Knowlee](https://www.knowlee.ai/blog/unify-alternatives-2026)
- **Instantly / Smartlead / Lemlist** (sequencers): Instantly Growth is about $47/mo ($37.60 annual) with unlimited inboxes and warmup; its lead DB and CRM are separate add-ons. Smartlead Base is $39/mo with unlimited mailboxes, 2,000 active leads, 6,000 emails/mo, warmup on every plan, and "SmartSenders" mailbox provisioning. Lemlist is per seat (about $69-109/user/mo) with capped inboxes (about $9 per extra) and its strengths are image personalization and LinkedIn steps — [Valley (discloses Instantly partnership)](https://www.joinvalley.co/blog/instantly-vs-smartlead-vs-lemlist); [SmartReach](https://smartreach.io/blog/instantly-vs-smartlead-vs-lemlist/)
- **11x / Artisan / Persana**: autonomous "digital worker" positioning. See the failure modes above. I found no independent 2026 performance data for Persana (gap).

### Inferences
- **Compose, don't buy an AI SDR.** The frontier-lab market is roughly 10-40 organizations with a few hundred relevant buyers (data and research leads, pretraining/post-training data teams, procurement, legal). That is account-based enterprise selling, not volume outbound. The value of 11x/Artisan (volume) does not apply here, and their main risk (generic or wrong messages under the company's name) is very costly when each account matters.
- **Buy** the commodity layers: a contact/firmographic data API (Apollo and/or PDL), a sending/warmup tool (Smartlead or Instantly, or plain Gmail API at low volume), a calendar tool, and optionally a CRM UI (Attio). **Build** the differentiated layers: lead-hypothesis generation, deep account research (lab announcements, papers, hiring posts, model cards showing data gaps), dataset-to-need matching, and quote generation. No vendor does those for data brokerage.
- Clay is optional. It is useful as a no-code enrichment workbench, but with a small number of accounts and an engineering team, direct API waterfalls in code are cheaper and easier to audit.

### Gaps
- No independent, audited churn or ROI data for 11x, Artisan, Persana or HubSpot Breeze. The 50-70% churn figure is unverified.
- No first-hand Reddit or HN postmortem was reachable in this session.

## 2. Agent architecture patterns (orchestration, research loops, MCP, Claude SDKs, durable workflows, memory, evals, cost)

### Takeaway
Use Anthropic's guidance: deterministic **workflows** for predictable steps (enrich, dedupe, sequence, quote math) and **agents** only for open-ended research. Use an orchestrator-worker design for breadth-first account research, durable execution so long jobs resume instead of restarting, and LLM-as-judge evals with human spot checks. Multi-agent runs cost about 15 times the tokens of a chat, so reserve them for high-value accounts.

### Cited Findings
- Anthropic separates **workflows** (LLMs and tools run along predefined code paths) from **agents** (the LLM directs its own process). The patterns: prompt chaining, routing, parallelization (sectioning or voting), orchestrator-workers, and evaluator-optimizer. Advice: start with the simplest solution, use direct APIs before frameworks (abstractions hide prompts and make debugging harder), and design the agent-computer interface and tool documentation carefully. Agents need stopping conditions (maximum iterations) and human checkpoints because errors compound — [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- Anthropic's multi-agent research system: a lead agent plans, saves the plan to memory, spawns parallel subagents, and a separate citation agent attributes claims. Measured results: agents use about 4x the tokens of chat and multi-agent systems about 15x; token usage explained about 80% of performance variance on BrowseComp; the multi-agent version beat single-agent Opus by 90.2% on breadth-first research; parallelism cut research time by up to 90%. Failure modes seen: spawning about 50 subagents for simple queries, endless searching for sources that don't exist, duplicated work when delegation was vague, and over-specific queries. Reliability measures: resume from checkpoints, full tracing, and rainbow deployments. Evals: LLM-as-judge with a 0-1 rubric (factual accuracy, citation accuracy, completeness, source quality, tool efficiency), starting with about 20 test queries, plus human review that caught agents preferring SEO content farms, plus end-state grading for stateful agents — [Anthropic, multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- **Claude surfaces (Oct 2026)**, from Anthropic's Claude API skill reference (model table cached 2026-10-06; check the pricing page). There are four ways to build an agent: (1) a manual Messages API loop; (2) the SDK **Tool Runner**, a harness only, with per-turn hooks for approval gates and logging; (3) **Claude Managed Agents** (beta), where Anthropic hosts both the loop and a per-session sandbox, with versioned agent configs, MCP and Skills, scheduled deployments (cron), "outcomes" (a grader iterates against a rubric), multi-agent rosters (up to 25 child threads), vault credentials, and permission policies (`always_allow` / `always_ask` / `auto`); (4) the **Claude Agent SDK**, the Claude Code harness as a library, self-hosted. The reference advises: "Start simple... only reach for agents when the task genuinely requires open-ended, model-driven exploration." — [Anthropic pricing/docs](https://www.anthropic.com/pricing#api); [Agent SDK docs](https://code.claude.com/docs/en/agent-sdk)
- **Model prices** (per MTok in/out): Opus 5.5 `claude-opus-5-5` $4/$20 (cache reads $0.20, 1M context, effort defaults to medium, thinking cannot be disabled); Sonnet 5.5 `claude-sonnet-5-5` $2/$10; Haiku 5.5 `claude-haiku-5-5` $0.10/$0.50 (up to 100K-token prompts; $0.50/$2.50 above that). The Batch API is 50% off for async work. Prompt caching is prefix-based. Server-side web search and fetch tools exist (`web_search_20260209`, with dynamic filtering) — [Anthropic pricing](https://www.anthropic.com/pricing#api) (taken from the bundled API reference, not fetched live)
- Managed Agents runtime is reportedly **$0.08 per active session-hour** (idle time free) on top of normal token rates with no markup. Web search is $10 per 1,000 searches. Session runtime replaces separate container-hour billing — [TrueFoundry](https://www.truefoundry.com/blog/claude-managed-agents-pricing); [Verdent](https://verdent.ai/guides/claude-managed-agents-pricing) (secondary sources)
- **Durable workflow engines**: Temporal is the heavyweight option (7 language SDKs, needs a cluster plus a worker fleet, Cloud reportedly from about $200/mo). Inngest is event-driven serverless (50k step runs/mo free, Hobby from about $20/mo). Trigger.dev is Apache-2.0, TypeScript task-based, with machine-size selection and first-class self-hosting. Restate and DBOS are alternatives. No independent benchmarks exist — [AutomationAtlas Inngest vs Temporal](https://automationatlas.io/guides/inngest-vs-temporal-2026-comparison/); [AutomationAtlas Trigger vs Inngest](https://automationatlas.io/guides/trigger-dev-vs-inngest-2026-comparison/); [Noqta](https://noqta.tn/blog/durable-execution-ai-agents-inngest-trigger-temporal-2026)
- Attio and Apollo both ship MCP servers, so agents can read and write the CRM and the data vendor through a standard tool interface — [Softr](https://www.softr.io/blog/attio-vs-hubspot)

### Inferences (recommended agent topology)
- **Hypothesis loop (agentic, Opus 5.5, high effort):** "Lab X is likely short of Y data (e.g. multilingual speech, code-review traces, licensed STEM textbooks) because of signals Z." Signals: model cards and system cards, eval leaderboards where the lab is weak, job posts ("data partnerships", "human data lead"), papers, funding and compute news, and public statements on licensed data. Each hypothesis becomes a row with evidence links, a confidence score, and a mapping to datasets in inventory. An evaluator-optimizer pass (a second model call with a rubric) scores specificity and evidence before a human sees it.
- **Account research (orchestrator-workers):** the lead agent (Opus 5.5) fans out to Sonnet 5.5 or Haiku 5.5 workers (people discovery, news, papers, procurement and legal signals), then a citation/verification pass. Cap subagents and tool calls per account to avoid the about-50-subagent failure mode.
- **Deterministic workflows (no agent):** the enrichment waterfall, entity resolution, email verification, sequence enrollment, reply routing, and quote math. Put these in Inngest or Trigger.dev functions (TypeScript, little ops work), or Temporal if the team prefers it. Each LLM call is a retryable step so a crash resumes, not restarts.
- **Where Managed Agents fits:** nightly scheduled "signal sweep" and "hypothesis refresh" deployments, and outcome-graded research dossiers. Keep the system of record (Postgres) outside it and write results through a custom tool or MCP.
- **Memory:** structured memory goes in Postgres (accounts, contacts, interactions, hypotheses), plus pgvector over research notes, call transcripts (Granola-type tools) and email threads for retrieval. Agents read curated per-account "dossier" documents, not raw history, to limit context and cost.
- **Cost control:** route by task (Haiku for classification and extraction, Sonnet for drafting and research workers, Opus for hypotheses, quotes and final review). Use the Batch API for nightly enrichment summaries, prompt caching for stable system prompts and the dataset catalog, per-run task budgets or session budgets, and per-account spend caps stored in the database.
- **Evals:** a golden set of about 20-50 past accounts and emails. LLM-judge rubrics for factual accuracy of claims about the lab, personalization specificity, compliance (no confidential claims), and tone. Track human edit distance on approved drafts as an online metric.

### Gaps
- I found no published case studies of LangGraph vs Claude Agent SDK vs Managed Agents specifically for GTM agents. The comparison above is reasoned, not sourced.
- Managed Agents pricing comes only from secondary sites.

## 3. Human-in-the-loop: approval queues, confidence thresholds, audit logs, multi-founder collaboration

### Takeaway
Every successful deployment found keeps humans approving outbound messages, at least early on. Vendors like Amplemarket Duo build the product around "AI drafts, rep approves". For a few dozen high-value accounts, every first-touch email, every quote, and every reply that is not a simple classification should go through an approval queue, with full audit logging.

### Cited Findings
- SaaStr reads every message for the first 30 days of any new agent and says the AI "isn't truly autonomous" — [SaaStr](https://www.saastr.com/6-months-of-ai-sdrs-whats-worked)
- Amplemarket Duo's model: it monitors signals, drafts outreach, and suggests sequences for reps to review and approve — [ZoomInfo pipeline blog](https://pipeline.zoominfo.com/sales/amplemarket-review)
- Anthropic: agents should "pause for human feedback at checkpoints or when encountering blockers," use stopping conditions, and show planning steps for transparency — [Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- Claude tooling has built-in hooks for this: Tool Runner per-turn hooks give approval gates and logging, and Managed Agents permission policies (`always_ask`, `auto`) can pause a session at a tool call such as `send_email` until a human confirms — [Anthropic docs](https://www.anthropic.com/pricing#api) (from the API skill reference)
- Commentary in 2026 (Aceverse) argues the data favors human-in-the-loop copilots over autonomous replacement. This is an opinion, not a measured study — [Aceverse (snippet)](https://www.aceverse.co/en/blog/ai-sdr-bdr-2026)

### Inferences (design)
- **Approval queue as a first-class table:** `approval_request(id, kind[email|linkedin|quote|stage_change], payload_json, draft_version, model, prompt_hash, confidence, risk_flags[], requested_by_agent_run, assigned_to, status, decided_by, decided_at, edit_diff)`. The UI is an inbox: approve / edit-and-approve / reject with a reason. Rejection reasons and edit diffs feed back into evals and few-shot examples.
- **Tiered autonomy by risk:**
  - Auto: enrichment, research notes, reply classification, internal tasks.
  - Single approval: first-touch and follow-up emails, LinkedIn notes.
  - Two-founder approval: quotes above a threshold, exclusive-licensing terms, anything mentioning pricing or data provenance or legal terms.
- **Confidence thresholds:** combine the model's self-rated confidence (via structured output) with deterministic checks (verified email, bounce risk, contact seniority, recency of the signal used) and a judge score. Only drafts above threshold enter the queue; the rest go back to research.
- **Audit log:** an append-only `event` table (event-sourced): actor (human or agent run id), action, entity, before/after, model id, token cost, tool calls, and source URLs. This is needed for provenance, which matters especially when selling training data to labs that run vendor diligence.
- **Multi-founder collaboration:** owner per account, a shared queue, Slack or email notifications for pending approvals, row-level security in Supabase, and an optimistic-lock or version field on drafts.

### Gaps
- I found no quantitative studies of approval-queue throughput or of what threshold calibration reduces errors.

## 4. Data model (lead/account/contact/opportunity/dataset/quote), CRM schema practices, entity resolution, enrichment waterfalls

### Takeaway
Use your own Postgres as the system of record, with a CRM like Attio as an optional UI and sync target. HubSpot gates custom objects behind Enterprise and Attio does not, and this business needs non-standard objects (Dataset, Hypothesis, Quote line items, Data Requirement). Enrich with a cost-ordered waterfall (cheap or free sources first, then pay-per-hit), verify every email, and store field-level provenance.

### Cited Findings
- HubSpot custom objects require Enterprise (about $150/user/mo, up to 10 definitions). Attio has custom objects on paid plans and is better suited to non-standard objects; HubSpot is better for marketing automation and integrations — [Softr](https://www.softr.io/blog/attio-vs-hubspot); [Causo seed CRM guide](https://hub.causo.ai/guides/hubspot-vs-pipedrive-vs-attio-seed-crm-2026)
- **Waterfall mechanics:** try providers in sequence until one returns data (e.g. Apollo, then Clearbit, then Hunter, then Datagma). Each failed provider still uses credits — [Zeliq](https://www.zeliq.com/blog/clay-pricing)
- **People Data Labs:** a developer API with about 1.5B person profiles and 74M+ companies. Pricing is reported inconsistently ($0.01-$0.05/record, with a reported $100/mo minimum and 100 free records/mo) — [ZoomInfo pipeline blog](https://pipeline.zoominfo.com/sales/people-data-labs-pricing); [Autobound](https://www.autobound.ai/blog/best-b2b-data-enrichment-apis)
- **ZoomInfo:** no public pricing. Median contract is about $33.5k/yr (Vendr 2026, 1,551 purchases); other estimates are $15-22k/yr. It is strongest for US mobile numbers and intent data — [Knowlee](https://www.knowlee.ai/compare/zoominfo-vs-apollo-io); [Crustdata](https://crustdata.com/blog/zoominfo-vs-apollo)
- **Accuracy is contested:** a competitor (Prospeo) estimates email accuracy at about 90% for PDL, about 80% for Apollo and about 85% for ZoomInfo. Sources advise running your own sample and measuring bounce rates — [Prospeo](https://prospeo.io/s/data-enrichment-api)
- Verify every address before it enters a sequence, because bounces damage domain reputation — [Prospeo volume guide](https://prospeo.io/s/cold-email-volume-best-practices); [Revenue Systems Lab snippet](https://revenuesystemslab.substack.com/p/ai-sdr-tools)

### Inferences (proposed schema, Postgres)
- `organization` (canonical account: domain(s), legal name, aliases, parent_org_id for e.g. Google DeepMind under Alphabet, type [frontier_lab|neolab|big_tech|...], tier, owner_user_id)
- `person` (canonical: names, linkedin_url, current role, seniority, function [data partnerships|research|procurement|legal]) plus `employment(person_id, org_id, title, start, end)`, so job changes are tracked
- `contact_point(person_id, type[email|phone|linkedin], value, verification_status, verified_at, source, confidence)`
- `signal(org_id/person_id, type[job_post|paper|model_release|funding|news|web_visit|reply], url, observed_at, extracted_json)`
- `hypothesis(org_id, statement, data_need_category, evidence_signal_ids[], confidence, status[proposed|approved|testing|validated|rejected], created_by_run)`
- `lead` (a hypothesis-scoped working item: org, target persons, stage [researching|ready|in_sequence|engaged|qualified|disqualified])
- `dataset` (catalog: modality, domain, languages, size (tokens/hours/images), license type, provenance/consent docs, exclusivity availability, supplier_id, unit cost basis) and `dataset_sample`
- `opportunity(org_id, hypothesis_id, stage [discovery|sample_sent|eval|negotiation|contract|closed_won|closed_lost], amount, close_date, loss_reason)` plus `opportunity_dataset` (many-to-many)
- `quote(opportunity_id, version, status[draft|pending_approval|sent|accepted|expired], currency, terms[license type, exclusivity, term, field-of-use], valid_until)` plus `quote_line(dataset_id, unit, qty, unit_price, discount, cost_basis, margin)`. Quote math is deterministic code; the LLM writes only the narrative and terms summary.
- `activity` (emails, meetings, LinkedIn touches, linked to thread ids) and the append-only `event` audit log
- Field-level provenance: an `attribute_value(entity, field, value, source, fetched_at, confidence)` table, or JSONB `sources` per field, so a waterfall can be re-run and conflicts resolved
- **Entity resolution:** deterministic keys first (normalized domain, LinkedIn URL, email), then fuzzy name and company match (trigram), then an LLM adjudicator (Haiku) for ambiguous pairs, with a human merge queue. Model lab subsidiaries explicitly with a parent org (e.g. lab vs parent big-tech company).
- **Waterfall order for this niche:** (1) free public sources and the agent's own web research (lab websites, papers, author emails on arXiv), (2) Apollo API (low marginal cost on a seat plan), (3) PDL per-record, (4) Hunter or another email finder, (5) a verifier (e.g. ZeroBounce or NeverBounce; I did not research their prices), (6) LinkedIn Sales Navigator for manual checks. ZoomInfo's $15-35k/yr is hard to justify when the whole TAM is a few hundred people.

### Gaps
- No independent 2026 accuracy benchmark for PDL, Apollo, ZoomInfo or Hunter on AI-lab personnel specifically.
- Clearbit's current status (absorbed into HubSpot as Breeze Intelligence) and its pricing were not verified in this session.

## 5. Outreach infrastructure: warmup, inbox rotation, deliverability, reply classification, multichannel, meeting booking

### Takeaway
The requirements are fixed: SPF, DKIM, DMARC, a spam complaint rate under 0.1-0.3%, one-click unsubscribe, and verified lists. Volume is spread across warmed secondary-domain inboxes at about 25-50 cold sends per inbox per day. LinkedIn automation carries real account-ban risk in 2026. For a market of a few hundred people, low-volume, founder-sent, highly researched email (Gmail API from real founder inboxes, plus maybe 1-2 warmed secondary domains) beats a high-volume rotation setup.

### Cited Findings
- Gmail and Yahoo bulk-sender rules: SPF, DKIM and DMARC; spam complaint rate below 0.3% (Google recommends under 0.1%); one-click unsubscribe honored within 2 days; the "bulk sender" threshold is about 5,000 messages a day to Gmail. One vendor claims Gmail started rejecting non-compliant mail at the SMTP level in Nov 2025 (unverified) — [EmailListValidation](https://emaillistvalidation.com/blog/gmail-and-yahoo-bulk-sender-requirements-explained/); [Folderly](https://generate.folderly.com/blog/gmail-yahoo-outlook-sender-requirements-2026); [LeadHaste](https://leadhaste.com/blog/gmail-deliverability-requirements-2026)
- Volume per inbox: estimates for a warmed Workspace inbox range from 20-30 to 30-50 a day (domains 90+ days old), up to about 100 for aggressive operators. New inboxes start at 10-30 a day after 2-4 weeks of warmup. Warmup emails count toward the cap. Use 3-5 inboxes per domain and keep a domain under about 500 cold sends a day. Google's system cap is 2,000 a day per paid user, which is not a safe outreach figure — [MailReach](https://mailreach.co/blog/google-workspace-email-sending-limits); [LeadHaste](https://leadhaste.com/blog/google-workspace-cold-email-limits-2026); [Smartlead](https://smartlead.ai/blog/how-many-cold-emails-per-day)
- Inbox rotation: simple round-robin ignores differences in domain age and health. Segment inbox pools by domain, provider, age and health. Sudden pattern changes (doubling volume, switching warmup tools) can reset reputation — [Instantly](https://instantly.ai/blog/inbox-rotation?lng=en); [Causo H1 2026 deliverability report](https://hub.causo.ai/guides/h1-2026-cold-email-deliverability-report)
- LinkedIn: LinkedIn reportedly removed HeyReach's company page and banned its founder's profile in March 2026 (competitor-reported; no LinkedIn statement found). HeyReach's documentation caps connection requests at 40 a day (recommends 25) and 200 a week. Expandi ramps from 5 actions a day and stays under about 100 requests a week. A claim that about 40% of accounts using flagged tools were restricted in Q1 2026 is unverified. Cloud tools with dedicated IPs are lower risk than browser extensions or cookie-based tools — [Valley](https://joinvalley.co/blog/linkedin-automation-safety-2026); [Zeliq](https://www.zeliq.com/blog/linkedin-automation-2026)
- Warm, signal-based lists get roughly twice the positive response of cold lists (SaaStr: 11-12% vs about 5.5%) — [SaaStr](https://www.saastr.com/6-months-of-ai-sdrs-whats-worked)

### Inferences
- **Sending:** at this market size, about 300-1,000 total contacts a year, so send from the founders' real Google Workspace inboxes through the Gmail API (draft created by an agent, approved, then sent via `users.messages.send`, tracking threadId). That avoids most warmup work. If a sequencer is wanted for follow-up cadences, Smartlead or Instantly (about $40-100/mo) with 1-2 secondary domains (e.g. `getbrand.com`) and 2-3 inboxes each, warmed for 4+ weeks.
- **Reply classification:** Gmail push (Pub/Sub watch), then a Haiku 5.5 classifier with structured output (`interested | meeting_request | referral | not_now | objection_pricing | objection_provenance | unsubscribe | OOO | bounce`). Unsubscribes and bounces are handled deterministically and immediately; interested replies trigger a drafted response into the approval queue and an alert.
- **LinkedIn:** manual or semi-manual for this audience (founder-sent connection notes drafted by an agent). If automated at all, go through a cloud tool or API (e.g. Unipile, HeyReach) within the low limits, and accept the ban risk only on non-founder accounts. Better channels for labs: warm intros, conferences (NeurIPS, ICML), and research-community presence.
- **Meeting booking:** Cal.com or Calendly links in approved replies, with a booking webhook that creates a meeting activity and moves the stage. Use a call recorder or notetaker (Granola is connected in this environment) and feed transcripts to an agent that updates opportunity fields and drafts the follow-up and quote.

### Gaps
- Google's own postmaster documentation was not fetched directly; the thresholds come from secondary sources.
- No data found on reply rates specifically for AI-lab buyers.

## 6. Recommended stack for a small team, and rough costs

### Takeaway
A pragmatic 2026 stack: Supabase (Postgres, auth, RLS, pgvector, realtime) plus a Next.js internal app (approval inbox, pipeline board, dossiers) plus Inngest or Trigger.dev for durable workflows plus the Claude API (Opus 5.5, Sonnet 5.5 and Haiku 5.5 by task; Managed Agents for scheduled research sweeps) plus the Gmail API plus Apollo/PDL enrichment, optionally with Attio as the CRM UI. Rough all-in cost is about $500-2,000 a month before people, mostly data and LLM spend.

### Cited Findings (component prices)
- Claude: Opus 5.5 $4/$20, Sonnet 5.5 $2/$10, Haiku 5.5 $0.10/$0.50 per MTok; Batch 50% off; cache reads $0.20/MTok on Opus and Sonnet 5.5 — [Anthropic pricing](https://www.anthropic.com/pricing#api)
- Managed Agents: $0.08 per active session-hour plus tokens; web search $10 per 1,000 — [TrueFoundry](https://www.truefoundry.com/blog/claude-managed-agents-pricing)
- Inngest: 50k step runs/mo free, Hobby from about $20/mo. Temporal Cloud from about $200/mo — [AutomationAtlas](https://automationatlas.io/guides/inngest-vs-temporal-2026-comparison/)
- Apollo $59-149/user/mo; PDL about $0.01-0.05/record; Clay $185-495/mo; ZoomInfo about $15-35k/yr — sources in section 4 and section 1
- Smartlead from $39/mo; Instantly from about $47/mo; Lemlist $69-109/user/mo — [Valley](https://www.joinvalley.co/blog/instantly-vs-smartlead-vs-lemlist)
- Attio from about $34-79/seat/mo; HubSpot custom objects need Enterprise (about $150/user/mo) — [Softr](https://www.softr.io/blog/attio-vs-hubspot)
- Common Room from about $1k/mo — [MarketBetter](https://marketbetter.ai/blog/common-room-review-2026/)

### Inferences (estimated monthly budget, 3 founders)
| Component | Choice | Est. $/mo |
|---|---|---|
| DB/auth/vector | Supabase Pro | ~$25-100 (not verified this session) |
| App hosting | Vercel/Next.js | ~$20-60 (not verified) |
| Durable workflows | Inngest/Trigger.dev | $0-100 |
| LLM | Claude mix (see below) | ~$200-800 |
| Managed Agents runtime | nightly sweeps, ~1-3 hrs/day | ~$3-8 + tokens |
| Enrichment | Apollo Basic/Pro 1-2 seats + PDL pay-as-you-go | ~$100-400 |
| Email verification | verifier credits | ~$20-50 (not verified) |
| Sending | Gmail (existing Workspace) + optional Smartlead + 2 domains/4 inboxes | ~$0-150 |
| CRM UI (optional) | Attio 3 seats | ~$100-240 |
| Scheduling/notes | Cal.com, Granola | ~$0-100 |
| **Total** | | **~$500-2,000** |
- LLM sanity check: deep research on one account with a multi-agent run is maybe 0.5-2M tokens, mostly Sonnet/Haiku input with caching, so roughly $1-5 per account dossier. Even 200 accounts a month is under $1k. Drafting and classification are negligible on Haiku 5.5. (Estimated from list prices; not measured.)
- **Build order:** (1) schema plus event log plus Next.js approval inbox; (2) enrichment waterfall plus entity resolution as Inngest functions; (3) research orchestrator (Claude API Tool Runner or Agent SDK) writing dossiers and hypotheses; (4) Gmail send and reply classification; (5) quote builder (deterministic pricing plus LLM narrative, two-founder approval); (6) nightly scheduled signal sweeps (Managed Agents deployments or Inngest cron); (7) evals and dashboards (stage conversion, reply rate by hypothesis type, cost per qualified opportunity).
- **Framework choice:** LangGraph is reasonable if the team wants graph checkpointing in Python. But Anthropic's guidance (simple patterns, direct APIs) plus a durable engine for checkpointing covers the same needs with less abstraction. Avoid stacking LangGraph and Temporal; pick one durability layer.

### Gaps
- Supabase, Vercel, Hunter, ZeroBounce, Cal.com, Sales Navigator and Unipile prices were not verified in this session. The numbers in the table marked "not verified" are rough placeholders.
- I found no public reference architecture specifically for B2B data-licensing or quote workflows; that design is inferred.
