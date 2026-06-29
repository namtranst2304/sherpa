"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ScrollProgress() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById("timeline-scroll-container"));
  }, []);

  const { scrollYProgress } = useScroll({ container: container ? { current: container } : undefined });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 h-[2px] bg-[#00f3ff] z-50 origin-left opacity-60"
      style={{ scaleX }}
    />
  );
}
