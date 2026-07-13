"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// A full-screen GLSL fluid: domain-warped fbm flowing in emerald/teal over
// near-black, brightened and rippled under the cursor. Cheaper than the old
// particle grid (a single fragment-shader quad), so it also helps mobile.
// Pauses when off-screen; renders a single static frame under reduced motion.
const FRAG = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uPointer;   // 0..1, y up
uniform float uReduced;
varying vec2 vUv;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0,0)), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = vUv;
  float agsp = uResolution.x / uResolution.y;
  vec2 p = uv; p.x *= agsp;

  float t = uTime * 0.06 * (1.0 - uReduced * 0.999);

  // Domain warp for a liquid, marbled flow.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p + 1.7*q + vec2(8.3, 2.8) + 0.15*t),
                fbm(p + 1.7*q + vec2(2.1, 9.2) - 0.12*t));
  float f = fbm(p + 2.4*r);

  // Cursor influence: a soft glow that warms and brightens the flow.
  vec2 ptr = uPointer; ptr.x *= agsp;
  float d = distance(p, ptr);
  float glow = exp(-d*d*3.5);
  f += glow * 0.35;

  // Emerald palette from deep black to bright teal.
  vec3 c0 = vec3(0.011, 0.024, 0.020);
  vec3 c1 = vec3(0.024, 0.086, 0.067);
  vec3 c2 = vec3(0.031, 0.353, 0.247);
  vec3 c3 = vec3(0.204, 0.918, 0.671);
  vec3 col = mix(c0, c1, smoothstep(0.0, 0.55, f));
  col = mix(col, c2, smoothstep(0.5, 0.8, f));
  col = mix(col, c3, smoothstep(0.78, 1.05, f + glow*0.4));
  col += glow * vec3(0.05, 0.22, 0.16);

  // Vignette + subtle grain.
  float vig = smoothstep(1.15, 0.35, length(uv - 0.5));
  col *= vig;
  col += (hash(uv * uResolution + t) - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
`;

export function FluidHero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.55) },
      uReduced: { value: prefersReduced ? 1 : 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(
        width * renderer.getPixelRatio(),
        height * renderer.getPixelRatio()
      );
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const targetPtr = new THREE.Vector2(0.5, 0.55);
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      targetPtr.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let raf: number | null = null;
    let running = false;
    const clock = new THREE.Clock();

    const render = () => {
      uniforms.uPointer.value.lerp(targetPtr, 0.06);
      renderer.render(scene, camera);
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      uniforms.uTime.value += clock.getDelta();
      render();
    };
    const start = () => {
      if (running || prefersReduced) return;
      running = true;
      clock.start();
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

    if (prefersReduced) render();
    else start();

    return () => {
      stop();
      visibility.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      quad.geometry.dispose();
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
