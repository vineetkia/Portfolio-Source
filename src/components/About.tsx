"use client";

import dynamic from "next/dynamic";
import { about } from "@/data/portfolio";
import Reveal from "./Reveal";
import GlitchText from "./GlitchText";

const GenerativeMountainScene = dynamic(
  () =>
    import("@/components/ui/mountain-scene").then(
      (m) => m.GenerativeMountainScene
    ),
  { ssr: false }
);

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Three.js / GLSL",
  "Node.js",
  "Java",
  "Python",
  "C++ / C#",
  "AWS",
  "Docker",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 01 — about"}
          </div>
          <GlitchText
            as="h2"
            text="Engineer with a systems mindset"
            className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <div className="mt-6 space-y-4 text-base leading-7 text-white/60">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          delay={150}
          className="order-1 md:order-2"
        >
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
            <GenerativeMountainScene className="absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {about.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-heading text-2xl font-semibold text-emerald-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
