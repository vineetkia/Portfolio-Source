"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A slowly rotating 3D service mesh: nodes (services) distributed across a
// sphere, wired to their nearest neighbours, with light pulses traveling the
// edges like requests moving through a distributed system. A literal visual
// for an "engineer with a systems mindset".
export function SystemsGraphScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    camera.lookAt(0, 0, 0);

    const group = new THREE.Group();
    scene.add(group);

    const NODE_COUNT = 22;
    const RADIUS = 2.6;
    const nodes: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      nodes.push(
        new THREE.Vector3(
          Math.cos(theta) * r,
          y,
          Math.sin(theta) * r
        ).multiplyScalar(RADIUS)
      );
    }

    const nodeGeo = new THREE.SphereGeometry(0.07, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const haloGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.1,
    });
    nodes.forEach((p) => {
      const m = new THREE.Mesh(nodeGeo, nodeMat);
      m.position.copy(p);
      group.add(m);
      const h = new THREE.Mesh(haloGeo, haloMat);
      h.position.copy(p);
      group.add(h);
    });

    const edges: [number, number][] = [];
    const edgeSet = new Set<string>();
    const K = 3;
    for (let i = 0; i < NODE_COUNT; i++) {
      const nearest = nodes
        .map((p, j) => ({ j, d: p.distanceTo(nodes[i]) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, K);
      nearest.forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edges.push([i, j]);
        }
      });
    }

    const edgePositions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], e) => {
      edgePositions.set(
        [
          nodes[a].x, nodes[a].y, nodes[a].z,
          nodes[b].x, nodes[b].y, nodes[b].z,
        ],
        e * 6
      );
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(edgePositions, 3)
    );
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.16,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    group.add(edgeLines);

    const PULSE_COUNT = Math.min(16, edges.length);
    const pulsePos = new Float32Array(PULSE_COUNT * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(pulsePos, 3)
    );
    const pulseMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.17,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulsePoints = new THREE.Points(pulseGeo, pulseMat);
    group.add(pulsePoints);

    type Pulse = { edge: number; t: number; speed: number };
    const newPulse = (): Pulse => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.004 + Math.random() * 0.007,
    });
    const pulses: Pulse[] = Array.from({ length: PULSE_COUNT }, newPulse);

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

    const tmp = new THREE.Vector3();
    const updatePulses = () => {
      for (let i = 0; i < pulses.length; i++) {
        const pl = pulses[i];
        pl.t += pl.speed;
        if (pl.t >= 1) {
          pl.t = 0;
          pl.edge = Math.floor(Math.random() * edges.length);
          pl.speed = 0.004 + Math.random() * 0.007;
        }
        const [a, b] = edges[pl.edge];
        tmp.copy(nodes[a]).lerp(nodes[b], pl.t);
        pulsePos[i * 3 + 0] = tmp.x;
        pulsePos[i * 3 + 1] = tmp.y;
        pulsePos[i * 3 + 2] = tmp.z;
      }
      pulseGeo.attributes.position.needsUpdate = true;
    };

    let animationId: number | null = null;
    let running = false;
    let t = 0;

    const render = () => renderer.render(scene, camera);

    const loop = () => {
      animationId = requestAnimationFrame(loop);
      t += 1;
      group.rotation.y += 0.0022;
      group.rotation.x = Math.sin(t * 0.002) * 0.16;
      updatePulses();
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

    updatePulses();
    if (prefersReduced) render();
    else start();

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      nodeGeo.dispose();
      nodeMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
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
