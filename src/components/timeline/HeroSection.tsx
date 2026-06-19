import React from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { AnimatedScrollText } from "./AnimatedScrollText";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-start justify-center">
        <Image 
          src="/images/timeline/heroBG.webp" 
          alt="Destiny Universe Background" 
          className="w-full h-auto opacity-40 mix-blend-luminosity" 
          width={1920}
          height={1080}
          priority
        />
        {/* Gradient mask to blend nicely into the timeline below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      {/* Radial glow behind title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -60, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
        className="relative z-10 text-center"
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
          transition={{ type: "spring" as const, stiffness: 100, damping: 15, delay: 0.3 }}
          className="block text-xl md:text-3xl font-bold tracking-[0.3em] text-zinc-400 uppercase drop-shadow-md"
        >Biên Niên Sử</motion.span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 80, delay: 0.5 }}
        className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed mt-8 font-mono text-center relative z-10 drop-shadow-md"
      >
        Toàn bộ các sự kiện quan trọng trong vũ trụ Destiny, từ thời kỳ Hỗn Mang đến Kỷ Nguyên Ánh Sáng và Bóng Tối.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20 group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
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
    </section>
  );
}
