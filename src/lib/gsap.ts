// Central GSAP setup. Plugins are registered once, on the client only.
// All GSAP-driven components import gsap + plugins from here.
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

let registered = false;

// Idempotent, SSR-safe. Call from a client effect before using plugins.
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Flip,
    DrawSVGPlugin,
    MorphSVGPlugin
  );
  registered = true;
}

// Shared premium easing — a heavy, decelerating "expo-out" feel used across the
// site so motion reads as one deliberate system rather than ad-hoc tweens.
export const EASE = "power3.out";
export const EASE_EXPO = "expo.out";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Smooth scroll + heavy scroll choreography are reserved for real pointers on
// larger viewports — touch/small screens get the plain (still animated) layout.
export function canUseHeavyMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    window.innerWidth >= 768 &&
    !prefersReducedMotion()
  );
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  DrawSVGPlugin,
  MorphSVGPlugin,
};
