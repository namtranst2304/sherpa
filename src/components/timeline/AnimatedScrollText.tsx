"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

export function AnimatedScrollText() {
  const [isHovered, setIsHovered] = useState(false);
  const text = "BEGIN DISCOVERY";

  return (
    <span 
      className="text-zinc-500 transition-colors text-lg md:text-2xl font-mono tracking-[0.4em] uppercase relative flex font-bold"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          animate={isHovered ? {
            opacity: 1,
            textShadow: "0 0 12px rgba(34,211,238,0.8)",
            color: "#22d3ee"
          } : { 
            opacity: [0.3, 1, 0.3],
            textShadow: ["0 0 0px transparent", "0 0 12px rgba(34,211,238,0.8)", "0 0 0px transparent"],
            color: ["#71717a", "#22d3ee", "#71717a"]
          }}
          transition={isHovered ? { duration: 0.2 } : { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: index * 0.15 
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
    </span>
  );
}
