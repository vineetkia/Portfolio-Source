"use client";

import { useRef } from "react";
import { skills } from "@/data/portfolio";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import {
  gsap,
  useGSAP,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/gsap";

const proficiencies = [
  { label: "AI Integration (RAG, LLMs, Agents)", value: 88 },
  { label: "Distributed Systems & Microservices", value: 92 },
  { label: "TypeScript / React / Next.js", value: 88 },
  { label: "Java / C# / C++", value: 90 },
  { label: "Cloud & DevOps (AWS, Azure, Docker)", value: 85 },
];

export default function Skills() {
  const barsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const fills = gsap.utils.toArray<HTMLElement>("[data-bar]", barsRef.current);
      fills.forEach((fill) => {
        const value = Number(fill.dataset.bar);
        if (prefersReducedMotion()) {
          gsap.set(fill, { width: `${value}%` });
          return;
        }
        gsap.fromTo(
          fill,
          { width: "0%" },
          {
            width: `${value}%`,
            ease: "power3.out",
            duration: 1.2,
            scrollTrigger: { trigger: fill, start: "top 92%", once: true },
          }
        );
      });
    },
    { scope: barsRef }
  );

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 05 — skills"}
          </div>
          <SplitHeading
            as="h2"
            text="What I work with"
            className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <div ref={barsRef} className="mt-8 space-y-6">
            {proficiencies.map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/80">{p.label}</span>
                  <span className="font-mono text-white/50">{p.value}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    data-bar={p.value}
                    style={{ width: `${p.value}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  />
                </div>
              </div>
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
            {skills.map((group) => (
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
