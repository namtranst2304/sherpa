"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import { DESTINY_TIMELINE, type TimelineEra } from "@/data/timeline/index";
import { getTheme, type ThemeColorTokens } from "@/lib/theme";

const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];

function TimelineNode({ era, idx, total, isActive, isPast, activeTheme, onClick }: { era: TimelineEra, idx: number, total: number, isActive: boolean, isPast: boolean, activeTheme: ThemeColorTokens, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const theme = getTheme(era.themeColor);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center group outline-none cursor-pointer z-10"
      style={{ top: `${idx * (100 / (total - 1 || 1))}%` }}
      aria-label={`Chương ${idx + 1}: ${era.name}`}
    >
      {/* Horizontal Tick Mark */}
      <div className={`absolute inset-0 m-auto h-[2px] w-3 rounded-full transition-colors duration-300 ease-out z-0 ${isPast ? activeTheme.bg : 'bg-zinc-700/80'}`} />

      {/* Outer Glow Ring (matching carousel buttons) */}
      <div 
        className={`absolute m-auto inset-0 border transition-all duration-500 ease-out z-10 ${isActive ? "w-5 h-5 opacity-100 scale-100" : isHovered ? "w-4 h-4 opacity-100 scale-100" : "w-2 h-2 opacity-0 scale-75"}`}
        style={{ rotate: "45deg", borderColor: theme.hex, boxShadow: (isActive || isHovered) ? `0 0 10px rgba(${theme.rgb}, 0.6), inset 0 0 10px rgba(${theme.rgb}, 0.2)` : 'none' }}
      />

      {/* Base inner diamond */}
      <div
        className={`transition-all duration-500 ease-out relative z-20 ${isActive ? "w-2.5 h-2.5 bg-white" : isHovered ? "w-2 h-2 bg-white" : "w-1.5 h-1.5 bg-zinc-600 group-hover:bg-zinc-400"}`}
        style={{ rotate: "45deg", ...(isActive || isHovered ? { boxShadow: `0 0 15px ${theme.hex}` } : {}) }}
      />

      {/* Popout Label ONLY ON HOVER */}
      <AnimatePresence>
        {(isHovered && !isActive) && (
          <motion.div
            initial={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.2 }}
            className="absolute right-full mr-5 flex flex-col items-end pointer-events-none drop-shadow-2xl bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2"
          >
            <div className="absolute right-[-21px] top-1/2 w-5 h-[1px] bg-white/20" />
            <span className={`text-[9px] md:text-[10px] font-sans font-medium tracking-widest uppercase ${theme.text} mb-1 opacity-90 whitespace-nowrap`}>
              CHƯƠNG {romanNumerals[idx] || String(idx + 1)}
            </span>
            <span className="text-sm md:text-base font-sans tracking-widest text-white whitespace-nowrap uppercase" style={{ textShadow: `0 2px 10px rgba(${theme.rgb}, 0.5)` }}>
              {era.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export function EraNav({ eraRefs }: { eraRefs: React.RefObject<Map<string, HTMLElement>> }) {
  const [navActiveIndex, setNavActiveIndex] = useState(0);

  // Tweak spring to be very responsive (not sticky) but smooth
  const rawProgress = useMotionValue(0);
  const smoothProgress = useSpring(rawProgress, { stiffness: 400, damping: 40, mass: 1 });
  const progressWidth = useTransform(smoothProgress, (p) => `${p}%`);

  // Use ref for autoScrollState so the scroll listener doesn't need to re-register
  // every time auto-scroll state changes (avoids listener thrashing)
  const autoScrollStateRef = useRef<{ start: number, target: number } | null>(null);
  const [autoScrollTarget, setAutoScrollTarget] = useState<number | null>(null);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const effectiveActiveIndex = autoScrollTarget !== null ? autoScrollTarget : navActiveIndex;
  const activeEra = DESTINY_TIMELINE[effectiveActiveIndex] || DESTINY_TIMELINE[0];
  const activeTheme = getTheme(activeEra.themeColor);

  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return; // Already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = null;

        const scrollContainer = document.getElementById("timeline-scroll-container") as HTMLElement;
        if (!scrollContainer || DESTINY_TIMELINE.length < 2) return;

        const scrollTop = scrollContainer.scrollTop;
        const vh = scrollContainer.clientHeight;

        // O(1) calculation instead of layout thrashing loop
        const floatIndex = Math.max(0, Math.min(scrollTop / vh, DESTINY_TIMELINE.length - 1));
        const activeIdx = Math.round(floatIndex);

        setNavActiveIndex((prev) => (prev !== activeIdx ? activeIdx : prev));
        rawProgress.set(floatIndex * (100 / (DESTINY_TIMELINE.length - 1)));

        // If auto-scrolling and we reached the target, clear it
        // Read from ref — no dependency needed, avoids re-registering listener
        const currentAutoScroll = autoScrollStateRef.current;
        if (currentAutoScroll && activeIdx === currentAutoScroll.target) {
          autoScrollStateRef.current = null;
          setAutoScrollTarget(null);
          if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);
        }
      });
    };

    const scrollContainer = document.getElementById("timeline-scroll-container") || window;
    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    
    return () => {
      scrollContainer.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [eraRefs, rawProgress]); // autoScrollState removed — using ref instead

  const scrollToEra = useCallback((id: string) => {
    const targetIdx = DESTINY_TIMELINE.findIndex(e => e.id === id);
    autoScrollStateRef.current = { start: navActiveIndex, target: targetIdx };
    setAutoScrollTarget(targetIdx);

    if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);
    autoScrollTimer.current = setTimeout(() => {
      autoScrollStateRef.current = null;
      setAutoScrollTarget(null);
    }, 1500); // Failsafe timeout

    eraRefs.current?.get(id)?.scrollIntoView({ behavior: "smooth" });
  }, [eraRefs, navActiveIndex]);

  return (
    <>
      <motion.nav
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed right-0 md:right-4 top-1/2 -translate-y-1/2 h-[80vh] min-h-[400px] max-h-[800px] z-50 w-8 flex flex-col py-4"
      >
        <div className="flex-1 relative flex items-center justify-center">
        {/* The Timeline Line Container */}
        <div className="relative w-[2px] h-full bg-white/10 z-0">
          {/* Active Progress Line */}
          <motion.div
            className={`w-full rounded-full ${activeTheme.bg} z-0 absolute top-0`}
            style={{ height: progressWidth }}
            transition={{ ease: "easeInOut" }}
          />

          {/* Nodes */}
          {DESTINY_TIMELINE.map((era, idx) => {
            const isAutoScrolling = autoScrollTarget !== null;
            const isActive = isAutoScrolling ? (idx === autoScrollTarget) : (idx === navActiveIndex);
            const isPast = idx <= effectiveActiveIndex;

            return (
              <TimelineNode 
                key={era.id} 
                era={era} 
                idx={idx} 
                total={DESTINY_TIMELINE.length} 
                isActive={isActive} 
                isPast={isPast} 
                activeTheme={activeTheme} 
                onClick={() => scrollToEra(era.id)} 
              />
            );
          })}
        </div>
        </div>
      </motion.nav>
    </>
  );
}
