import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";
import GlitchText from "./GlitchText";

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal>
        <div className="font-mono text-xs tracking-wider text-emerald-400/80">
          {"// 02 — experience"}
        </div>
        <GlitchText
          as="h2"
          text="Where I've worked"
          className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        />
      </Reveal>

      <div className="mt-12 space-y-5">
        {experience.map((job, i) => (
          <Reveal
            as="article"
            key={`${job.company}-${job.period}`}
            delay={i * 100}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/30 hover:bg-white/[0.07] sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <h3 className="font-heading text-xl font-semibold text-white">
                    {job.role}
                  </h3>
                  <span className="text-white/30">·</span>
                  <span className="font-medium text-emerald-400">
                    {job.company}
                  </span>
                  {job.current && (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-1 text-sm text-white/50">{job.location}</div>
              </div>
              <span className="font-mono text-sm text-white/40">{job.period}</span>
            </div>

            <ul className="mt-5 space-y-2">
              {job.highlights.map((h, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 text-sm leading-6 text-white/60"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 flex-none rounded-full bg-emerald-400/70"
                  />
                  {h}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-white/10 bg-black/30 px-2 py-1 font-mono text-xs text-white/50"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
