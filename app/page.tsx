import Link from "next/link";
import { RedactionDemo } from "@/components/redaction-demo";
import { Eyebrow, SectionTitle } from "@/components/ui";
import { buyerPromises, dataTypes, faqs, proof, sellerPromises, steps } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="grain relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-24">
          <div className="animate-drop">
            <Eyebrow>AI labs are buying company archives</Eyebrow>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.4rem]">
              Your company&apos;s history is training data.
              <span className="mt-1 block font-display text-[1.08em] font-normal italic text-cobalt">Get paid for it, cleanly.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
              DataDrop matchmakes companies with AI labs. We turn Slack, email, Jira and code into licensed, scrubbed datasets
              with clean provenance. Then we make buyers compete for them.
            </p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <Door
                href="/sell"
                kicker="I have data"
                title="Sell your company's data"
                body="Shutting down, acquired or pivoting? Turn your archives into a payout."
                primary
              />
              <Door
                href="/buy"
                kicker="I need data"
                title="Source real-world data"
                body="Workplace data for RL gyms, agents and evals, with provenance included."
              />
            </div>
          </div>
          <div className="animate-drop [animation-delay:150ms]">
            <RedactionDemo />
          </div>
        </div>
      </section>

      {/* Proof bar */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4">
          {proof.map((p) => (
            <a
              key={p.stat}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group border-line px-2 py-8 odd:border-r sm:px-6 lg:border-r lg:last:border-r-0"
            >
              <div className="font-display text-4xl tracking-tight sm:text-5xl">{p.stat}</div>
              <div className="mt-2 text-sm leading-snug text-ink-2">{p.label}</div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted group-hover:text-cobalt">
                {p.source} ↗
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* What sells */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionTitle
          eyebrow="What labs are buying"
          title="The mess of real work is the valuable part."
          sub="Models learn to act from real operational records: tickets that bounce between teams, 2am incident threads, code reviews linked to the bug that caused them. Public web data doesn't have this."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {dataTypes.map((d) => (
            <div key={d.name} className="bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold tracking-tight">{d.name}</h3>
                {d.hot && <span className="rounded-full bg-lime px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">In demand</span>}
              </div>
              <p className="mt-2 text-sm text-ink-2">{d.detail}</p>
              <p className="mt-6 font-mono text-xs text-cobalt">{d.range}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-muted">
          Ranges are reported market comparables, not quotes. Your price depends on volume, years covered, rarity and competition.
        </p>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-16 bg-night text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <SectionTitle
            dark
            eyebrow="How it works"
            title="From dusty export to signed licence in weeks."
            sub="Clearing data is the hard part, not finding a buyer. That's why every DataDrop deal runs through the same gates."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-white/10 bg-night-2 p-6">
                <span className="font-mono text-xs text-lime">{s.n}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Two sides */}
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <SideCard
          eyebrow="For sellers"
          title="Founders, acquirers & trustees"
          items={sellerPromises}
          cta={{ href: "/sell", label: "Get a free valuation" }}
          accent
        />
        <SideCard
          eyebrow="For buyers"
          title="Labs & data teams"
          items={buyerPromises}
          cta={{ href: "/buy", label: "Post a data request" }}
        />
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 border-t border-line bg-card">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr]">
          <SectionTitle eyebrow="FAQ" title="Questions sellers ask first." />
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium tracking-tight">
                  {f.q}
                  <span className="font-mono text-cobalt transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-cobalt px-8 py-16 text-white sm:px-14">
          <div className="absolute -right-16 -top-16 size-72 rounded-full bg-lime/20 blur-3xl" />
          <h2 className="relative max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Before you delete that workspace, <span className="font-display font-normal italic">find out what it&apos;s worth.</span>
          </h2>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <Link href="/sell" className="rounded-full bg-lime px-6 py-3 font-medium text-ink transition hover:bg-white">
              Get a valuation
            </Link>
            <Link href="/buy" className="rounded-full border border-white/30 px-6 py-3 font-medium transition hover:bg-white/10">
              I&apos;m a buyer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Door({ href, kicker, title, body, primary }: { href: string; kicker: string; title: string; body: string; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-2xl border p-5 transition hover:-translate-y-0.5 ${
        primary ? "border-ink bg-ink text-paper hover:bg-cobalt hover:border-cobalt" : "border-line bg-card hover:border-ink"
      }`}
    >
      <span className={`font-mono text-[11px] uppercase tracking-wider ${primary ? "text-lime" : "text-cobalt"}`}>{kicker}</span>
      <span className="mt-2 flex items-center justify-between text-lg font-semibold tracking-tight">
        {title}
        <span className="transition group-hover:translate-x-1">→</span>
      </span>
      <span className={`mt-1 text-sm ${primary ? "text-paper/70" : "text-ink-2"}`}>{body}</span>
    </Link>
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
    <div className={`flex flex-col rounded-3xl border p-8 sm:p-10 ${accent ? "border-ink bg-ink text-paper" : "border-line bg-card"}`}>
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
      <Link
        href={cta.href}
        className={`mt-10 self-start rounded-full px-5 py-2.5 text-sm font-medium transition ${
          accent ? "bg-lime text-ink hover:bg-white" : "bg-ink text-paper hover:bg-cobalt"
        }`}
      >
        {cta.label} →
      </Link>
    </div>
  );
}
