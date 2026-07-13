"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Terminal } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import GlitchText from "@/components/GlitchText";
import Magnetic from "@/components/motion/Magnetic";
import { gsap, useGSAP, registerGsap, prefersReducedMotion } from "@/lib/gsap";

const FluidHero = dynamic(
  () => import("@/components/ui/fluid-hero").then((m) => m.FluidHero),
  { ssr: false }
);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;

      // Choreographed entrance — each layer arrives on a heavy expo ease.
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });
      tl.from("[data-hero='badge']", { y: 18, autoAlpha: 0, duration: 0.8 })
        .from("[data-hero='name']", { y: 44, autoAlpha: 0 }, "-=0.45")
        .from("[data-hero='role']", { y: 20, autoAlpha: 0, duration: 0.8 }, "-=0.7")
        .from("[data-hero='tagline']", { y: 20, autoAlpha: 0, duration: 0.8 }, "-=0.7")
        .from(
          "[data-hero='cta'] > *",
          { y: 20, autoAlpha: 0, stagger: 0.12, duration: 0.7 },
          "-=0.55"
        )
        .from("[data-hero='status']", { autoAlpha: 0, duration: 0.9 }, "-=0.4");

      // Gentle scrubbed drift + fade as the hero scrolls away (adds depth).
      gsap.to("[data-hero='content']", {
        yPercent: 14,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <div data-speed="0.8" className="pointer-events-none absolute inset-[-12%]">
        <FluidHero className="absolute inset-0 h-full w-full" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_55%,transparent,rgba(5,5,5,0.45))]"
      />

      <div
        data-hero="content"
        className="relative z-10 mx-auto w-full max-w-3xl text-center"
      >
        <span
          data-hero="badge"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-black/40 px-4 py-1.5 font-mono text-xs text-emerald-400 backdrop-blur-sm"
        >
          <Terminal className="h-3.5 w-3.5" />
          ~/portfolio $ whoami
        </span>

        <h1
          data-hero="name"
          className="font-heading mt-8 text-5xl font-bold tracking-tighter text-white sm:text-7xl"
        >
          <GlitchText text={profile.name} />
        </h1>

        <p
          data-hero="role"
          className="mt-4 font-mono text-lg text-emerald-400 sm:text-xl"
        >
          <span className="text-white/30">&lt;</span>
          {profile.role.toLowerCase().replace(/ /g, "_")}
          <span className="text-white/30"> /&gt;</span>
        </p>

        <p
          data-hero="tagline"
          className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/55 sm:text-lg"
        >
          {profile.tagline}
        </p>

        <div
          data-hero="cta"
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Magnetic>
            <LiquidButton href="#projects" variant="accent" size="lg">
              View Work
              <ArrowRight className="h-4 w-4" />
            </LiquidButton>
          </Magnetic>
          <Magnetic>
            <LiquidButton href="#contact" size="lg">
              Get in touch
            </LiquidButton>
          </Magnetic>
        </div>
      </div>

      {/* terminal status bar */}
      <div
        data-hero="status"
        className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/5 bg-black/40 backdrop-blur-sm sm:block"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 font-mono text-[11px] text-white/40">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            status: available_june_2027
          </span>
          <span className="hidden sm:inline">{profile.location}</span>
          <span>lat: 37.33 · lon: -121.88</span>
        </div>
      </div>
    </section>
  );
}
