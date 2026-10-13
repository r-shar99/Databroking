"use client";

import { useEffect, useRef } from "react";

// Hero background: a field of data points that bends away from the cursor and
// lights up near it, with "drops" of data falling through the grid.
export function DataField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 26;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let pts: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];
    const drops: { x: number; y: number; v: number; len: number }[] = [];
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

      // Connect points near the cursor: a little live network.
      if (mouse.x > -999) {
        ctx.lineWidth = 1;
        const near = pts.filter((p) => Math.hypot(p.x - mouse.x, p.y - mouse.y) < 110);
        for (let i = 0; i < near.length; i += 2) {
          const a = near[i], b = near[(i * 7 + 3) % near.length];
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          ctx.strokeStyle = `rgba(47,60,255,${0.25 * (1 - d / 110)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }

      // Falling drops, snapped to grid columns.
      if (drops.length < 14 && Math.random() < 0.08) {
        drops.push({ x: Math.floor(Math.random() * (w / GAP)) * GAP + GAP / 2, y: -40, v: 2 + Math.random() * 3, len: 30 + Math.random() * 60 });
      }
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.v;
        const g = ctx.createLinearGradient(d.x, d.y - d.len, d.x, d.y);
        g.addColorStop(0, "rgba(47,60,255,0)");
        g.addColorStop(1, "rgba(47,60,255,0.55)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(d.x, d.y - d.len); ctx.lineTo(d.x, d.y); ctx.stroke();
        ctx.fillStyle = "rgba(212,255,58,0.9)";
        ctx.fillRect(d.x - 2, d.y - 2, 4, 4);
        if (d.y - d.len > h) drops.splice(i, 1);
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
