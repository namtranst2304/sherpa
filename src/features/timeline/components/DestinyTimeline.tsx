"use client";

import { useRef } from "react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { EraNav } from "./EraNav";
import { ScrollProgress } from "./ScrollProgress";
import { EraHeader } from "./EraHeader";
import { EraEvents } from "./EraEvents";

export function DestinyTimeline() {
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map());

  return (
    <div className="bg-transparent min-h-screen font-sans text-zinc-100 overflow-x-hidden selection:bg-neon-cyan/30 selection:text-white pb-8">
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
            className={`scroll-mt-20 ${idx !== DESTINY_TIMELINE.length - 1 ? "mb-16 md:mb-24" : "mb-8"}`}
          >
            <EraHeader era={era} index={idx} />
            <EraEvents era={era} />
          </section>
        ))}
      </div>
    </div>
  );
}
