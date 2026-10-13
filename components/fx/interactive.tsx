"use client";

import { useEffect, useRef, useState } from "react";

const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Sets --mx/--my (px) on the element as the pointer moves, for CSS spotlights. */
export function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div ref={ref} onPointerMove={move} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}

/** 3D tilt toward the cursor with a moving glare. */
export function Tilt({ children, className = "", max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    if (!canHover() || reduced()) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  }
  function leave() {
    const el = ref.current!;
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  }
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt relative transition-transform duration-300 ease-out will-change-transform ${className}`}>
      {children}
      <div className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit]" />
    </div>
  );
}

/** Pulls its child toward the cursor when nearby. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  function move(e: React.PointerEvent) {
    if (!canHover() || reduced()) return;
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => (ref.current!.style.transform = "")}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </span>
  );
}

/** Fades/slides children in when scrolled into view. */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setShown(true); io.disconnect(); }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${shown ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

/** Counts the numeric part of a stat like "$12.5M" or "+67%" up from zero when visible. */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);
  useEffect(() => {
    const m = value.match(/^(\D*)([\d.]+)(.*)$/);
    if (!m || reduced()) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    setText(`${pre}${(0).toFixed(decimals)}${post}`);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        const eased = 1 - (1 - k) ** 3;
        setText(`${pre}${(target * eased).toFixed(decimals)}${post}`);
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref} className={className}>{text}</span>;
}

/** Soft glowing aura that trails the cursor across the page (desktop only). */
export function CursorAura() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!canHover() || reduced()) return;
    const el = ref.current!;
    let x = -500, y = -500, tx = -500, ty = -500, raf = 0, hot = false;
    const move = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as HTMLElement | null;
      const now = !!t?.closest("a,button,summary,[data-hot]");
      if (now !== hot) { hot = now; el.dataset.hot = String(hot); }
      el.style.opacity = "1";
    };
    const tick = () => {
      x += (tx - x) * 0.14; y += (ty - y) * 0.14;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    const hide = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", hide);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);
  return <div ref={ref} aria-hidden="true" className="cursor-aura" />;
}

/** Thin progress bar showing how far down the page you are. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const on = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return <div ref={ref} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-cobalt to-lime" />;
}
