"use client";

import { useRef } from "react";
import {
  gsap,
  useGSAP,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/gsap";

// Small decorative logomark that slowly morphs between geometric states
// (MorphSVG). Self-contained and purely ornamental — safe anywhere.
const SHAPES = [
  "M12 3 L21 19 L3 19 Z", // triangle
  "M12 2 L20 7 L20 17 L12 22 L4 17 L4 7 Z", // hexagon
  "M12 2 L22 12 L12 22 L2 12 Z", // diamond
];

export default function MorphMark({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const path = ref.current?.querySelector<SVGPathElement>(".morph");
      if (!path || prefersReducedMotion()) return;

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 1.8, ease: "power2.inOut" },
      });
      tl.to(path, { morphSVG: SHAPES[1] }, "+=0.6")
        .to(path, { morphSVG: SHAPES[2] }, "+=0.6")
        .to(path, { morphSVG: SHAPES[0] }, "+=0.6");

      return () => tl.kill();
    },
    { scope: ref }
  );

  return (
    <svg ref={ref} viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        className="morph"
        d={SHAPES[0]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
