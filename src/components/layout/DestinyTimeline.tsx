"use client";

import React, { useState, useEffect, useRef } from "react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { HeroSection } from "../timeline/HeroSection";
import { EraNav } from "../timeline/EraNav";
import { ScrollProgress } from "../timeline/ScrollProgress";
import { EraHeader } from "../timeline/EraHeader";
import { EraEvents } from "../timeline/EraEvents";

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
        { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div className="bg-black min-h-screen font-sans text-zinc-100 overflow-x-hidden selection:bg-neon-cyan/30 selection:text-white pb-32">
      <ScrollProgress />
      <EraNav activeEraId={activeEraId} eraRefs={eraRefs} />
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
