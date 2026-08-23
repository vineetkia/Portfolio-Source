import { experience } from "@/data/portfolio";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import TimelineLine from "./motion/TimelineLine";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32"
    >
      <Reveal>
        <div className="font-mono text-xs tracking-wider text-emerald-400/80">
          {"// 04 / experience"}
        </div>
        <SplitHeading
          as="h2"
          text="Where I've worked"
          className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        />
      </Reveal>

      <div className="relative mt-12 pl-8 sm:pl-10">
        <TimelineLine className="absolute bottom-8 left-[7px] top-8 w-[3px] text-emerald-400 sm:left-[11px]" />

        <div className="space-y-5">
          {experience.map((job, i) => (
            <div key={`${job.company}-${job.period}`} className="relative">
              <span className="absolute top-8 -left-8 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-emerald-400 bg-black sm:-left-10">
                {job.current && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                )}
                <span className="relative h-1 w-1 rounded-full bg-emerald-400" />
              </span>

              <Reveal
                as="article"
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
                    <div className="mt-1 text-sm text-white/50">
                      {job.location}
                    </div>
                  </div>
                  <span className="font-mono text-sm text-white/40">
                    {job.period}
                  </span>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
