"use client";

import { useRef, type ElementType } from "react";
import {
  gsap,
  useGSAP,
  SplitText,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/gsap";

// Premium heading reveal: splits into lines/words and slides each word up from
// behind a line mask as it scrolls into view. Replaces the per-heading glitch
// on section titles (the glitch is now reserved for signature brand marks).
export default function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const split = SplitText.create(el, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
      });

      gsap.from(split.words, {
        yPercent: 115,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.04,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
