import { profile } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 py-8">
      <p className="text-center font-mono text-xs text-white/40">
        © {year} {profile.name} · Crafted with Three.js &amp;{" "}
        <span className="text-emerald-400">♥</span> ·{" "}
        <span className="text-white/60">vinet.dev</span>
      </p>
    </footer>
  );
}
