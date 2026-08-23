"use client";

import { GraduationCap, BadgeCheck, Trophy, Users, HeartHandshake } from "lucide-react";
import {
  education,
  certifications,
  accomplishments,
  mentorship,
  volunteering,
} from "@/data/portfolio";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import TimelineLine from "./motion/TimelineLine";

const panels = [
  { title: "Certifications", Icon: BadgeCheck, items: certifications },
  { title: "Achievements", Icon: Trophy, items: accomplishments },
  { title: "Mentorship", Icon: Users, items: mentorship },
  { title: "Volunteering", Icon: HeartHandshake, items: volunteering },
];

export default function Credentials() {
  return (
    <section
      id="education"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <Reveal>
        <div className="font-mono text-xs tracking-wider text-emerald-400/80">
          {"// 06 — education"}
        </div>
        <SplitHeading
          as="h2"
          text="Education and everything else"
          className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        />
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        {/* Education — DrawSVG timeline */}
        <Reveal>
          <h3 className="mb-6 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wide text-emerald-400">
            <GraduationCap className="h-4 w-4" /> Education
          </h3>
          <div className="relative pl-8">
            <TimelineLine className="absolute bottom-2 left-[6px] top-2 w-[3px] text-emerald-400" />
            <ul className="space-y-8">
              {education.map((e) => (
                <li key={`${e.school}-${e.period}`} className="relative">
                  <span className="absolute -left-8 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-emerald-400 bg-black">
                    <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  </span>
                  <div className="font-mono text-xs text-white/40">
                    {e.period}
                  </div>
                  <div className="mt-1 font-heading text-lg font-semibold text-white">
                    {e.degree}
                  </div>
                  <div className="text-sm text-emerald-400/90">{e.field}</div>
                  <div className="mt-1 text-sm text-white/60">
                    {e.school} · {e.location}
                  </div>
                  {e.detail && (
                    <div className="mt-1 font-mono text-xs text-white/45">
                      {e.detail}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Certifications · Achievements · Mentorship · Volunteering */}
        <div className="space-y-5">
          {panels.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 80}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-500/30 hover:bg-white/[0.07]"
            >
              <h3 className="flex items-center gap-2 font-heading text-base font-semibold text-white">
                <p.Icon className="h-4 w-4 text-emerald-400" />
                {p.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {p.items.map((it, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-sm leading-6 text-white/60"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1 w-1 flex-none rounded-full bg-emerald-400/70"
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
