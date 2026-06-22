"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A generative wireframe terrain that scrolls toward the camera, giving an
// endless "flythrough" of emerald mountains. Heights come from layered value
// noise recomputed each frame with a moving offset.
function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const rand = (i: number, j: number) => {
    const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };

  const smooth = (t: number) => t * t * (3 - 2 * t);
  const u = smooth(xf);
  const v = smooth(yf);

  const a = rand(xi, yi);
  const b = rand(xi + 1, yi);
  const c = rand(xi, yi + 1);
  const d = rand(xi + 1, yi + 1);

  return (
    a * (1 - u) * (1 - v) +
    b * u * (1 - v) +
    c * (1 - u) * v +
    d * u * v
  );
}

function fbm(x: number, y: number): number {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < 4; i++) {
    value += amp * valueNoise(x * freq, y * freq);
    freq *= 2;
    amp *= 0.5;
  }
  return value;
}

export function GenerativeMountainScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.12);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 2.2, 6);
    camera.lookAt(0, 0.4, 0);

    const SEG = 80;
    const SIZE = 16;
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const terrain = new THREE.Mesh(geometry, material);
    scene.add(terrain);

    const glow = new THREE.PointLight(0x10b981, 1, 50);
    glow.position.set(0, 4, 2);
    scene.add(glow);

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

    const position = geometry.attributes.position as THREE.BufferAttribute;
    const count = position.count;
    const baseX = new Float32Array(count);
    const baseZ = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      baseX[i] = position.getX(i);
      baseZ[i] = position.getZ(i);
    }

    const updateHeights = (offset: number) => {
      for (let i = 0; i < count; i++) {
        const x = baseX[i];
        const z = baseZ[i];
        const h = fbm(x * 0.25 + 10, z * 0.25 + offset);
        const ridge = Math.pow(h, 1.7) * 3.2;
        position.setY(i, ridge - 0.6);
      }
      position.needsUpdate = true;
    };

    let animationId: number | null = null;
    let running = false;
    let offset = 0;

    const render = () => renderer.render(scene, camera);

    const loop = () => {
      animationId = requestAnimationFrame(loop);
      offset += 0.012;
      updateHeights(offset);
      terrain.rotation.z = Math.sin(offset * 0.2) * 0.04;
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

    updateHeights(0);
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
