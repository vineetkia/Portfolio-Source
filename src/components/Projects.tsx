"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects, profile, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import ProjectAscii from "./ProjectAscii";
import Aurora from "./Aurora";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { gsap, useGSAP, Flip, registerGsap, canUseHeavyMotion } from "@/lib/gsap";

// Most in-demand skills first.
const CATEGORY_ORDER: Project["category"][] = [
  "AI / ML",
  "Distributed Systems",
  "Full-Stack",
  "Fintech",
  "Systems",
];

// Accent colour + tint per category (the scene itself comes from project.ascii).
const categoryStyle: Record<Project["category"], { color: string; tint: string }> = {
  "AI / ML": { color: "text-emerald-400/70", tint: "from-emerald-500/20" },
  "Distributed Systems": { color: "text-sky-400/70", tint: "from-sky-500/20" },
  "Full-Stack": { color: "text-violet-400/70", tint: "from-violet-500/20" },
  Fintech: { color: "text-amber-400/75", tint: "from-amber-500/20" },
  Systems: { color: "text-zinc-300/70", tint: "from-zinc-400/20" },
};

type Filter = "All" | Project["category"];
const FILTERS: Filter[] = [
  "All",
  ...CATEGORY_ORDER.filter((c) => projects.some((p) => p.category === c)),
];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const style = categoryStyle[project.category];
  return (
    <Reveal
      as="article"
      delay={index * 70}
      className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-white/[0.08]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View details for ${project.name}`}
        className="flex h-full w-full cursor-pointer flex-col text-left"
      >
        <div className="relative flex h-36 w-full items-end justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <ProjectAscii
              scene={project.ascii}
              seed={index * 5}
              className={`text-[8.5px] tracking-tight ${style.color} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
            />
          </div>
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${style.tint} via-transparent to-black/50`}
          />
          <span className="relative z-10 m-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-lg font-semibold text-white transition-colors group-hover:text-emerald-400">
            {project.name}
          </h3>
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

          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export default function Projects() {
  const ordered = [...projects].sort(
    (a, b) =>
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
  );

  const gridRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const onFilter = (next: Filter) => {
    if (next === filter) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-flip-card]", gridRef.current);

    if (!canUseHeavyMotion()) {
      cards.forEach((card) => {
        card.style.display =
          next === "All" || card.dataset.cat === next ? "" : "none";
      });
      setFilter(next);
      return;
    }

    registerGsap();
    const state = Flip.getState(cards);
    cards.forEach((card) => {
      card.style.display =
        next === "All" || card.dataset.cat === next ? "" : "none";
    });
    Flip.from(state, {
      duration: 0.55,
      ease: "power2.inOut",
      absolute: true,
      scale: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.4 }
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3 }),
    });
    setFilter(next);
  };

  useGSAP(() => registerGsap(), { scope: gridRef });

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <Aurora className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 04 — projects"}
          </div>
          <SplitHeading
            as="h2"
            text="Selected work"
            className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <p className="mt-3 max-w-2xl text-white/60">
            Ordered by today&apos;s most in-demand skills — AI/ML and distributed
            systems first. Filter by focus, then open any card for the full
            breakdown.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => onFilter(f)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-1.5 font-mono text-xs transition-colors",
                filter === f
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/25 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div
          ref={gridRef}
          className="relative mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ordered.map((project, i) => (
            <div key={project.name} data-flip-card data-cat={project.category}>
              <ProjectCard
                project={project}
                index={i}
                onOpen={() => setSelected(project)}
              />
            </div>
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

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-lg border-white/10 bg-[#0a0a0b] text-white">
          {selected && (
            <>
              <DialogHeader>
                <div className="font-mono text-xs tracking-wider text-emerald-400/80">
                  {selected.category}
                </div>
                <DialogTitle className="font-heading text-2xl font-semibold text-white">
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="font-mono text-xs text-white/40">
                  {selected.context}
                </DialogDescription>
              </DialogHeader>

              <p className="text-sm leading-6 text-white/70">
                {selected.description}
              </p>

              <ul className="space-y-2">
                {selected.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-6 text-white/60">
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 flex-none rounded-full bg-emerald-400/70"
                    />
                    {h}
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-1.5">
                {selected.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-xs text-white/50"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <a
                href={selected.link ?? profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
              >
                View repository
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
