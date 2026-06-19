"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MusicPlayer() {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPulseHint, setShowPulseHint] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Chỉ hiển thị và phát nhạc ở trang chủ và timeline
  const isVisible = pathname === "/" || pathname === "/timeline";

  useEffect(() => {
    if (!isVisible) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.15;
    let interactionListenersActive = true;

    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowPulseHint(false);
            if (interactionListenersActive) {
              removeListeners();
              interactionListenersActive = false;
            }
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };

    attemptPlay();

    // Lắng nghe tương tác HỢP LỆ (chỉ click/phím/touch mới lách được luật của trình duyệt)
    const handleValidInteraction = () => {
      if (audio.paused) attemptPlay();
    };

    // Bắt sự kiện scroll riêng: vì browser CẤM bật loa bằng scroll, 
    // mình sẽ làm nút Play nháy sáng để gợi ý user click 1 phát.
    const handleScrollHint = () => {
      if (audio.paused && interactionListenersActive) {
        setShowPulseHint(true);
      }
    };

    const addListeners = () => {
      ["click", "pointerdown", "keydown", "touchstart"].forEach((evt) =>
        window.addEventListener(evt, handleValidInteraction, { passive: true })
      );
      window.addEventListener("scroll", handleScrollHint, { passive: true });
    };

    const removeListeners = () => {
      ["click", "pointerdown", "keydown", "touchstart"].forEach((evt) =>
        window.removeEventListener(evt, handleValidInteraction)
      );
      window.removeEventListener("scroll", handleScrollHint);
    };

    addListeners();

    return () => {
      removeListeners();
      interactionListenersActive = false;
    };
  }, [isVisible]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setShowPulseHint(false);
        })
        .catch((e) => console.error("Play lỗi:", e));
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/timeline-theme.mp3" loop preload="auto" />

      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3">
        {/* Nút Play/Pause kèm hiệu ứng nháy sáng (pulse) khi scroll */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className={cn(
            "relative flex items-center justify-center w-12 h-12 rounded-full border backdrop-blur-md transition-all duration-300 group",
            showPulseHint && !isPlaying ? "animate-pulse border-neon-cyan/80 bg-neon-cyan/20 shadow-[0_0_20px_rgba(34,211,238,0.5)]" : "",
            isPlaying
              ? "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              : "bg-black/60 border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500"
          )}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className={cn("w-5 h-5 ml-1", showPulseHint ? "text-white" : "")} />
          )}

          <AnimatePresence>
            {isPlaying && (
              <motion.div
                className="absolute inset-0 rounded-full border border-neon-cyan"
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-zinc-800/50 transition-all duration-500",
          isPlaying ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
        )}>
          <Music className="w-4 h-4 text-neon-cyan/70" />
          <div className="flex items-end gap-[2px] h-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-neon-cyan rounded-t-sm"
                animate={isPlaying ? {
                  height: ["20%", "100%", "40%", "80%", "20%"]
                } : { height: "20%" }}
                transition={{
                  duration: 1 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
