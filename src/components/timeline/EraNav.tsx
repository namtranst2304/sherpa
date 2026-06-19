"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";

export function EraNav({ eraRefs }: { eraRefs: React.RefObject<Map<string, HTMLElement>> }) {
  const [hoveredEraId, setHoveredEraId] = useState<string | null>(null);
  const [navActiveIndex, setNavActiveIndex] = useState(0);
  
  // Tweak spring to be very responsive (not sticky) but smooth
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 400, damping: 40, mass: 1 });
  const progressWidth = useTransform(smoothProgress, (p) => `${p}%`);

  const [autoScrollState, setAutoScrollState] = useState<{ start: number, target: number } | null>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const effectiveActiveIndex = autoScrollState ? autoScrollState.target : navActiveIndex;
  const displayEra = DESTINY_TIMELINE.find((e) => e.id === hoveredEraId) || DESTINY_TIMELINE[effectiveActiveIndex] || DESTINY_TIMELINE[0];
  const displayIndex = DESTINY_TIMELINE.indexOf(displayEra);
  
  const activeTheme = getTheme(DESTINY_TIMELINE[effectiveActiveIndex]?.themeColor);
  const displayTheme = getTheme(displayEra.themeColor);

  useEffect(() => {
    const handleScroll = () => {
      if (DESTINY_TIMELINE.length < 2) return;

      const offset = window.innerHeight * 0.4;
      let currentIndex = 0, progress = 0;

      for (let i = 0; i < DESTINY_TIMELINE.length - 1; i++) {
        const el1 = eraRefs.current?.get(DESTINY_TIMELINE[i].id);
        const el2 = eraRefs.current?.get(DESTINY_TIMELINE[i + 1].id);
        if (!el1 || !el2) continue;

        const top1 = el1.getBoundingClientRect().top;
        const top2 = el2.getBoundingClientRect().top;
        
        if (top1 - offset <= 0 && top2 - offset > 0) {
          currentIndex = i;
          progress = Math.max(0, Math.min(1, -(top1 - offset) / (top2 - top1)));
          break;
        }
      }

      const lastEl = eraRefs.current?.get(DESTINY_TIMELINE[DESTINY_TIMELINE.length - 1].id);
      if (lastEl && lastEl.getBoundingClientRect().top - offset <= 0) {
        currentIndex = DESTINY_TIMELINE.length - 1;
        progress = 0;
      }

      setNavActiveIndex((prev) => (prev !== currentIndex ? currentIndex : prev));
      rawProgress.set((currentIndex + progress) * (100 / (DESTINY_TIMELINE.length - 1)));

      // If auto-scrolling and we reached the target, clear it
      if (autoScrollState && currentIndex === autoScrollState.target) {
        setAutoScrollState(null);
        if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [eraRefs, rawProgress, autoScrollState]);

  const scrollToEra = useCallback((id: string) => {
    const targetIdx = DESTINY_TIMELINE.findIndex(e => e.id === id);
    setAutoScrollState({ start: navActiveIndex, target: targetIdx });
    
    if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);
    autoScrollTimer.current = setTimeout(() => {
      setAutoScrollState(null);
    }, 1500); // Failsafe timeout

    eraRefs.current?.get(id)?.scrollIntoView({ behavior: "smooth" });
  }, [eraRefs, navActiveIndex]);

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-8 inset-x-0 mx-auto w-full max-w-5xl z-50 px-4"
    >
      <div className="backdrop-blur-md bg-black/60 border border-white/5 rounded-2xl p-4 md:p-6 shadow-2xl relative">
        <div className="flex flex-col space-y-6 relative">
          
          {/* Chapter Display */}
          <div className="flex items-center justify-between text-sm md:text-base tracking-widest font-mono uppercase px-4">
            <div className="text-zinc-500">Timeline</div>
            <motion.div layout className="flex items-center space-x-3 text-white">
              <span className="text-zinc-500">{"//"}</span>
              <span className="font-bold">Chương {String(displayIndex + 1).padStart(2, "0")}</span>
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={displayEra.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`font-bold ${displayTheme.text} drop-shadow-lg whitespace-nowrap`}
                  >
                    {displayEra.name}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-zinc-500">{"//"}</span>
            </motion.div>
          </div>

          {/* The Timeline Container */}
          <div className="relative mx-4 md:mx-8 flex items-center h-8">
            {/* Shadcn-style Progress Line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 overflow-hidden rounded-full bg-zinc-800/80 z-0">
              <motion.div
                className={`h-full rounded-full ${activeTheme.bg} z-0`}
                style={{ width: progressWidth }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Nodes */}
            {DESTINY_TIMELINE.map((era, idx) => {
              const isAutoScrolling = autoScrollState !== null;
              
              // During auto-scroll, the target immediately becomes active (fades in), 
              // and the origin immediately becomes inactive (fades out).
              const isActive = isAutoScrolling 
                ? (idx === autoScrollState.target)
                : (idx === navActiveIndex);
              
              const isHovered = hoveredEraId === era.id;
              // We only color the tick marks based on isPast, NOT the diamond nodes
              const isPast = idx <= navActiveIndex;
              const theme = getTheme(era.themeColor);

              return (
                <button
                  key={era.id}
                  onClick={() => scrollToEra(era.id)}
                  onMouseEnter={() => setHoveredEraId(era.id)}
                  onMouseLeave={() => setHoveredEraId(null)}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center group outline-none cursor-pointer z-10"
                  style={{ left: `${idx * (100 / (DESTINY_TIMELINE.length - 1 || 1))}%` }}
                  aria-label={`Chương ${idx + 1}: ${era.name}`}
                >
                  {/* Vertical Tick Mark */}
                  <div className={`absolute inset-0 m-auto w-[2px] h-3 rounded-full transition-colors duration-300 ease-out ${isPast ? activeTheme.bg : 'bg-zinc-700/80'}`} />

                  {/* Base diamond */}
                  <div
                    className={`transition-all duration-300 ease-in-out relative z-10 ${
                      isActive ? "w-3.5 h-3.5 bg-white" : isHovered ? "w-2.5 h-2.5 bg-white" : "w-2 h-2 bg-zinc-700 group-hover:bg-zinc-500"
                    }`}
                    style={{ 
                      rotate: "45deg", 
                      ...(isActive || isHovered ? { boxShadow: `0 0 ${isActive ? '24px' : '15px'} ${theme.hex}` } : {}) 
                    }}
                  >
                    {/* Simple pulse for active state */}
                    {isActive && (
                      <div className="absolute inset-0 border border-white/60 animate-ping opacity-75" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
