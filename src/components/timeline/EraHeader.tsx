import React from "react";
import { motion } from "motion/react";
import { TimelineEra } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";
import Image from "next/image";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];

export function EraHeader({ era, index }: { era: TimelineEra; index: number }) {
  const theme = getTheme(era.themeColor);
  const chapterRoman = romanNumerals[index] || String(index + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
      className="relative py-8 md:py-16 mb-8"
    >
      {/* Giant background Roman Numeral */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className={`text-[12rem] md:text-[20rem] font-sans ${theme.text} opacity-[0.02] leading-none tracking-widest`}>
          {chapterRoman}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 25, delay: 0.1 }}
          className="mb-6 flex items-center justify-center gap-6"
        >
          {/* Elegant divider lines */}
          <div className="h-[1px] w-12 md:w-32 xl:w-48 bg-gradient-to-r from-transparent via-white/20 to-white/40" />
          <span className={`text-xs md:text-sm xl:text-base font-sans font-medium tracking-widest uppercase ${theme.text} opacity-90`} style={{ textShadow: `0 0 15px rgba(${theme.rgb}, 0.6)` }}>
            ✧ CHƯƠNG {chapterRoman} ✧
          </span>
          <div className="h-[1px] w-12 md:w-32 xl:w-48 bg-gradient-to-l from-transparent via-white/20 to-white/40" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 90, damping: 20, delay: 0.15 }}
          className={`relative inline-block text-3xl md:text-5xl font-sans tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 mb-8 leading-tight md:leading-tight py-2 uppercase whitespace-pre-line`}
          style={{ filter: `drop-shadow(0 0 20px rgba(${theme.rgb}, 0.3))` }}
        >
          {era.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 90, damping: 20, delay: 0.25 }}
          className="text-zinc-400 text-sm md:text-base xl:text-[17px] font-sans font-light leading-relaxed tracking-wide max-w-2xl mx-auto"
        >
          {era.description}
        </motion.p>

        {era.image && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 18, delay: 0.35 }}
            className={`mt-10 relative z-10 w-full max-w-3xl mx-auto overflow-hidden rounded-2xl border ${theme.border}/30 shadow-2xl shadow-black/80`}
          >
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none`} />
            <div className={`absolute inset-0 opacity-10 mix-blend-color z-10 pointer-events-none ${theme.bg}`} />
            <Image 
              src={era.image} 
              alt={era.name} 
              className="w-full h-auto object-cover transition-opacity duration-1000 opacity-90 hover:opacity-100 aspect-video" 
              width={1280}
              height={720}
              loading="lazy"
            />
          </motion.div>
        )}

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
          className={`mx-auto mt-8 h-[2px] w-32 ${theme.bg} opacity-40`}
          style={{ originX: 0.5 }}
        />
      </div>
    </motion.div>
  );
}
