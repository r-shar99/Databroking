import Link from "next/link";
import { Magnetic, ScrollProgress } from "@/components/fx/interactive";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="22" height="26" viewBox="0 0 22 26" aria-hidden="true">
        <path d="M11 0C11 0 0 11.2 0 17.2 0 22.1 4.9 26 11 26s11-3.9 11-8.8C22 11.2 11 0 11 0Z" fill="var(--color-cobalt)" />
        <rect x="7" y="14" width="8" height="8" rx="1.5" fill="var(--color-lime)" />
      </svg>
      <span className="text-[1.05rem] font-semibold tracking-tight">DataDrop</span>
    </span>
  );
}

const nav = [
  { href: "/sell", label: "Sell data" },
  { href: "/buy", label: "Source data" },
  { href: "/trust", label: "Provenance" },
  { href: "/#how", label: "How it works" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="DataDrop home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-ink-2 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="group relative transition hover:text-ink">
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-cobalt transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/buy" className="hidden rounded-full px-4 py-2 text-sm font-medium text-ink-2 hover:text-ink sm:inline-block">
            For labs
          </Link>
          <Magnetic>
            <Link href="/sell" className="block rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition hover:bg-cobalt">
              Get a valuation
            </Link>
          </Magnetic>
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-night text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            We help companies sell their data to AI labs. We act as the seller&apos;s disclosed agent. We never take title to
            your data and we never resell it.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">Sellers</p>
          <ul className="space-y-2">
            <li><Link className="hover:text-white" href="/sell">Get a valuation</Link></li>
            <li><Link className="hover:text-white" href="/trust">How we scrub data</Link></li>
            <li><Link className="hover:text-white" href="/#faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">Buyers</p>
          <ul className="space-y-2">
            <li><Link className="hover:text-white" href="/buy">Post a data request</Link></li>
            <li><Link className="hover:text-white" href="/trust">Provenance packet</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} DataDrop</span>
          <span>This site is not legal advice. Every deal is reviewed by counsel.</span>
        </div>
      </div>
    </footer>
  );
}
