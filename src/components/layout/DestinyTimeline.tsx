"use client";

import React, { useEffect, useRef } from "react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
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

      {/* TIMELINE CONTENT */}
      <div className="relative pt-8">
        {DESTINY_TIMELINE.map((era, idx) => (
          <section
            key={era.id}
            id={era.id}
            ref={(el) => {
              if (el) eraRefs.current.set(era.id, el);
            }}
            className="mb-16 md:mb-24 scroll-mt-20"
          >
            <EraHeader era={era} index={idx} />
            <EraEvents era={era} />
          </section>
        ))}
      </div>
    </div>
  );
}
