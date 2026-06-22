"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ visible = true }: { visible?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-white/5 bg-black/40 backdrop-blur-md"
            : "border-b border-transparent"
        } ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#top"
            className="font-heading text-lg font-bold tracking-tight text-white"
          >
            {profile.initials}
            <span className="text-emerald-400">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 md:inline-block"
          >
            Résumé
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Fullscreen mobile overlay — kept OUTSIDE the (transformed) header so its
          `fixed` positioning resolves against the viewport, not the header box. */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-3 bg-black backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute right-6 top-5 flex h-10 w-10 items-center justify-center rounded-lg text-white/80"
        >
          <X className="h-6 w-6" />
        </button>

        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${i * 60 + 80}ms` : "0ms" }}
            className={`font-heading text-3xl font-semibold text-white/80 transition-all duration-300 hover:text-emerald-400 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {link.label}
          </a>
        ))}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          style={{ transitionDelay: open ? `${links.length * 60 + 80}ms` : "0ms" }}
          className={`mt-6 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-2.5 text-base font-medium text-emerald-300 transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Résumé
        </a>
      </div>
    </>
  );
}
