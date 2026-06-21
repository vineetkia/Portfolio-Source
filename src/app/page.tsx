const BUILD_STAMP = "2026-06-21T22:54:10Z";
const NEXT_VERSION = "16.2.9";

export default function Home() {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-zinc-950 px-6 py-24 text-zinc-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.18),transparent_70%)]"
      />
      <main className="relative z-10 flex w-full max-w-xl flex-col items-center gap-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Deployment pipeline verified
        </span>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">
          vinet<span className="text-emerald-400">.dev</span>
        </h1>

        <p className="max-w-md text-lg leading-8 text-zinc-400">
          Hi, I&apos;m <span className="font-medium text-zinc-200">Vineet Kumar</span>.
          This is a temporary test page confirming that GitHub → Vercel →{" "}
          <span className="text-zinc-200">vinet.dev</span> is live. The full
          portfolio is on its way.
        </p>

        <dl className="grid w-full grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800 text-left sm:grid-cols-3">
          <div className="bg-zinc-950 px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Source</dt>
            <dd className="mt-1 text-sm text-zinc-200">GitHub · main</dd>
          </div>
          <div className="bg-zinc-950 px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Hosting</dt>
            <dd className="mt-1 text-sm text-zinc-200">Vercel</dd>
          </div>
          <div className="bg-zinc-950 px-4 py-3">
            <dt className="text-xs uppercase tracking-wide text-zinc-500">Framework</dt>
            <dd className="mt-1 text-sm text-zinc-200">Next.js {NEXT_VERSION}</dd>
          </div>
        </dl>

        <p className="font-mono text-xs text-zinc-600">build {BUILD_STAMP}</p>
      </main>
    </div>
  );
}
