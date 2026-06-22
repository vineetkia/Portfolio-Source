"use client";

import { useEffect, useRef } from "react";

// Reticle cursor: corner brackets that track the pointer with easing, a centre
// dot, and a live coordinate readout — a hacker/terminal touch. Uses
// mix-blend-difference so it stays visible over any background. Refs are always
// rendered (visibility toggled via opacity) to avoid null-ref races.
export default function CustomCursor() {
  const reticleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reticle = reticleRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!reticle || !dot || !label) return;

    document.body.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        reticle.style.opacity = "1";
        dot.style.opacity = "1";
        label.style.opacity = "1";
      }
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      label.style.transform = `translate(${mx + 18}px, ${my + 18}px)`;
      label.textContent = `${String(mx).padStart(4, "0")} ${String(my).padStart(
        4,
        "0"
      )}`;

      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor='hover']");
      reticle.dataset.hover = interactive ? "true" : "false";
    };

    const onDown = () => (reticle.dataset.down = "true");
    const onUp = () => (reticle.dataset.down = "false");
    const onLeave = () => {
      visible = false;
      reticle.style.opacity = "0";
      dot.style.opacity = "0";
      label.style.opacity = "0";
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      reticle.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden mix-blend-difference md:block">
      {/* centre dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white opacity-0"
      />
      {/* corner-bracket reticle */}
      <div
        ref={reticleRef}
        data-hover="false"
        data-down="false"
        className="group absolute left-0 top-0 h-8 w-8 opacity-0 transition-[width,height] duration-200 data-[hover=true]:h-12 data-[hover=true]:w-12 data-[down=true]:h-6 data-[down=true]:w-6"
      >
        <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-white" />
        <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-white" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white" />
        <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-white" />
      </div>
      {/* coordinate readout */}
      <div
        ref={labelRef}
        className="absolute left-0 top-0 font-mono text-[10px] tracking-widest text-white opacity-0"
      />
    </div>
  );
}
