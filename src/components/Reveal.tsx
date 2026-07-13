import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
};

// Scroll-reveal marker. Visibility is toggled by the single batched
// ScrollTrigger in SmoothScroll (which adds `.is-visible`). Each element keeps
// its own CSS transition (see `.reveal` in globals.css); `delay` staggers it.
// No hooks/browser APIs here, so it renders in server or client trees alike.
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const Tag = as;
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
