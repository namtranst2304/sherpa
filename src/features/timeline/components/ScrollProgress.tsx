"use client";


import { motion, useScroll, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 h-[2px] bg-neon-cyan/60 z-50 origin-left"
      style={{ scaleX }}
    />
  );
}
