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

// Device tier for tuning animation COST, not whether animation happens.
// Phones and tablets keep every scene and every motion; they just run at a
// lower pixel ratio and lighter geometry so the look survives the hardware.
//   "full"    desktop / large tablet with a fine pointer
//   "tablet"  touch, 768px and up
//   "mobile"  touch under 768px
export type MotionTier = "full" | "tablet" | "mobile";

export function motionTier(): MotionTier {
  if (typeof window === "undefined") return "full";
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (!coarse && window.innerWidth >= 768) return "full";
  return window.innerWidth >= 768 ? "tablet" : "mobile";
}

// Pixel-ratio ceiling per tier. Fragment-shader cost scales with the square of
// this, so it is the single biggest lever on a phone.
export function tierPixelRatio(tier: MotionTier, desktopCap = 1.5) {
  const cap = tier === "full" ? desktopCap : tier === "tablet" ? 1.25 : 1;
  return Math.min(window.devicePixelRatio || 1, cap);
}

// Scales counts (particles, nodes, pulses) so the composition reads the same
// while doing measurably less work on smaller hardware.
export function tierScale(tier: MotionTier) {
  return tier === "full" ? 1 : tier === "tablet" ? 0.7 : 0.5;
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
