"use client";

import dynamic from "next/dynamic";
import { Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { GitHubIcon, LinkedInIcon } from "./icons";
import Reveal from "./Reveal";

const DottedSurface = dynamic(
  () => import("@/components/ui/dotted-surface").then((m) => m.DottedSurface),
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
      className="relative flex min-h-[80vh] items-center overflow-hidden py-24 sm:py-32"
    >
      <DottedSurface className="absolute inset-0 h-full w-full opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(16,185,129,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6">
        <Reveal className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-12">
          <div className="font-mono text-xs tracking-wider text-emerald-400/80">
            {"// 06 — contact"}
          </div>
          <h2 className="font-heading mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Let&apos;s Build Something
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/60">
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
