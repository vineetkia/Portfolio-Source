"use client";

import { useRef } from "react";
import { gsap, useGSAP, registerGsap, prefersReducedMotion } from "@/lib/gsap";

// A vertical timeline rail whose emerald line "draws" in (DrawSVG) as the
// section scrolls past. A faint static track sits behind it so the rail is
// always visible even before/without the draw animation.
export default function TimelineLine({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const draw = ref.current?.querySelector<SVGLineElement>(".draw-line");
      if (!draw) return;

      if (prefersReducedMotion()) {
        gsap.set(draw, { drawSVG: "100%" });
        return;
      }

      gsap.fromTo(
        draw,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <svg
      ref={ref}
      aria-hidden
      preserveAspectRatio="none"
      className={className}
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
      <line
        className="draw-line"
        x1="1"
        y1="0"
        x2="1"
        y2="100%"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
