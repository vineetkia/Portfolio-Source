import { profile } from "@/data/portfolio";
import MorphMark from "./motion/MorphMark";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="flex flex-col items-center gap-3">
        <MorphMark className="h-6 w-6 text-emerald-400/80" />
        <p className="text-center font-mono text-xs text-white/40">
          © {year} {profile.name} · Crafted with Next.js, GSAP &amp;{" "}
          <span className="text-emerald-400">♥</span> ·{" "}
          <span className="text-white/60">vinet.dev</span>
        </p>
      </div>
    </footer>
  );
}
