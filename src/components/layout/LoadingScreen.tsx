'use client'

import { useEffect } from 'react'
import Image from 'next/image'

/** CSS-only loading chrome — keeps route transitions free of motion.js. */
export function LoadingScreen() {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex animate-in flex-col items-center justify-center overflow-hidden bg-black duration-300 fade-in">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/destiny-loading-bg.jpg"
          alt="Loading Background"
          fill
          className="scale-105 object-cover opacity-50 mix-blend-screen"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border border-dashed border-neon-cyan/40" />
          <div
            className="absolute inset-2 animate-[spin_12s_linear_infinite] rounded-full border-t-2 border-l-2 border-white/50"
            style={{ animationDirection: 'reverse' }}
          />
          <div className="h-12 w-12 animate-pulse rounded-full bg-white/20 blur-md" />
          <div className="absolute h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_15px_rgba(34,211,238,1)]" />
        </div>

        <div className="mt-12 flex flex-col items-center gap-3">
          <h2 className="text-center text-xl font-black tracking-[0.4em] text-white uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] md:text-2xl">
            Destiny Universe
          </h2>
          <div className="flex items-center gap-2 text-center font-mono text-xs tracking-[0.2em] text-neon-cyan uppercase drop-shadow-md">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-sm bg-neon-cyan" />
            Connecting to Vanguard Network...
          </div>
          <span className="mt-2 rounded border border-zinc-800/80 bg-black/60 px-4 py-1.5 font-mono text-[10px] tracking-widest text-zinc-400 uppercase backdrop-blur-md">
            Decrypting Historical Archives
          </span>
        </div>
      </div>
    </div>
  )
}
