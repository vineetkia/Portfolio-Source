"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidButtonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white",
        accent: "text-emerald-950",
      },
      size: {
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type BaseProps = VariantProps<typeof liquidButtonVariants> & {
  className?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function LiquidButton({
  className,
  variant,
  size,
  href,
  target,
  rel,
  onClick,
  type = "button",
  children,
  ...rest
}: BaseProps) {
  const isAccent = variant === "accent";
  const cls = cn(liquidButtonVariants({ variant, size }), className);

  const inner = (
    <>
      {/* Liquid-glass surface: SVG displacement over a translucent, blurred layer. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-full border backdrop-blur-md transition-colors duration-300",
          isAccent
            ? "border-emerald-300/40 bg-emerald-400/90 group-hover:bg-emerald-300"
            : "border-white/15 bg-white/10 group-hover:bg-white/15"
        )}
        style={{ backdropFilter: "url(#liquid-glass) blur(6px)" }}
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isAccent
            ? "radial-gradient(120px 60px at 50% 0%, rgba(255,255,255,0.45), transparent 70%)"
            : "radial-gradient(120px 60px at 50% 0%, rgba(16,185,129,0.35), transparent 70%)",
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={cls}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {inner}
    </button>
  );
}

// Render once near the root. Provides the SVG filter referenced above.
export function GlassFilter() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute h-0 w-0"
      focusable="false"
    >
      <defs>
        <filter
          id="liquid-glass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.012"
            numOctaves="2"
            seed="7"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="18s"
              values="0.008 0.012;0.012 0.008;0.008 0.012"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
