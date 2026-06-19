"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";
import { createPortal } from "react-dom";

export function EraNav({ eraRefs }: { eraRefs: React.RefObject<Map<string, HTMLElement>> }) {
  const [hoveredEraId, setHoveredEraId] = useState<string | null>(null);
  const [navActiveIndex, setNavActiveIndex] = useState(0);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalNode(document.getElementById("topnav-portal-target"));
  }, []);

  // Tweak spring to be very responsive (not sticky) but smooth
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 400, damping: 40, mass: 1 });
  const progressWidth = useTransform(smoothProgress, (p) => `${p}%`);

  const [autoScrollState, setAutoScrollState] = useState<{ start: number, target: number } | null>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const effectiveActiveIndex = autoScrollState ? autoScrollState.target : navActiveIndex;
  const activeEra = DESTINY_TIMELINE[effectiveActiveIndex] || DESTINY_TIMELINE[0];
  const activeTheme = getTheme(activeEra.themeColor);

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
    <>
      {/* TopNav Overlay for Active Chapter - Rendered into TopNav via Portal */}
      {portalNode && createPortal(
        <div className="h-full flex items-center px-4 md:px-8 -mr-4 md:-mr-6 bg-black/40 backdrop-blur-md border-l border-white/10 relative">
          <div className="flex flex-col items-end justify-center">
            <span className={`text-[9px] md:text-[10px] font-mono font-bold tracking-widest uppercase ${activeTheme.text} transition-colors`}>
              Chương {String(effectiveActiveIndex + 1).padStart(2, "0")}
            </span>
            <div className="relative h-5 md:h-6 overflow-hidden flex items-center">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={activeEra.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xs md:text-sm font-bold text-white whitespace-nowrap"
                >
                  {activeEra.name}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Subtle glowing accent line at the bottom of the TopNav block */}
          <div className={`absolute bottom-0 left-0 w-full h-[2px] ${activeTheme.bg} transition-colors duration-500 shadow-[0_0_10px_currentColor]`} />
        </div>,
        portalNode
      )}

      <motion.nav
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed right-0 md:right-4 top-1/2 -translate-y-1/2 h-[80vh] min-h-[400px] max-h-[800px] z-50 py-4 flex flex-col items-end"
      >

      <div className="flex-1 w-8 relative flex items-center justify-center">
        {/* Background pill to make the line visible against text */}
        <div className="absolute inset-y-0 w-8 bg-black/20 backdrop-blur-sm rounded-full -z-10 border border-white/5" />

        {/* The Timeline Line Container */}
        <div className="relative w-1.5 h-full rounded-full bg-zinc-800/80 z-0">
          {/* Active Progress Line */}
          <motion.div
            className={`w-full rounded-full ${activeTheme.bg} z-0 absolute top-0`}
            style={{ height: progressWidth }}
            transition={{ ease: "easeInOut" }}
          />

          {/* Nodes */}
          {DESTINY_TIMELINE.map((era, idx) => {
            const isAutoScrolling = autoScrollState !== null;
            const isActive = isAutoScrolling ? (idx === autoScrollState.target) : (idx === navActiveIndex);
            const isHovered = hoveredEraId === era.id;
            const isPast = idx <= navActiveIndex;
            const theme = getTheme(era.themeColor);

            return (
              <button
                key={era.id}
                onClick={() => scrollToEra(era.id)}
                onMouseEnter={() => setHoveredEraId(era.id)}
                onMouseLeave={() => setHoveredEraId(null)}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center group outline-none cursor-pointer z-10"
                style={{ top: `${idx * (100 / (DESTINY_TIMELINE.length - 1 || 1))}%` }}
                aria-label={`Chương ${idx + 1}: ${era.name}`}
              >
                {/* Horizontal Tick Mark */}
                <div className={`absolute inset-0 m-auto h-[2px] w-3 rounded-full transition-colors duration-300 ease-out ${isPast ? activeTheme.bg : 'bg-zinc-700/80'}`} />

                {/* Base diamond */}
                <div
                  className={`transition-all duration-300 ease-in-out relative z-10 ${isActive ? "w-3.5 h-3.5 bg-white" : isHovered ? "w-2.5 h-2.5 bg-white" : "w-2 h-2 bg-zinc-700 group-hover:bg-zinc-500"
                    }`}
                  style={{
                    rotate: "45deg",
                    ...(isActive || isHovered ? { boxShadow: `0 0 ${isActive ? '24px' : '15px'} ${theme.hex}` } : {})
                  }}
                >
                  {isActive && (
                    <div className="absolute inset-0 border border-white/60 animate-ping opacity-75" />
                  )}
                </div>

                {/* Popout Label ONLY ON HOVER (and NOT Active, since active is at top) */}
                <AnimatePresence>
                  {(isHovered && !isActive) && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-full mr-3 flex flex-col items-end pointer-events-none drop-shadow-xl bg-black/85 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2"
                    >
                      <span className={`text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase ${theme.text} mb-1`}>
                        Chương {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm md:text-base font-bold text-white whitespace-nowrap">
                        {era.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            );
          })}
        </div>
      </div>
      </motion.nav>
    </>
  );
}
