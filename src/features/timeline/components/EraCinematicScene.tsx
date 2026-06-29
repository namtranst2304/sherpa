"use client";

import * as React from "react";
import Image from "next/image";
import { TimelineEra } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";
import { motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CyberBadge } from "@/components/common/CyberComponents";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function EraCinematicScene({
  era,
  index,
}: {
  era: TimelineEra;
  index: number;
}) {
  const theme = getTheme(era.themeColor);
  const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const chapterRoman = romanNumerals[index] || String(index + 1);

  return (
    <section className="relative w-full h-[100vh] flex flex-col justify-center overflow-hidden snap-center">
      
      {/* Background Layer - True Full Width/Height */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {era.image && (
          <Image 
            src={era.image} 
            alt={era.name} 
            fill 
            className="object-cover opacity-60 md:opacity-70 transition-opacity duration-1000"
            priority={index === 0}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Foreground Content - Symmetrical padding to keep it centered while avoiding Timeline Bar */}
      <div className="relative z-10 w-full h-full px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-40 flex flex-col justify-center py-12 md:py-20">
        
        {/* Carousel Wraps Everything so Controls work anywhere */}
        <Carousel
          opts={{
            align: "center",
            loop: false,
            dragFree: false // Make it snap strictly
          }}
          className="w-full h-full"
        >
          {/* Flex Layout: ~ 3/7 Split (Title vs Carousel) */}
          <div className="w-full h-full flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
            
            {/* Left Side: Era Title (~25%) */}
            <motion.div
              className="w-full lg:w-[25%] flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }} 
            >
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                <div className="w-8 h-[2px]" style={{ backgroundColor: theme.hex }} />
                <span className={`font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-80`} style={{ color: theme.hex }}>
                  Chương {chapterRoman}
                </span>
              </div>
              
              {/* Title smaller as requested, using old elegant text-transparent gradient */}
              <h2 
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 mb-4 leading-tight uppercase"
                style={{ filter: `drop-shadow(0 0 20px rgba(${theme.rgb}, 0.3))` }}
              >
                {era.name}
              </h2>

              <p className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed hidden md:block">
                {era.description}
              </p>
              
              {/* Carousel Controls (Moved to Left Side for better alignment and visibility) */}
              <div className="hidden lg:flex gap-4 mt-12">
                <CarouselPrevious 
                  className="static translate-y-0 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/50 text-white transition-all duration-300"
                  style={{ boxShadow: `0 0 15px rgba(${theme.rgb}, 0.2)` }}
                />
                <CarouselNext 
                  className="static translate-y-0 w-12 h-12 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/10 hover:border-white/50 text-white transition-all duration-300"
                  style={{ boxShadow: `0 0 15px rgba(${theme.rgb}, 0.2)` }}
                />
              </div>
            </motion.div>

            {/* Right Side: Carousel (~75%) */}
            <motion.div
              className="w-full lg:w-[75%] h-full flex flex-col justify-center relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <CarouselContent className="-ml-4 md:-ml-8">
                {era.events.map((event, eIdx) => {
                  const cleanDescription = event.description.replace(/\*\*(.*?)\*\*/g, '$1');
                  return (
                    <CarouselItem key={eIdx} className="pl-4 md:pl-8 basis-full">
                      
                      {/* "Xéo xéo đẹp đẹp" - Slanted Card Design using CSS Skew */}
                      <div className="group relative w-full h-[60vh] lg:h-[70vh] p-1 overflow-hidden"
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
                          className="relative w-full h-full p-8 md:p-12 xl:p-16 flex flex-col z-10"
                          style={{ transform: "skewX(5deg)" }}
                        >
                          {event.date && (
                            <div className="mb-4">
                              <span className={`inline-block text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10`} style={{ color: theme.hex }}>
                                {event.date}
                              </span>
                            </div>
                          )}
                          
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-6 drop-shadow-md">
                            {event.title}
                          </h3>

                          <ScrollArea className="flex-1 pr-6">
                            <div className="prose prose-invert prose-zinc max-w-none font-light leading-relaxed whitespace-pre-line text-zinc-300 text-sm md:text-base lg:text-lg text-justify pb-6">
                              {cleanDescription}
                            </div>
                          </ScrollArea>

                          {event.tags && event.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 shrink-0 pt-6 mt-auto">
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
              
              {/* Carousel Controls for Mobile (Desktop moved to left panel) */}
              <div className="lg:hidden flex justify-end gap-4 mt-6 pr-4">
                <CarouselPrevious 
                  className="static translate-y-0 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white" 
                  style={{ boxShadow: `0 0 10px rgba(${theme.rgb}, 0.2)` }}
                />
                <CarouselNext 
                  className="static translate-y-0 w-10 h-10 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-white/10 text-white" 
                  style={{ boxShadow: `0 0 10px rgba(${theme.rgb}, 0.2)` }}
                />
              </div>
            </motion.div>

          </div>
        </Carousel>
      </div>
      
    </section>
  );
}
