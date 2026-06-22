import { experience } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-zinc-900 bg-zinc-950/40"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            index="02"
            title="Experience"
            subtitle="Three and a half years shipping production fintech, plus cloud advocacy and a current Microsoft internship."
          />
        </Reveal>

        <div className="relative">
          <div
            aria-hidden
            className="absolute left-0 top-2 bottom-2 hidden w-px bg-zinc-800 sm:left-[7.5rem] sm:block"
          />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <Reveal
                as="article"
                key={`${job.company}-${job.period}`}
                delay={i * 80}
                className="relative grid gap-x-8 gap-y-3 sm:grid-cols-[7.5rem_1fr]"
              >
                <div className="text-sm text-zinc-500 sm:pt-1">
                  <div className="font-mono">{job.period}</div>
                </div>

                <div className="relative sm:pl-8">
                  <span
                    aria-hidden
                    className={`absolute -left-px top-2 hidden h-3 w-3 -translate-x-[5px] rounded-full border-2 sm:block ${
                      job.current
                        ? "border-emerald-400 bg-emerald-400"
                        : "border-zinc-600 bg-zinc-950"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h3 className="text-lg font-semibold text-zinc-100">
                      {job.role}
                    </h3>
                    <span className="text-zinc-600">·</span>
                    <span className="font-medium text-emerald-400">
                      {job.company}
                    </span>
                    {job.current && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-sm text-zinc-500">
                    {job.location}
                  </div>

                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((h, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm leading-6 text-zinc-400"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 flex-none rounded-full bg-emerald-500/70"
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 font-mono text-xs text-zinc-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
