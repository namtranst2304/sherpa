"use client";

import { useRef } from "react";
import { DESTINY_TIMELINE } from "@/data/timeline/index";
import { EraNav } from "./EraNav";
import { ScrollProgress } from "./ScrollProgress";
import { EraCinematicScene } from "./EraCinematicScene";

export function DestinyTimeline() {
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map());

  return (
    <div 
      id="timeline-scroll-container"
      className="bg-[#050505] h-[100dvh] w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth font-sans text-zinc-100 selection:bg-neon-cyan/30 selection:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
    >
      <ScrollProgress />
      <EraNav eraRefs={eraRefs} />

      {/* TIMELINE CONTENT */}
      <div className="relative">
        {DESTINY_TIMELINE.map((era, idx) => (
          <div 
            key={era.id} 
            id={era.id}
            ref={(el) => {
              if (el) eraRefs.current.set(era.id, el);
            }}
            className="w-full h-full snap-center snap-always shrink-0"
          >
            <EraCinematicScene era={era} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}
