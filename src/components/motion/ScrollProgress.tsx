"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, registerGsap } from "@/lib/gsap";

// Thin scroll-progress bar pinned to the very top of the viewport. Rendered by
// SiteShell outside the smooth-scroll wrapper so it stays fixed.
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    registerGsap();
    if (!bar.current) return;
    gsap.set(bar.current, { scaleX: 0, transformOrigin: "left center" });
    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, {});

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-0.5"
    >
      <div
        ref={bar}
        style={{ transform: "scaleX(0)" }}
        className="h-full w-full origin-left bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-300"
      />
    </div>
  );
}
