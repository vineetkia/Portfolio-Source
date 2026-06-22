"use client";

import { useEffect, useRef } from "react";

// Multi-agent constellation: four agents (TrueStar's TARS) orbit a central
// synthesis core, firing pulses inward as they merge findings and across the
// ring as they debate. An ambient metaphor for the adversarial research engine.
export function AgentConstellation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;

    const resize = () => {
      const r = parent.getBoundingClientRect();
      width = r.width;
      height = r.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const AGENTS = 4;
    const agents = Array.from({ length: AGENTS }, (_, i) => ({
      angle: (i / AGENTS) * Math.PI * 2,
      speed: 0.0015 + i * 0.0004,
      radius: 0.24 + (i % 2) * 0.05,
      wobble: Math.random() * Math.PI * 2,
    }));

    type Pulse = { from: number; to: number; t: number; speed: number };
    const pulses: Pulse[] = [];
    const spawnPulse = () => {
      const from = Math.floor(Math.random() * AGENTS);
      const toCore = Math.random() < 0.6;
      let to = -1;
      if (!toCore) {
        do {
          to = Math.floor(Math.random() * AGENTS);
        } while (to === from);
      }
      pulses.push({ from, to, t: 0, speed: 0.012 + Math.random() * 0.01 });
    };

    let raf: number | null = null;
    let running = false;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const R = Math.min(width, height);
      const core = { x: cx, y: cy };

      const pos = agents.map((a) => {
        const r = a.radius * R + Math.sin(frame * 0.01 + a.wobble) * 8;
        return {
          x: cx + Math.cos(a.angle) * r * 1.5,
          y: cy + Math.sin(a.angle) * r,
        };
      });

      ctx.lineWidth = 1;
      pos.forEach((p) => {
        ctx.strokeStyle = "rgba(16,185,129,0.10)";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(core.x, core.y);
        ctx.stroke();
      });
      for (let i = 0; i < AGENTS; i++) {
        const a = pos[i];
        const b = pos[(i + 1) % AGENTS];
        ctx.strokeStyle = "rgba(16,185,129,0.06)";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pl = pulses[i];
        pl.t += pl.speed;
        if (pl.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const a = pos[pl.from];
        const b = pl.to === -1 ? core : pos[pl.to];
        const x = a.x + (b.x - a.x) * pl.t;
        const y = a.y + (b.y - a.y) * pl.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
        glow.addColorStop(0, "rgba(110,231,183,0.9)");
        glow.addColorStop(1, "rgba(110,231,183,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      const coreGlow = ctx.createRadialGradient(
        core.x,
        core.y,
        0,
        core.x,
        core.y,
        28
      );
      coreGlow.addColorStop(0, "rgba(52,211,153,0.5)");
      coreGlow.addColorStop(1, "rgba(52,211,153,0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(core.x, core.y, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(52,211,153,0.9)";
      ctx.beginPath();
      ctx.arc(core.x, core.y, 3.5, 0, Math.PI * 2);
      ctx.fill();

      pos.forEach((p) => {
        ctx.fillStyle = "rgba(52,211,153,0.85)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(52,211,153,0.22)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
        ctx.stroke();
      });
    };

    const step = () => {
      raf = requestAnimationFrame(step);
      frame += 1;
      agents.forEach((a) => (a.angle += a.speed));
      if (frame % 18 === 0 && pulses.length < 18) spawnPulse();
      draw();
    };

    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      step();
    };
    const stop = () => {
      running = false;
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(parent);

    if (prefersReduced) draw();
    else start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
