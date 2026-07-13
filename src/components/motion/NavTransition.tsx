"use client";

import { useRef, useState } from "react";
import {
  gsap,
  useGSAP,
  ScrollSmoother,
  registerGsap,
  prefersReducedMotion,
} from "@/lib/gsap";

type NavDetail = { href: string; label: string };

function scrollToTarget(href: string, instant: boolean) {
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(el, !instant, "top 80px");
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
  }
}

// Luxury 3D section transition. On a `vinet:navigate` event, three layered
// panels sweep up to cover the viewport (tilting in 3D), the target section is
// scrolled to instantly while hidden, then the panels sweep away to reveal it.
// Rendered once, globally, by SiteShell — outside the smooth-scroll wrapper.
export default function NavTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const running = useRef(false);
  const [label, setLabel] = useState("");

  useGSAP(
    () => {
      registerGsap();

      const onNavigate = (e: Event) => {
        const { href, label: lbl } = (e as CustomEvent<NavDetail>).detail;

        if (prefersReducedMotion()) {
          scrollToTarget(href, false);
          return;
        }
        if (running.current || !overlay.current) return;
        running.current = true;
        setLabel(lbl);

        const panels = gsap.utils.toArray<HTMLElement>(
          ".nav-panel",
          overlay.current
        );

        gsap
          .timeline({
            onStart: () => {
              overlay.current!.style.pointerEvents = "auto";
            },
            onComplete: () => {
              overlay.current!.style.pointerEvents = "none";
              running.current = false;
            },
          })
          .set(overlay.current, { autoAlpha: 1 })
          .set(panels, {
            yPercent: 100,
            rotationX: -12,
            transformOrigin: "center top",
            transformPerspective: 900,
          })
          .set(labelRef.current, { autoAlpha: 0, y: 24 })
          // cover — panels rise and level out (fully opaque at the apex)
          .to(panels, {
            yPercent: 0,
            rotationX: 0,
            duration: 0.55,
            ease: "power4.inOut",
            stagger: 0.07,
          })
          .to(
            labelRef.current,
            { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
            "-=0.3"
          )
          // hidden jump to the target section
          .add(() => scrollToTarget(href, true))
          .to(
            labelRef.current,
            { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" },
            "+=0.12"
          )
          // reveal — panels tilt away upward
          .to(
            panels,
            {
              yPercent: -100,
              rotationX: 12,
              duration: 0.6,
              ease: "power4.inOut",
              stagger: 0.07,
            },
            "-=0.05"
          )
          .set(overlay.current, { autoAlpha: 0 });
      };

      window.addEventListener("vinet:navigate", onNavigate as EventListener);
      return () =>
        window.removeEventListener(
          "vinet:navigate",
          onNavigate as EventListener
        );
    },
    { scope: overlay }
  );

  return (
    <div
      ref={overlay}
      aria-hidden
      className="pointer-events-none invisible fixed inset-0 z-[95]"
      style={{ perspective: "1000px" }}
    >
      <div className="nav-panel absolute inset-0 bg-[#02110b]" />
      <div className="nav-panel absolute inset-0 bg-[#04150d]" />
      <div className="nav-panel absolute inset-0 bg-black" />
      <div
        ref={labelRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="font-heading text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {label}
          <span className="text-emerald-400">.</span>
        </span>
      </div>
    </div>
  );
}
