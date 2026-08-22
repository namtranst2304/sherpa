'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { AnimatedScrollText } from './AnimatedScrollText'
import { MagneticButton } from '@/components/common/MagneticButton'
import { DoorOverlay } from '@/components/common/DoorOverlay'
import { playGlobalBgAudio } from '@/lib/audio'

export function LandingPage() {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnter = () => {
    setIsTransitioning(true)
    playGlobalBgAudio()
    setTimeout(() => {
      router.push('/timeline')
    }, 700)
  }

  return (
    <div className="relative flex h-[100dvh] min-h-[500px] w-full flex-col items-center justify-between overflow-hidden bg-black px-4">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-hidden">
        <Image
          src="/images/timeline/heroBG.webp"
          alt="Destiny Universe Background"
          className="h-auto w-full opacity-40 mix-blend-luminosity"
          width={1920}
          height={1080}
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-neon-cyan/5 blur-[120px]" />
      </div>

      <div className="pointer-events-none w-full flex-1" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 my-8 flex shrink-0 flex-col items-center text-center"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 text-[5rem] leading-none font-black whitespace-nowrap text-neon-cyan/15 select-none sm:text-[8rem] md:-top-20 md:text-[12rem] 2xl:text-[16rem]"
        >
          DESTINY
        </div>
        <h1 className="relative mb-4 bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-center text-4xl font-black tracking-tighter text-transparent uppercase sm:text-5xl md:text-7xl lg:text-8xl 2xl:text-[7rem]">
          Destiny Universe
        </h1>
      </motion.div>

      <div className="z-20 flex w-full flex-1 items-end justify-center pb-32 md:pb-16">
        <div className="flex shrink-0 flex-col items-center gap-4">
          <MagneticButton
            onClick={handleEnter}
            className="group flex cursor-pointer flex-col items-center gap-4 clip-angled border border-transparent px-8 py-4 transition-all hover:border-neon-cyan/20 hover:bg-neon-cyan/5 hover:shadow-[0_0_30px_rgba(0,243,255,0.15)]"
          >
            <AnimatedScrollText />
            <ChevronDown className="h-6 w-6 animate-bounce text-neon-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </MagneticButton>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase md:text-xs">
            <Link
              href="/raids/salvations-edge"
              className="rounded px-2 py-1 transition-all hover:bg-neon-cyan/10 hover:text-neon-cyan hover:shadow-[0_0_10px_rgba(0,243,255,0.2)]"
            >
              Raids
            </Link>
            <span className="text-zinc-700">/</span>
            <Link
              href="/dungeons/vespers-host"
              className="rounded px-2 py-1 transition-all hover:bg-neon-green/10 hover:text-neon-green hover:shadow-[0_0_10px_rgba(57,255,20,0.2)]"
            >
              Dungeons
            </Link>
            <span className="text-zinc-700">/</span>
            <Link
              href="/database/exotic-weapons"
              className="rounded px-2 py-1 transition-all hover:bg-zinc-800/80 hover:text-zinc-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
            >
              Database
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isTransitioning && (
          <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            <DoorOverlay
              isOpened={false}
              initialOpened={true}
              duration={0.55}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
