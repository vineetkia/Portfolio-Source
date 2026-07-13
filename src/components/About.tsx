"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { about } from "@/data/portfolio";
import Reveal from "./Reveal";
import SplitHeading from "./motion/SplitHeading";
import {
  gsap,
  useGSAP,
  registerGsap,
  prefersReducedMotion,
  canUseHeavyMotion,
} from "@/lib/gsap";

const SystemsGraphScene = dynamic(
  () =>
    import("@/components/ui/systems-graph").then((m) => m.SystemsGraphScene),
  { ssr: false }
);

const techStack = [
  "LLMs / RAG",
  "AI Agents",
  "Azure OpenAI",
  "TypeScript",
  "React",
  "Next.js",
  "Three.js / GLSL",
  "Node.js",
  "Java",
  "Python",
  "C++ / C#",
  "AWS",
  "Docker",
  "Kubernetes",
];

export default function About() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const reduced = prefersReducedMotion();

      // Count-up the stat numbers as they enter view.
      const nums = gsap.utils.toArray<HTMLElement>(
        "[data-count]",
        statsRef.current
      );
      nums.forEach((el) => {
        const raw = el.dataset.count ?? "";
        const m = raw.match(/^([\d.]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[1]);
        const suffix = m[2];
        const decimals = m[1].includes(".") ? 2 : 0;
        if (reduced) {
          el.textContent = raw;
          return;
        }
        const obj = { v: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix;
          },
        });
      });

      if (reduced || !card.current) return;

      // Premium entrance: the visual swings in from a 3D angle.
      gsap.from(card.current, {
        rotationY: -16,
        y: 44,
        autoAlpha: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: card.current, start: "top 80%", once: true },
      });

      // Interactive 3D tilt that follows the cursor (desktop pointers only).
      if (!canUseHeavyMotion()) return;
      const el = card.current;
      gsap.set(el, { transformPerspective: 1000 });
      const rotX = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
      const rotY = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        rotY(px * 9);
        rotX(-py * 9);
      };
      const onLeave = () => {
        rotX(0);
        rotY(0);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 01 — about"}
          </div>
          <SplitHeading
            as="h2"
            text="AI engineer with a systems mindset"
            className="font-heading mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          />
          <div className="mt-6 space-y-4 text-base leading-7 text-white/60">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm transition-colors hover:border-emerald-500/40 hover:text-white"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Luxury 3D-tilt visual: double-bezel frame + live systems mesh */}
        <div
          className="order-1 md:order-2"
          style={{ perspective: "1200px" }}
        >
          <div
            ref={card}
            className="group relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-1.5 shadow-[0_30px_90px_-30px_rgba(16,185,129,0.35)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative aspect-square overflow-hidden rounded-[1.65rem] border border-white/10 bg-zinc-950">
              <SystemsGraphScene className="absolute inset-0 h-full w-full" />

              {/* moving sheen + vignette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(125deg,transparent_42%,rgba(255,255,255,0.07)_50%,transparent_58%)]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
              />

              <div className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400/70">
                systems.mesh
              </div>

              <div ref={statsRef} className="absolute bottom-5 left-5">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {about.stats.map((stat) => (
                    <div key={stat.label}>
                      <div
                        data-count={stat.value}
                        className="font-heading text-2xl font-semibold tabular-nums text-emerald-400"
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-white/50">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
