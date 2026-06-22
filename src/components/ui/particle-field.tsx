"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// An abstract field of particles arranged on a grid, rippling with layered sine
// waves and repelled by the pointer — a "data topography" that reads as
// generative/hacker art rather than a generic gradient. Additive blending makes
// the emerald points glow where they cluster.
export function ParticleField({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const GRID = 200;
    const SEP = 0.2;
    const count = GRID * GRID;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.09);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 4.2, 9);
    camera.lookAt(0, -0.6, 0);

    const positions = new Float32Array(count * 3);
    const baseXZ = new Float32Array(count * 2);
    const colors = new Float32Array(count * 3);

    const colA = new THREE.Color(0x00ff95);
    const colB = new THREE.Color(0x0a7cff);

    let p = 0;
    for (let ix = 0; ix < GRID; ix++) {
      for (let iz = 0; iz < GRID; iz++) {
        const x = ix * SEP - (GRID * SEP) / 2;
        const z = iz * SEP - (GRID * SEP) / 2;
        positions[p * 3] = x;
        positions[p * 3 + 1] = 0;
        positions[p * 3 + 2] = z;
        baseXZ[p * 2] = x;
        baseXZ[p * 2 + 1] = z;

        const mix = (ix / GRID + iz / GRID) * 0.5;
        const c = colA.clone().lerp(colB, mix);
        colors[p * 3] = c.r;
        colors[p * 3 + 1] = c.g;
        colors[p * 3 + 2] = c.b;
        p++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    // Pointer projected onto the y=0 plane for repulsion.
    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove);

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    let raf: number | null = null;
    let running = false;
    let time = 0;

    const update = () => {
      pointer.lerp(target, 0.05);
      const mxWorld = pointer.x * (GRID * SEP) * 0.5;
      const mzWorld = -pointer.y * (GRID * SEP) * 0.5;

      for (let i = 0; i < count; i++) {
        const x = baseXZ[i * 2];
        const z = baseXZ[i * 2 + 1];

        let y =
          Math.sin(x * 0.55 + time) * 0.16 +
          Math.cos(z * 0.5 - time * 0.8) * 0.16 +
          Math.sin((x + z) * 0.3 + time * 0.5) * 0.1;

        const dx = x - mxWorld;
        const dz = z - mzWorld;
        const d2 = dx * dx + dz * dz;
        const repel = Math.exp(-d2 * 0.5) * 0.8;
        y += repel;

        arr[i * 3 + 1] = y;
      }
      pos.needsUpdate = true;
      points.rotation.y = Math.sin(time * 0.1) * 0.06;
    };

    const render = () => renderer.render(scene, camera);

    const loop = () => {
      raf = requestAnimationFrame(loop);
      time += 0.015;
      update();
      render();
    };

    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      loop();
    };
    const stop = () => {
      running = false;
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    const visibility = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    visibility.observe(container);

    update();
    if (prefersReduced) render();
    else start();

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
