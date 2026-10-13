import Link from "next/link";
import { DataField } from "@/components/fx/data-field";
import { CountUp, Magnetic, Reveal, Spotlight, Tilt } from "@/components/fx/interactive";
import { MatchGraph } from "@/components/match-graph";
import { RedactionDemo } from "@/components/redaction-demo";
import { Eyebrow, SectionTitle } from "@/components/ui";
import { buyerPromises, dataTypes, faqs, proof, sellerPromises, sources, steps } from "@/lib/content";

const headline = "Your company's history is training data.".split(" ");

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <DataField />
        <div className="float-slow pointer-events-none absolute -left-40 top-20 size-[28rem] rounded-full bg-cobalt/10 blur-3xl" />
        <div className="float-slow pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-lime/25 blur-3xl [animation-delay:-7s]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
          <div>
            <div className="animate-drop">
              <Eyebrow>AI labs are buying company archives</Eyebrow>
            </div>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              {headline.map((w, i) => (
                <span key={i} className="word" style={{ animationDelay: `${80 + i * 70}ms` }}>
                  {w}&nbsp;
                </span>
              ))}
              <span className="word mt-1 block" style={{ animationDelay: `${120 + headline.length * 70}ms` }}>
                <span className="text-shimmer font-display text-[1.08em] font-normal italic">Get paid for it, cleanly.</span>
              </span>
            </h1>
            <p className="animate-drop mt-6 max-w-xl text-lg leading-relaxed text-ink-2 [animation-delay:600ms]">
              DataDrop matchmakes companies with AI labs and data brokers. We turn Slack, email, Jira and code into licensed,
              scrubbed datasets with clean provenance. Then we make buyers compete for them.
            </p>

            <div className="animate-drop mt-9 grid gap-3 [animation-delay:750ms] sm:grid-cols-2">
              <Door href="/sell" kicker="I have data" title="Sell your company's data" body="Shutting down, acquired or pivoting? Turn your archives into a payout." primary />
              <Door href="/buy" kicker="I need data" title="Source real-world data" body="Workplace data for RL gyms, agents and evals, with provenance included." />
            </div>
          </div>
          <div className="animate-drop [animation-delay:300ms]">
            <Tilt className="rounded-2xl">
              <RedactionDemo />
            </Tilt>
            <p className="mt-3 text-center font-mono text-[11px] text-muted">Hover to pause · click the badge to toggle</p>
          </div>
        </div>
      </section>

      {/* Source marquee */}
      <section className="border-y border-line bg-ink py-4 text-paper">
        <div className="marquee overflow-hidden">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-widest">
            {[...sources, ...sources].map((s, i) => (
              <span key={i} className="flex items-center gap-10 text-paper/70">
                {s}
                <span className="text-lime">◆</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <section className="bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
          {proof.map((p, i) => (
            <Reveal key={p.stat} delay={i * 90} className="border-line odd:border-r lg:border-r lg:last:border-r-0">
              <a href={p.href} target="_blank" rel="noreferrer" className="group block px-2 py-8 transition hover:bg-paper sm:px-6">
                <CountUp value={p.stat} className="block font-display text-4xl tracking-tight tabular-nums sm:text-5xl" />
                <div className="mt-2 text-sm leading-snug text-ink-2">{p.label}</div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted group-hover:text-cobalt">{p.source} ↗</div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Matchmaking graph */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal>
            <SectionTitle
              eyebrow="The matchmaking"
              title="Every archive has a buyer. We find the right one."
              sub="Different buyers want different data. We match each dataset to the buyers who'll pay most for it, then make them compete."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <MatchGraph />
          </Reveal>
        </div>
      </section>

      {/* What sells */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <Reveal>
            <SectionTitle
              eyebrow="What labs are buying"
              title="The mess of real work is the valuable part."
              sub="Models learn to act from real operational records: tickets that bounce between teams, 2am incident threads, code reviews linked to the bug that caused them. Public web data doesn't have this."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataTypes.map((d, i) => (
              <Reveal key={d.name} delay={(i % 3) * 90} className="h-full">
                <Spotlight className="h-full rounded-2xl border border-line bg-card p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold tracking-tight">{d.name}</h3>
                    {d.hot && <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">In demand</span>}
                  </div>
                  <p className="mt-2 text-sm text-ink-2">{d.detail}</p>
                  <p className="mt-6 font-mono text-xs text-cobalt">{d.range}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted">
            Ranges are reported market comparables, not quotes. Your price depends on volume, years covered, rarity and competition.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-16 bg-night text-white">
        <Spotlight className="spotlight-dark spotlight-noborder">
          <div className="grid-reveal pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
            <Reveal>
              <SectionTitle
                dark
                eyebrow="How it works"
                title="From dusty export to signed licence in weeks."
                sub="Clearing data is the hard part, not finding a buyer. That's why every DataDrop deal runs through the same gates."
              />
            </Reveal>
            <div className="relative mt-14 grid gap-6 md:grid-cols-4">
              <div className="absolute left-6 right-6 top-[2.1rem] hidden h-px bg-gradient-to-r from-lime/0 via-lime/50 to-lime/0 md:block" />
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 120} className="h-full">
                  <div className="group relative h-full rounded-2xl border border-white/10 bg-night-2/80 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-lime/50">
                    <span className="relative z-10 inline-flex size-8 items-center justify-center rounded-full border border-lime/40 bg-night font-mono text-xs text-lime transition group-hover:bg-lime group-hover:text-ink">
                      {s.n}
                    </span>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Spotlight>
      </section>

      {/* Two sides */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <Reveal className="h-full">
          <SideCard eyebrow="For sellers" title="Founders, acquirers & trustees" items={sellerPromises} cta={{ href: "/sell", label: "Get a free valuation" }} accent />
        </Reveal>
        <Reveal delay={120} className="h-full">
          <SideCard eyebrow="For buyers" title="Labs, brokers & data teams" items={buyerPromises} cta={{ href: "/buy", label: "Post a data request" }} />
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 border-t border-line bg-card">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <SectionTitle eyebrow="FAQ" title="Questions sellers ask first." />
          </Reveal>
          <Reveal delay={100}>
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-tight transition hover:text-cobalt">
                    {f.q}
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line font-mono text-cobalt transition group-open:rotate-45 group-open:bg-lime">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <Reveal>
          <Spotlight className="spotlight-dark overflow-hidden rounded-3xl bg-cobalt px-8 py-16 text-white sm:px-14">
            <div className="float-slow pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-lime/25 blur-3xl" />
            <div className="float-slow pointer-events-none absolute -bottom-24 left-10 size-72 rounded-full bg-[#7b5cff]/40 blur-3xl [animation-delay:-5s]" />
            <h2 className="relative max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Before you delete that workspace, <span className="font-display font-normal italic">find out what it&apos;s worth.</span>
            </h2>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/sell" className="block rounded-full bg-lime px-6 py-3 font-medium text-ink transition hover:bg-white">
                  Get a valuation
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/buy" className="block rounded-full border border-white/30 px-6 py-3 font-medium transition hover:bg-white/10">
                  I&apos;m a buyer
                </Link>
              </Magnetic>
            </div>
          </Spotlight>
        </Reveal>
      </section>
    </>
  );
}

function Door({ href, kicker, title, body, primary }: { href: string; kicker: string; title: string; body: string; primary?: boolean }) {
  return (
    <Spotlight className={`group rounded-2xl ${primary ? "spotlight-dark" : ""}`}>
      <Link
        href={href}
        className={`flex h-full flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-0.5 ${
          primary ? "border-ink bg-ink text-paper hover:shadow-xl hover:shadow-cobalt/30" : "border-line bg-card/90 backdrop-blur hover:shadow-xl hover:shadow-ink/10"
        }`}
      >
        <span className={`font-mono text-[11px] uppercase tracking-wider ${primary ? "text-lime" : "text-cobalt"}`}>{kicker}</span>
        <span className="mt-2 flex items-center justify-between text-lg font-semibold tracking-tight">
          {title}
          <span className="transition group-hover:translate-x-1">→</span>
        </span>
        <span className={`mt-1 text-sm ${primary ? "text-paper/70" : "text-ink-2"}`}>{body}</span>
      </Link>
    </Spotlight>
  );
}

function SideCard({
  eyebrow,
  title,
  items,
  cta,
  accent,
}: {
  eyebrow: string;
  title: string;
  items: string[][];
  cta: { href: string; label: string };
  accent?: boolean;
}) {
  return (
    <Spotlight className={`flex h-full flex-col rounded-3xl border p-8 sm:p-10 ${accent ? "spotlight-dark border-ink bg-ink text-paper" : "border-line bg-card"}`}>
      <Eyebrow dark={accent}>{eyebrow}</Eyebrow>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight">{title}</h3>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map(([h, b]) => (
          <li key={h}>
            <div className="flex items-center gap-2 font-medium">
              <span className={`size-1.5 rounded-full ${accent ? "bg-lime" : "bg-cobalt"}`} />
              {h}
            </div>
            <p className={`mt-1.5 text-sm leading-relaxed ${accent ? "text-paper/65" : "text-ink-2"}`}>{b}</p>
          </li>
        ))}
      </ul>
      <Magnetic className="mt-10 self-start">
        <Link
          href={cta.href}
          className={`block rounded-full px-5 py-2.5 text-sm font-medium transition ${accent ? "bg-lime text-ink hover:bg-white" : "bg-ink text-paper hover:bg-cobalt"}`}
        >
          {cta.label} →
        </Link>
      </Magnetic>
    </Spotlight>
  );
}
