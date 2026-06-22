"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A wide grid of points undulating in a sine wave — a calm, technical backdrop.
export function DottedSurface({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SEP = 0.5;
    const AMOUNTX = 90;
    const AMOUNTY = 50;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
    camera.position.set(0, 14, 24);
    camera.lookAt(0, 0, 0);

    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);

    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEP - (AMOUNTX * SEP) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEP - (AMOUNTY * SEP) / 2;
        i += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.06,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let animationId: number | null = null;
    let running = false;
    let count = 0;

    const update = () => {
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      let idx = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const y =
            Math.sin((ix + count) * 0.3) * 1.2 +
            Math.sin((iy + count) * 0.5) * 1.2;
          pos.array[idx * 3 + 1] = y;
          idx++;
        }
      }
      pos.needsUpdate = true;
    };

    const render = () => renderer.render(scene, camera);

    const loop = () => {
      animationId = requestAnimationFrame(loop);
      count += 0.05;
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
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
        animationId = null;
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
