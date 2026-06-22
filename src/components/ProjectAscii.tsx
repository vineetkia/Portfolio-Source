"use client";

import { useEffect, useRef } from "react";

export type AsciiScene =
  | "waveform"
  | "vectorsearch"
  | "servers"
  | "mapreduce"
  | "stack"
  | "calendar"
  | "chart";

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

// ── Hyrd · voice-AI: a live audio waveform ──────────────────────────────
function waveform(t: number): string {
  const g = blank();
  const mid = 5;
  for (let x = 1; x < COLS - 1; x++) {
    const a =
      Math.sin(x * 0.5 + t * 0.5) * 0.6 + Math.sin(x * 0.27 - t * 0.33) * 0.4;
    const h = Math.round(Math.abs(a) * 4);
    if (h === 0) put(g, x, mid, "─");
    for (let k = 1; k <= h; k++) {
      const ch = k === h ? "▓" : "█";
      put(g, x, mid - k, ch);
      put(g, x, mid + k, ch);
    }
    put(g, x, mid, "█");
  }
  const dot = Math.floor(t / 3) % 2 === 0 ? "●" : "○";
  text(g, 1, ROWS - 1, `${dot} rec · voice-ai interview`);
  return render(g);
}

// ── Clinical RAG · vector similarity search ─────────────────────────────
const VEC_POINTS: Array<[number, number]> = [
  [4, 1], [8, 2], [12, 1], [16, 3], [6, 4], [10, 5], [14, 4],
  [22, 1], [26, 3], [30, 1], [34, 2], [24, 5], [28, 4], [32, 5],
  [5, 7], [9, 8], [13, 7], [17, 9], [7, 9], [11, 9], [3, 3], [37, 4],
  [23, 8], [27, 9], [31, 7], [35, 8], [33, 3], [19, 1],
];
function vectorsearch(t: number): string {
  const g = blank();
  const qx = 20 + Math.round(3 * Math.cos(t * 0.18));
  const qy = 5 + Math.round(2 * Math.sin(t * 0.18));

  const ranked = VEC_POINTS.map(([x, y]) => ({
    x,
    y,
    d: (x - qx) ** 2 + ((y - qy) * 2.2) ** 2,
  })).sort((a, b) => a.d - b.d);
  const top = new Set(ranked.slice(0, 4).map((p) => `${p.x},${p.y}`));

  ranked.slice(0, 4).forEach((p) => {
    const steps = 5;
    for (let s = 1; s < steps; s++) {
      const lx = Math.round(qx + ((p.x - qx) * s) / steps);
      const ly = Math.round(qy + ((p.y - qy) * s) / steps);
      if (g[ly] && g[ly][lx] === " ") put(g, lx, ly, "∙");
    }
  });
  VEC_POINTS.forEach(([x, y], i) => {
    const ch = top.has(`${x},${y}`) ? "●" : (i + t) % 7 === 0 ? "∘" : "·";
    put(g, x, y, ch);
  });
  const pulse = Math.floor(t / 2) % 2 === 0 ? "◎" : "◍";
  put(g, qx, qy, pulse);
  text(g, 1, ROWS - 1, "vector search · top-k retrieval");
  return render(g);
}

// ── Self-Healing Mesh · two servers exchanging packets ──────────────────
function servers(t: number): string {
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
  text(g, ax, top + 4, ph < span ? " heal→" : " ←ack ");
  return render(g);
}

// ── Fire Query · coordinator fanning out to workers (map-reduce) ─────────
function mapreduce(t: number): string {
  const g = blank();
  text(g, 2, 4, "┌───┐");
  text(g, 2, 5, "│ C │");
  text(g, 2, 6, "└───┘");
  const wy = [1, 5, 9];
  const wx = COLS - 6;
  wy.forEach((y, i) => {
    text(g, wx, y, "┌───┐");
    text(g, wx, y + 1, `│W${i + 1} │`);
    text(g, wx, y + 2, "└───┘");
  });
  const jx = 13;
  for (let x = 7; x <= jx; x++) put(g, x, 5, "─");
  for (let y = 2; y <= 10; y++) put(g, jx, y, "│");
  put(g, jx, 5, "├");
  const branchY = wy.map((y) => y + 1);
  branchY.forEach((by) => {
    for (let x = jx + 1; x < wx; x++) put(g, x, by, "·");
    put(g, jx, by, "├");
    put(g, wx - 1, by, "►");
  });
  // tasks flowing out, staggered per branch
  branchY.forEach((by, i) => {
    const span = wx - 1 - (jx + 1);
    const ph = (t + i * 4) % (span + 6);
    if (ph < span) put(g, jx + 1 + ph, by, "►");
  });
  text(g, 2, 9, "map→");
  text(g, 2, 10, "←reduce");
  return render(g);
}

