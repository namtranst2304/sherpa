'use client'

import * as React from 'react'
import Image from 'next/image'
import { TimelineEra, ROMAN_NUMERALS } from '@/data/timeline/index'
import { getTheme, type ThemeColorTokens } from '@/lib/theme'
import { CyberBadge, CyberCard, CyberHeading, type CyberVariant } from '@/components/common/CyberComponents'
import { TTSButton } from '@/components/common/TTSButton'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { MagneticButton } from '@/components/common/MagneticButton'

function EraCarouselControls({
  theme,
  className,
  iconSize = 'w-5 h-5 md:w-6 md:h-6',
  sizeClass = 'w-10 h-10 md:w-12 md:h-12',
  onPrev,
  onNext,
}: {
  theme: ThemeColorTokens
  className?: string
  iconSize?: string
  sizeClass?: string
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className={`flex ${className || ''}`}>
      <MagneticButton
        onClick={onPrev}
        aria-label="Sự kiện trước"
        className={`relative ${sizeClass} group flex shrink-0 items-center justify-center rounded-none border-none bg-transparent`}
      >
        <div
          className="absolute inset-0 m-auto h-[85%] w-[85%] rotate-45 border bg-black/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          style={{ borderColor: theme.hex }}
        />
        <ChevronLeft
          className={`${iconSize} relative z-10 text-zinc-400 transition-colors group-hover:text-white`}
        />
      </MagneticButton>
      <MagneticButton
        onClick={onNext}
        aria-label="Sự kiện tiếp theo"
        className={`relative ${sizeClass} group flex shrink-0 items-center justify-center rounded-none border-none bg-transparent`}
      >
        <div
          className="absolute inset-0 m-auto h-[85%] w-[85%] rotate-45 border bg-black/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          style={{ borderColor: theme.hex }}
        />
        <ChevronRight
          className={`${iconSize} relative z-10 text-zinc-400 transition-colors group-hover:text-white`}
        />
      </MagneticButton>
    </div>
  )
}

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

  return (
    <section className="relative flex h-[100dvh] w-full snap-center flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {era.image && (
          <motion.div
            className="absolute inset-0 h-full w-full"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 20,
              ease: 'linear',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Image
              src={era.image}
              alt={era.name}
              fill
              className="object-cover opacity-60 md:opacity-70"
              priority={index === 0}
              unoptimized
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1920px] flex-col justify-center px-6 py-6 md:px-12 md:py-8 lg:px-24 lg:py-12 xl:px-32 2xl:px-48">
        <div className="flex h-full w-full flex-col items-center justify-between gap-3 md:gap-6 lg:flex-row lg:gap-12">
          <div className="flex w-full shrink-0 flex-col pt-16 md:pt-0 lg:w-[25%]">
            <div className="mb-4 flex items-center gap-4 lg:mb-8">
              <div
                className="h-px w-12"
                style={{ backgroundColor: theme.hex }}
              />
              <span
                className="font-sans text-[10px] tracking-[0.4em] uppercase opacity-80 md:text-xs 2xl:text-sm"
                style={{ color: theme.hex }}
              >
                Chương {chapterRoman}
              </span>
            </div>

            <CyberHeading 
              variant="default"
              size="lg"
              className="mb-4 lg:mb-8"
              style={{
                textShadow: `0 0 20px ${theme.hex}`
              }}
            >
              {era.name}
            </CyberHeading>

            <p className="hidden text-justify font-sans text-sm leading-loose text-zinc-200 opacity-90 md:block md:text-base 2xl:text-lg">
              {era.description}
            </p>

            <EraCarouselControls
              theme={theme}
              className="mt-8 hidden gap-4 lg:flex"
              onPrev={goPrev}
              onNext={goNext}
            />
          </div>

          <div
            className="relative flex min-h-0 w-full flex-1 flex-col justify-center lg:h-full lg:w-[75%] lg:flex-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="h-full w-full">
              <CyberCard
                variant={
                  (era.themeColor as CyberVariant) === 'cyan' || 
                  (era.themeColor as CyberVariant) === 'orange' ||
                  (era.themeColor as CyberVariant) === 'yellow' ||
                  (era.themeColor as CyberVariant) === 'red' ||
                  (era.themeColor as CyberVariant) === 'green' ||
                  (era.themeColor as CyberVariant) === 'purple' ||
                  (era.themeColor as CyberVariant) === 'zinc' 
                    ? (era.themeColor as CyberVariant) 
                    : 'zinc'
                }
                withCorners
                padding="none"
                className="group relative h-full w-full overflow-hidden lg:h-[70vh] 2xl:h-[75vh]"
              >

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative z-10 flex h-full w-full flex-col px-6 py-5 md:px-10 md:py-8 xl:px-12 xl:py-10 2xl:px-16 2xl:py-12"
                  >
                  {event.date && (
                    <div className="mb-3 lg:mb-4">
                      <span
                        className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase md:text-xs 2xl:text-sm"
                        style={{ color: theme.hex }}
                      >
                        {event.date}
                      </span>
                    </div>
                  )}

                  <h3 className="mb-4 text-xl font-bold text-white md:text-3xl lg:mb-6 lg:text-4xl 2xl:text-5xl">
                    {event.title}
                  </h3>

                  <div
                    className="min-h-0 flex-1 overflow-y-auto pr-4 lg:pr-6"
                    style={{
                      maskImage:
                        'linear-gradient(to bottom, black 85%, transparent 100%)',
                      WebkitMaskImage:
                        'linear-gradient(to bottom, black 85%, transparent 100%)',
                    }}
                  >
                    <div className="prose max-w-none pb-2 text-justify text-xs leading-relaxed font-normal whitespace-pre-line text-zinc-100 prose-zinc prose-invert md:text-sm lg:text-base 2xl:text-lg">
                      {cleanDescription}
                      <div
                        className="pointer-events-none h-6 md:h-10"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {event.tags && event.tags.length > 0 && (
                    <div className="mt-auto flex shrink-0 flex-wrap gap-2 pt-4">
                      {event.tags.map((tag) => (
                        <CyberBadge
                          key={tag}
                          variant="zinc"
                          withIndicator={false}
                          className="rounded-full border-white/10 bg-transparent px-3 py-1 font-sans text-[9px] tracking-widest text-zinc-500 uppercase shadow-none"
                        >
                          {tag}
                        </CyberBadge>
                      ))}
                    </div>
                  )}
                  </motion.div>
                </AnimatePresence>
              </CyberCard>
            </div>

            <EraCarouselControls
              theme={theme}
              className="mt-6 mb-4 justify-center gap-8 lg:hidden"
              sizeClass="w-12 h-12"
              iconSize="w-5 h-5"
              onPrev={goPrev}
              onNext={goNext}
            />

            <div className="mt-4 flex justify-center gap-2 pb-2 lg:mt-6">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="group inline-flex min-h-11 items-center justify-center px-1"
                  aria-label={`Chuyển tới sự kiện ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                >
                  <span
                    className={`block h-1.5 transition-all duration-300 ${
                      i === current
                        ? 'w-8 bg-white'
                        : 'w-4 bg-white/20 group-hover:bg-white/50 group-hover:w-6'
                    }`}
                    style={
                      i === current
                        ? {
                            backgroundColor: theme.hex,
                            boxShadow: `0 0 10px ${theme.hex}`,
                          }
                        : undefined
                    }
                  />
                </button>
              ))}
            </div>

            <div className="mt-3 flex justify-center">
              <TTSButton
                events={era.events}
                currentEventIndex={current}
                theme={theme}
                onEventChange={goTo}
                eraTitle={`Chương ${chapterRoman}. ${era.name}`}
                eraDescription={era.description}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
