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
      className="relative flex min-h-[85vh] items-center overflow-hidden py-24 sm:py-32"
    >
      {/* Seamless sparkles glow — radial-masked on all sides so there is no
          visible box, only a soft particle field around the heading. */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[40rem] -translate-y-1/2 [mask-image:radial-gradient(55%_45%_at_50%_42%,white,transparent_72%)]">
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1.1}
          particleDensity={420}
          speed={1.4}
          className="h-full w-full"
          particleColor="#34d399"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center">
        <Reveal>
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 06 — contact"}
          </div>

          <h2 className="font-heading mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Let&apos;s Build Something
          </h2>

          <div className="mx-auto mt-5 h-px w-3/5 max-w-sm bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent" />

          <p className="mx-auto mt-6 max-w-md text-white/65">
            I&apos;m open to software engineering internships and new-grad roles,
            and always up for a conversation about distributed systems, AI, or a
            good side project.
          </p>

          <div className="mt-9 flex justify-center">
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
