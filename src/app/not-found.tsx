import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Not Found · Vineet Kumar",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 fx-scanlines opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(16,185,129,0.10),transparent_70%)]"
      />

      <div className="relative z-10 w-full max-w-xl">
        <div
          className="glitch font-heading text-[7rem] font-bold leading-none tracking-tighter text-white sm:text-[10rem]"
          data-text="404"
          data-active="true"
        >
          404
        </div>

        <div className="mx-auto mt-6 max-w-md rounded-xl border border-white/10 bg-black/50 p-4 text-left font-mono text-sm backdrop-blur-sm">
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <span className="ml-2 text-xs text-white/40">zsh — vinet.dev</span>
          </div>
          <div className="mt-3 space-y-1 text-emerald-300/90">
            <div>
              <span className="text-emerald-500/60">$</span> cd{" "}
              {"/the/void"}
            </div>
            <div className="text-white/50">
              zsh: no such file or directory
            </div>
            <div>
              <span className="text-emerald-500/60">$</span> whereami
              <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-emerald-400" />
            </div>
          </div>
        </div>

        <p className="mt-6 text-white/55">
          This route doesn&apos;t exist — but plenty of good ones do.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-emerald-950 transition-colors hover:bg-emerald-400"
        >
          cd ~ (back home)
        </Link>
      </div>
    </main>
  );
}
