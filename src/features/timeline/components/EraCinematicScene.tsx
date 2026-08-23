'use client'

import * as React from 'react'
import Image from 'next/image'
import { TimelineEra, ROMAN_NUMERALS } from '@/data/timeline/index'
import { getTheme, type ThemeColorTokens } from '@/lib/theme'
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

  if (era.name !== eraKey) {
    setEraKey(era.name)
    setCurrent(0)
  }

  const goTo = React.useCallback(
    (i: number) => {
      if (count === 0) return
      setCurrent(((i % count) + count) % count)
    },
    [count],
  )

  const goPrev = React.useCallback(() => goTo(current - 1), [current, goTo])
  const goNext = React.useCallback(() => goTo(current + 1), [current, goTo])

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

  // Animation variants
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    }
  }

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  }

  const chapterEntryBg: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
  }

  const chapterEntryContent: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
        .hide-scroll { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}} />
      <motion.section 
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="relative flex h-[100dvh] w-full snap-center flex-col overflow-hidden bg-[#050505] hide-scroll"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Background Layer */}
        <motion.div variants={chapterEntryBg} className="pointer-events-none absolute inset-0 z-0">
          {era.image && (
            <motion.div
              className="absolute inset-0 h-full w-full"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 25,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse',
              }}
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
          
          {/* Subtle cinematic dimming (Not too dark) */}
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Bottom shadow for controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:h-[40%] lg:top-auto" />
        </motion.div>

        {/* Content Layer - Centered with Glass Panel */}
        <motion.div variants={chapterEntryContent} className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-4 md:px-12 lg:px-20">
          
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl shadow-2xl md:p-12">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex min-h-0 flex-col items-center text-center"
              >
                {/* Metadata row */}
                <motion.div variants={fadeUp} className="mb-4 flex flex-wrap items-center justify-center gap-3">
                  <div
                    className="h-[2px] w-8 lg:w-12"
                    style={{ backgroundColor: theme.hex }}
                  />
                  
                  {/* On mobile, show Era Name */}
                  <span 
                    className="font-sans text-[9px] font-bold tracking-[0.3em] uppercase md:hidden"
                    style={{ color: theme.hex }}
                  >
                    {era.name}
                  </span>

                  {/* On desktop, show chapter */}
                  <span 
                    className="hidden font-sans text-[10px] font-bold tracking-[0.3em] uppercase opacity-90 md:block"
                    style={{ color: theme.hex }}
                  >
                    CHƯƠNG {chapterRoman}
                  </span>

                  {event.date && (
                    <>
                      <div className="hidden h-1 w-1 rounded-full bg-white/30 md:block" />
                      <span className="font-mono text-[9px] tracking-widest text-zinc-300 uppercase md:text-[10px]">
                        {event.date}
                      </span>
                    </>
                  )}
                  <div
                    className="h-[2px] w-8 lg:w-12"
                    style={{ backgroundColor: theme.hex }}
                  />
                </motion.div>

                {/* Event Title */}
                <motion.div variants={fadeUp} className="mb-6 lg:mb-8">
                  <h3 className="font-sans text-3xl font-black tracking-tight text-white md:text-5xl lg:text-6xl"
                      style={{ textShadow: `0 4px 20px ${theme.hex}60` }}>
                    {event.title}
                  </h3>
                </motion.div>

                {/* Scrollable Description with Invisible Scrollbar */}
                <motion.div 
                  variants={fadeUp}
                  className="hide-scroll max-h-[35vh] min-h-0 w-full overflow-y-auto px-2 md:px-8"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                  }}
                >
                  <div className="prose prose-invert mx-auto max-w-none py-6 text-center font-sans text-sm font-light leading-relaxed text-zinc-200 whitespace-pre-line md:text-base lg:text-lg">
                    {cleanDescription}
                  </div>
                </motion.div>

                {/* Tags */}
                {event.tags && event.tags.length > 0 && (
                  <motion.div variants={fadeUp} className="mt-4 flex shrink-0 flex-wrap justify-center gap-2 pt-4">
                    {event.tags.map((tag) => (
                      <CyberBadge
                        key={tag}
                        variant="zinc"
                        withIndicator={false}
                        className="rounded-full border-white/20 bg-white/10 px-4 py-1.5 font-sans text-[10px] font-medium tracking-widest text-white uppercase shadow-none transition-colors hover:bg-white/20"
                      >
                        {tag}
                      </CyberBadge>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Controls Toolbar (Bottom) */}
            <div className="mt-8 flex w-full shrink-0 flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row">
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
            
          </div>
        </motion.div>
      </motion.section>
    </>
  )
}
