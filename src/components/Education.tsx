import {
  education,
  certifications,
  accomplishments,
} from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading index="05" title="Education & Recognition" />
      </Reveal>

      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <Reveal className="space-y-5">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-zinc-100">
                  {edu.school}
                </h3>
                <span className="font-mono text-sm text-zinc-500">
                  {edu.period}
                </span>
              </div>
              <p className="mt-1 text-emerald-400">
                {edu.degree} · {edu.field}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                <span>{edu.location}</span>
                {edu.detail && (
                  <>
                    <span className="text-zinc-700">·</span>
                    <span className="text-zinc-300">{edu.detail}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={120} className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
              Accomplishments
            </h3>
            <ul className="mt-3 space-y-2">
              {accomplishments.map((a, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm leading-6 text-zinc-400"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1 w-1 flex-none rounded-full bg-emerald-500/70"
                  />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
              Certifications
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {certifications.map((c) => (
                <li
                  key={c}
                  className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
