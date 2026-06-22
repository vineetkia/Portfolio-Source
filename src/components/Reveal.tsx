"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof tags;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = tags[as];

  return (
    <MotionTag
      className={`reveal-motion ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -40px 0px" }}
      variants={variants}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: delay / 1000,
      }}
    >
      {children}
    </MotionTag>
  );
}
