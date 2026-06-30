"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { DESTINY_TIMELINE, type TimelineEra } from "@/data/timeline/index";
import { EraNav } from "./EraNav";
import { EraCinematicScene } from "./EraCinematicScene";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

// Lazy wrapper to prevent rendering all 16 carousels at once, saving massive amounts of RAM and DOM nodes.
function LazyEraScene({ era, index }: { era: TimelineEra, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Mount when within 1 viewport of the screen. once: true means it stays mounted after scrolling past.
  const isInView = useInView(ref, { once: true, margin: "100% 0px" });

  return (
    <div ref={ref} className="w-full h-full">
      {isInView ? <EraCinematicScene era={era} index={index} /> : null}
    </div>
  );
}

export function DestinyTimeline() {
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map());

  useSmoothScroll({ totalItems: DESTINY_TIMELINE.length });

  return (
    <div 
      id="timeline-scroll-container"
      className="bg-[#050505] h-[100dvh] w-full overflow-y-auto overflow-x-hidden font-sans text-zinc-100 selection:bg-neon-cyan/30 selection:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
    >
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
            className="w-full h-[100dvh] shrink-0"
          >
            <LazyEraScene era={era} index={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}
