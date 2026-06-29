"use client";

import * as React from "react";
import Image from "next/image";
import { TimelineEvent, TimelineEra } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";
import { motion } from "motion/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CinematicScene({
  scene,
  index,
  total
}: {
  scene: { event: TimelineEvent, era: TimelineEra };
  index: number;
  total: number;
}) {
  const { event, era } = scene;
  const theme = getTheme(era.themeColor);
  const cleanDescription = event.description.replace(/\*\*(.*?)\*\*/g, '$1');
  const snippet = cleanDescription.slice(0, 200) + (cleanDescription.length > 200 ? "..." : "");

  return (
    <motion.section 
      className="absolute inset-0 w-full h-full flex flex-col justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      transition={{ duration: 1 }}
    >
      
      {/* Background Layer with Ken Burns effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
      >
        {era.image && (
          <Image 
            src={era.image} 
            alt={era.name} 
            fill 
            className="object-cover mix-blend-luminosity opacity-30 md:opacity-40"
            priority // Preload the active scene
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-[#050505]/60" />
      </motion.div>

      {/* Foreground Content - Absolute Fit */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center">
        
        {/* Era Breadcrumb */}
        <motion.div 
          className="absolute top-12 left-6 md:left-12 lg:left-24 flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="w-8 md:w-12 h-[2px]" style={{ backgroundColor: theme.hex }} />
          <span className="text-white/60 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
            {era.name}
          </span>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div 
          className="absolute top-12 right-6 md:right-12 lg:right-24 font-mono text-[10px] md:text-xs text-white/30 tracking-[0.2em]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </motion.div>

        {/* Flex Layout designed to NEVER overflow 100vh */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-between">
          
          {/* Left Side: Elegant Title */}
          <motion.div
            className="w-full lg:w-[45%] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
          >
            {event.date && (
              <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 block drop-shadow-md text-white/80">
                {event.date}
              </span>
            )}
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight drop-shadow-lg">
              {event.title}
            </h2>
          </motion.div>

          {/* Right Side: Tabbed Data Archive */}
          <motion.div
            className="w-full lg:w-[55%] flex flex-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col h-[40vh] md:h-[45vh] lg:h-[55vh]">
              <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
                
                <TabsList className="bg-transparent border-b border-white/10 rounded-none w-full justify-start h-auto p-0 mb-6 gap-8 shrink-0">
                  <TabsTrigger 
                    value="overview" 
                    className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-white text-zinc-500 uppercase font-mono tracking-widest text-[10px] md:text-xs px-0 pb-3 border-b-2 border-transparent data-[state=active]:border-current rounded-none transition-all"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="archive" 
                    className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-white text-zinc-500 uppercase font-mono tracking-widest text-[10px] md:text-xs px-0 pb-3 border-b-2 border-transparent data-[state=active]:border-current rounded-none transition-all"
                  >
                    Data Archive
                  </TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-500 flex-1 flex flex-col overflow-hidden">
                  <p className="text-zinc-300 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-6 drop-shadow-md flex-1">
                    {snippet}
                  </p>
                  
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {event.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] md:text-[10px] font-mono tracking-widest text-zinc-500 bg-white/5 border border-white/10 px-3 md:px-4 py-1.5 uppercase rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* FULL ARCHIVE TAB */}
                <TabsContent value="archive" className="mt-0 outline-none animate-in fade-in zoom-in-95 duration-500 flex-1 flex flex-col overflow-hidden">
                  <ScrollArea className="flex-1 pr-4">
                    <div className="prose prose-invert prose-zinc max-w-none font-light leading-relaxed whitespace-pre-line text-zinc-300 text-sm md:text-base">
                      {cleanDescription}
                    </div>
                  </ScrollArea>
                </TabsContent>

              </Tabs>
            </div>
          </motion.div>

        </div>
      </div>
      
    </motion.section>
  );
}
