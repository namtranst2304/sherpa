"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { CyberBadge } from "@/components/ui/CyberComponents";
import { DESTINY_TIMELINE, TimelineEra, TimelineEvent } from "@/data/timeline/index";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, Tag, ChevronDown } from "lucide-react";

// ─── THEME COLOR MAP ─────────────────────────────────────────────────────────
const themeColorMap: Record<string, { text: string; border: string; bg: string; glow: string; shadow: string; hex: string }> = {
  cyan:   { text: "text-cyan-400",   border: "border-cyan-400",   bg: "bg-cyan-400",   glow: "drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]",   shadow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]",   hex: "#22d3ee" },
  green:  { text: "text-green-400",  border: "border-green-400",  bg: "bg-green-400",  glow: "drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]",  shadow: "shadow-[0_0_15px_rgba(74,222,128,0.4)]",  hex: "#4ade80" },
  yellow: { text: "text-yellow-400", border: "border-yellow-400", bg: "bg-yellow-400", glow: "drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]", shadow: "shadow-[0_0_15px_rgba(250,204,21,0.4)]", hex: "#facc15" },
  orange: { text: "text-orange-500", border: "border-orange-500", bg: "bg-orange-500", glow: "drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]", shadow: "shadow-[0_0_15px_rgba(249,115,22,0.4)]", hex: "#f97316" },
  red:    { text: "text-red-500",    border: "border-red-500",    bg: "bg-red-500",    glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]",    shadow: "shadow-[0_0_15px_rgba(239,68,68,0.4)]",    hex: "#ef4444" },
  zinc:   { text: "text-zinc-400",   border: "border-zinc-400",   bg: "bg-zinc-400",   glow: "drop-shadow-[0_0_8px_rgba(161,161,170,0.8)]",   shadow: "shadow-[0_0_15px_rgba(161,161,170,0.4)]",   hex: "#a1a1aa" },
  purple: { text: "text-purple-400", border: "border-purple-400", bg: "bg-purple-400", glow: "drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]", shadow: "shadow-[0_0_15px_rgba(192,132,252,0.4)]", hex: "#c084fc" },
  blue:   { text: "text-blue-400",   border: "border-blue-400",   bg: "bg-blue-400",   glow: "drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]",   shadow: "shadow-[0_0_15px_rgba(96,165,250,0.4)]",   hex: "#60a5fa" },
};

// ─── EVENT CARD ──────────────────────────────────────────────────────────────
function EventCard({ event, isRightSide, themeColor }: { event: TimelineEvent; isRightSide: boolean; themeColor: string }) {
  const theme = themeColorMap[themeColor] || themeColorMap.zinc;
  return (
    <motion.div
      className={`bg-zinc-900/30 backdrop-blur-sm p-5 md:p-6 relative overflow-hidden group
        ${isRightSide ? "md:rounded-tr-2xl md:rounded-bl-2xl md:rounded-tl-none md:rounded-br-2xl" : "md:rounded-tl-2xl md:rounded-br-2xl md:rounded-tr-none md:rounded-bl-2xl"}
        rounded-tr-2xl rounded-bl-2xl border border-zinc-800/50 hover:border-zinc-700/80 transition-colors duration-500
      `}
      whileHover={{
        scale: 1.01,
        backgroundColor: "rgba(24, 24, 27, 0.5)",
      }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <h4 className={`text-xl md:text-2xl font-black mb-4 transition-all ${theme.text} drop-shadow-md ${isRightSide ? "md:text-left" : "md:text-right"} text-left group-hover:brightness-125`}>
        {event.title}
      </h4>
      <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4 group-hover:text-zinc-200 transition-colors relative z-10 font-mono text-justify whitespace-pre-line">
        {event.description}
      </p>
      <div className={`flex flex-wrap items-center gap-2 relative z-10 ${isRightSide ? "md:justify-start" : "md:justify-end"} justify-start`}>
        {event.date && (
          <span className={`flex items-center text-[10px] ${theme.text} font-bold font-mono bg-zinc-800/80 px-2 py-0.5 border ${theme.border}/30`}>
            <Calendar className="w-3 h-3 mr-1" />
            {event.date}
          </span>
        )}
        {event.tags?.map((tag, tagIdx) => (
          <CyberBadge key={tagIdx} variant="zinc" withIndicator={true} className="text-[10px] py-0.5 px-2 bg-zinc-800/90 border-zinc-700 shadow-sm">
            <Tag className="w-3 h-3 mr-1 text-zinc-500" />
            {tag}
          </CyberBadge>
        ))}
      </div>
    </motion.div>
  );
}

// ─── ERA HEADER ──────────────────────────────────────────────────────────────
function EraHeader({ era, index }: { era: TimelineEra; index: number }) {
  const theme = themeColorMap[era.themeColor] || themeColorMap.zinc;
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
          <span className={`text-xs font-mono tracking-[0.4em] uppercase ${theme.text} opacity-70`}>
            Chương {String(index + 1).padStart(2, "0")}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 18, delay: 0.15 }}
          className={`text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-4 ${theme.glow}`}
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

