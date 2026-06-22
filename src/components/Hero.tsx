"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Terminal } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import GlitchText from "@/components/GlitchText";

const ParticleField = dynamic(
  () => import("@/components/ui/particle-field").then((m) => m.ParticleField),
  { ssr: false }
);

export default function Hero() {
  const [offset, setOffset] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setOffset(window.scrollY * 0.3);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <ParticleField className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_55%,transparent,rgba(5,5,5,0.45))]"
      />

      <div
        className="relative z-10 mx-auto w-full max-w-3xl animate-fade-in-long text-center"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-black/40 px-4 py-1.5 font-mono text-xs text-emerald-400 backdrop-blur-sm">
          <Terminal className="h-3.5 w-3.5" />
          ~/portfolio $ whoami
        </span>

        <h1 className="font-heading mt-8 text-5xl font-bold tracking-tighter text-white sm:text-7xl">
          <GlitchText text={profile.name} />
        </h1>

        <p className="mt-4 font-mono text-lg text-emerald-400 sm:text-xl">
          <span className="text-white/30">&lt;</span>
          {profile.role.toLowerCase().replace(/ /g, "_")}
          <span className="text-white/30"> /&gt;</span>
        </p>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <LiquidButton href="#projects" variant="accent" size="lg">
            View Work
            <ArrowRight className="h-4 w-4" />
          </LiquidButton>
          <LiquidButton href="#contact" size="lg">
            Get in touch
          </LiquidButton>
        </div>
      </div>

      {/* terminal status bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-white/5 bg-black/40 backdrop-blur-sm sm:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 font-mono text-[11px] text-white/40">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            status: available_for_hire
          </span>
          <span className="hidden sm:inline">{profile.location}</span>
          <span>lat: 37.33 · lon: -121.88</span>
        </div>
      </div>
    </section>
  );
}
