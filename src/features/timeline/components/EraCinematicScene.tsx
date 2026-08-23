'use client'

import * as React from 'react'
import Image from 'next/image'
import { TimelineEra, ROMAN_NUMERALS } from '@/data/timeline/index'
import { getTheme } from '@/lib/theme'
import { CyberBadge } from '@/components/common/CyberComponents'
import { TTSButton } from '@/components/common/TTSButton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'motion/react'
import { MagneticButton } from '@/components/common/MagneticButton'

export function EraCinematicScene({
  era,
  index,
}: {
  era: TimelineEra
  index: number
}) {
  const events = era.events
  const count = events.length
  const [current, setCurrent] = React.useState(0)
  const [eraKey, setEraKey] = React.useState(era.name)
  const touchStartX = React.useRef<number | null>(null)

  const [direction, setDirection] = React.useState<1 | -1>(1)

  if (era.name !== eraKey) {
    setEraKey(era.name)
    setCurrent(0)
    setDirection(1)
  }

  const goTo = React.useCallback(
    (i: number) => {
      if (count === 0) return
      const nextIndex = ((i % count) + count) % count
      setDirection(nextIndex >= current ? 1 : -1)
      setCurrent(nextIndex)
    },
    [count, current],
  )

  const goPrev = React.useCallback(() => {
    setDirection(-1)
    goTo(current - 1)
  }, [current, goTo])

  const goNext = React.useCallback(() => {
    setDirection(1)
    goTo(current + 1)
  }, [current, goTo])

  const theme = getTheme(era.themeColor)
  const chapterRoman = ROMAN_NUMERALS[index] || String(index + 1)
  const event = events[current]

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const delta =
      (e.changedTouches[0]?.clientX ?? touchStartX.current) -
      touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (delta > 0) goPrev()
    else goNext()
  }

  if (!event) return null

  const cleanDescription = event.description.replace(/\*\*(.*?)\*\*/g, '$1')

  // Smooth direction-aware event slide & fade (100% GPU-accelerated)
  const eventVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      transition: {
        duration: 0.2,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  }

  return (
    <section 
      className="no-scrollbar relative flex h-[100dvh] w-full snap-center flex-col overflow-hidden bg-[#050505]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Layer with subtle Ken Burns zoom */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {era.image && (
          <motion.div 
            className="absolute inset-0 h-full w-full will-change-transform"
            initial={{ opacity: 0.3, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={era.image}
              alt={era.name}
              fill
              className="object-cover object-center opacity-100"
              priority={index === 0}
              unoptimized
            />
          </motion.div>
        )}
        
        {/* Subtle cinematic dimming */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Bottom shadow for controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:h-[40%] lg:top-auto" />
      </div>

      {/* Content Layer - Centered with Glass Panel */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-center px-4 md:px-10 lg:px-16 xl:px-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ amount: 0.2, once: false }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-full max-w-5xl lg:max-w-6xl xl:max-w-[1240px] 2xl:max-w-[1360px] max-h-[85vh] flex-col items-center justify-between rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl shadow-2xl md:p-8 lg:p-10 xl:p-12 overflow-hidden"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={eventVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex min-h-0 flex-1 flex-col items-center overflow-hidden w-full"
            >
              {/* Metadata row: Chapter + Era Name + Date */}
              <div className="mb-3 flex shrink-0 flex-wrap items-center justify-center gap-3">
                <div
                  className="h-[2px] w-8 lg:w-12"
                  style={{ backgroundColor: theme.hex }}
                />
                
                <span 
                  className="font-sans text-[10px] md:text-xs font-black tracking-[0.25em] uppercase"
                  style={{ color: theme.hex }}
                >
                  CHƯƠNG {chapterRoman}
                </span>

                <div className="h-1 w-1 rounded-full bg-white/40" />

                <span 
                  className="font-sans text-[10px] md:text-xs font-extrabold tracking-[0.2em] uppercase text-zinc-200"
                >
                  {era.name}
                </span>

                {event.date && (
                  <>
                    <div className="h-1 w-1 rounded-full bg-white/40" />
                    <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-zinc-400 uppercase">
                      {event.date}
                    </span>
                  </>
                )}

                <div
                  className="h-[2px] w-8 lg:w-12"
                  style={{ backgroundColor: theme.hex }}
                />
              </div>

              {/* Event Title */}
              <div className="mb-4 shrink-0 lg:mb-6 text-center">
                <h3 className="font-sans text-2xl font-black tracking-tight text-white md:text-4xl lg:text-5xl"
                    style={{ textShadow: `0 4px 20px ${theme.hex}60` }}>
                  {event.title}
                </h3>
              </div>

              {/* Scrollable Description with Invisible Scrollbar & Justified text */}
              <div 
                className="no-scrollbar min-h-0 flex-1 w-full overflow-y-auto overscroll-contain px-3 md:px-8 lg:px-12 my-2"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                }}
              >
                <div className="prose prose-invert mx-auto max-w-none pt-2 pb-8 text-justify font-sans text-sm font-light leading-[1.9] text-zinc-200 whitespace-pre-line md:text-base lg:text-lg">
                  {cleanDescription}
                </div>
              </div>

              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="mt-3 flex shrink-0 flex-wrap justify-center gap-2 pt-3">
                  {event.tags.map((tag) => (
                    <CyberBadge
                      key={tag}
                      variant="zinc"
                      withIndicator={false}
                      className="rounded-full border-white/20 bg-white/10 px-4 py-1 font-sans text-[10px] font-medium tracking-widest text-white uppercase shadow-none transition-colors hover:bg-white/20"
                    >
                      {tag}
                    </CyberBadge>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Controls Toolbar (Bottom) */}
          <div className="mt-4 flex w-full shrink-0 flex-col items-center justify-between gap-4 border-t border-white/10 pt-4 md:flex-row">
            {/* Pagination */}
            <div className="flex items-center gap-4">
              <MagneticButton
                onClick={goPrev}
                aria-label="Sự kiện trước"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </MagneticButton>

              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className="group py-2 outline-none"
                    aria-label={`Chuyển tới sự kiện ${i + 1}`}
                    aria-current={i === current ? 'true' : undefined}
                  >
                    <span
                      className={`block h-[3px] rounded-full transition-all duration-500 ease-out ${
                        i === current
                          ? 'w-8 bg-white'
                          : 'w-3 bg-white/30 group-hover:bg-white/60 group-hover:w-5'
                      }`}
                      style={
                        i === current
                          ? {
                              backgroundColor: theme.hex,
                              boxShadow: `0 0 12px ${theme.hex}`,
                            }
                          : undefined
                      }
                    />
                  </button>
                ))}
              </div>

              <MagneticButton
                onClick={goNext}
                aria-label="Sự kiện tiếp theo"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </MagneticButton>
            </div>

            {/* TTS Button */}
            <div className="flex items-center">
              <TTSButton
                events={era.events}
                currentEventIndex={current}
                theme={theme}
                onEventChange={goTo}
                eraTitle={`Chương ${chapterRoman}. ${era.name}`}
                eraDescription={era.description}
                className="shadow-none border-white/20 bg-white/10 hover:bg-white/20 text-white"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
