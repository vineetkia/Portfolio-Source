"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { projects, type Project } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const CATEGORIES = [
  "All",
  "AI / ML",
  "Distributed Systems",
  "Full-Stack",
  "Fintech",
  "Systems",
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex h-full cursor-default flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors duration-300 hover:border-emerald-500/40 hover:bg-zinc-900/70"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-semibold text-zinc-100 transition-colors group-hover:text-emerald-400">
            {project.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-zinc-500">
            {project.context}
          </p>
        </div>
        <span className="flex-none rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-400">
          {project.category}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-zinc-400">
        {project.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-6 text-zinc-400">
            <span
              aria-hidden
              className="mt-2 h-1 w-1 flex-none rounded-full bg-emerald-500/70"
            />
            {h}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-0.5 font-mono text-xs text-zinc-400"
          >
            {tag}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active);
    return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [active]);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading
          index="03"
          title="Projects"
          subtitle="A selection of academic and personal work — from self-healing distributed systems to AI-powered platforms and trading tools."
        />
      </Reveal>

      <Reveal className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                isActive
                  ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </Reveal>

      <motion.div layout className="grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
