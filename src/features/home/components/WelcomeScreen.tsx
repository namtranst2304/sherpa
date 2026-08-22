'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DoorOverlay } from '@/components/common/DoorOverlay'
import { playGlobalBgAudio } from '@/lib/audio'
import { CyberButton } from '@/components/common/CyberComponents'

const WELCOME_EVENT = 'sherpa-welcomed'

function subscribeWelcomed(onStoreChange: () => void) {
  window.addEventListener(WELCOME_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(WELCOME_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function getWelcomedSnapshot() {
  return sessionStorage.getItem('sherpa_welcomed') === 'true'
}

/** Client-only component: hide until hydrated snapshot is read. */
function getWelcomedServerSnapshot() {
  return true
}

export function WelcomeScreen() {
  const hasWelcomed = useSyncExternalStore(
    subscribeWelcomed,
    getWelcomedSnapshot,
    getWelcomedServerSnapshot,
  )
  const [isOpened, setIsOpened] = useState(false)
  const [exited, setExited] = useState(false)
  const isVisible = !hasWelcomed && !exited

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = 'auto'
      return
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  if (!isVisible) return null

  const handleEnter = () => {
    sessionStorage.setItem('sherpa_welcomed', 'true')
    window.dispatchEvent(new Event(WELCOME_EVENT))
    playGlobalBgAudio()
    setIsOpened(true)
    setTimeout(() => setExited(true), 1000)
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
      <DoorOverlay isOpened={isOpened} duration={1.0} />

      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="pointer-events-auto relative z-10 flex flex-col items-center gap-10"
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-4 flex items-center justify-center">
                <div className="relative h-16 w-16 rounded-full bg-zinc-200 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.2)]">
                  <div className="absolute right-2 bottom-1 h-4 w-4 rounded-full bg-zinc-400/30 blur-[2px]" />
                </div>
              </div>
              <h1 className="text-2xl font-light tracking-[0.3em] text-zinc-200 md:text-4xl">
                DESTINY SHERPA
              </h1>
              <p className="font-mono text-xs tracking-[0.5em] text-zinc-600 uppercase">
                Ghost is standing by
              </p>
            </div>

            <CyberButton
              variant="cyan"
              size="lg"
              onClick={handleEnter}
              className="group relative mt-8 overflow-hidden transition-all duration-500 hover:scale-105"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 transition-colors duration-300 group-hover:bg-green-400 group-hover:duration-75" />
              <span className="relative z-10 pt-[2px]">RETURN TO ORBIT</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_1s_infinite]" />
            </CyberButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
