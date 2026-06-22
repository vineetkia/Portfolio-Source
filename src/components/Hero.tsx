"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { profile } from "@/data/portfolio";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  DownloadIcon,
  ArrowUpRightIcon,
  MapPinIcon,
} from "./icons";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 pb-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(16,185,129,0.14),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-5xl items-center gap-12 md:grid-cols-[1.4fr_1fr]">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-sm font-medium text-emerald-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to Summer / New-Grad SWE roles
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading mt-6 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-6xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-lg font-medium text-emerald-400 sm:text-xl"
          >
            {profile.role}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 flex items-center gap-2 text-sm text-zinc-500"
          >
            <MapPinIcon className="h-4 w-4" />
            {profile.location}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-emerald-400"
            >
              View my work
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              <DownloadIcon className="h-4 w-4" />
              Résumé
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-100"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-100"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="cursor-pointer text-zinc-500 transition-colors hover:text-zinc-100"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>

        <div className="flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative"
          >
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full bg-gradient-to-tr from-emerald-500/30 via-emerald-500/5 to-transparent blur-2xl"
            />
            <div className="relative h-56 w-56 overflow-hidden rounded-full border border-zinc-700/80 shadow-2xl shadow-emerald-950/40 sm:h-72 sm:w-72">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(max-width: 640px) 14rem, 18rem"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 cursor-pointer text-zinc-600 transition-colors hover:text-zinc-300 sm:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.span>
      </motion.a>
    </section>
  );
}
