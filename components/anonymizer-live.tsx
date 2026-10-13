"use client";

import { useEffect, useRef, useState } from "react";

// Live hero demo: raw workplace messages stream in, PII is detected, then
// scrambled into consistent placeholders (same person → same tag every time).

type Kind = "PERSON" | "EMAIL" | "PHONE" | "SECRET" | "CUSTOMER" | "ADDRESS";
type Seg = string | { v: string; k: Kind };
type Msg = { ch: string; who: Seg; msg: Seg[] };

const P = (v: string): Seg => ({ v, k: "PERSON" });

const POOL: Msg[] = [
  { ch: "#eng-oncall", who: P("maya.chen"), msg: ["Prod paging again. Rolling back deploy 4812, ", { v: "Acme Logistics", k: "CUSTOMER" }, " is seeing 500s."] },
  { ch: "#eng-oncall", who: P("dev.patel"), msg: ["Root cause: migration lock. Fix in PR #2291. Rotated ", { v: "sk_live_9f2cA81", k: "SECRET" }, "."] },
  { ch: "#support", who: P("sam.okafor"), msg: ["Refund approved for ", { v: "j.rivera@gmail.com", k: "EMAIL" }, ", ticket SUP-1180."] },
  { ch: "#sales", who: P("maya.chen"), msg: ["Call ", P("Priya Nair"), " at ", { v: "+1 415 555 0134", k: "PHONE" }, " re: renewal."] },
  { ch: "#ops", who: P("lena.kim"), msg: ["Ship the replacement to ", { v: "88 Harbor St, Oakland", k: "ADDRESS" }, " by Friday."] },
  { ch: "#eng", who: P("dev.patel"), msg: ["@", P("maya.chen"), " the flaky test is back. Pairing after standup?"] },
  { ch: "#support", who: P("sam.okafor"), msg: [{ v: "Acme Logistics", k: "CUSTOMER" }, " asked for SSO. Logged as FEAT-77."] },
  { ch: "#infra", who: P("lena.kim"), msg: ["Leaked ", { v: "AKIA4XQ7ZP2", k: "SECRET" }, " in a gist, revoked and audited."] },
];

const COLORS: Record<Kind, string> = {
  PERSON: "text-sky-300 bg-sky-400/15 decoration-sky-400/70",
  EMAIL: "text-red-300 bg-red-400/15 decoration-red-400/70",
  PHONE: "text-orange-300 bg-orange-400/15 decoration-orange-400/70",
  SECRET: "text-fuchsia-300 bg-fuchsia-400/15 decoration-fuchsia-400/70",
  CUSTOMER: "text-amber-300 bg-amber-400/15 decoration-amber-400/70",
  ADDRESS: "text-rose-300 bg-rose-400/15 decoration-rose-400/70",
};
const GLYPHS = "▓▒░█#@%&$*+=<>/\\|01";
const STAGES = ["Ingest", "Detect", "Mask", "Verify"] as const;
type Phase = "type" | "detect" | "mask" | "done";

const segText = (s: Seg) => (typeof s === "string" ? s : s.v);
const rawLen = (m: Msg) => m.msg.reduce((n, s) => n + segText(s).length, 0);