// ─── ERA EVENTS SECTION ──────────────────────────────────────────────────────
function EraEvents({ era }: { era: TimelineEra }) {
  const theme = themeColorMap[era.themeColor] || themeColorMap.zinc;
  return (
    <div className="relative max-w-7xl mx-auto px-4 pb-16">
      {/* Central vertical line */}
      <motion.div
        className={`absolute left-8 md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] ${theme.bg} opacity-20`}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.5, ease: "circOut" }}
      />

      <div className="space-y-6 md:space-y-10 relative">
        {era.events.map((event, eventIdx) => {
          const isRightSide = eventIdx % 2 !== 0;
          return (
            <motion.div
              key={eventIdx}
              initial={{ opacity: 0, x: isRightSide ? 40 : -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring" as const, stiffness: 120, damping: 20, delay: 0.05 }}
              className="relative flex flex-col md:flex-row items-center w-full"
            >
              {/* Center Node */}
              <motion.div
                className={`absolute left-[24px] md:left-1/2 md:-ml-[6px] w-3 h-3 rounded-none bg-black border-[2px] ${theme.border} z-10`}
                style={{ rotate: "45deg" }}
                whileHover={{ scale: 1.4, backgroundColor: theme.hex }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
              />

              {/* Left Side */}
              <div className={`hidden md:block w-1/2 pr-8 lg:pr-10`}>
                {!isRightSide && <EventCard event={event} isRightSide={false} themeColor={era.themeColor} />}
              </div>

              {/* Right Side */}
              <div className="w-full pl-16 md:w-1/2 md:pl-8 lg:pl-10">
                <div className={`block ${!isRightSide ? "md:hidden" : ""}`}>
                  <EventCard event={event} isRightSide={true} themeColor={era.themeColor} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      {/* Radial glow behind title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 mb-4 relative">
          Destiny Universe
        </h1>
        <motion.span
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" as const, stiffness: 100, damping: 15, delay: 0.3 }}
          className="block text-xl md:text-3xl font-bold tracking-[0.3em] text-zinc-400 uppercase"
        >
          Biên Niên Sử
        </motion.span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring" as const, stiffness: 80, delay: 0.5 }}
        className="text-zinc-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed mt-8 font-mono text-center relative z-10"
      >
        Toàn bộ các sự kiện quan trọng trong vũ trụ Destiny, từ thời kỳ Hỗn Mang đến Kỷ Nguyên Ánh Sáng và Bóng Tối.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">Cuộn để khám phá</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-neon-cyan/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── STICKY ERA NAV ──────────────────────────────────────────────────────────
function EraNav({ activeEraId, eraRefs }: { activeEraId: string; eraRefs: React.RefObject<Map<string, HTMLElement>> }) {
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
            const theme = themeColorMap[era.themeColor] || themeColorMap.zinc;
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

// ─── SCROLL PROGRESS BAR ─────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="fixed top-14 left-0 right-0 h-[2px] bg-neon-cyan/60 z-50 origin-left"
      style={{ scaleX }}
    />
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export function DestinyTimeline() {
  const [activeEraId, setActiveEraId] = useState(DESTINY_TIMELINE[0]?.id || "");
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Track which era is currently in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refMap = eraRefs.current;

    refMap.forEach((el, eraId) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveEraId(eraId);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const setEraRef = useCallback((eraId: string, el: HTMLElement | null) => {
    if (el) {
      eraRefs.current.set(eraId, el);
    }
  }, []);

  return (
    <>
      <ScrollProgress />
      <EraNav activeEraId={activeEraId} eraRefs={eraRefs} />

      <HeroSection />

      {/* Era Chapters */}
      <div className="relative">
        {DESTINY_TIMELINE.map((era, index) => (
          <section
            key={era.id}
            ref={(el) => setEraRef(era.id, el)}
            id={`era-${era.id}`}
            className="relative"
          >
            {/* Era divider line */}
            {index > 0 && (
              <div className="max-w-7xl mx-auto px-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-zinc-700 to-transparent"
                  style={{ originX: 0.5 }}
                />
              </div>
            )}

            <EraHeader era={era} index={index} />
            <EraEvents era={era} />
          </section>
        ))}

        {/* End cap */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-24"
        >
          <p className="text-zinc-600 text-xs font-mono tracking-widest uppercase">
            — Kết thúc Biên Niên Sử —
          </p>
          <div className="mt-4 w-16 h-[2px] bg-neon-cyan/30 mx-auto" />
        </motion.div>
      </div>
    </>
  );
}
