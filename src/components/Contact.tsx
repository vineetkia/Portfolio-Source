"use client";

import dynamic from "next/dynamic";
import { Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { GitHubIcon, LinkedInIcon } from "./icons";
import Reveal from "./Reveal";

const SparklesCore = dynamic(
  () => import("@/components/ui/sparkles").then((m) => m.SparklesCore),
  { ssr: false }
);

const socials = [
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] items-center overflow-hidden py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_40%,rgba(16,185,129,0.10),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 06 — contact"}
          </div>

          <h2 className="font-heading relative z-20 mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Let&apos;s Build Something
          </h2>

          {/* Sparkles title treatment: gradient lines + particle glow, radial-masked. */}
          <div className="relative mx-auto mt-2 h-28 w-full max-w-xl">
            <div className="absolute inset-x-16 top-0 h-px w-[calc(100%-8rem)] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <div className="absolute inset-x-16 top-0 h-[3px] w-[calc(100%-8rem)] bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-sm" />
            <div className="absolute inset-x-32 top-0 h-px w-[calc(100%-16rem)] bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
            <div className="absolute inset-x-32 top-0 h-[5px] w-[calc(100%-16rem)] bg-gradient-to-r from-transparent via-teal-400 to-transparent blur-sm" />

            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={900}
              speed={2}
              className="h-full w-full"
              particleColor="#34d399"
            />

            <div className="absolute inset-0 h-full w-full bg-[#050505] [mask-image:radial-gradient(360px_140px_at_top,transparent_20%,white)]" />
          </div>

          <p className="mx-auto -mt-6 max-w-md text-white/60">
            I&apos;m open to software engineering internships and new-grad roles,
            and always up for a conversation about distributed systems, AI, or a
            good side project.
          </p>

          <div className="mt-8 flex justify-center">
            <LiquidButton href={`mailto:${profile.email}`} variant="accent" size="lg">
              <Mail className="h-4 w-4" />
              {profile.email}
            </LiquidButton>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
