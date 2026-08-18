import React from 'react'
import Link from 'next/link'
import { Terminal, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black cyber-grid p-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[40vw] max-h-[500px] w-[40vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-red/10 blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center space-y-6 text-center">
        {/* Animated Warning Icon */}
        <div className="group relative">
          <AlertTriangle
            className="h-24 w-24 animate-pulse text-neon-red drop-shadow-[0_0_15px_rgba(255,0,0,0.5)] md:h-32 md:w-32"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 flex items-center justify-center pt-2">
            <span className="animate-pulse text-2xl font-black text-neon-red md:text-3xl">
              !
            </span>
          </div>
        </div>

        {/* Glitchy 404 Text */}
        <div className="relative">
          <h1 className="bg-gradient-to-b from-white via-neon-red to-black bg-clip-text text-7xl leading-none font-black tracking-tighter text-transparent select-none glow-text-red md:text-[10rem]">
            404
          </h1>
          <div className="absolute inset-0 -translate-x-1 translate-y-1 text-7xl leading-none font-black text-neon-red opacity-30 blur-[2px] md:text-[10rem]">
            404
          </div>
          <div className="absolute inset-0 translate-x-1 -translate-y-1 text-7xl leading-none font-black text-neon-cyan opacity-30 blur-[2px] md:text-[10rem]">
            404
          </div>
        </div>

        {/* System Error Console */}
        <div className="flex w-full max-w-sm flex-col items-center justify-center gap-2 border border-neon-red/50 bg-neon-red/10 px-4 py-3 text-center font-mono text-neon-red shadow-neon-red sm:max-w-max sm:flex-row sm:gap-3 sm:px-6 sm:text-left">
          <Terminal className="hidden h-5 w-5 sm:block" />
          <span className="text-[10px] font-bold tracking-widest uppercase sm:text-xs sm:tracking-[0.2em] md:text-sm">
            System Error: Sector Not Found
          </span>
        </div>

        {/* Lore Description */}
        <p className="mt-4 max-w-lg border-l-2 border-zinc-800 bg-black/50 p-4 font-mono text-xs leading-relaxed tracking-wider text-zinc-400 md:text-sm">
          <span className="text-neon-yellow">{'// WARNING:'}</span> The
          requested coordinate does not exist in the current timeline. Ghost is
          unable to establish a connection to this zone. Recommend immediate
          extraction.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="group relative mt-6 flex items-center gap-2 overflow-hidden border border-neon-cyan px-6 py-3 text-[10px] font-bold tracking-widest text-neon-cyan uppercase shadow-neon-cyan transition-all duration-300 hover:border-white hover:bg-neon-cyan/10 hover:text-white hover:shadow-neon-cyan-hover sm:gap-3 sm:text-xs md:mt-8 md:px-10 md:py-4 md:text-sm md:tracking-[0.3em]"
        >
          {/* Scanline effect on hover */}
          <div className="absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-neon-cyan/20 to-transparent group-hover:animate-[cyber-fade_1s_ease-in-out_infinite]" />

          <div className="h-2 w-2 rounded-full bg-neon-cyan transition-colors group-hover:bg-white" />
          <span className="relative z-10 pt-[2px]">RETURN TO ORBIT</span>
        </Link>
      </div>
    </div>
  )
}
