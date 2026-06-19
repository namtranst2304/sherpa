"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function TimelineDoorTransition() {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Open the doors immediately after mount
    const timer = setTimeout(() => {
      setIsOpened(true);
    }, 100);

    // Unmount the component after animation
    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {/* Left Door */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpened ? "-100%" : 0 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-black/95 backdrop-blur-md pointer-events-auto overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-[200vw] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black" />
      </motion.div>

      {/* Right Door */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpened ? "100%" : 0 }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-black/95 backdrop-blur-md pointer-events-auto overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[200vw] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black" />
      </motion.div>
    </div>
  );
}
