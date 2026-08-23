"use client";

import { skills } from "@/data/portfolio";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32"
    >
      <Reveal>
        <div className="font-mono text-xs tracking-wider text-emerald-400/80">
          {"// 05 / skills"}
        </div>
        <SplitHeading
          as="h2"
          text="What I work with"
          className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        />
      </Reveal>

      {/* One table, one row per area. Each tool appears exactly once, so the
          list reads as a map of the stack rather than a repeated word cloud. */}
      <Reveal delay={100}>
        <div className="mt-10 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full border-collapse text-left text-sm">
            <tbody>
              {skills.map((group, i) => (
                <tr
                  key={group.title}
                  className={`align-top transition-colors hover:bg-white/[0.03] ${
                    i > 0 ? "border-t border-white/10" : ""
                  }`}
                >
                  <th
                    scope="row"
                    className="w-[38%] px-4 py-4 font-medium text-emerald-400 sm:w-[26%] sm:px-6 sm:whitespace-nowrap"
                  >
                    {group.title}
                  </th>
                  <td className="px-4 py-4 sm:px-6">
                    <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[13px] text-white/70"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
