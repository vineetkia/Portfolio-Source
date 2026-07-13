"use client";

import { useRef } from "react";
import * as THREE from "three";
import {
  useGSAP,
  ScrollTrigger,
  registerGsap,
  prefersReducedMotion,
  canUseHeavyMotion,
} from "@/lib/gsap";

// A persistent, low-key 3D depth field behind all content. As you scroll the
// whole page, the camera drifts deeper and the field's hue shifts, giving a
// continuous "travelling through a system" feel that unifies the sections.
// Mounted ONCE by SiteShell, outside the smooth-scroll wrapper, so its fixed
// position resolves against the viewport. Cheap (points only), DPR-capped,
// rAF paused when the tab is hidden, and static under reduced motion.
export default function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;
    registerGsap();
    const reduced = prefersReducedMotion();
    const heavy = canUseHeavyMotion();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.03);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 18);

    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const cA = new THREE.Color(0x0b3b2e);
    const cB = new THREE.Color(0x34d399);
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 46;
      const y = (Math.random() - 0.5) * 46;
      const z = (Math.random() - 0.5) * 60;
      positions.set([x, y, z], i * 3);
      const c = cA.clone().lerp(cB, Math.random() * 0.9);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Pointer parallax (subtle).
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // Scroll progress drives camera depth + hue.
    const scrollState = { progress: 0 };
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => (scrollState.progress = self.progress),
    });

    let raf: number | null = null;
    const parallax = { x: 0, y: 0 };
    const render = () => renderer.render(scene, camera);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      parallax.x += (target.x - parallax.x) * 0.03;
      parallax.y += (target.y - parallax.y) * 0.03;
      const p = scrollState.progress;
      camera.position.z = 18 - p * 10; // drift deeper on scroll
      camera.position.x = parallax.x * 2.2;
      camera.position.y = -parallax.y * 2.2;
      camera.lookAt(0, 0, 0);
      points.rotation.y = p * 0.6 + parallax.x * 0.05;
      points.rotation.x = p * 0.25;
      mat.opacity = 0.4 + Math.sin(p * Math.PI) * 0.25;
      render();
    };

    if (reduced || !heavy) {
      render();
    } else {
      loop();
    }

    const onVisibility = () => {
      if (document.hidden) {
        if (raf !== null) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      } else if (!reduced && heavy && raf === null) {
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      resizeObserver.disconnect();
      st.kill();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, {});

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
