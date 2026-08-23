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
    <motion.section 
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative flex h-[100dvh] w-full snap-center flex-col overflow-hidden bg-[#050505]"
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
              className="object-cover object-center opacity-60 md:opacity-80"
              priority={index === 0}
              unoptimized
            />
          </motion.div>
        )}
        
        {/* Advanced Cinematic Overlays for Centered Layout */}
        {/* Radical Vignette Overlay - darkens edges, focuses center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_85%)] opacity-90" />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Bottom shadow to ground the scene */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </motion.div>

      {/* Content Layer - Centered */}
      <motion.div variants={chapterEntryContent} className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 md:px-12 lg:px-20">
        
        {/* Centered Floating Content Block */}
        <div className="mx-auto flex h-full max-h-[85vh] w-full flex-col justify-center py-10 md:w-[85%] lg:w-[75%]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex min-h-0 flex-col items-center text-center"
            >
              {/* Metadata row (Chapter + Date) */}
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
                  className="hidden font-sans text-[10px] font-bold tracking-[0.3em] uppercase opacity-80 md:block"
                  style={{ color: theme.hex }}
                >
                  CHƯƠNG {chapterRoman}
                </span>

                {event.date && (
                  <>
                    <div className="hidden h-1 w-1 rounded-full bg-white/20 md:block" />
                    <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase md:text-[10px]">
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
                <h3 className="font-sans text-3xl font-black tracking-tight text-white md:text-5xl lg:text-6xl 2xl:text-7xl"
                    style={{ textShadow: `0 4px 30px ${theme.hex}40` }}>
                  {event.title}
                </h3>
              </motion.div>

              {/* Scrollable Description with Invisible Scrollbar */}
              <motion.div 
                variants={fadeUp}
                className="no-scrollbar min-h-0 w-full flex-1 overflow-y-auto px-2 md:px-8"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 90%, transparent 100%)',
                }}
              >
                <div className="prose prose-invert mx-auto max-w-4xl py-6 text-center font-sans text-sm font-light leading-[1.9] text-zinc-300 whitespace-pre-line md:text-base lg:text-xl">
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
                      className="rounded-full border-white/10 bg-white/5 px-4 py-1.5 font-sans text-[10px] font-medium tracking-widest text-zinc-400 uppercase shadow-none transition-colors hover:bg-white/10"
                    >
                      {tag}
                    </CyberBadge>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Persistent Controls Toolbar (Bottom) */}
          <div className="mt-8 flex shrink-0 flex-col items-center gap-6 md:flex-row md:justify-center pt-6">
            <div className="flex items-center gap-6 rounded-full border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-md">
              <MagneticButton
                onClick={goPrev}
                aria-label="Sự kiện trước"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/20"
              >
                <ChevronLeft className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
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
                          : 'w-3 bg-white/20 group-hover:bg-white/50 group-hover:w-5'
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
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/20"
              >
                <ChevronRight className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-white" />
              </MagneticButton>
            </div>

            {/* TTS Button */}
            <div className="absolute bottom-8 right-6 md:right-12 lg:right-20">
              <TTSButton
                events={era.events}
                currentEventIndex={current}
                theme={theme}
                onEventChange={goTo}
                eraTitle={`Chương ${chapterRoman}. ${era.name}`}
                eraDescription={era.description}
                className="shadow-none border-white/10 bg-black/40 backdrop-blur-md hover:bg-white/10"
              />
            </div>
          </div>
          
        </div>
      </motion.div>
    </motion.section>
  )
}
