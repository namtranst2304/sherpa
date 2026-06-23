
import { motion } from "motion/react";
import { CyberBadge } from "@/components/common/CyberComponents";
import { TimelineEvent } from "@/data/timeline/index";
import { getTheme } from "@/lib/theme";

const renderDescription = (text: string) => {
  if (!text) return null;
  if (!text.includes('**')) return text;
  const parts = text.split('**');
  return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part);
}

export function EventCard({ event, isRightSide, themeColor, center }: { event: TimelineEvent; isRightSide: boolean; themeColor: string; center?: boolean }) {
  const theme = getTheme(themeColor);
  return (
    <motion.div
      className={`bg-zinc-900/30 backdrop-blur-sm p-5 md:p-6 relative overflow-hidden group rounded-2xl
        ${center ? "" : isRightSide ? "md:rounded-tr-2xl md:rounded-bl-2xl md:rounded-tl-none md:rounded-br-2xl" : "md:rounded-tl-2xl md:rounded-br-2xl md:rounded-tr-none md:rounded-bl-2xl"}
        border border-zinc-800/50 transition-all duration-500 ${theme.hoverShadow} hover:border-zinc-600/50
      `}
      whileHover={{
        backgroundColor: "rgba(24, 24, 27, 0.5)",
      }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
    >
      <h4 className={`flex items-center text-xl md:text-2xl font-sans mb-3 lg:mb-4 justify-center ${center ? "md:justify-center" : isRightSide ? "md:justify-start" : "md:justify-end"}`}>
        {/* Elegant Prefix Line */}
        <span 
          className="inline-block mr-4 w-[2px] h-6 md:h-7 opacity-70" 
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, rgb(${theme.rgb}), transparent)` }} 
        />
        
        {/* Title Text */}
        <span className="text-white tracking-wide">
          {event.title}
        </span>
      </h4>
      {event.date && (
        <div className={`mb-5 lg:mb-6 flex justify-center ${center ? "md:justify-center" : isRightSide ? "md:justify-start" : "md:justify-end"}`}>
          <div className="relative inline-flex cursor-default">
            {/* Ambient Glow */}
            <div className={`absolute -inset-1 rounded-full blur-md opacity-20`} style={{ backgroundColor: `rgba(${theme.rgb}, 0.3)` }} />
            
            {/* Elegant Pill */}
            <div className={`relative flex items-center text-[10px] md:text-[11px] lg:text-[12px] tracking-[0.25em] uppercase ${theme.text} font-light font-sans bg-black/40 px-5 py-1.5 rounded-full border border-white/10 backdrop-blur-md overflow-hidden shadow-lg`}>
              {/* Content */}
              <span className={`relative z-10 opacity-90 drop-shadow-md`}>{event.date}</span>
            </div>
          </div>
        </div>
      )}
      <p className={`text-zinc-400 text-sm md:text-base xl:text-[17px] leading-relaxed mb-6 relative z-10 font-sans font-light whitespace-pre-line text-justify tracking-wide`}>
        {renderDescription(event.description)}
      </p>
      {event.tags && event.tags.length > 0 && (
        <div className={`flex flex-wrap items-center gap-2 relative z-10 justify-center ${center ? "md:justify-center" : isRightSide ? "md:justify-start" : "md:justify-end"}`}>
          {event.tags.map((tag, tagIdx) => (
            <CyberBadge key={tagIdx} variant="zinc" withIndicator={false} className="text-[9px] py-1 px-3 bg-transparent border-white/10 text-zinc-500 shadow-none font-sans tracking-widest rounded-full uppercase">
              {tag}
            </CyberBadge>
          ))}
        </div>
      )}
    </motion.div>
  );
}
