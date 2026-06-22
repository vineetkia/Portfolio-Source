"use client";

import { useEffect, useRef } from "react";

export type AsciiTheme = "ai" | "distributed" | "fullstack" | "fintech";

type Grid = string[][];

const COLS = 40;
const ROWS = 12;

function blank(): Grid {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(" "));
}
function put(g: Grid, x: number, y: number, ch: string) {
  if (y >= 0 && y < ROWS && x >= 0 && x < COLS) g[y][x] = ch;
}
function text(g: Grid, x: number, y: number, s: string) {
  for (let i = 0; i < s.length; i++) put(g, x + i, y, s[i]);
}
function render(g: Grid): string {
  return g.map((r) => r.join("")).join("\n");
}

// Two servers exchanging packets (request → ack) over a link.
function distributed(t: number): string {
  const g = blank();
  const top = 3;
  const ax = 2;
  const bx = COLS - 8;
  const lit = Math.floor(t / 3) % 2 === 0 ? "▓▓" : "░░";
  const box = (x: number, label: string) => {
    text(g, x, top, "┌────┐");
    text(g, x, top + 1, `│${lit}  │`);
    text(g, x, top + 2, `│ ${label}  │`);
    text(g, x, top + 3, "└────┘");
  };
  box(ax, "A");
  box(bx, "B");

  const linkY = top + 2;
  const x0 = ax + 6;
  const x1 = bx - 1;
  for (let x = x0; x < x1; x++) put(g, x, linkY, "·");

  const span = x1 - x0;
  const cycle = span * 2 + 6;
  const ph = t % cycle;
  if (ph < span) {
    put(g, x0 + ph, linkY, "►");
    put(g, x0 + ph - 1, linkY, "►");
  } else if (ph >= span + 3 && ph < span * 2 + 3) {
    const p = ph - (span + 3);
    put(g, x1 - p, linkY, "◄");
    put(g, x1 - p + 1, linkY, "◄");
  }
  text(g, ax, top + 4, ph < span ? " send→" : " ←ack ");
  return render(g);
}

// A small neural network with a pulse lighting up one layer at a time.
function ai(t: number): string {
  const g = blank();
  const layers = [6, 19, 32];
  const rows = [2, 5, 8];
  const active = Math.floor(t / 4) % layers.length;

  // connections
  for (let li = 0; li < layers.length - 1; li++) {
    const xa = layers[li] + 1;
    const xb = layers[li + 1] - 1;
    for (const ya of rows) {
      for (const yb of rows) {
        const steps = 5;
        for (let s = 1; s < steps; s++) {
          const x = Math.round(xa + ((xb - xa) * s) / steps);
          const y = Math.round(ya + ((yb - ya) * s) / steps);
          if (g[y][x] === " ") put(g, x, y, "·");
        }
      }
    }
  }
  // nodes
  layers.forEach((lx, li) => {
    rows.forEach((ry) => {
      put(g, lx, ry, li === active ? "◉" : "o");
    });
  });
  text(g, 13, 11, active === 2 ? "inference →" : "forward ··");
  return render(g);
}

// A request token travelling down a UI / API / DB stack and back up.
function fullstack(t: number): string {
  const g = blank();
  const x = 9;
  const w = 18;
  const top = 1;
  const bar = (y: number, label: string) => {
    text(g, x, y, "│" + label.padEnd(w - 2) + "│");
  };
  text(g, x, top, "┌" + "─".repeat(w - 2) + "┐");
  bar(top + 1, "  UI  · React");
  text(g, x, top + 2, "├" + "─".repeat(w - 2) + "┤");
  bar(top + 3, "  API · Node");
  text(g, x, top + 4, "├" + "─".repeat(w - 2) + "┤");
  bar(top + 5, "  DB  · SQL");
  text(g, x, top + 6, "└" + "─".repeat(w - 2) + "┘");

  const stops = [top + 1, top + 3, top + 5];
  const cycle = stops.length * 2 - 2;
  const ph = t % cycle;
  const idx = ph < stops.length ? ph : cycle - ph;
  const y = stops[idx];
  put(g, x + w, y, "◀");
  put(g, x + w + 1, y, "●");
  text(g, x, top + 8, ph < stops.length ? " request ↓" : " response ↑");
  return render(g);
}

// A scrolling, upward-trending line chart.
function fintech(t: number): string {
  const g = blank();
  const baseY = ROWS - 1;
  for (let x = 2; x < COLS; x++) put(g, x, baseY, "─");
  put(g, 0, Math.floor(ROWS / 2), "$");

  const height = (x: number) => {
    const v =
      Math.sin((x + t * 0.6) * 0.35) * 2.1 + (x / COLS) * 5 + 3.2;
    return Math.max(1, Math.min(ROWS - 2, Math.round(v)));
  };
  let prev = height(2);
  for (let x = 2; x < COLS - 1; x++) {
    const h = height(x);
    const y = baseY - h;
    let ch = "─";
    if (h > prev) ch = "╱";
    else if (h < prev) ch = "╲";
    put(g, x, y, ch);
    prev = h;
  }
  const pct = 12 + Math.round((Math.sin(t * 0.15) + 1) * 9);
  text(g, COLS - 8, 0, `▲ +${pct}%`);
  return render(g);
}

const SCENES: Record<AsciiTheme, (t: number) => string> = {
  distributed,
  ai,
  fullstack,
  fintech,
};

// Per-project thematic ASCII scene, animated ~12fps. Pauses off-screen and
// respects reduced motion.
export default function ProjectAscii({
  theme,
  seed = 0,
  className = "",
}: {
  theme: AsciiTheme;
  seed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const scene = SCENES[theme];

    let raf = 0;
    let running = false;
    let frame = seed;
    let last = 0;

    const draw = () => {
      node.textContent = scene(Math.floor(frame));
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 90) return; // ~11fps
      last = now;
      frame += 1;
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
  }, [theme, seed]);

  return (
    <pre
      ref={ref}
      aria-hidden
      className={`select-none whitespace-pre font-mono leading-[1.1] ${className}`}
    />
  );
}
