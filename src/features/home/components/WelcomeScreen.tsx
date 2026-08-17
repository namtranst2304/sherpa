"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DoorOverlay } from "@/components/common/DoorOverlay"
import { playGlobalBgAudio } from "@/lib/audio"

const WELCOME_EVENT = "sherpa-welcomed"

function subscribeWelcomed(onStoreChange: () => void) {
  window.addEventListener(WELCOME_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener(WELCOME_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getWelcomedSnapshot() {
  return sessionStorage.getItem("sherpa_welcomed") === "true"
}

/** Client-only component: hide until hydrated snapshot is read. */
function getWelcomedServerSnapshot() {
  return true
}

export function WelcomeScreen() {
  const hasWelcomed = useSyncExternalStore(
    subscribeWelcomed,
    getWelcomedSnapshot,
    getWelcomedServerSnapshot
  )
  const [isOpened, setIsOpened] = useState(false)
  const [exited, setExited] = useState(false)
  const isVisible = !hasWelcomed && !exited

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = "auto"
      return
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isVisible])

  if (!isVisible) return null

  const handleEnter = () => {
    sessionStorage.setItem("sherpa_welcomed", "true")
    window.dispatchEvent(new Event(WELCOME_EVENT))
    playGlobalBgAudio()
    setIsOpened(true)
    setTimeout(() => setExited(true), 1000)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none">
      <DoorOverlay isOpened={isOpened} duration={1.0} />

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
              <div className="mx-auto flex items-center justify-center mb-4">
                <div className="relative w-16 h-16 rounded-full bg-zinc-200 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.2)]">
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
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1s_infinite]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
