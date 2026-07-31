"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown } from "lucide-react"
import { AnimatedScrollText } from "@/features/timeline/components/AnimatedScrollText"
import { DoorOverlay } from "@/components/common/DoorOverlay"
import { playGlobalBgAudio } from "@/lib/audio"

export function LandingPage() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnter = () => {
    setIsTransitioning(true)
    playGlobalBgAudio()
    setTimeout(() => {
      router.push("/timeline")
    }, 700)
  }

  return (
    <div className="relative h-[100dvh] min-h-[500px] flex flex-col items-center justify-between px-4 overflow-hidden w-full bg-black">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-start justify-center">
        <Image
          src="/images/timeline/heroBG.webp"
          alt="Destiny Universe Background"
          className="w-full h-auto opacity-40 mix-blend-luminosity"
          width={1920}
          height={1080}
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="flex-1 w-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center flex flex-col items-center shrink-0 my-8"
      >
        <div
          aria-hidden
          className="absolute -top-12 md:-top-20 left-1/2 -translate-x-1/2 text-[5rem] sm:text-[8rem] md:text-[12rem] 2xl:text-[16rem] font-black text-neon-cyan/15 leading-none pointer-events-none select-none whitespace-nowrap"
        >
          DESTINY
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-500 mb-4 relative text-center">
          Destiny Universe
        </h1>
      </motion.div>

      <div className="flex-1 w-full flex items-end justify-center pb-32 md:pb-16 z-20">
        <div className="flex flex-col items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={handleEnter}
            className="flex flex-col items-center gap-4 cursor-pointer group bg-transparent border-0 p-0"
          >
            <AnimatedScrollText />
            <ChevronDown className="w-6 h-6 text-neon-cyan animate-bounce drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </button>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
            <Link href="/raids/salvations-edge" className="hover:text-neon-cyan transition-colors">
              Raids
            </Link>
            <span className="text-zinc-700">/</span>
            <Link href="/dungeons/vespers-host" className="hover:text-neon-green transition-colors">
              Dungeons
            </Link>
            <span className="text-zinc-700">/</span>
            <Link href="/database/exotic-weapons" className="hover:text-zinc-200 transition-colors">
              Database
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            <DoorOverlay isOpened={false} initialOpened={true} duration={0.55} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
