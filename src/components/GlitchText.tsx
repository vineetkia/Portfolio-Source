"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

// Renders text with an RGB-split glitch that fires on mount (when scrolled into
// view) and again on hover — a tasteful hacker flourish for headings.
export default function GlitchText({
  text,
  as: Tag = "span",
  className = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(false);

  const fire = () => {
    setActive(true);
    window.setTimeout(() => setActive(false), 420);
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fire();
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`glitch ${className}`}
      data-text={text}
      data-active={active ? "true" : "false"}
      onMouseEnter={fire}
    >
      {text}
    </Tag>
  );
}
