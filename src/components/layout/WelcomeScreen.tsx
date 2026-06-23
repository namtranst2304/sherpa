"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DoorOverlay } from "@/components/ui/DoorOverlay";

export function WelcomeScreen() {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  // Kiểm tra Session Storage để chỉ hiện 1 lần duy nhất trong session
  useEffect(() => {
    const hasWelcomed = sessionStorage.getItem("sherpa_welcomed");
    if (hasWelcomed) {
      setIsVisible(false);
    }
    setIsChecking(false);
  }, []);

  // Khóa cuộn trang khi chưa mở
  useEffect(() => {
    if (isVisible && !isChecking) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible, isChecking]);

  const handleEnter = () => {
    // Đánh dấu đã qua màn chào hỏi
    sessionStorage.setItem("sherpa_welcomed", "true");

    // Play nhạc nền
    const audio = document.getElementById("global-bg-audio") as HTMLAudioElement;
    if (audio) {
      audio.play().catch(e => console.error("Audio error:", e));
    }

    setIsOpened(true);

    // Xóa hẳn khỏi DOM sau khi animation kết thúc (1s)
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  if (isChecking || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none">
      
      <DoorOverlay isOpened={isOpened} duration={1.0} />

      {/* Nội dung UI */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-10 pointer-events-auto"
          >
            <div className="text-center space-y-4">
              {/* Icon Traveler cách điệu (Quả cầu trắng phát sáng) */}
              <div className="mx-auto flex items-center justify-center mb-4">
                <div className="relative w-16 h-16 rounded-full bg-zinc-200 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.2)]">
                  {/* Vết nứt mờ mờ dưới đáy (giống The Traveler) */}
                  <div className="absolute bottom-1 right-2 w-4 h-4 bg-zinc-400/30 rounded-full blur-[2px]" />
                </div>
              </div>
              <h1 className="text-2xl md:text-4xl font-light tracking-[0.3em] text-zinc-200">
                DESTINY SHERPA
              </h1>
              <p className="text-zinc-600 font-mono text-xs uppercase tracking-[0.5em]">
                Ghost is standing by
              </p>
            </div>

            <button
              onClick={handleEnter}
              className="px-8 md:px-12 py-3 md:py-4 mt-8 text-xs md:text-sm font-light tracking-widest md:tracking-[0.4em] uppercase border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-400 hover:bg-white/10 transform scale-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 hover:duration-75 will-change-transform relative overflow-hidden group rounded-sm flex items-center gap-2 md:gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse group-hover:bg-green-400 transition-colors duration-300 group-hover:duration-75" />
              <span className="relative z-10 pt-[2px]">RETURN TO ORBIT</span>

              {/* Tia sáng quét ngang siêu nhẹ */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1s_infinite]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
