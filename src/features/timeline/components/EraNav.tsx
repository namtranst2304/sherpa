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
      {/* Ngang nối node */}
      <div
        className={cn(
          'absolute inset-0 z-0 m-auto h-[2px] w-3 rounded-full transition-colors duration-300',
          isPast ? activeTheme.bg : 'bg-zinc-700/80',
        )}
      />

      {/* Node tĩnh (chờ hover) */}
      <div
        className={cn(
          'absolute inset-0 z-10 m-auto rotate-45 border border-zinc-600 bg-[#050505] transition-all duration-300',
          isActive
            ? 'opacity-0'
            : 'h-2 w-2 opacity-100 group-hover:h-3 group-hover:w-3 group-hover:border-zinc-400',
        )}
      />

      {/* Node Active có layoutId để trượt mượt mà giữa các điểm */}
      {isActive && (
        <motion.div
          layoutId="active-timeline-diamond"
          className="absolute inset-0 z-20 m-auto rotate-45 border-2 bg-[#050505]"
          style={{
            borderColor: theme.hex,
            boxShadow: `0 0 20px ${theme.hex}80, inset 0 0 10px ${theme.hex}40`,
            height: '1.25rem',
            width: '1.25rem',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}

      {/* Lõi trắng bên trong (nháy) */}
      <div
        className={cn(
          'relative z-30 rotate-45 transition-all duration-300',
          isActive
            ? 'h-2 w-2 bg-white scale-100'
            : 'h-1.5 w-1.5 bg-zinc-600 scale-50 group-hover:scale-100 group-hover:bg-zinc-300',
        )}
        style={isActive ? { boxShadow: `0 0 10px #ffffff` } : undefined}
      />

      {/* Minimal Hover Tooltip */}
      <div 
        className={cn(
          "pointer-events-none absolute right-full mr-4 flex items-center whitespace-nowrap rounded border border-white/10 bg-black/80 px-2 py-1 backdrop-blur-md transition-all duration-300",
          "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
        )}
      >
        <span className="font-mono text-[10px] tracking-widest text-zinc-300 uppercase">
          Chương {ROMAN_NUMERALS[idx] || idx + 1}
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
    <>
      {/* Active Era HUD */}
      <div className="pointer-events-none fixed top-24 right-4 z-50 flex flex-col items-end md:right-8 lg:right-12">
        <motion.div
          key={activeEra.id}
          initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="flex flex-col items-end"
        >
          <span
            className="mb-1 font-mono text-[10px] font-bold tracking-[0.3em] uppercase md:text-xs"
            style={{ 
              color: activeTheme.hex,
              textShadow: `0 0 15px ${activeTheme.hex}80` 
            }}
          >
            CHƯƠNG {ROMAN_NUMERALS[activeIndex] || String(activeIndex + 1)}
          </span>
          <h2 
            className="max-w-[280px] text-right font-sans text-xl leading-tight font-black tracking-widest text-white uppercase drop-shadow-xl sm:text-2xl md:max-w-[400px] md:text-3xl"
          >
            {activeEra.name}
          </h2>
        </motion.div>
      </div>

      {/* Timeline Track */}
      <nav
        className="fixed top-1/2 right-0 z-50 flex h-[80vh] max-h-[800px] min-h-[400px] w-8 -translate-y-1/2 flex-col py-4 md:right-4 lg:right-8"
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
          >
            {/* Glowing head of the progress line */}
            <div 
              className={cn(
                "absolute bottom-0 left-1/2 h-8 w-[2px] -translate-x-1/2 blur-[2px]",
                activeTheme.bg
              )}
              style={{ boxShadow: `0 4px 10px ${activeTheme.hex}` }}
            />
          </motion.div>
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
    </>
  )
}
