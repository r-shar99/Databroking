"use client";

import { useEffect, useState } from "react";

type Seg = string | { pii: string; tag: string };

const lines: { ch: string; who: Seg; t: string; msg: Seg[] }[] = [
  {
    ch: "#eng-oncall",
    who: { pii: "maya.chen", tag: "PERSON_1" },
    t: "02:14",
    msg: ["Prod is paging again. Rolling back ", "deploy 4812", ". Customer ", { pii: "acme-logistics", tag: "CUSTOMER_7" }, " is seeing 500s."],
  },
  {
    ch: "#eng-oncall",
    who: { pii: "dev.patel", tag: "PERSON_2" },
    t: "02:16",
    msg: ["Root cause is the migration lock. Fix in ", "PR #2291", ". Key ", { pii: "sk_live_9f2c…", tag: "SECRET" }, " rotated."],
  },
  {
    ch: "#support",
    who: { pii: "sam.okafor", tag: "PERSON_3" },
    t: "09:02",
    msg: ["Refund approved for ", { pii: "j.rivera@gmail.com", tag: "EMAIL" }, " (ticket ", "SUP-1180", "). Closing the loop with ", { pii: "+1 415 555 0134", tag: "PHONE" }, "."],
  },
];

function Piece({ seg, scrubbed }: { seg: Seg; scrubbed: boolean }) {
  if (typeof seg === "string") return <>{seg}</>;
  return scrubbed ? (
    <span className="rounded bg-lime px-1 font-semibold text-ink">[{seg.tag}]</span>
  ) : (
    <span className="rounded bg-red-500/15 px-1 text-red-300 underline decoration-red-400/60 decoration-wavy underline-offset-2">
      {seg.pii}
    </span>
  );
}

export function RedactionDemo() {
  const [scrubbed, setScrubbed] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setScrubbed((s) => !s), 3200);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-night-2 shadow-2xl shadow-cobalt/30"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <button
          type="button"
          onClick={() => setScrubbed((s) => !s)}
          className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white/70 hover:text-white"
          aria-pressed={scrubbed}
        >
          <span className={`size-1.5 rounded-full ${scrubbed ? "bg-lime" : "bg-red-400"}`} />
          {scrubbed ? "scrubbed · ready to license" : "raw export · not sellable"}
        </button>
      </div>
      <div className="relative space-y-4 overflow-hidden p-5 font-mono text-[12.5px] leading-relaxed text-white/80">
        <div
          key={String(scrubbed)}
          aria-hidden="true"
          className="scan-beam pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-lime/15 to-transparent"
        />
        {lines.map((l, i) => (
          <div key={i}>
            <div className="mb-1 flex gap-2 text-[11px] text-white/40">
              <span>{l.ch}</span>
              <span>·</span>
              <span className="text-white/60">
                <Piece seg={l.who} scrubbed={scrubbed} />
              </span>
              <span>{l.t}</span>
            </div>
            <p>
              {l.msg.map((s, j) => (
                <Piece key={j} seg={s} scrubbed={scrubbed} />
              ))}
            </p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 border-t border-white/10 font-mono text-[10.5px] uppercase tracking-wider text-white/50">
        {[
          ["PII", scrubbed ? "0 found" : "6 found"],
          ["Secrets", scrubbed ? "0 found" : "1 found"],
          ["Signal kept", "100%"],
        ].map(([k, v]) => (
          <div key={k} className="border-r border-white/10 px-4 py-3 last:border-r-0">
            <div>{k}</div>
            <div className={`mt-0.5 text-[12px] ${k === "Signal kept" || scrubbed ? "text-lime" : "text-red-300"}`}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
