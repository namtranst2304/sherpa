"use client";

import { useRef } from "react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { EraNav } from "./EraNav";
import { ScrollProgress } from "./ScrollProgress";
import { EraHeader } from "./EraHeader";
import { EraEvents } from "./EraEvents";
import { EraCinematicScene } from "./EraCinematicScene";

export function DestinyTimeline() {
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map());

  return (
    <div 
      id="timeline-scroll-container"
      className="bg-[#050505] h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth font-sans text-zinc-100 selection:bg-neon-cyan/30 selection:text-white"
    >
      <ScrollProgress />
      <EraNav eraRefs={eraRefs} />

      {/* TIMELINE CONTENT */}
      <div className="relative">
        {DESTINY_TIMELINE.map((era, idx) => {
          // HYBRID APPROACH: First 5 Eras (idx 0 to 4) use Cinematic Scene
          if (idx < 5) {
            return (
              <div 
                key={era.id} 
                id={era.id}
                ref={(el) => {
                  if (el) eraRefs.current.set(era.id, el);
                }}
                className="w-full snap-center"
              >
                <EraCinematicScene era={era} index={idx} />
              </div>
            );
          }

          // Eras 6 to 16 (idx 5+) use Standard Layout
          return (
            <section
              key={era.id}
              id={era.id}
              ref={(el) => {
                if (el) eraRefs.current.set(era.id, el);
              }}
              className={`snap-start scroll-mt-20 pt-16 md:pt-24 ${idx !== DESTINY_TIMELINE.length - 1 ? "mb-16 md:mb-24" : "mb-8"}`}
            >
              <EraHeader era={era} index={idx} />
              <EraEvents era={era} />
            </section>
          );
        })}
      </div>
    </div>
  );
}
