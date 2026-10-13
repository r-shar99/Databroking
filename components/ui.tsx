export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
        dark ? "border-white/20 text-white/70" : "border-line bg-card text-ink-2"
      }`}
    >
      <span className={`size-1.5 rounded-full ${dark ? "bg-lime" : "bg-cobalt"}`} />
      {children}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, sub, dark }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink-2"}`}>{sub}</p>}
    </div>
  );
}
