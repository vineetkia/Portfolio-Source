"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGsap, prefersReducedMotion } from "@/lib/gsap";

const ITEMS = [
  "TypeScript",
  "React",
  "Next.js",
  "Python",
  "FastAPI",
  "LLMs",
  "RAG",
  "Vector Search",
  "gRPC",
  "Kubernetes",
  "Docker",
  "Kafka",
  "PostgreSQL",
  "Redis",
  "AWS",
  "Azure",
  "C#",
  "Java",
  "C++",
  "GSAP",
  "Three.js",
];

// A slow, seamless drifting ribbon of the stack. Two identical tracks are
// translated -50% and looped, so the seam is invisible. Pauses on hover;
// static (no animation) under reduced-motion.
export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion() || !track.current) return;
      const tween = gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: 32,
        repeat: -1,
      });
      const el = track.current;
      const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.5 });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });
      el.addEventListener("pointerenter", slow);
      el.addEventListener("pointerleave", fast);
      return () => {
        el.removeEventListener("pointerenter", slow);
        el.removeEventListener("pointerleave", fast);
        tween.kill();
      };
    },
    { scope: track }
  );

  const row = (
    <div className="flex items-center gap-6 pr-6">
      {ITEMS.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-6">
          <span className="font-heading text-lg font-medium text-white/45 transition-colors hover:text-white/80 sm:text-xl">
            {item}
          </span>
          <span className="text-emerald-400/60">◇</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div ref={track} className="flex w-max items-center gap-6 will-change-transform">
        {row}
        {row}
      </div>
    </div>
  );
}
