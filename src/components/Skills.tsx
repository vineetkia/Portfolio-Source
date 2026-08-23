"use client";

import { skills } from "@/data/portfolio";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";

// A plain capability table: area on the left, the actual tools on the right.
// No self-assigned percentages — they invite an argument nobody can settle.
const capabilities = [
  {
    area: "AI & Retrieval",
    tools: "LLMs, RAG, AI agents, embeddings, vector search, Azure OpenAI",
  },
  {
    area: "Distributed Systems",
    tools: "Microservices, gRPC, Kafka, observability, fault tolerance",
  },
  {
    area: "Backend",
    tools: "Java, C#, C++, Python, Spring, FastAPI, Node.js",
  },
  {
    area: "Frontend",
    tools: "TypeScript, React, Next.js, Tailwind CSS",
  },
  {
    area: "Data",
    tools: "PostgreSQL, Redis, MongoDB, FAISS, Pinecone",
  },
  {
    area: "Cloud & Delivery",
    tools: "AWS, Azure, Docker, Kubernetes, CI/CD, Linux",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 05 — skills"}
          </div>
          <SplitHeading
            as="h2"
            text="What I work with"
            className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <tbody>
                {capabilities.map((c, i) => (
                  <tr
                    key={c.area}
                    className={
                      i > 0 ? "border-t border-white/10 align-top" : "align-top"
                    }
                  >
                    <th
                      scope="row"
                      className="w-2/5 whitespace-nowrap px-4 py-3 font-medium text-white/85 sm:w-1/3 sm:px-5"
                    >
                      {c.area}
                    </th>
                    <td className="px-4 py-3 text-white/55 sm:px-5">{c.tools}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex flex-col justify-center">
          <h3 className="font-heading text-xl font-semibold text-white">
            How I work
          </h3>
          <p className="prose-justify mt-4 text-base leading-7 text-white/60">
            Most of what I know came from maintaining systems other people had
            to rely on. Production fintech work taught me that boring,
            well-tested code is usually the right answer, and that the
            interesting part of a problem is rarely the part you expected.
          </p>
          <p className="prose-justify mt-4 text-base leading-7 text-white/60">
            I use AI where it earns its place and put deterministic guardrails
            around it, because a model that is confidently wrong is worse than
            no model at all. I would rather check an assumption against real
            data than defend it, and I am still learning plenty.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
            {skills.map((group) => (
              <div key={group.title} className="bg-black/60 p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                  {group.title}
                </div>
                <div className="mt-1 text-sm text-white/60">
                  {group.items.slice(0, 4).join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
