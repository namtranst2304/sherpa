"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { AnimatedScrollText } from "@/features/timeline/components/AnimatedScrollText";
import { DoorOverlay } from "@/components/common/DoorOverlay";

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
    <div className="relative h-[100dvh] min-h-[500px] flex flex-col items-center justify-between px-4 overflow-hidden w-full bg-black">
      
      {/* Background from HeroSection */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-start justify-center">
        <Image 
          src="/images/timeline/heroBG.webp" 
          alt="Destiny Universe Background" 
          className="w-full h-auto opacity-40 mix-blend-luminosity" 
          width={1920}
          height={1080}
          priority
        />
        {/* Gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]" />
      </div>

      {/* Top Spacer to balance the layout */}
      <div className="flex-1 w-full pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="relative z-10 text-center flex flex-col items-center shrink-0 my-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -top-12 md:-top-20 left-1/2 -translate-x-1/2 text-[5rem] sm:text-[8rem] md:text-[12rem] 2xl:text-[16rem] font-black text-neon-cyan leading-none pointer-events-none select-none whitespace-nowrap"
        >
          DESTINY
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 mb-4 relative text-center">Destiny Universe</h1>
        <motion.span
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
          className="block text-lg sm:text-xl md:text-3xl 2xl:text-4xl font-bold tracking-[0.2em] md:tracking-[0.3em] text-zinc-400 uppercase drop-shadow-md text-center"
        >Timeline</motion.span>
      </motion.div>

      {/* Bottom section with Enter Button */}
      <div className="flex-1 w-full flex items-end justify-center pb-8 md:pb-16 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col items-center gap-4 cursor-pointer group shrink-0"
          onClick={handleEnter}
        >
        <AnimatedScrollText />
        
        {/* Cascading Chevrons */}
        <div className="flex flex-col items-center -space-y-3 pt-2">
          {[
            { delay: 0, styles: "w-4 h-4 text-neon-cyan/40" },
            { delay: 0.2, styles: "w-5 h-5 text-neon-cyan/70" },
            { delay: 0.4, styles: "w-6 h-6 text-neon-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" }
          ].map((chevron, i) => (
            <motion.div key={i} animate={{ opacity: [0.1, 1, 0.1], y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: chevron.delay }}>
               <ChevronDown className={chevron.styles} />
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>

      {/* Door Transition Animation overlay (Starts OPEN, Closes on Enter) */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            <DoorOverlay isOpened={false} initialOpened={true} duration={0.8} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
