"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { AnimatedScrollText } from "../timeline/AnimatedScrollText";

export function LandingPage() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleEnter = () => {
    setIsTransitioning(true);
    
    // Play backgound music
    const audio = document.getElementById("global-bg-audio") as HTMLAudioElement;
    if (audio) {
      audio.play().catch(e => console.error("Audio error:", e));
    }

    // Wait for the door to close, then navigate to timeline
    setTimeout(() => {
      router.push("/timeline");
    }, 1000);
  };

  return (
    <div className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden w-full bg-black">
      
      {/* Background from HeroSection */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-start justify-center">
        <img 
          src="/images/timeline/heroBG.webp" 
          alt="Destiny Universe Background" 
          className="w-full h-auto opacity-40 mix-blend-luminosity" 
        />
        {/* Gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -top-20 left-1/2 -translate-x-1/2 text-[8rem] md:text-[12rem] font-black text-neon-cyan leading-none pointer-events-none select-none whitespace-nowrap"
        >
          DESTINY
        </motion.div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 mb-4 relative">Destiny Universe</h1>
        <motion.span
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
          className="block text-xl md:text-3xl font-bold tracking-[0.3em] text-zinc-400 uppercase drop-shadow-md"
        >Timeline</motion.span>
      </motion.div>

      {/* Enter Button (Restored Animated Scroll Text) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-32 md:bottom-40 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer z-20 group"
        onClick={handleEnter}
      >
        <AnimatedScrollText />
        
        {/* Cascading Chevrons */}
        <div className="flex flex-col items-center -space-y-3 pt-2">
          <motion.div animate={{ opacity: [0.1, 1, 0.1], y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 }}>
             <ChevronDown className="w-4 h-4 text-neon-cyan/40" />
          </motion.div>
          <motion.div animate={{ opacity: [0.1, 1, 0.1], y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
             <ChevronDown className="w-5 h-5 text-neon-cyan/70" />
          </motion.div>
          <motion.div animate={{ opacity: [0.1, 1, 0.1], y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}>
             <ChevronDown className="w-6 h-6 text-neon-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Door Transition Animation overlay (Starts OPEN, Closes on Enter) */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* Left Door */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1/2 bg-black/95 backdrop-blur-md pointer-events-auto overflow-hidden"
            >
              <div className="absolute right-0 top-0 bottom-0 w-[200vw] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black" />
            </motion.div>

            {/* Right Door */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-black/95 backdrop-blur-md pointer-events-auto overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[200vw] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
