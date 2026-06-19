import React from "react";
import { motion } from "motion/react";
import { TimelineEra } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";

export function EraHeader({ era, index }: { era: TimelineEra; index: number }) {
  const theme = getTheme(era.themeColor);
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring" as const, stiffness: 80, damping: 20 }}
      className="relative py-16 md:py-24 mb-8"
    >
      {/* Giant background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className={`text-[10rem] md:text-[16rem] font-black font-mono ${theme.text} opacity-[0.03] leading-none`}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 120, damping: 20, delay: 0.1 }}
          className="mb-4"
        >
          <span className={`text-sm md:text-base font-mono font-bold tracking-[0.4em] uppercase ${theme.text} opacity-90`}>
            Chương {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 18, delay: 0.15 }}
          className={`text-2xl md:text-4xl font-black uppercase tracking-wider text-white mb-4 leading-snug md:leading-snug py-1 whitespace-nowrap ${theme.glow}`}
        >
          {era.name}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 18, delay: 0.25 }}
          className="text-zinc-500 text-sm md:text-base font-mono leading-relaxed"
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
            <img 
              src={era.image} 
              alt={era.name} 
              className="w-full h-auto object-cover transition-opacity duration-1000 opacity-90 hover:opacity-100 aspect-video" 
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
