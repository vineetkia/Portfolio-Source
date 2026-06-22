"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";

const BOOT_LINES = [
  "$ ssh vineet@vinet.dev",
  "Authenticating  [ OK ]",
  "Loading kernel modules  [ OK ]",
  "Mounting /experience /projects /skills  [ OK ]",
  "Initializing WebGL context  [ OK ]",
  "Compiling shaders  [ OK ]",
  "Spinning up portfolio.exe  [ OK ]",
  "Welcome.",
];

const ASCII = ` _   _ _____ _   _ _____ _____
| | | |_   _| \\ | |  ___|_   _|
| | | | | | |  \\| | |__   | |
| | | | | | | . \` |  __|  | |
\\ \\_/ /_| |_| |\\  | |___  | |
 \\___/ \\___/\\_| \\_|____/  \\_/`;

export function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      setWiping(true);
      setTimeout(onComplete, 900);
    };

    if (prefersReduced) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setLines(BOOT_LINES);
      setProgress(100);
      /* eslint-enable react-hooks/set-state-in-effect */
      const t = setTimeout(finish, 300);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line]);
        }, 150 + i * 320)
      );
    });

    const total = 150 + BOOT_LINES.length * 320 + 350;
    let start: number | null = null;
    let raf = 0;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(((now - start) / total) * 100, 100);
      setProgress(Math.round(p));
      if (p < 100) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      style={{
        clipPath: wiping ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
        opacity: wiping ? 0 : 1,
        filter: wiping ? "blur(6px)" : "blur(0px)",
        transition:
          "clip-path 0.9s cubic-bezier(0.76,0,0.24,1), opacity 0.9s ease, filter 0.9s ease",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 fx-scanlines opacity-60" />

      <div className="relative w-full max-w-xl px-6 font-mono text-sm">
        <pre className="mb-6 select-none text-[7px] leading-[1.1] text-emerald-400/90 sm:text-[10px]">
          {ASCII}
        </pre>

        <div className="space-y-1 text-emerald-300/90">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-emerald-500/50">›</span>
              <span>
                {line}
                {i === lines.length - 1 && !wiping && (
                  <span className="cursor-blink ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-emerald-400" />
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-emerald-500/60">
            <span>booting {profile.name.toLowerCase().replace(" ", "_")}</span>
            <span className="tabular-nums">{progress}%</span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-emerald-950">
            <div
              className="h-full bg-emerald-400"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
