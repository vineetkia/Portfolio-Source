"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { startup } from "@/data/portfolio";
import Reveal from "./Reveal";
import GlitchText from "./GlitchText";

const AgentConstellation = dynamic(
  () =>
    import("@/components/ui/agent-constellation").then(
      (m) => m.AgentConstellation
    ),
  { ssr: false }
);

export default function Startup() {
  return (
    <section
      id="startup"
      className="relative overflow-hidden border-y border-white/5 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_15%_0%,rgba(16,185,129,0.10),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(60%_70%_at_50%_50%,white,transparent_85%)]"
      >
        <AgentConstellation className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 03 — startup"}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <GlitchText
              as="h2"
              text={startup.name}
              className="font-heading block text-4xl font-bold tracking-tight text-white sm:text-5xl"
            />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              {startup.role}
            </span>
          </div>
          <p className="mt-2 font-mono text-emerald-400">{startup.tagline}</p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/60">
            {startup.description}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {startup.highlights.map((h, i) => (
            <Reveal
              key={h.title}
              delay={i * 100}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/30 hover:bg-white/[0.07]"
            >
              <div className="font-heading text-base font-semibold text-white">
                {h.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-white/55">{h.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {startup.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 font-mono text-xs text-white/55"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={startup.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
            >
              Visit truestar.tech
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              source: private
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
