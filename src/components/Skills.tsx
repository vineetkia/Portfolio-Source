"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/portfolio";
import Reveal from "./Reveal";
import GlitchText from "./GlitchText";

const proficiencies = [
  { label: "Distributed Systems & Microservices", value: 92 },
  { label: "Java / C# / C++", value: 90 },
  { label: "TypeScript / React / Next.js", value: 88 },
  { label: "Cloud & DevOps (AWS, Azure, Docker)", value: 85 },
  { label: "AI Integration (RAG, LLMs, Three.js)", value: 82 },
];

function SkillBar({
  label,
  value,
  index,
}: {
  label: string;
  value: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/80">{label}</span>
        <span className="font-mono text-white/50">{value}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{
            width: active ? `${value}%` : "0%",
            transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${index * 120}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 05 — skills"}
          </div>
          <GlitchText
            as="h2"
            text="What I work with"
            className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <div className="mt-8 space-y-6">
            {proficiencies.map((p, i) => (
              <SkillBar key={p.label} label={p.label} value={p.value} index={i} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={150} className="flex flex-col justify-center">
          <h3 className="font-heading text-xl font-semibold text-white">
            My approach
          </h3>
          <p className="mt-4 text-base leading-7 text-white/60">
            I gravitate toward the hard parts of software — distributed systems,
            real-time data, and the architecture that keeps them resilient. Three
            years in fintech taught me that maintainable, well-tested code beats
            clever code every time.
          </p>
          <p className="mt-4 text-base leading-7 text-white/60">
            I reach for AI where it genuinely earns its place, pair it with
            deterministic safeguards, and care about the details — performance,
            accessibility, and the small interactions that make software feel
            considered.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
            {skills.slice(0, 4).map((group) => (
              <div key={group.title} className="bg-black/60 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  {group.title}
                </div>
                <div className="mt-1 text-sm text-white/60">
                  {group.items.slice(0, 4).join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
