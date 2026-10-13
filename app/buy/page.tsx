import type { Metadata } from "next";
import { DataField } from "@/components/fx/data-field";
import { Reveal } from "@/components/fx/interactive";
import { LeadForm } from "@/components/lead-form";
import { Eyebrow } from "@/components/ui";
import { buyerPromises } from "@/lib/content";

export const metadata: Metadata = {
  title: "Source real-world data",
  description: "Post a data request. DataDrop sources cleared workplace archives, code history and expert data for AI labs and data teams.",
};

const sample = `dataset:    workspace-archive/fintech-b2b
span:       2018-03 → 2025-11  (7.7 yrs)
peak_hc:    62
sources:    slack · jira · github · gmail · zendesk
volume:     4.1M messages · 38K tickets · 211K commits
linkage:    ticket↔PR↔thread  ✓
scrub:      PII · secrets · customer IDs  (multi-pass)
title:      counsel memo + seller authority  ✓
terms:      non-exclusive · field-of-use: model training`;

export default function BuyPage() {
  return (
    <section className="relative overflow-hidden">
      <DataField />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:py-24">
        <div className="min-w-0">
          <Eyebrow>For labs &amp; data teams</Eyebrow>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight">
            Real work. Real noise. <span className="font-display font-normal italic text-cobalt">Clean title.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            Post a request once. We source matching supply from shutdowns, acquisitions, bankruptcies and operating companies,
            and clear it before you see a sample.
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-night">
            <div className="border-b border-white/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-white/50">
              example listing card
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-white/80">{sample}</pre>
          </div>

          <ul className="mt-10 space-y-5">
            {buyerPromises.map(([h, b]) => (
              <li key={h}>
                <div className="font-medium">{h}</div>
                <p className="mt-1 text-sm text-ink-2">{b}</p>
              </li>
            ))}
          </ul>
        </div>
        <Reveal delay={150} className="lg:pt-4">
          <LeadForm kind="buyer" />
        </Reveal>
      </div>
    </section>
  );
}
