"use client";

import { useState } from "react";

const sellers = [
  { id: "s1", label: "Shut-down fintech", sub: "Slack · Jira · GitHub, 6 yrs", m: ["b1", "b2"] },
  { id: "s2", label: "Acquired dev-tools co.", sub: "Code + linked tickets", m: ["b2", "b3"] },
  { id: "s3", label: "Bankrupt airline", sub: "Ops email & runbooks", m: ["b1", "b4"] },
  { id: "s4", label: "Call-center BPO", sub: "Consented call audio", m: ["b4", "b5"] },
  { id: "s5", label: "Video studio", sub: "Unpublished 4K footage", m: ["b1", "b5"] },
];
const buyers = [
  { id: "b1", label: "Frontier lab", sub: "Pretraining & post-training" },
  { id: "b2", label: "RL-environment vendor", sub: "Agent gyms" },
  { id: "b3", label: "Coding-agent startup", sub: "SWE trajectories" },
  { id: "b4", label: "Eval team", sub: "Real-world benchmarks" },
  { id: "b5", label: "Data broker", sub: "Resale-ready, cleared" },
];

const W = 1040, H = 420, LX = 240, RX = W - 240, CX = W / 2, CY = H / 2;
const y = (i: number) => 50 + i * ((H - 100) / 4);

export function MatchGraph() {
  const [active, setActive] = useState<string | null>("s1");

  const lit = (sid: string, bid: string) => {
    if (!active) return false;
    const s = sellers.find((x) => x.id === sid)!;
    return (active === sid && s.m.includes(bid)) || (active === bid && s.m.includes(bid));
  };
  const nodeLit = (id: string) =>
    !active || active === id || (active.startsWith("s") ? sellers.find((s) => s.id === active)!.m.includes(id) : sellers.find((s) => s.id === id)?.m.includes(active));

  const caption = active?.startsWith("s")
    ? `${sellers.find((s) => s.id === active)!.label} → ${sellers.find((s) => s.id === active)!.m.map((b) => buyers.find((x) => x.id === b)!.label).join(" & ")}`
    : active
      ? `${buyers.find((b) => b.id === active)!.label} ← ${sellers.filter((s) => s.m.includes(active)).map((s) => s.label).join(" & ")}`
      : "Hover a company or a buyer";

  return (
    <div className="rounded-3xl border border-line bg-card p-4 sm:p-8" onPointerLeave={() => setActive("s1")}>
      <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-wider text-muted">
        <span>Supply</span>
        <span className="hidden truncate text-cobalt sm:block">{caption}</span>
        <span>Demand</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="hidden h-auto w-full select-none sm:block" role="img" aria-label="DataDrop matches data sellers with buyers">
        <defs>
          <linearGradient id="edge" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-cobalt)" />
            <stop offset="1" stopColor="#7b5cff" />
          </linearGradient>
        </defs>

        {sellers.map((s, i) =>
          buyers.map((b, j) => {
            if (!s.m.includes(b.id)) return null;
            const on = lit(s.id, b.id);
            const d = `M${LX + 8},${y(i)} C${CX - 120},${y(i)} ${CX - 60},${CY} ${CX},${CY} S${CX + 120},${y(j)} ${RX - 8},${y(j)}`;
            return (
              <g key={s.id + b.id}>
                <path d={d} fill="none" stroke="var(--color-line)" strokeWidth={1.5} />
                <path
                  d={d}
                  fill="none"
                  stroke="url(#edge)"
                  strokeWidth={on ? 2.5 : 0}
                  strokeDasharray="6 8"
                  className="transition-all duration-300"
                  style={{ animation: on ? "dash 1s linear infinite" : undefined }}
                />
              </g>
            );
          }),
        )}

        {/* DataDrop hub */}
        <g>
          <circle cx={CX} cy={CY} r={46} fill="var(--color-ink)" />
          <circle cx={CX} cy={CY} r={46} fill="none" stroke="var(--color-lime)" strokeWidth={2} className="origin-center" style={{ transformBox: "fill-box", animation: "pulse-ring 2.4s ease-out infinite" }} />
          <path transform={`translate(${CX - 11},${CY - 20})`} d="M11 0C11 0 0 11.2 0 17.2 0 22.1 4.9 26 11 26s11-3.9 11-8.8C22 11.2 11 0 11 0Z" fill="var(--color-cobalt)" />
          <rect x={CX - 4} y={CY - 6} width={8} height={8} rx={1.5} fill="var(--color-lime)" />
        </g>

        {sellers.map((s, i) => (
          <Node key={s.id} x={LX} y={y(i)} label={s.label} sub={s.sub} side="l" on={!!nodeLit(s.id)} hot={active === s.id} onEnter={() => setActive(s.id)} />
        ))}
        {buyers.map((b, j) => (
          <Node key={b.id} x={RX} y={y(j)} label={b.label} sub={b.sub} side="r" on={!!nodeLit(b.id)} hot={active === b.id} onEnter={() => setActive(b.id)} />
        ))}
      </svg>
      {/* Small screens: tappable list instead of the diagram. */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {[sellers, buyers].map((col, k) => (
          <ul key={k} className="space-y-2">
            {col.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => setActive(n.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-[13px] font-medium transition ${
                    active === n.id ? "border-ink bg-lime" : nodeLit(n.id) ? "border-cobalt/50 bg-cobalt/5" : "border-line opacity-50"
                  }`}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] text-cobalt sm:hidden">{caption}</p>
    </div>
  );
}

function Node({ x, y, label, sub, side, on, hot, onEnter }: { x: number; y: number; label: string; sub: string; side: "l" | "r"; on: boolean; hot: boolean; onEnter: () => void }) {
  const anchor = side === "l" ? "end" : "start";
  const tx = side === "l" ? x - 18 : x + 18;
  return (
    <g onPointerEnter={onEnter} onClick={onEnter} className="cursor-pointer" style={{ opacity: on ? 1 : 0.3, transition: "opacity .3s" }} data-hot>
      <rect x={side === "l" ? x - 230 : x - 10} y={y - 24} width={240} height={48} fill="transparent" />
      <circle cx={x} cy={y} r={hot ? 9 : 7} fill={hot ? "var(--color-lime)" : side === "l" ? "var(--color-ink)" : "var(--color-cobalt)"} stroke="var(--color-ink)" strokeWidth={hot ? 2 : 0} style={{ transition: "r .2s" }} />
      <text x={tx} y={y - 2} textAnchor={anchor} className="fill-ink text-[15px] font-semibold">{label}</text>
      <text x={tx} y={y + 15} textAnchor={anchor} className="fill-muted font-mono text-[11px]">{sub}</text>
    </g>
  );
}
