import type { AccentName } from "@/data/portfolio";

// Per-project accent "moods". Full static class strings (Tailwind v4 can't see
// dynamically-built class names), plus a raw hex for canvas/cursor use.
export type Accent = {
  hex: string;
  text: string; // ascii scene tint on the card
  tagTint: string; // gradient overlay on the card header
  cardHover: string; // card border + bg on hover
  title: string; // dialog title colour
  titleHover: string; // card title colour on hover (group-hover:)
  ring: string; // dialog panel glow
  chipBorder: string; // dialog tag chips
  button: string; // dialog CTA
  dot: string; // list bullet
};

export const ACCENTS: Record<AccentName, Accent> = {
  emerald: {
    hex: "#34d399",
    text: "text-emerald-400/70",
    tagTint: "from-emerald-500/20",
    cardHover: "hover:border-emerald-500/40 hover:bg-emerald-500/[0.06]",
    title: "text-emerald-300",
    titleHover: "group-hover:text-emerald-300",
    ring: "shadow-[0_0_80px_-20px_rgba(52,211,153,0.5)]",
    chipBorder: "border-emerald-500/20",
    button: "bg-emerald-500 text-emerald-950 hover:bg-emerald-400",
    dot: "bg-emerald-400/70",
  },
  cyan: {
    hex: "#22d3ee",
    text: "text-cyan-400/70",
    tagTint: "from-cyan-500/20",
    cardHover: "hover:border-cyan-500/40 hover:bg-cyan-500/[0.06]",
    title: "text-cyan-300",
    titleHover: "group-hover:text-cyan-300",
    ring: "shadow-[0_0_80px_-20px_rgba(34,211,238,0.5)]",
    chipBorder: "border-cyan-500/20",
    button: "bg-cyan-500 text-cyan-950 hover:bg-cyan-400",
    dot: "bg-cyan-400/70",
  },
  sky: {
    hex: "#38bdf8",
    text: "text-sky-400/70",
    tagTint: "from-sky-500/20",
    cardHover: "hover:border-sky-500/40 hover:bg-sky-500/[0.06]",
    title: "text-sky-300",
    titleHover: "group-hover:text-sky-300",
    ring: "shadow-[0_0_80px_-20px_rgba(56,189,248,0.5)]",
    chipBorder: "border-sky-500/20",
    button: "bg-sky-500 text-sky-950 hover:bg-sky-400",
    dot: "bg-sky-400/70",
  },
  indigo: {
    hex: "#818cf8",
    text: "text-indigo-400/70",
    tagTint: "from-indigo-500/20",
    cardHover: "hover:border-indigo-500/40 hover:bg-indigo-500/[0.06]",
    title: "text-indigo-300",
    titleHover: "group-hover:text-indigo-300",
    ring: "shadow-[0_0_80px_-20px_rgba(129,140,248,0.5)]",
    chipBorder: "border-indigo-500/20",
    button: "bg-indigo-500 text-white hover:bg-indigo-400",
    dot: "bg-indigo-400/70",
  },
  violet: {
    hex: "#a78bfa",
    text: "text-violet-400/70",
    tagTint: "from-violet-500/20",
    cardHover: "hover:border-violet-500/40 hover:bg-violet-500/[0.06]",
    title: "text-violet-300",
    titleHover: "group-hover:text-violet-300",
    ring: "shadow-[0_0_80px_-20px_rgba(167,139,250,0.5)]",
    chipBorder: "border-violet-500/20",
    button: "bg-violet-500 text-white hover:bg-violet-400",
    dot: "bg-violet-400/70",
  },
  amber: {
    hex: "#fbbf24",
    text: "text-amber-400/75",
    tagTint: "from-amber-500/20",
    cardHover: "hover:border-amber-500/40 hover:bg-amber-500/[0.06]",
    title: "text-amber-300",
    titleHover: "group-hover:text-amber-300",
    ring: "shadow-[0_0_80px_-20px_rgba(251,191,36,0.5)]",
    chipBorder: "border-amber-500/20",
    button: "bg-amber-400 text-amber-950 hover:bg-amber-300",
    dot: "bg-amber-400/70",
  },
};
