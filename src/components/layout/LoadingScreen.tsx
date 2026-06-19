"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/destiny-loading-bg.jpg"
          alt="Loading Background"
          fill
          className="object-cover opacity-50 mix-blend-screen scale-105"
          priority
        />
        {/* Overlay gradient to darken edges and make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Spinner or logo */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-neon-cyan/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-t-2 border-l-2 border-white/50"
          />
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 bg-white/20 blur-md rounded-full"
          />
          {/* Core dot */}
          <div className="absolute w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <h2 className="text-white font-black text-xl md:text-2xl tracking-[0.4em] uppercase text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Destiny Universe</h2>
          <div className="text-neon-cyan font-mono tracking-[0.2em] text-xs uppercase text-center flex items-center gap-2 drop-shadow-md">
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-neon-cyan inline-block rounded-sm"
            />Connecting to Vanguard Network...</div>
          <span className="text-zinc-400 font-mono tracking-widest text-[10px] mt-2 border border-zinc-800/80 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded uppercase">Decrypting Historical Archives</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
