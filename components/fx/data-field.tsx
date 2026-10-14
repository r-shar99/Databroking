"use client";

import { useEffect, useRef } from "react";

// Hero background: a field of data points that bends away from the cursor and
// lights up near it.
export function DataField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 26;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let pts: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function resize() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) pts.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
    }

    function onMove(e: PointerEvent) {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.x < -999) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    }
    function onLeave() { mouse.tx = mouse.ty = -9999; }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      if (mouse.tx < -999) mouse.x = mouse.y = -9999;

      ctx.clearRect(0, 0, w, h);
      const R = 150;

      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < R) {
          const f = (1 - d / R) ** 2 * 2.2;
          p.vx += (dx / (d || 1)) * f;
          p.vy += (dy / (d || 1)) * f;
        }
        p.vx += (p.ox - p.x) * 0.06; p.vy += (p.oy - p.y) * 0.06;
        p.vx *= 0.8; p.vy *= 0.8;
        p.x += p.vx; p.y += p.vy;

        const glow = d < R * 1.4 ? 1 - d / (R * 1.4) : 0;
        if (glow > 0) {
          ctx.fillStyle = glow > 0.55 ? `rgba(212,255,58,${0.35 + glow * 0.65})` : `rgba(47,60,255,${0.18 + glow * 0.7})`;
          const s = 1.4 + glow * 2.4;
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        } else {
          ctx.fillStyle = "rgba(12,13,16,0.13)";
          ctx.fillRect(p.x - 0.75, p.y - 0.75, 1.5, 1.5);
        }
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const host = canvas.parentElement!;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    if (reduce) {
      // Draw one static frame.
      frame(); cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
