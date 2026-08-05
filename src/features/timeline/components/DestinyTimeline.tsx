"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import dynamic from "next/dynamic"
import type { TimelineEra, TimelineEraSummary } from "@/data/timeline/index"
import { timelineEraClientLoaders } from "@/data/timeline/index"
import { EraNav } from "./EraNav"
import { useSmoothScroll } from "@/hooks/use-smooth-scroll"

const EraCinematicScene = dynamic(
  () => import("./EraCinematicScene").then((mod) => mod.EraCinematicScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#050505] text-zinc-500 text-sm tracking-widest uppercase animate-pulse">
        Đang tải...
      </div>
    ),
  }
)

function LazyEraScene({ summary, index }: { summary: TimelineEraSummary; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "100% 0px" })
  const [era, setEra] = useState<TimelineEra | null>(null)

  useEffect(() => {
    if (!isInView || era) return
    let cancelled = false
    const loader = timelineEraClientLoaders[index]
    if (!loader) return
    loader().then((full) => {
      if (!cancelled) setEra(full)
    })
    return () => {
      cancelled = true
    }
  }, [isInView, era, index])

  return (
    <div ref={ref} className="w-full h-full">
      {era ? (
        <EraCinematicScene era={era} index={index} />
      ) : isInView ? (
        <div className="w-full h-full flex items-center justify-center bg-[#050505] text-zinc-500 text-sm tracking-widest uppercase animate-pulse">
          Đang tải {summary.name}...
        </div>
      ) : null}
    </div>
  )
}

interface DestinyTimelineProps {
  eras: TimelineEraSummary[]
}

export function DestinyTimeline({ eras }: DestinyTimelineProps) {
  const eraRefs = useRef<Map<string, HTMLElement>>(new Map())

  useSmoothScroll({ totalItems: eras.length })

  return (
    <div
      id="timeline-scroll-container"
      className="bg-[#050505] h-[100dvh] w-full overflow-y-auto overflow-x-hidden font-sans text-zinc-100 selection:bg-neon-cyan/30 selection:text-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] snap-y snap-mandatory overscroll-y-contain"
    >
      <EraNav eras={eras} eraRefs={eraRefs} />

      <div className="relative">
        {eras.map((era, idx) => (
          <div
            key={era.id}
            id={era.id}
            ref={(el) => {
              if (el) eraRefs.current.set(era.id, el)
            }}
            className="w-full h-[100dvh] shrink-0 snap-start snap-always"
          >
            <LazyEraScene summary={era} index={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}
