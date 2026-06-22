import React from "react";
import { motion } from "motion/react";
import { TimelineEra } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";
import { EventCard } from "./EventCard";

export function EraEvents({ era }: { era: TimelineEra }) {
  const theme = getTheme(era.themeColor);
  const isEpilogue = era.id === "16-epilogue";

  return (
    <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 pb-16">
      {/* Central vertical line */}
      {!isEpilogue && (
        <motion.div
          className={`absolute left-1/2 -ml-[1px] top-0 bottom-0 w-[2px] ${theme.bg} opacity-20`}
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />
      )}

      <div className="space-y-6 md:space-y-10 relative">
        {era.events.map((event, eventIdx) => {
          if (isEpilogue) {
            return (
              <motion.div
                key={eventIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ type: "spring" as const, stiffness: 100, damping: 20 }}
                className="relative flex flex-col items-center w-full max-w-4xl mx-auto pt-8"
              >
                <div className="w-full">
                  <EventCard event={event} isRightSide={false} themeColor={era.themeColor} center={true} />
                </div>
              </motion.div>
            );
          }

          const isRightSide = eventIdx % 2 !== 0;
          return (
            <motion.div
              key={eventIdx}
              initial={{ opacity: 0, x: isRightSide ? 40 : -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ type: "spring" as const, stiffness: 120, damping: 20, delay: 0.05 }}
              className="relative flex flex-col md:flex-row items-center w-full mb-8 md:mb-0"
            >
              {/* Center Node (Glowing Cyber Diamond) */}
              <div className="relative md:absolute md:left-1/2 md:-ml-[8px] z-20 mb-6 md:mb-0 flex items-center justify-center group">
                {/* Ambient glow */}
                <div className="absolute inset-0 rounded-full blur-md opacity-40 transition-opacity duration-300 group-hover:opacity-80" style={{ backgroundColor: theme.hex }} />
                
                {/* Diamond Container */}
                <motion.div
                  className={`relative w-4 h-4 rounded-[2px] bg-zinc-950 border-[2px] ${theme.border} flex items-center justify-center overflow-hidden`}
                  style={{ rotate: "45deg" }}
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 15 }}
                >
                  {/* Inner glowing core */}
                  <div 
                    className="w-1.5 h-1.5 rounded-full opacity-80" 
                    style={{ backgroundColor: theme.hex, boxShadow: `0 0 10px ${theme.hex}` }} 
                  />
                </motion.div>
              </div>

              {/* Left Side */}
              <div className={`hidden md:block w-1/2 pr-8 lg:pr-10`}>
                {!isRightSide && <EventCard event={event} isRightSide={false} themeColor={era.themeColor} />}
              </div>

              {/* Right Side / Mobile Full Width */}
              <div className="w-full md:w-1/2 md:pl-8 lg:pl-10 z-20">
                <div className={`block ${!isRightSide ? "md:hidden" : ""}`}>
                  <EventCard event={event} isRightSide={true} themeColor={era.themeColor} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
