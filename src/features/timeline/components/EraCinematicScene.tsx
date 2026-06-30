"use client";

import * as React from "react";
import Image from "next/image";
import { TimelineEra, ROMAN_NUMERALS } from "@/data/timeline/index";
import { getTheme, type ThemeColorTokens } from "@/lib/theme";
import { motion, useReducedMotion, type Transition } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CyberBadge } from "@/components/common/CyberComponents";
import { TTSButton } from "@/components/common/TTSButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";



function EraCarouselControls({ theme, className, iconSize = "w-5 h-5 md:w-6 md:h-6", sizeClass = "w-10 h-10 md:w-12 md:h-12" }: { theme: ThemeColorTokens, className?: string, iconSize?: string, sizeClass?: string }) {
  return (
    <div className={`flex ${className || ""}`}>
      <CarouselPrevious variant="ghost" className={`static translate-y-0 ${sizeClass} rounded-none bg-transparent hover:bg-transparent border-none group flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 m-auto w-[85%] h-[85%] bg-black/40 backdrop-blur-sm border transition-all duration-500 ease-out rotate-45 group-hover:bg-black/80" style={{ borderColor: theme.hex, boxShadow: `0 0 10px rgba(${theme.rgb}, 0.2)` }} />
        <div className="absolute inset-0 m-auto w-[85%] h-[85%] border rotate-45 scale-[1.15] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none" style={{ borderColor: theme.hex, boxShadow: `0 0 20px rgba(${theme.rgb}, 0.6)` }} />
        <ChevronLeft className={`${iconSize} text-zinc-400 group-hover:text-white relative z-10 transition-colors duration-300`} />
      </CarouselPrevious>
      <CarouselNext variant="ghost" className={`static translate-y-0 ${sizeClass} rounded-none bg-transparent hover:bg-transparent border-none group flex items-center justify-center shrink-0`}>
        <div className="absolute inset-0 m-auto w-[85%] h-[85%] bg-black/40 backdrop-blur-sm border transition-all duration-500 ease-out rotate-45 group-hover:bg-black/80" style={{ borderColor: theme.hex, boxShadow: `0 0 10px rgba(${theme.rgb}, 0.2)` }} />
        <div className="absolute inset-0 m-auto w-[85%] h-[85%] border rotate-45 scale-[1.15] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none" style={{ borderColor: theme.hex, boxShadow: `0 0 20px rgba(${theme.rgb}, 0.6)` }} />
        <ChevronRight className={`${iconSize} text-zinc-400 group-hover:text-white relative z-10 transition-colors duration-300`} />
      </CarouselNext>
    </div>
  );
}

export function EraCinematicScene({
  era,
  index,
}: {
  era: TimelineEra;
  index: number;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const theme = getTheme(era.themeColor);
  const chapterRoman = ROMAN_NUMERALS[index] || String(index + 1);
  const shouldReduceMotion = useReducedMotion();
  const transitionProps: Transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" };
  const delayedTransitionProps: Transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2, ease: "easeOut" };

  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-center overflow-hidden snap-center">

      {/* Background Layer - True Full Width/Height */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {era.image && (
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src={era.image}
              alt={era.name}
              fill
              className="object-cover opacity-60 md:opacity-70"
              priority={index === 0}
              unoptimized={true}
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Foreground Content - Symmetrical padding to keep it centered while avoiding Timeline Bar */}
      <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 flex flex-col justify-center py-6 md:py-8 lg:py-12">

        {/* Carousel Wraps Everything so Controls work anywhere */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
            dragFree: false // Make it snap strictly
          }}
          className="w-full h-full"
        >
          {/* Flex Layout: ~ 3/7 Split (Title vs Carousel) */}
          <div className="w-full h-full flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-12 items-center justify-between">

            {/* Left Side: Era Title (~25%) */}
            <motion.div
              className="w-full lg:w-[25%] flex flex-col pt-16 md:pt-0 shrink-0"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={transitionProps}
            >
              <div className="flex items-center gap-4 mb-4 lg:mb-8">
                <div className="w-12 h-[1px]" style={{ backgroundColor: theme.hex }} />
                <span className={`font-sans text-[10px] md:text-xs 2xl:text-sm tracking-[0.4em] uppercase opacity-80`} style={{ color: theme.hex }}>
                  Chương {chapterRoman}
                </span>
              </div>

              <h2
                className="text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-sans font-normal tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 mb-4 lg:mb-8 leading-snug uppercase"
                style={{ filter: `drop-shadow(0 0 15px rgba(${theme.rgb}, 0.15))` }}
              >
                {era.name}
              </h2>

              <p className="text-zinc-200 text-sm md:text-base 2xl:text-lg font-sans font-normal leading-loose hidden md:block opacity-90 text-justify drop-shadow-md">
                {era.description}
              </p>

              {/* Carousel Controls (Desktop) */}
              <EraCarouselControls theme={theme} className="hidden lg:flex gap-4 mt-8" />
            </motion.div>

            {/* Right Side: Carousel (~75%) */}
            <motion.div
              className="w-full lg:w-[75%] flex-1 lg:flex-none lg:h-full flex flex-col justify-center relative min-h-0"
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={delayedTransitionProps}
            >
              <CarouselContent className="-ml-4 md:-ml-8 h-full">
                {era.events.map((event, eIdx) => {
                  const cleanDescription = event.description.replace(/\*\*(.*?)\*\*/g, '$1');
                  return (
                    <CarouselItem key={eIdx} className="pl-4 md:pl-8 basis-full h-full lg:h-auto">

                      {/* "Xéo xéo đẹp đẹp" - Slanted Card Design using CSS Skew */}
                      <div className="group relative w-full h-full lg:h-[70vh] 2xl:h-[75vh] p-1 overflow-hidden"
                        style={{ transform: "skewX(-5deg)" }}>

                        {/* Slanted Glass Background */}
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl border-2 border-white/10 transition-colors duration-500 group-hover:border-white/30" />

                        {/* Glow effect on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                          style={{
                            background: `radial-gradient(circle at center, ${theme.hex}, transparent)`,
                          }}
                        />

                        {/* Un-skew the inner content so text stays upright */}
                        <div
                          className="relative w-full h-full px-6 py-5 md:px-10 md:py-8 xl:px-12 xl:py-10 2xl:px-16 2xl:py-12 flex flex-col z-10"
                          style={{ transform: "skewX(5deg)" }}
                        >
                          <div className="flex items-center justify-between gap-4 mb-3 lg:mb-4">
                            {event.date && (
                              <span className={`inline-block text-[10px] md:text-xs 2xl:text-sm font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10`} style={{ color: theme.hex }}>
                                {event.date}
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl md:text-3xl lg:text-4xl 2xl:text-5xl font-semibold text-white mb-4 lg:mb-6 drop-shadow-md">
                            {event.title}
                          </h3>

                          <ScrollArea
                            className="flex-1 pr-4 lg:pr-6"
                            style={{
                              maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                              WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                            }}
                          >
                            <div className="prose prose-invert prose-zinc max-w-none font-normal leading-relaxed whitespace-pre-line text-zinc-100 text-xs md:text-sm lg:text-base 2xl:text-lg text-justify pb-2 drop-shadow-md">
                              {cleanDescription}
                              {/* Dòng ảo dưới cùng để tránh bị mờ chữ do mask-image */}
                              <div className="h-6 md:h-10 pointer-events-none" aria-hidden="true" />
                            </div>
                          </ScrollArea>

                          {event.tags && event.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 shrink-0 pt-4 mt-auto">
                              {event.tags.map((tag, tIdx) => (
                                <CyberBadge key={tIdx} variant="zinc" withIndicator={false} className="text-[9px] py-1 px-3 bg-transparent border-white/10 text-zinc-500 shadow-none font-sans tracking-widest rounded-full uppercase">
                                  {tag}
                                </CyberBadge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Carousel Controls for Mobile */}
              <EraCarouselControls theme={theme} className="lg:hidden justify-center gap-8 mt-6 mb-4" sizeClass="w-12 h-12" iconSize="w-5 h-5" />

              {/* Thematic Carousel Indicators */}
              <div className="flex justify-center gap-3 mt-4 lg:mt-6 pb-2">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    className={`transition-all duration-300 rounded-[1px] rotate-45 outline-none ${i === current - 1
                      ? "w-2.5 h-2.5 bg-white"
                      : "w-2 h-2 bg-white/20 hover:bg-white/50"
                      }`}
                    style={i === current - 1 ? { backgroundColor: theme.hex, boxShadow: `0 0 12px rgba(${theme.rgb}, 0.8)` } : {}}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* TTS Controls Group */}
              <div className="flex justify-center mt-3">
                <TTSButton 
                  events={era.events} 
                  currentEventIndex={current - 1} 
                  theme={theme} 
                  onEventChange={(index) => api?.scrollTo(index)} 
                />
              </div>
            </motion.div>

          </div>
        </Carousel>
      </div>

    </section>
  );
}
