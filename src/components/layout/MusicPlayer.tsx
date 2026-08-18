'use client'

import { useState, useEffect, useRef, useSyncExternalStore } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { Play, Pause, Music } from 'lucide-react'
import { cn } from '@/lib/utils'

function getGlobalAudio() {
  if (typeof document === 'undefined') return null
  const el = document.getElementById('global-bg-audio')
  return el instanceof HTMLAudioElement ? el : null
}

function subscribePlaying(onStoreChange: () => void) {
  const audio = getGlobalAudio()
  if (!audio) return () => {}
  audio.addEventListener('play', onStoreChange)
  audio.addEventListener('pause', onStoreChange)
  return () => {
    audio.removeEventListener('play', onStoreChange)
    audio.removeEventListener('pause', onStoreChange)
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
    getPlayingServerSnapshot,
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
    window.addEventListener('wheel', hintScroll, { once: true, passive: true })
    window.addEventListener('touchmove', hintScroll, {
      once: true,
      passive: true,
    })

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
    document.addEventListener('visibilitychange', handleVisibilityChange)

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
    window.addEventListener('toggle-global-music', handleToggleGlobalMusic)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('toggle-global-music', handleToggleGlobalMusic)
      window.removeEventListener('wheel', hintScroll)
      window.removeEventListener('touchmove', hintScroll)
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
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 md:bottom-8 md:left-8 md:gap-3">
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'}
        aria-pressed={isPlaying}
        className={cn(
          'group relative flex h-11 w-11 items-center justify-center rounded-none border backdrop-blur-md transition-all duration-300 md:h-12 md:w-12',
          pulseHint
            ? 'animate-pulse border-neon-cyan/80 bg-neon-cyan/20 shadow-[0_0_20px_rgba(34,211,238,0.5)]'
            : '',
          isPlaying
            ? 'border-neon-cyan/50 bg-neon-cyan/20 text-neon-cyan shadow-[0_0_15px_rgba(34,211,238,0.3)]'
            : 'border-zinc-700/50 bg-black/60 text-zinc-400 hover:border-zinc-500 hover:text-white',
        )}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 md:h-5 md:w-5" />
        ) : (
          <Play
            className={cn(
              'ml-1 h-4 w-4 md:h-5 md:w-5',
              pulseHint ? 'text-white' : '',
            )}
          />
        )}

        <AnimatePresence>
          {isPlaying && !shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 rounded-full border border-neon-cyan"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <div
        className={cn(
          'hidden items-center gap-2 rounded-none border border-zinc-800/50 bg-black/60 px-4 py-2 backdrop-blur-md transition-all duration-500 md:flex',
          isPlaying
            ? 'translate-x-0 opacity-100'
            : 'pointer-events-none -translate-x-4 opacity-0',
        )}
      >
        <Music className="h-4 w-4 text-neon-cyan/70" />
        <div className="flex h-4 items-end gap-[2px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 rounded-t-sm bg-neon-cyan"
              style={{
                height: isPlaying ? undefined : '20%',
                animation:
                  isPlaying && !shouldReduceMotion
                    ? `equalizer ${1 + i * 0.2}s ease-in-out infinite`
                    : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
