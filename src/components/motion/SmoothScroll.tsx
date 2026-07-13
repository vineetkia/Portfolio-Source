"use client";

import { useRef, type ReactNode } from "react";
import {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  registerGsap,
  prefersReducedMotion,
  canUseHeavyMotion,
} from "@/lib/gsap";

// Owns the two global motion systems:
//   1. ScrollSmoother  — buttery inertia scroll (desktop, non-reduced-motion).
//   2. A single batched ScrollTrigger that reveals every `.reveal` element,
//      replacing the previous per-element IntersectionObservers.
//
// Fixed UI (nav, cursor, FX, loader) is rendered OUTSIDE this wrapper by
// SiteShell so ScrollSmoother's transform never affects it.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();

      // No-JS-parity: if motion is reduced, just show everything immediately.
      if (prefersReducedMotion()) {
        gsap.utils
          .toArray<HTMLElement>(".reveal")
          .forEach((el) => el.classList.add("is-visible"));
        return;
      }

      let smoother: ScrollSmoother | undefined;
      if (canUseHeavyMotion() && wrapper.current && content.current) {
        smoother = ScrollSmoother.create({
          wrapper: wrapper.current,
          content: content.current,
          smooth: 1.1,
          effects: true, // enables data-speed / data-lag parallax
          normalizeScroll: true,
        });
      }

      // One batched trigger reveals all `.reveal` nodes as they enter. Each
      // node keeps its own CSS transition-delay (set via the Reveal `delay`
      // prop), so existing per-item staggers are preserved.
      const batch = ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        onEnter: (els) => els.forEach((el) => el.classList.add("is-visible")),
      });

      ScrollTrigger.refresh();

      return () => {
        batch.forEach((t) => t.kill());
        smoother?.kill();
      };
    },
    { scope: wrapper }
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
      </div>
    </div>
  );
}