// ── Campus Marketplace · UI / API / DB request-response stack ────────────
function stack(t: number): string {
  const g = blank();
  const x = 9;
  const w = 18;
  const top = 1;
  const row = (y: number, label: string) =>
    text(g, x, y, "│" + label.padEnd(w - 2) + "│");
  text(g, x, top, "┌" + "─".repeat(w - 2) + "┐");
  row(top + 1, "  UI  · React");
  text(g, x, top + 2, "├" + "─".repeat(w - 2) + "┤");
  row(top + 3, "  API · Spring");
  text(g, x, top + 4, "├" + "─".repeat(w - 2) + "┤");
  row(top + 5, "  DB  · Postgres");
  text(g, x, top + 6, "└" + "─".repeat(w - 2) + "┘");
  const stops = [top + 1, top + 3, top + 5];
  const cycle = stops.length * 2 - 2;
  const ph = t % cycle;
  const idx = ph < stops.length ? ph : cycle - ph;
  put(g, x + w, stops[idx], "◀");
  put(g, x + w + 1, stops[idx], "●");
  text(g, x, top + 8, ph < stops.length ? " request ↓" : " response ↑");
  return render(g);
}

// ── Study Pilot · planner calendar with a moving day + tasks ─────────────
const TASK_DAYS = new Set([3, 6, 9, 12, 17, 21, 25]);
function calendar(t: number): string {
  const g = blank();
  const labels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  labels.forEach((d, i) => text(g, 3 + i * 5, 0, d));
  for (let i = 0; i < 28; i++) {
    const c = i % 7;
    const r = Math.floor(i / 7);
    const x = 3 + c * 5;
    const y = 2 + r * 2;
    text(g, x, y, String(i + 1).padStart(2, "0"));
    if (TASK_DAYS.has(i + 1)) put(g, x + 2, y, "·");
  }
  const idx = Math.floor(t / 2) % 28;
  const hx = 3 + (idx % 7) * 5;
  const hy = 2 + Math.floor(idx / 7) * 2;
  put(g, hx - 1, hy, "[");
  put(g, hx + 2, hy, "]");
  if (TASK_DAYS.has(idx + 1)) put(g, hx + 2, hy, "✓");
  text(g, 1, ROWS - 1, "study planner · agenda");
  return render(g);
}

// ── TradeHub · rising market chart ──────────────────────────────────────
function chart(t: number): string {
  const g = blank();
  const baseY = ROWS - 1;
  for (let x = 2; x < COLS; x++) put(g, x, baseY, "─");
  put(g, 0, Math.floor(ROWS / 2), "$");
  const height = (x: number) =>
    Math.max(
      1,
      Math.min(ROWS - 2, Math.round(Math.sin((x + t * 0.6) * 0.35) * 2.1 + (x / COLS) * 5 + 3.2))
    );
  let prev = height(2);
  for (let x = 2; x < COLS - 1; x++) {
    const h = height(x);
    const y = baseY - h;
    put(g, x, y, h > prev ? "╱" : h < prev ? "╲" : "─");
    prev = h;
  }
  const pct = 12 + Math.round((Math.sin(t * 0.15) + 1) * 9);
  text(g, COLS - 8, 0, `▲ +${pct}%`);
  return render(g);
}

const SCENES: Record<AsciiScene, (t: number) => string> = {
  waveform,
  vectorsearch,
  servers,
  mapreduce,
  stack,
  calendar,
  chart,
};

// Per-project thematic ASCII scene, animated ~11fps. Pauses off-screen and
// respects reduced motion.
export default function ProjectAscii({
  scene,
  seed = 0,
  className = "",
}: {
  scene: AsciiScene;
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
    const draw = SCENES[scene];

    let raf = 0;
    let running = false;
    let frame = seed;
    let last = 0;

    const paint = () => {
      node.textContent = draw(Math.floor(frame));
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 90) return;
      last = now;
      frame += 1;
      paint();
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
    paint();
    if (!prefersReduced) start();

    return () => {
      stop();
      io.disconnect();
    };
  }, [scene, seed]);

  return (
    <pre
      ref={ref}
      aria-hidden
      className={`select-none whitespace-pre font-mono leading-[1.1] ${className}`}
    />
  );
}
