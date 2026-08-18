'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ROMAN_NUMERALS, type TimelineEraSummary } from '@/data/timeline/index'
import { getTheme, type ThemeColorTokens } from '@/lib/theme'
import { cn } from '@/lib/utils'

function TimelineNode({
  era,
  idx,
  total,
  isActive,
  isPast,
  activeTheme,
  onClick,
}: {
  era: TimelineEraSummary
  idx: number
  total: number
  isActive: boolean
  isPast: boolean
  activeTheme: ThemeColorTokens
  onClick: () => void
}) {
  const theme = getTheme(era.themeColor)

  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center outline-none"
      style={{ top: `${idx * (100 / (total - 1 || 1))}%` }}
      aria-label={`Chương ${idx + 1}: ${era.name}`}
      aria-current={isActive ? 'true' : undefined}
    >
      <div
        className={cn(
          'absolute inset-0 z-0 m-auto h-[2px] w-3 rounded-full transition-colors duration-200',
          isPast ? activeTheme.bg : 'bg-zinc-700/80',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 z-10 m-auto rotate-45 border transition-all duration-200',
          isActive
            ? 'h-5 w-5 opacity-100'
            : 'h-2 w-2 scale-75 opacity-0 group-hover:h-4 group-hover:w-4 group-hover:scale-100 group-hover:opacity-100',
        )}
        style={{
          borderColor: theme.hex,
          boxShadow: isActive ? `0 0 10px rgba(${theme.rgb}, 0.6)` : undefined,
        }}
      />
      <div
        className={cn(
          'relative z-20 rotate-45 transition-all duration-200',
          isActive
            ? 'h-2.5 w-2.5 bg-white'
            : 'h-1.5 w-1.5 bg-zinc-600 group-hover:h-2 group-hover:w-2 group-hover:bg-white',
        )}
        style={isActive ? { boxShadow: `0 0 15px ${theme.hex}` } : undefined}
      />

      {/* Hover label — CSS only */}
      <div className="pointer-events-none absolute right-full mr-4 flex max-w-[12rem] flex-col items-end border border-white/10 bg-black/70 px-3 py-1.5 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <span
          className={cn(
            'mb-0.5 text-[9px] font-medium tracking-widest uppercase',
            theme.text,
          )}
        >
          CHƯƠNG {ROMAN_NUMERALS[idx] || String(idx + 1)}
        </span>
        <span className="line-clamp-2 text-right font-sans text-xs leading-tight tracking-widest text-white uppercase">
          {era.name}
        </span>
      </div>
    </button>
  )
}

export function EraNav({
  eras,
  eraRefs,
}: {
  eras: TimelineEraSummary[]
  eraRefs: React.RefObject<Map<string, HTMLElement>>
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const rawProgress = useMotionValue(0)
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.5,
  })
  const progressHeight = useTransform(smoothProgress, (p) => `${p}%`)

  const activeEra = eras[activeIndex] || eras[0]
  const activeTheme = getTheme(activeEra.themeColor)

  useEffect(() => {
    let rafId: number | null = null
    const container = document.getElementById('timeline-scroll-container')
    if (!container || eras.length < 2) return

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const floatIndex = Math.max(
          0,
          Math.min(
            container.scrollTop / container.clientHeight,
            eras.length - 1,
          ),
        )
        const next = Math.round(floatIndex)
        setActiveIndex((prev) => (prev !== next ? next : prev))
        rawProgress.set(floatIndex * (100 / (eras.length - 1)))
      })
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      container.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [eras, rawProgress])

  const scrollToEra = useCallback(
    (id: string) => {
      eraRefs.current?.get(id)?.scrollIntoView({ behavior: 'smooth' })
    },
    [eraRefs],
  )

  return (
    <nav
      className="fixed top-1/2 right-0 z-50 flex h-[80vh] max-h-[800px] min-h-[400px] w-8 -translate-y-1/2 flex-col py-4 md:right-4"
      aria-label="Điều hướng timeline"
    >
      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative z-0 h-full w-[2px] bg-white/10">
          <motion.div
            className={cn(
              'absolute top-0 z-0 w-full rounded-full',
              activeTheme.bg,
            )}
            style={{ height: progressHeight }}
          />
          {eras.map((era, idx) => (
            <TimelineNode
              key={era.id}
              era={era}
              idx={idx}
              total={eras.length}
              isActive={idx === activeIndex}
              isPast={idx <= activeIndex}
              activeTheme={activeTheme}
              onClick={() => scrollToEra(era.id)}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
