'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import dynamic from 'next/dynamic'
import type { TimelineEra, TimelineEraSummary } from '@/data/timeline/index'
import { timelineEraClientLoaders } from '@/data/timeline/index'
import { EraNav } from './EraNav'
import { useSmoothScroll } from '@/hooks/use-smooth-scroll'

const EraCinematicScene = dynamic(
  () => import('./EraCinematicScene').then((mod) => mod.EraCinematicScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full animate-pulse items-center justify-center bg-[#050505] text-sm tracking-widest text-zinc-500 uppercase">
        Đang tải...
      </div>
    ),
  },
)

function LazyEraScene({
  summary,
  index,
}: {
  summary: TimelineEraSummary
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '100% 0px' })
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
    <div ref={ref} className="h-full w-full">
      {era ? (
        <EraCinematicScene era={era} index={index} />
      ) : isInView ? (
        <div className="flex h-full w-full animate-pulse items-center justify-center bg-[#050505] text-sm tracking-widest text-zinc-500 uppercase">
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
      className="h-[100dvh] w-full snap-y snap-mandatory [scrollbar-width:'none'] overflow-x-hidden overflow-y-auto overscroll-y-contain bg-[#050505] font-sans text-zinc-100 [-ms-overflow-style:'none'] selection:bg-neon-cyan/30 selection:text-white [&::-webkit-scrollbar]:hidden"
    >
      <EraNav eras={eras} eraRefs={eraRefs} />

      {/* Cyberpunk Scanlines Overlay */}
      <div className="pointer-events-none fixed inset-0 z-30 opacity-[0.03] mix-blend-overlay [background-image:repeating-linear-gradient(transparent,transparent_2px,black_2px,black_4px)]" />

      <div className="relative">
        {eras.map((era, idx) => (
          <div
            key={era.id}
            id={era.id}
            ref={(el) => {
              if (el) eraRefs.current.set(era.id, el)
            }}
            className="h-[100dvh] w-full shrink-0 snap-start snap-always"
          >
            <LazyEraScene summary={era} index={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}
