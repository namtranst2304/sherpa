"use client";

import React, { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CyberCard, CyberBadge, CyberVariant } from "@/components/ui/CyberComponents";
import { DESTINY_TIMELINE, TimelineEra, TimelineEvent } from "@/data/timeline/index";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Tag } from "lucide-react";

// Stagger for the main list
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Alternating Era Entrances
const itemVariants = (index: number) => ({
  hidden: { 
    opacity: 0, 
    x: index % 2 === 0 ? -100 : 100, 
    y: 50,
    rotateX: 15,
    filter: "blur(20px)"
  },
  show: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    rotateX: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
  }
});

// Event variants for left/right fly-in
const eventVariants = (idx: number) => ({
  hidden: { 
    opacity: 0, 
    x: idx % 2 === 0 ? -60 : 60, 
    y: 40,
    scale: 0.9,
    filter: "blur(15px)"
  },
  show: { 
    opacity: 1, 
    x: 0, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      type: "spring" as const, 
      stiffness: 150, 
      damping: 15,
      delay: idx * 0.1 
    } 
  }
});

function EventCard({ event, isRightSide, themeColor }: { event: TimelineEvent, isRightSide: boolean, themeColor: string }) {
  return (
    <motion.div 
      className={`bg-zinc-900/20 backdrop-blur-sm p-5 md:p-6 relative overflow-hidden group
        ${isRightSide ? 'md:rounded-tr-2xl md:rounded-bl-2xl md:rounded-tl-none md:rounded-br-2xl' : 'md:rounded-tl-2xl md:rounded-br-2xl md:rounded-tr-none md:rounded-bl-2xl'}
        rounded-tr-2xl rounded-bl-2xl
      `}
      whileHover={{ 
        scale: 1.01,
        backgroundColor: "rgba(24, 24, 27, 0.4)",
        boxShadow: `0 10px 30px -10px rgba(var(--color-neon-${themeColor}), 0.15)`
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Diagonal Scanline Effect */}
      <div className={`absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--color-neon-${themeColor}),0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-cyber-scan opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500`} />

      <h4 className={`text-lg md:text-xl font-black text-zinc-100 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all ${isRightSide ? 'md:text-left' : 'md:text-right'} text-left`}>
        {event.title}
      </h4>
      <p className="text-zinc-300 text-xs md:text-sm leading-relaxed mb-4 group-hover:text-white transition-colors relative z-10 font-mono text-justify">
        {event.description}
      </p>
      
      <div className={`flex flex-wrap items-center gap-3 relative z-10 ${isRightSide ? 'md:justify-start' : 'md:justify-end'} justify-start`}>
        {event.date && (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center text-xs text-neon-cyan font-bold font-mono bg-neon-cyan/10 px-2.5 py-1 border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)]"
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {event.date}
          </motion.div>
        )}
        
        {event.tags && event.tags.map((tag, tagIdx) => (
          <motion.div key={tagIdx} whileHover={{ scale: 1.02 }}>
            <CyberBadge variant="zinc" withIndicator={true} className="text-[10px] py-1 px-2.5 bg-zinc-800/90 border-zinc-600 shadow-md transition-colors hover:border-zinc-500">
              <Tag className="w-3 h-3 mr-1 text-zinc-400" />
              {tag}
            </CyberBadge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function DestinyTimeline() {
  const [activeEra, setActiveEra] = useState<string | undefined>(DESTINY_TIMELINE[0]?.id);

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 relative z-10" style={{ perspective: "1000px" }}>
      {/* Title section - slide down and up */}
      <div className="text-center mb-24 relative">
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="relative inline-block"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-cyan mb-2 drop-shadow-[0_0_20px_rgba(0,243,255,0.6)]">
            Destiny Universe
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        >
          <span className="block text-2xl md:text-4xl font-bold tracking-[0.3em] text-zinc-300 mt-2 uppercase">
            Biên Niên Sử
          </span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed mt-6 font-mono"
        >
          Toàn bộ các sự kiện quan trọng trong vũ trụ Destiny, từ thời kỳ Hỗn Mang đến Kỷ Nguyên Ánh Sáng và Bóng Tối.
        </motion.p>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Accordion
          type="single"
          collapsible
          value={activeEra}
          onValueChange={setActiveEra}
          className="space-y-4"
        >
          {DESTINY_TIMELINE.map((era: TimelineEra, index: number) => {
            const isActive = activeEra === era.id;
            return (
              <motion.div custom={index} variants={itemVariants(index)} key={era.id}>
                <AccordionItem 
                  value={era.id} 
                  className="border-none bg-transparent"
                >
                  <CyberCard 
                    variant={era.themeColor as CyberVariant} 
                    withCorners={true}
                    className={`transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] p-0 overflow-hidden group transform-gpu !border-none ${
                      isActive 
                        ? 'bg-black/60 shadow-[0_0_50px_rgba(var(--color-neon-' + era.themeColor + '),0.15)] scale-[1.01]' 
                        : 'bg-black/20 hover:bg-black/40'
                    }`}
                  >
                    <AccordionTrigger className="px-5 py-5 hover:no-underline [&[data-state=open]>div>div>svg]:rotate-180 group-hover:bg-gradient-to-r group-hover:from-white/[0.03] group-hover:to-transparent transition-all duration-500">
                      <div className="flex items-center justify-between w-full text-left">
                        <div className="flex items-center gap-4 md:gap-6">
                          {/* Animated Number */}
                          <motion.span 
                            className={`text-4xl md:text-5xl font-black font-mono transition-all duration-500 ${
                              isActive ? 'opacity-100 text-neon-' + era.themeColor + ' drop-shadow-[0_0_15px_var(--color-neon-' + era.themeColor + ')]' : 'opacity-10 text-zinc-600 group-hover:opacity-30 group-hover:text-neon-' + era.themeColor
                            }`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </motion.span>
                          
                          <div className="flex-1">
                            <h3 className={`text-xl md:text-2xl font-black uppercase tracking-widest text-white transition-all duration-500 ${
                              isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] translate-x-1' : 'group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)] group-hover:translate-x-0.5'
                            }`}>
                              {era.name}
                            </h3>
                            <motion.p 
                              className="text-zinc-400 text-xs md:text-sm mt-1 max-w-3xl leading-relaxed opacity-80"
                            >
                              {era.description}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-4 md:px-6 pb-8 pt-4 overflow-hidden">
                      <div className="relative mt-6">
                        {/* Center High-tech Laser Line (Desktop) / Left Line (Mobile) */}
                        <motion.div 
                          className={`absolute left-4 md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-neon-${era.themeColor} to-transparent opacity-50`}
                          initial={{ scaleY: 0, originY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                        />

                        <div className="space-y-8 md:space-y-12 relative">
                          {era.events.map((event: TimelineEvent, eventIdx: number) => {
                            // isRightSide means the card will be displayed on the right side of the central line on Desktop
                            const isRightSide = eventIdx % 2 !== 0;
                            
                            return (
                              <motion.div 
                                variants={eventVariants(eventIdx)}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                key={eventIdx} 
                                className="relative flex flex-col md:flex-row items-center w-full"
                              >
                                {/* Center Node (Desktop) / Left Node (Mobile) */}
                                <motion.div 
                                  className={`absolute left-[10px] md:left-1/2 md:-ml-[8px] w-4 h-4 rounded-none bg-black border-[2px] border-neon-${era.themeColor} shadow-[0_0_15px_var(--color-neon-${era.themeColor})] z-10`}
                                  style={{ rotate: '45deg' }}
                                  whileHover={{ scale: 1.3, backgroundColor: `var(--color-neon-${era.themeColor})` }}
                                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                  <div className={`absolute inset-0 bg-neon-${era.themeColor} animate-ping opacity-20`} />
                                </motion.div>
                                
                                {/* Left Side (Spacer or Content) */}
                                <div className={`hidden md:block w-1/2 pr-10 lg:pr-12 ${isRightSide ? '' : 'pl-0'}`}>
                                  {!isRightSide && (
                                    <EventCard event={event} isRightSide={false} themeColor={era.themeColor} />
                                  )}
                                </div>

                                {/* Right Side (Spacer or Content) */}
                                <div className={`w-full pl-12 md:w-1/2 md:pl-10 lg:pl-12`}>
                                  {/* On mobile, all content is here (looks like right side). On desktop, only right side content goes here */}
                                  <div className={`block ${!isRightSide ? 'md:hidden' : ''}`}>
                                    <EventCard event={event} isRightSide={true} themeColor={era.themeColor} />
                                  </div>
                                </div>

                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </AccordionContent>
                  </CyberCard>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>
      </motion.div>
    </div>
  );
}
