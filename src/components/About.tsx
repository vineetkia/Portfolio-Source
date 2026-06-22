import { about } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
      <Reveal>
        <SectionHeading index="01" title="About" />
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5 text-base leading-7 text-zinc-400">
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={120} className="grid grid-cols-2 gap-4 self-start">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
            >
              <div className="font-heading text-3xl font-semibold text-emerald-400">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
