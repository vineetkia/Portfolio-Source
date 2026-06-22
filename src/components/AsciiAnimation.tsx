"use client";

import { useEffect, useRef } from "react";

const RAMP = " .:-=+*#%@";

// A lightweight ASCII "plasma" banner: a grid of monospace characters driven by
// layered sine waves, redrawn ~15fps for a terminal/hacker texture. Pauses when
// off-screen and respects reduced motion.
export default function AsciiAnimation({
  className = "",
  rows = 9,
  cols = 96,
}: {
  className?: string;
  rows?: number;
  cols?: number;
}) {
  const ref = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let running = false;
    let t = 0;
    let last = 0;

    const frame = () => {
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v =
            Math.sin(x * 0.18 + t) +
            Math.sin(y * 0.5 - t * 0.8) +
            Math.sin((x + y) * 0.12 + t * 1.3);
          const n = (v + 3) / 6; // 0..1
          out += RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.floor(n * RAMP.length)))];
        }
        out += "\n";
      }
      node.textContent = out;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 66) return; // ~15fps
      last = now;
      t += 0.08;
      frame();
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

    frame();
    if (!prefersReduced) start();

    return () => {
      stop();
      io.disconnect();
    };
  }, [rows, cols]);

  return (
    <pre
      ref={ref}
      aria-hidden
      className={`overflow-hidden whitespace-pre font-mono leading-[1.05] text-emerald-500/30 ${className}`}
    />
  );
}
