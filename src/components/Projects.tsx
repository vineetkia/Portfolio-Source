"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { projects, profile, type Project } from "@/data/portfolio";
import Reveal from "./Reveal";
import GlitchText from "./GlitchText";
import AsciiAnimation from "./AsciiAnimation";

const ShaderAnimation = dynamic(
  () => import("@/components/ui/shader-lines").then((m) => m.ShaderAnimation),
  { ssr: false }
);

// Most in-demand skills first.
const CATEGORY_ORDER: Project["category"][] = [
  "AI / ML",
  "Distributed Systems",
  "Full-Stack",
  "Fintech",
  "Systems",
];

const categoryGradient: Record<Project["category"], string> = {
  "AI / ML": "from-emerald-500/40 via-teal-500/20 to-transparent",
  "Distributed Systems": "from-sky-500/40 via-indigo-500/20 to-transparent",
  "Full-Stack": "from-violet-500/40 via-fuchsia-500/20 to-transparent",
  Fintech: "from-amber-500/40 via-emerald-500/20 to-transparent",
  Systems: "from-zinc-400/40 via-slate-500/20 to-transparent",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal
      as="article"
      delay={index * 120}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-white/[0.08]"
    >
      <div
        className={`relative flex h-36 items-end overflow-hidden bg-gradient-to-br ${
          categoryGradient[project.category]
        }`}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <span className="relative m-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">
            {project.name}
          </h3>
        </div>
        <p className="mt-1 font-mono text-xs text-white/40">{project.context}</p>
        <p className="mt-3 flex-1 text-sm leading-6 text-white/60">
          {project.blurb}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 5).map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-xs text-white/50"
            >
              {tag}
            </li>
          ))}
        </ul>

        <a
          href={project.link ?? profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
        >
          View
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  const featured = [...projects]
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
    );

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <ShaderAnimation className="absolute inset-0 h-full w-full" />
      <div aria-hidden className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 04 — projects"}
          </div>
          <GlitchText
            as="h2"
            text="Selected work"
            className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <p className="mt-3 max-w-2xl text-white/60">
            Ordered by today&apos;s most in-demand skills — AI/ML and distributed
            systems first. Every card links to its repo.
          </p>
        </Reveal>

        <Reveal className="mt-8 overflow-hidden rounded-xl border border-white/5 bg-black/30">
          <AsciiAnimation className="px-4 py-3 text-[9px] sm:text-[11px]" />
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:border-emerald-500/40 hover:text-white"
          >
            See more on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
