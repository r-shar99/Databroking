import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, SectionTitle } from "@/components/ui";

export const metadata: Metadata = {
  title: "Provenance & compliance",
  description: "How DataDrop clears title, scrubs personal data and structures licences before any data changes hands.",
};

const gates = [
  {
    title: "Authority to sell",
    body: "We confirm who can sign for the company's assets: the founder, the board, the acquirer, or a trustee with court approval. Nothing moves without that.",
  },
  {
    title: "Chain of title",
    body: "We check workspace ownership, contractor and customer agreements, and third-party content. Data that the company doesn't own is excluded.",
  },
  {
    title: "Privacy-policy fit",
    body: "We read what your privacy policy and customer terms promised at the time the data was collected. Some datasets need to be narrowed, and some need to be dropped.",
  },
  {
    title: "Privileged & sensitive material",
    body: "Legal, HR and health channels are flagged and removed in a pre-sale review.",
  },
  {
    title: "Multi-pass scrub",
    body: "Names, emails, phone numbers, addresses, customer identifiers, credentials and API keys are replaced with consistent placeholders, so conversations stay coherent.",
  },
  {
    title: "Licence, not sale",
    body: "Deals are licences with field-of-use limits, no-reidentification clauses and deletion on termination. We act as the seller's disclosed agent and never take title.",
  },
];

export default function TrustPage() {
  return (
    <>
      <section className="grain">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <Eyebrow>Provenance is the product</Eyebrow>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl">
            Six gates between your export and <span className="font-display font-normal italic text-cobalt">anyone&apos;s model.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
            Labs pay more for data they can defend. Sellers sleep better when the people in their data are protected. Every
            DataDrop deal passes the same gates, and the buyer gets the paperwork to prove it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {gates.map((g, i) => (
            <li key={g.title} className="bg-card p-7">
              <span className="font-mono text-xs text-cobalt">GATE {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{g.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-night text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <SectionTitle
            dark
            eyebrow="The provenance packet"
            title="What every buyer receives."
            sub="It's one bundle per dataset, so legal teams at labs can approve a deal in days, not months."
          />
          <ul className="space-y-3 self-end font-mono text-sm">
            {[
              "Seller authority & signatory record",
              "Chain-of-title memo from counsel",
              "Privacy-policy review summary",
              "Scrub report: entity counts in and out",
              "Exclusions log (channels, date ranges, people)",
              "Licence terms & field-of-use schedule",
            ].map((x) => (
              <li key={x} className="flex items-center gap-3 rounded-xl border border-white/10 bg-night-2 px-4 py-3">
                <span className="text-lime">✓</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-20 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Ready to start?</h2>
        <div className="flex gap-3">
          <Link href="/sell" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-cobalt">
            Sell data
          </Link>
          <Link href="/buy" className="rounded-full border border-ink px-5 py-2.5 text-sm font-medium hover:bg-ink hover:text-paper">
            Source data
          </Link>
        </div>
      </section>
    </>
  );
}
