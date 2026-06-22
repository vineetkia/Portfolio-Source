"use client";

import { useEffect, useRef } from "react";

const RAMP = " .:-=+*#%@";

export type AsciiVariant = "plasma" | "waves" | "rings" | "grid" | "rain";

type Field = (x: number, y: number, t: number, cols: number, rows: number) => number;

// Each variant returns a value in roughly [-2.5, 2.5] for a cell.
const FIELDS: Record<AsciiVariant, Field> = {
  plasma: (x, y, t) =>
    Math.sin(x * 0.18 + t) +
    Math.sin(y * 0.5 - t * 0.8) +
    Math.sin((x + y) * 0.12 + t * 1.3),
  waves: (x, y, t) =>
    Math.sin(x * 0.28 + t * 1.2) * 1.6 + Math.sin(y * 0.18 - t * 0.7) * 0.9,
  rings: (x, y, t, cols, rows) => {
    const dx = x - cols / 2;
    const dy = (y - rows / 2) * 2.2;
    const d = Math.sqrt(dx * dx + dy * dy);
    return Math.sin(d * 0.45 - t * 1.6) * 2.2;
  },
  grid: (x, y, t) =>
    Math.sin(x * 0.5 + t) * Math.sin(y * 0.6 - t * 0.9) * 2.4,
  rain: (x, y, t) => {
    const seed = Math.sin(x * 12.9898) * 43758.5453;
    const col = (seed - Math.floor(seed)) * 6;
    return Math.sin(y * 0.6 - t * 3 - col) * 2.4;
  },
};

// A lightweight animated ASCII field rendered as monospace text (~15fps).
// `variant` + `seed` make each instance look distinct. Pauses off-screen and
// respects reduced motion.
export default function AsciiAnimation({
  className = "",
  rows = 9,
  cols = 96,
  variant = "plasma",
  seed = 0,
  speed = 1,
}: {
  className?: string;
  rows?: number;
  cols?: number;
  variant?: AsciiVariant;
  seed?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const field = FIELDS[variant];

    let raf = 0;
    let running = false;
    let t = seed;
    let last = 0;

    const draw = () => {
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = field(x, y, t, cols, rows);
          const n = (v + 2.5) / 5; // → 0..1
          const idx = Math.max(
            0,
            Math.min(RAMP.length - 1, Math.floor(n * RAMP.length))
          );
          out += RAMP[idx];
        }
        out += "\n";
      }
      node.textContent = out;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 66) return; // ~15fps
      last = now;
      t += 0.08 * speed;
      draw();
    };

    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(node);

    draw();
    if (!prefersReduced) start();

    return () => {
      stop();
      io.disconnect();
    };
  }, [rows, cols, variant, seed, speed]);

  return (
    <pre
      ref={ref}
      aria-hidden
      className={`overflow-hidden whitespace-pre font-mono leading-[1.05] ${className}`}
    />
  );
}
