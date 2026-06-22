"use client";

import React from "react";
import { motion } from "motion/react";

interface DoorOverlayProps {
  isOpened: boolean;
  initialOpened?: boolean;
  duration?: number;
}

export function DoorOverlay({ isOpened, initialOpened = false, duration = 1.0 }: DoorOverlayProps) {
  return (
    <>
      {/* Left Door */}
      <motion.div
        initial={{ x: initialOpened ? "-100%" : 0 }}
        animate={{ x: isOpened ? "-100%" : 0 }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-black/95 backdrop-blur-md pointer-events-auto overflow-hidden"
      >
        <div className="absolute right-0 top-0 bottom-0 w-[200vw] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black pointer-events-none" />
      </motion.div>

      {/* Right Door */}
      <motion.div
        initial={{ x: initialOpened ? "100%" : 0 }}
        animate={{ x: isOpened ? "100%" : 0 }}
        transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-black/95 backdrop-blur-md pointer-events-auto overflow-hidden"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[200vw] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black pointer-events-none" />
      </motion.div>
    </>
  );
}
