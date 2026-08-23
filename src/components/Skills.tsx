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
      <Reveal>
        <div className="font-mono text-xs tracking-wider text-emerald-400/80">
          {"// 05 — skills"}
        </div>
        <SplitHeading
          as="h2"
          text="What I work with"
          className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        />
      </Reveal>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h3 className="font-heading text-xl font-semibold text-white">
            By area
          </h3>
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
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
                      className="w-2/5 whitespace-nowrap px-4 py-3 font-medium text-emerald-400 sm:w-1/3 sm:px-5"
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

        <Reveal delay={150}>
          <h3 className="font-heading text-xl font-semibold text-white">
            The toolbox
          </h3>
          {/* Same table treatment as the capability table on the left, so the
              two columns read as one system. */}
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm">
              <tbody>
                {skills.map((group, i) => (
                  <tr
                    key={group.title}
                    className={
                      i > 0 ? "border-t border-white/10 align-top" : "align-top"
                    }
                  >
                    <th
                      scope="row"
                      className="w-2/5 whitespace-nowrap px-4 py-3 font-medium text-emerald-400 sm:w-1/3 sm:px-5"
                    >
                      {group.title}
                    </th>
                    <td className="px-4 py-3 text-white/55 sm:px-5">
                      {group.items.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
