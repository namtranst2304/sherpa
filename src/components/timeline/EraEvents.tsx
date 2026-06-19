import React from "react";
import { motion } from "motion/react";
import { TimelineEra } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";
import { EventCard } from "./EventCard";

export function EraEvents({ era }: { era: TimelineEra }) {
  const theme = getTheme(era.themeColor);
  return (
    <div className="relative max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 pb-16">
      {/* Central vertical line */}
      <motion.div
        className={`absolute left-8 md:left-1/2 md:-ml-[1px] top-0 bottom-0 w-[2px] ${theme.bg} opacity-20`}
        initial={{ scaleY: 0, originY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.5, ease: "circOut" }}
      />

      <div className="space-y-6 md:space-y-10 relative">
        {era.events.map((event, eventIdx) => {
          const isRightSide = eventIdx % 2 !== 0;
          return (
            <motion.div
              key={eventIdx}
              initial={{ opacity: 0, x: isRightSide ? 40 : -40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring" as const, stiffness: 120, damping: 20, delay: 0.05 }}
              className="relative flex flex-col md:flex-row items-center w-full"
            >
              {/* Center Node */}
              <motion.div
                className={`absolute left-[24px] md:left-1/2 md:-ml-[6px] w-3 h-3 rounded-none bg-black border-[2px] ${theme.border} z-10`}
                style={{ rotate: "45deg" }}
                whileHover={{ scale: 1.4, backgroundColor: theme.hex }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 15 }}
              />

              {/* Left Side */}
              <div className={`hidden md:block w-1/2 pr-8 lg:pr-10`}>
                {!isRightSide && <EventCard event={event} isRightSide={false} themeColor={era.themeColor} />}
              </div>

              {/* Right Side */}
              <div className="w-full pl-16 md:w-1/2 md:pl-8 lg:pl-10">
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