export function AnonymizerLive() {
  const [items, setItems] = useState<{ id: number; m: Msg; tags: string[] }[]>([]);
  const [cur, setCur] = useState<{ id: number; m: Msg; phase: Phase; typed: number; p: number }>({ id: 0, m: POOL[0], phase: "type", typed: 0, p: 0 });
  const [stats, setStats] = useState({ msgs: 0, pii: 0, secrets: 0 });
  const tagMap = useRef(new Map<string, string>());
  const counts = useRef<Record<string, number>>({});
  const hover = useRef(false);

  // Consistent pseudonyms: the same raw value always gets the same tag.
  function tagFor(s: { v: string; k: Kind }) {
    const key = s.k + ":" + s.v.toLowerCase().replace(/^@/, "");
    let t = tagMap.current.get(key);
    if (!t) {
      counts.current[s.k] = (counts.current[s.k] ?? 0) + 1;
      t = s.k === "SECRET" ? "SECRET" : `${s.k}_${counts.current[s.k]}`;
      tagMap.current.set(key, t);
    }
    return t;
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setItems(POOL.slice(0, 4).map((m, i) => ({ id: i, m, tags: [] })));
      setCur((c) => ({ ...c, phase: "done", typed: rawLen(c.m), p: 1 }));
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      setCur((c) => {
        if (hover.current) return c;
        const len = rawLen(c.m);
        if (c.phase === "type") {
          return c.typed >= len ? { ...c, phase: "detect", p: 0 } : { ...c, typed: Math.min(len, c.typed + 2) };
        }
        if (c.phase === "detect") return c.p >= 1 ? { ...c, phase: "mask", p: 0 } : { ...c, p: c.p + 0.1 };
        if (c.phase === "mask") return c.p >= 1 ? { ...c, phase: "done", p: 0 } : { ...c, p: c.p + 0.07 };
        // New object even when finished, so the commit effect re-runs after a hover pause.
        return { ...c, p: Math.min(1, c.p + 0.12) };
      });
      t = setTimeout(step, 40);
    };
    t = setTimeout(step, 400);
    return () => clearTimeout(t);
  }, []);

  // Commit finished message and start the next one.
  useEffect(() => {
    if (cur.phase !== "done" || cur.p < 1 || hover.current) return;
    const pii = [cur.m.who, ...cur.m.msg].filter((s): s is { v: string; k: Kind } => typeof s !== "string");
    setStats((s) => ({ msgs: s.msgs + 1, pii: s.pii + pii.length, secrets: s.secrets + pii.filter((x) => x.k === "SECRET").length }));
    setItems((xs) => [...xs, { id: cur.id, m: cur.m, tags: [] }].slice(-3));
    const nextId = cur.id + 1;
    if (nextId % POOL.length === 0) {
      tagMap.current.clear();
      counts.current = {};
    }
    setCur({ id: nextId, m: POOL[nextId % POOL.length], phase: "type", typed: 0, p: 0 });
  }, [cur]);

  const stageIdx = cur.phase === "type" ? 0 : cur.phase === "detect" ? 1 : cur.phase === "mask" ? 2 : 3;

  return (
    <div
      onPointerEnter={() => (hover.current = true)}
      onPointerLeave={() => (hover.current = false)}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-night-2 text-white shadow-2xl shadow-cobalt/30"
    >
      {/* header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/70">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-lime" />
          </span>
          live · anonymizer
        </div>
        <div className="flex gap-1">
          {STAGES.map((s, i) => (
            <span
              key={s}
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${
                i === stageIdx ? "bg-lime text-ink" : i < stageIdx ? "bg-white/10 text-white/70" : "text-white/30"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* stream */}
      <div className="relative h-[310px] overflow-hidden px-5 pt-4 font-mono text-[12.5px] leading-relaxed">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-night-2 to-transparent" />
        <div className="absolute inset-x-5 bottom-4 space-y-4">
          {items.map((it) => (
            <Line key={it.id} m={it.m} phase="done" typed={Infinity} p={1} tagFor={tagFor} faded />
          ))}
          <Line key={cur.id} m={cur.m} phase={cur.phase} typed={cur.typed} p={cur.p} tagFor={tagFor} />
        </div>
        {cur.phase === "detect" && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-lime/15 to-transparent"
            style={{ bottom: `${cur.p * 80}px` }}
          />
        )}
      </div>

      {/* footer stats */}
      <div className="grid grid-cols-4 border-t border-white/10 font-mono text-[10.5px] uppercase tracking-wider text-white/50">
        {[
          ["Messages", stats.msgs],
          ["PII masked", stats.pii],
          ["Secrets", stats.secrets],
          ["Signal kept", "100%"],
        ].map(([k, v]) => (
          <div key={k} className="border-r border-white/10 px-3 py-3 last:border-r-0">
            <div className="truncate">{k}</div>
            <div className="mt-0.5 text-[13px] tabular-nums text-lime">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Line({
  m,
  phase,
  typed,
  p,
  tagFor,
  faded,
}: {
  m: Msg;
  phase: Phase;
  typed: number;
  p: number;
  tagFor: (s: { v: string; k: Kind }) => string;
  faded?: boolean;
}) {
  let left = typed;
  const typing = phase === "type";
  return (
    <div className={`transition-opacity duration-500 ${faded ? "opacity-55" : ""}`}>
      <div className="mb-1 flex items-center gap-2 text-[11px] text-white/40">
        <span>{m.ch}</span>
        <span>·</span>
        <Token s={m.who} phase={phase} p={p} tagFor={tagFor} />
        {phase === "done" && <span className="ml-auto text-lime">✓ clean</span>}
        {phase === "detect" && <span className="ml-auto text-red-300">scanning…</span>}
      </div>
      <p className="text-white/85">
        {m.msg.map((s, i) => {
          const text = segText(s);
          if (left <= 0) return null;
          const shown = Math.min(left, text.length);
          left -= text.length;
          if (typeof s === "string") return <span key={i}>{text.slice(0, shown)}</span>;
          if (typing) return <span key={i}>{text.slice(0, shown)}</span>;
          return <Token key={i} s={s} phase={phase} p={p} tagFor={tagFor} />;
        })}
        {typing && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-lime" />}
      </p>
    </div>
  );
}

function Token({ s, phase, p, tagFor }: { s: Seg; phase: Phase; p: number; tagFor: (s: { v: string; k: Kind }) => string }) {
  if (typeof s === "string") return <>{s}</>;
  if (phase === "type") return <span>{s.v}</span>;
  if (phase === "detect") {
    return (
      <span className={`relative rounded px-1 underline decoration-wavy underline-offset-2 transition-colors ${COLORS[s.k]}`}>
        {s.v}
        <span className="absolute -top-3.5 left-0 whitespace-nowrap text-[8.5px] tracking-wider opacity-80">
          {s.k} {(0.95 + ((s.v.length * 7) % 5) / 100).toFixed(2)}
        </span>
      </span>
    );
  }
  const tag = `[${tagFor(s)}]`;
  if (phase === "mask") {
    const keep = Math.floor(p * tag.length);
    const scrambled = tag
      .split("")
      .map((ch, i) => (i < keep ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join("");
    return <span className="rounded bg-white/10 px-1 text-lime">{scrambled}</span>;
  }
  return <span className="rounded bg-lime px-1 font-semibold text-ink">{tag}</span>;
}
