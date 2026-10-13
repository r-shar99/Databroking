import type { Metadata } from "next";
import { DataField } from "@/components/fx/data-field";
import { Reveal } from "@/components/fx/interactive";
import { LeadForm } from "@/components/lead-form";
import { Eyebrow } from "@/components/ui";
import { sellerPromises } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sell your company's data",
  description: "Get a free, confidential valuation for your Slack, email, Jira and code archives. Founders, acquirers and trustees welcome.",
};

const drivers = [
  ["Headcount × years", "More people over more years means more trajectories of real work."],
  ["Tool diversity", "Slack plus Jira plus GitHub plus email is worth far more than any one of them alone."],
  ["Linkage", "Tickets tied to commits tied to discussions are the most valuable data."],
  ["Domain", "Regulated or expert domains like fintech, health and legal earn a premium."],
  ["Competition", "Several bidders reliably move the price up."],
];

export default function SellPage() {
  return (
    <section className="relative overflow-hidden">
      <DataField />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:py-24">
        <div className="min-w-0">
          <Eyebrow>For founders, acquirers &amp; trustees</Eyebrow>
          <h1 className="mt-5 text-5xl font-semibold leading-[1.03] tracking-tight">
            Find out what your archive is <span className="font-display font-normal italic text-cobalt">worth.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">
            Tell us what you have. Within 48 hours you get an indicative range and a plan for clearing the data. It&apos;s free,
            confidential and doesn&apos;t commit you to anything.
          </p>

          <div className="mt-10">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">What drives price</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {drivers.map(([h, b]) => (
                <li key={h} className="py-3.5">
                  <span className="font-medium">{h}.</span> <span className="text-ink-2">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-10 space-y-3 text-sm">
            {sellerPromises.map(([h]) => (
              <li key={h} className="flex items-center gap-2.5">
                <span className="flex size-5 items-center justify-center rounded-full bg-lime text-[11px]">✓</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <Reveal delay={150} className="lg:pt-4">
          <LeadForm kind="seller" />
        </Reveal>
      </div>
    </section>
  );
}
