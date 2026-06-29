"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  // Stop smoke particles after rocket leaves viewport (saves GPU from infinite-repeat animations)
  const [showParticles, setShowParticles] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
      if (window.scrollY === 0) {
        setIsLaunching(false);
        setShowParticles(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLaunch = () => {
    setIsLaunching(true);
    setShowParticles(true);
    // Smooth scroll lên top
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // Kill particles after rocket animation completes (1.2s matches the y animation duration)
    setTimeout(() => setShowParticles(false), 1200);
    
    // Đề phòng trường hợp trang quá ngắn scroll lên top nhanh hơn hiệu ứng
    // Hoặc user tự cuộn, reset sau 1.5s
    setTimeout(() => setIsLaunching(false), 1500);
  };

  if (pathname === "/timeline") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: isLaunching ? -1500 : 0, 
            x: isLaunching ? [0, -3, 3, -3, 3, 0] : 0 
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            y: isLaunching ? { duration: 1.2, ease: "easeIn" } : { duration: 0.3 },
            x: isLaunching ? { duration: 0.1, repeat: 10 } : {}
          }}
          onClick={handleLaunch}
          className={cn(
            "fixed bottom-8 right-8 z-50 p-3 rounded-full transition-all duration-300 group flex items-center justify-center",
            isLaunching 
              ? "bg-neon-orange/20 border-neon-orange text-white shadow-[0_0_40px_rgba(249,115,22,1)] border"
              : "bg-black/60 backdrop-blur-md border border-zinc-700/50 text-neon-cyan/70 hover:text-white hover:border-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
          )}
          aria-label="Scroll to top"
        >
          {/* Main Thruster Fire */}
          <AnimatePresence>
            {isLaunching && (
              <motion.div 
                initial={{ opacity: 0, scale: 0, height: 0 }}
                animate={{ opacity: 1, scale: 1, height: 60 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-3 bg-gradient-to-t from-transparent via-yellow-400 to-red-600 blur-[3px] rounded-full origin-top"
              />
            )}
          </AnimatePresence>
          
          {/* Core Fire */}
          <AnimatePresence>
            {isLaunching && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-white blur-[1px] rounded-full origin-top"
              />
            )}
          </AnimatePresence>

          {/* Smoke Particles */}
          <AnimatePresence>
            {showParticles && (
              <>
                {/* Center thick smoke */}
                <motion.div
                  initial={{ opacity: 0.8, y: 0, scale: 0.5, x: "-50%" }}
                  animate={{ opacity: 0, y: 60, scale: 3, x: "-50%" }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: "easeOut" }}
                  className="absolute -bottom-4 left-1/2 w-4 h-4 bg-zinc-400 rounded-full blur-[4px]"
                />
                <motion.div
                  initial={{ opacity: 0.8, y: 0, scale: 0.5, x: "-50%" }}
                  animate={{ opacity: 0, y: 50, scale: 2.5, x: "-50%" }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.2, ease: "easeOut" }}
                  className="absolute -bottom-4 left-1/2 w-5 h-5 bg-zinc-500 rounded-full blur-[3px]"
                />
                {/* Left scattered smoke */}
                <motion.div
                  initial={{ opacity: 0.6, y: 0, scale: 0.5, x: "-50%" }}
                  animate={{ opacity: 0, y: 40, scale: 2, x: "-200%" }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: 0.1, ease: "easeOut" }}
                  className="absolute -bottom-2 left-1/2 w-3 h-3 bg-zinc-500 rounded-full blur-[2px]"
                />
                <motion.div
                  initial={{ opacity: 0.5, y: 0, scale: 0.5, x: "-50%" }}
                  animate={{ opacity: 0, y: 50, scale: 2.5, x: "-300%" }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: 0.3, ease: "easeOut" }}
                  className="absolute -bottom-3 left-1/2 w-4 h-4 bg-zinc-600 rounded-full blur-[3px]"
                />
                {/* Right scattered smoke */}
                <motion.div
                  initial={{ opacity: 0.6, y: 0, scale: 0.5, x: "-50%" }}
                  animate={{ opacity: 0, y: 45, scale: 2, x: "100%" }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.15, ease: "easeOut" }}
                  className="absolute -bottom-2 left-1/2 w-3 h-3 bg-zinc-500 rounded-full blur-[2px]"
                />
                <motion.div
                  initial={{ opacity: 0.5, y: 0, scale: 0.5, x: "-50%" }}
                  animate={{ opacity: 0, y: 55, scale: 2.5, x: "200%" }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: 0.25, ease: "easeOut" }}
                  className="absolute -bottom-3 left-1/2 w-4 h-4 bg-zinc-600 rounded-full blur-[3px]"
                />
              </>
            )}
          </AnimatePresence>

          {/* Xoay icon Rocket -45 độ để mũi tên hướng thẳng lên trời */}
          <Rocket className={cn(
            "w-5 h-5 transition-transform duration-300 -rotate-45",
            !isLaunching && "group-hover:-translate-y-1",
            isLaunching && "text-white"
          )} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
