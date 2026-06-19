"use client";

import React, { useState, useEffect, useRef } from "react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { HeroSection } from "../timeline/HeroSection";
import { EraNav } from "../timeline/EraNav";
import { ScrollProgress } from "../timeline/ScrollProgress";
import { EraHeader } from "../timeline/EraHeader";
import { EraEvents } from "../timeline/EraEvents";

export function DestinyTimeline() {
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Track which era is currently in view
  useEffect(() => {
    const handleScroll = () => {
      // Intentionally left empty as activeEraId is no longer needed here
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-transparent min-h-screen font-sans text-zinc-100 overflow-x-hidden selection:bg-neon-cyan/30 selection:text-white pb-32">
      <ScrollProgress />
      <EraNav eraRefs={eraRefs} />
      <HeroSection />

      {/* TIMELINE CONTENT */}
      <div className="relative pt-20">
        {DESTINY_TIMELINE.map((era, idx) => (
          <section
            key={era.id}
            id={era.id}
            ref={(el) => {
              if (el) eraRefs.current.set(era.id, el);
            }}
            className="mb-24 md:mb-40 scroll-mt-32"
          >
            <EraHeader era={era} index={idx} />
            <EraEvents era={era} />
          </section>
        ))}
      </div>
    </div>
  );
}
