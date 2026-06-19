"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";

export function EraNav({ activeEraId, eraRefs }: { activeEraId: string; eraRefs: React.RefObject<Map<string, HTMLElement>> }) {
  const [visible, setVisible] = useState(false);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-scroll nav to keep active era button visible
  useEffect(() => {
    if (!navScrollRef.current) return;
    const activeBtn = navScrollRef.current.querySelector(`[data-era-id="${activeEraId}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeEraId]);

  const scrollToEra = useCallback((eraId: string) => {
    const el = eraRefs.current?.get(eraId);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [eraRefs]);

  return (
    <motion.nav
      initial={false}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring" as const, stiffness: 200, damping: 25 }}
      className="fixed top-14 left-0 right-0 z-40"
    >
      {/* Gradient top border */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
      
      <div className="bg-black/90 backdrop-blur-xl border-b border-zinc-800/30">
        <div
          ref={navScrollRef}
          className="max-w-full px-2 md:px-4 py-1.5 flex items-center gap-0.5 flex-wrap justify-center"
        >
          {DESTINY_TIMELINE.map((era, idx) => {
            const theme = getTheme(era.themeColor);
            const isActive = activeEraId === era.id;
            return (
              <button
                key={era.id}
                data-era-id={era.id}
                onClick={() => scrollToEra(era.id)}
                className={`relative flex-shrink-0 px-3 py-2 text-xs md:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? `${theme.text} ${theme.glow}`
                    : "text-zinc-600 hover:text-zinc-400"
                }`}
              >
                {/* Active indicator background */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 rounded-sm border ${theme.border}/40 bg-gradient-to-b from-zinc-800/60 to-zinc-900/40`}
                    transition={{ duration: 0.2 }}
                    style={{
                      boxShadow: `0 0 12px ${theme.hex}15, inset 0 1px 0 ${theme.hex}20`,
                    }}
                  />
                )}
                
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className={`${isActive ? "opacity-70" : "opacity-40"}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`hidden sm:inline ${isActive ? "" : "opacity-80"}`}>
                    {era.name}
                  </span>
                </span>

                {/* Active dot indicator under the button */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${theme.bg}`}
                    transition={{ duration: 0.2 }}
                    style={{ boxShadow: `0 0 6px ${theme.hex}` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
