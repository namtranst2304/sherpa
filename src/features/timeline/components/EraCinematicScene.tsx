"use client"

import * as React from "react"
import Image from "next/image"
import { TimelineEra, ROMAN_NUMERALS } from "@/data/timeline/index"
import { getTheme, type ThemeColorTokens } from "@/lib/theme"
import { CyberBadge } from "@/components/common/CyberComponents"
import { TTSButton } from "@/components/common/TTSButton"
import { ChevronLeft, ChevronRight } from "lucide-react"

function EraCarouselControls({
  theme,
  className,
  iconSize = "w-5 h-5 md:w-6 md:h-6",
  sizeClass = "w-10 h-10 md:w-12 md:h-12",
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
    <div className={`flex ${className || ""}`}>
      <button
        type="button"
        onClick={onPrev}
        aria-label="Sự kiện trước"
        className={`relative ${sizeClass} rounded-none bg-transparent border-none group flex items-center justify-center shrink-0`}
      >
        <div className="absolute inset-0 m-auto w-[85%] h-[85%] bg-black/50 border rotate-45 transition-colors group-hover:bg-black/80" style={{ borderColor: theme.hex }} />
        <ChevronLeft className={`${iconSize} text-zinc-400 group-hover:text-white relative z-10`} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Sự kiện tiếp theo"
        className={`relative ${sizeClass} rounded-none bg-transparent border-none group flex items-center justify-center shrink-0`}
      >
        <div className="absolute inset-0 m-auto w-[85%] h-[85%] bg-black/50 border rotate-45 transition-colors group-hover:bg-black/80" style={{ borderColor: theme.hex }} />
        <ChevronRight className={`${iconSize} text-zinc-400 group-hover:text-white relative z-10`} />
      </button>
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
    [count]
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
    const delta = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) < 40) return
    if (delta > 0) goPrev()
    else goNext()
  }

  if (!event) return null

  const cleanDescription = event.description.replace(/\*\*(.*?)\*\*/g, "$1")

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-center overflow-hidden snap-center">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {era.image && (
          <Image
            src={era.image}
            alt={era.name}
            fill
            className="object-cover opacity-60 md:opacity-70"
            priority={index === 0}
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 flex flex-col justify-center py-6 md:py-8 lg:py-12">
        <div className="w-full h-full flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-12 items-center justify-between">
          <div className="w-full lg:w-[25%] flex flex-col pt-16 md:pt-0 shrink-0">
            <div className="flex items-center gap-4 mb-4 lg:mb-8">
              <div className="w-12 h-px" style={{ backgroundColor: theme.hex }} />
              <span
                className="font-sans text-[10px] md:text-xs 2xl:text-sm tracking-[0.4em] uppercase opacity-80"
                style={{ color: theme.hex }}
              >
                Chương {chapterRoman}
              </span>
            </div>

            <h2 className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-sans font-normal tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 mb-4 lg:mb-8 leading-snug uppercase">
              {era.name}
            </h2>

            <p className="text-zinc-200 text-sm md:text-base 2xl:text-lg font-sans leading-loose hidden md:block opacity-90 text-justify">
              {era.description}
            </p>

            <EraCarouselControls
              theme={theme}
              className="hidden lg:flex gap-4 mt-8"
              onPrev={goPrev}
              onNext={goNext}
            />
          </div>

          <div
            className="w-full lg:w-[75%] flex-1 lg:flex-none lg:h-full flex flex-col justify-center relative min-h-0"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="w-full h-full">
              <div
                className="group relative w-full h-full lg:h-[70vh] 2xl:h-[75vh] p-1 overflow-hidden"
                style={{ transform: "skewX(-5deg)" }}
              >
                <div className="absolute inset-0 bg-black/60 border-2 border-white/10 transition-colors duration-200 group-hover:border-white/25" />

                <div
                  className="relative w-full h-full px-6 py-5 md:px-10 md:py-8 xl:px-12 xl:py-10 2xl:px-16 2xl:py-12 flex flex-col z-10"
                  style={{ transform: "skewX(5deg)" }}
                >
                  {event.date && (
                    <div className="mb-3 lg:mb-4">
                      <span
                        className="inline-block text-[10px] md:text-xs 2xl:text-sm font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10"
                        style={{ color: theme.hex }}
                      >
                        {event.date}
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-white mb-4 lg:mb-6">
                    {event.title}
                  </h3>

                  <div
                    className="flex-1 pr-4 lg:pr-6 min-h-0 overflow-y-auto"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                    }}
                  >
                    <div className="prose prose-invert prose-zinc max-w-none font-normal leading-relaxed whitespace-pre-line text-zinc-100 text-xs md:text-sm lg:text-base 2xl:text-lg text-justify pb-2">
                      {cleanDescription}
                      <div className="h-6 md:h-10 pointer-events-none" aria-hidden="true" />
                    </div>
                  </div>

                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 shrink-0 pt-4 mt-auto">
                      {event.tags.map((tag) => (
                        <CyberBadge
                          key={tag}
                          variant="zinc"
                          withIndicator={false}
                          className="text-[9px] py-1 px-3 bg-transparent border-white/10 text-zinc-500 shadow-none font-sans tracking-widest rounded-full uppercase"
                        >
                          {tag}
                        </CyberBadge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <EraCarouselControls
              theme={theme}
              className="lg:hidden justify-center gap-8 mt-6 mb-4"
              sizeClass="w-12 h-12"
              iconSize="w-5 h-5"
              onPrev={goPrev}
              onNext={goNext}
            />

            <div className="flex justify-center gap-1 mt-4 lg:mt-6 pb-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className="inline-flex items-center justify-center min-h-11 min-w-11"
                  aria-label={`Chuyển tới sự kiện ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                >
                  <span
                    className={`block rounded-[1px] rotate-45 transition-colors ${
                      i === current ? "w-2.5 h-2.5" : "w-2 h-2 bg-white/20 hover:bg-white/50"
                    }`}
                    style={
                      i === current
                        ? { backgroundColor: theme.hex, boxShadow: `0 0 12px rgba(${theme.rgb}, 0.8)` }
                        : undefined
                    }
                  />
                </button>
              ))}
            </div>

            <div className="flex justify-center mt-3">
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
