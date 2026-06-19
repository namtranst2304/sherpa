import React from "react";
import { motion } from "motion/react";
import { Calendar, Tag } from "lucide-react";
import { CyberBadge } from "@/components/ui/CyberComponents";
import { TimelineEvent } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";

export function EventCard({ event, isRightSide, themeColor }: { event: TimelineEvent; isRightSide: boolean; themeColor: string }) {
  const theme = getTheme(themeColor);
  return (
    <motion.div
      className={`bg-zinc-900/30 backdrop-blur-sm p-5 md:p-6 relative overflow-hidden group
        ${isRightSide ? "md:rounded-tr-2xl md:rounded-bl-2xl md:rounded-tl-none md:rounded-br-2xl" : "md:rounded-tl-2xl md:rounded-br-2xl md:rounded-tr-none md:rounded-bl-2xl"}
        rounded-tr-2xl rounded-bl-2xl border border-zinc-800/50 hover:border-zinc-700/80 transition-colors duration-500
      `}
      whileHover={{
        scale: 1.01,
        backgroundColor: "rgba(24, 24, 27, 0.5)",
      }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <h4 className={`text-xl md:text-2xl font-black mb-4 transition-all ${theme.text} drop-shadow-md ${isRightSide ? "md:text-left" : "md:text-right"} text-left group-hover:brightness-125`}>
        {event.title}
      </h4>
      <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-4 group-hover:text-zinc-200 transition-colors relative z-10 font-mono text-justify whitespace-pre-line">
        {event.description}
      </p>
      <div className={`flex flex-wrap items-center gap-2 relative z-10 ${isRightSide ? "md:justify-start" : "md:justify-end"} justify-start`}>
        {event.date && (
          <span className={`flex items-center text-[10px] ${theme.text} font-bold font-mono bg-zinc-800/80 px-2 py-0.5 border ${theme.border}/30`}>
            <Calendar className="w-3 h-3 mr-1" />
            {event.date}
          </span>
        )}
        {event.tags?.map((tag, tagIdx) => (
          <CyberBadge key={tagIdx} variant="zinc" withIndicator={true} className="text-[10px] py-0.5 px-2 bg-zinc-800/90 border-zinc-700 shadow-sm">
            <Tag className="w-3 h-3 mr-1 text-zinc-500" />
            {tag}
          </CyberBadge>
        ))}
      </div>
    </motion.div>
  );
}
