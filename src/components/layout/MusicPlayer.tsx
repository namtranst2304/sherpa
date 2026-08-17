"use client"

import { useState, useEffect, useRef, useSyncExternalStore } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Play, Pause, Music } from "lucide-react"
import { cn } from "@/lib/utils"

function getGlobalAudio() {
  if (typeof document === "undefined") return null
  const el = document.getElementById("global-bg-audio")
  return el instanceof HTMLAudioElement ? el : null
}

function subscribePlaying(onStoreChange: () => void) {
  const audio = getGlobalAudio()
  if (!audio) return () => {}
  audio.addEventListener("play", onStoreChange)
  audio.addEventListener("pause", onStoreChange)
  return () => {
    audio.removeEventListener("play", onStoreChange)
    audio.removeEventListener("pause", onStoreChange)
  }
}

function getPlayingSnapshot() {
  return !(getGlobalAudio()?.paused ?? true)
}

function getPlayingServerSnapshot() {
  return false
}

/** UI chrome only — audio element lives in GlobalBgAudio (always mounted). */
export function MusicPlayer() {
  const isPlaying = useSyncExternalStore(
    subscribePlaying,
    getPlayingSnapshot,
    getPlayingServerSnapshot
  )
  const [showPulseHint, setShowPulseHint] = useState(false)
  const wasPlayingRef = useRef(false)
  const ttsWasPlayingRef = useRef(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const audio = getGlobalAudio()
    if (!audio) return

    audio.volume = 0.15

    const hintScroll = () => {
      if (audio.paused) setShowPulseHint(true)
    }
    window.addEventListener("wheel", hintScroll, { once: true, passive: true })
    window.addEventListener("touchmove", hintScroll, { once: true, passive: true })

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!audio.paused) {
          wasPlayingRef.current = true
          audio.pause()
        }
      } else if (wasPlayingRef.current) {
        audio.play().catch(() => {})
        wasPlayingRef.current = false
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    const handleToggleGlobalMusic = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.pause) {
        if (!audio.paused) {
          ttsWasPlayingRef.current = true
          audio.pause()
        }
      } else if (ttsWasPlayingRef.current) {
        audio.play().catch(() => {})
        ttsWasPlayingRef.current = false
      }
    }
    window.addEventListener("toggle-global-music", handleToggleGlobalMusic)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("toggle-global-music", handleToggleGlobalMusic)
      window.removeEventListener("wheel", hintScroll)
      window.removeEventListener("touchmove", hintScroll)
    }
  }, [])

  const pulseHint = showPulseHint && !isPlaying

  const togglePlay = () => {
    const audio = getGlobalAudio()
    if (!audio) return
    setShowPulseHint(false)
    if (audio.paused) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }

  return (
    <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-50 flex items-center gap-2 md:gap-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        aria-label={isPlaying ? "Tạm dừng nhạc nền" : "Phát nhạc nền"}
        aria-pressed={isPlaying}
        className={cn(
          "relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-none border backdrop-blur-md transition-all duration-300 group",
          pulseHint
            ? "animate-pulse border-neon-cyan/80 bg-neon-cyan/20 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
            : "",
          isPlaying
            ? "bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            : "bg-black/60 border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500"
        )}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 md:w-5 md:h-5" />
        ) : (
          <Play className={cn("w-4 h-4 md:w-5 md:h-5 ml-1", pulseHint ? "text-white" : "")} />
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

      <div
        className={cn(
          "hidden md:flex items-center gap-2 px-4 py-2 rounded-none bg-black/60 backdrop-blur-md border border-zinc-800/50 transition-all duration-500",
          isPlaying ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
        )}
      >
        <Music className="w-4 h-4 text-neon-cyan/70" />
        <div className="flex items-end gap-[2px] h-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 bg-neon-cyan rounded-t-sm"
              style={{
                height: isPlaying ? undefined : "20%",
                animation:
                  isPlaying && !shouldReduceMotion
                    ? `equalizer ${1 + i * 0.2}s ease-in-out infinite`
                    : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
