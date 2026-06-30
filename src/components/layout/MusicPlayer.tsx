"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Play, Pause, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MusicPlayer() {
  const pathname = usePathname();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPulseHint, setShowPulseHint] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const wasPlayingRef = useRef(false);
  const ttsWasPlayingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  // Chỉ hiển thị và phát nhạc ở trang chủ và timeline
  const isVisible = pathname === "/" || pathname === "/timeline";

  useEffect(() => {
    if (!isVisible) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.15;

    // Đồng bộ state isPlaying thông qua event gốc của thẻ audio
    const syncState = () => {
      setIsPlaying(!audio.paused);
      if (!audio.paused) setShowPulseHint(false);
    };

    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);

    // 1. Thử auto-play ngay lập tức
    const unlockAudio = (e: Event) => {
      // Nếu user click vào nút TTS để nghe truyện, đừng tự bật nhạc nền (gây hiểu nhầm là TTS tự bật nhạc)
      const target = e.target as HTMLElement;
      if (target && target.closest && target.closest('.tts-btn-group')) return;
      audio.play().catch(() => {});
    };
    const events = ["click", "keydown", "touchstart", "pointerdown"];
    
    const removeUnlockListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, unlockAudio));
    };

    audio.play().catch(() => {
      // 2. Nếu browser chặn, chờ tương tác đầu tiên của user để bật nhạc
      events.forEach((evt) => window.addEventListener(evt, unlockAudio, { once: true, passive: true }));

      // 3. Nếu user cuộn trang mà nhạc vẫn chưa bật -> nháy sáng nút Play
      const hintScroll = () => { if (audio.paused) setShowPulseHint(true); };
      window.addEventListener("wheel", hintScroll, { once: true, passive: true });
      window.addEventListener("touchmove", hintScroll, { once: true, passive: true });

      return () => {
        removeUnlockListeners();
        window.removeEventListener("wheel", hintScroll);
        window.removeEventListener("touchmove", hintScroll);
      };
    });

    // Quản lý việc tự động dừng/phát nhạc khi chuyển tab hoặc chuyển app trên mobile
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingRef.current = true;
          audio.pause();
        }
      } else {
        if (wasPlayingRef.current) {
          audio.play().catch(() => {});
          wasPlayingRef.current = false;
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Xử lý sự kiện tạm dừng từ TTS
    const handleToggleGlobalMusic = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.pause) {
        if (!audio.paused) {
          ttsWasPlayingRef.current = true;
          audio.pause();
        }
      } else {
        if (ttsWasPlayingRef.current) {
          audio.play().catch(() => {});
          ttsWasPlayingRef.current = false;
        }
      }
    };
    window.addEventListener('toggle-global-music', handleToggleGlobalMusic);

    return () => {
      audio.removeEventListener("play", syncState);
      audio.removeEventListener("pause", syncState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener('toggle-global-music', handleToggleGlobalMusic);
    };
  }, [isVisible]);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current?.pause();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <audio id="global-bg-audio" ref={audioRef} src="/audio/timeline-theme.mp3" loop preload="none" />

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
            {isPlaying && !shouldReduceMotion && (
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
              <div
                key={i}
                className="w-1 bg-neon-cyan rounded-t-sm"
                style={{
                  height: isPlaying ? undefined : '20%',
                  animation: (isPlaying && !shouldReduceMotion) ? `equalizer ${1 + i * 0.2}s ease-in-out infinite` : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
