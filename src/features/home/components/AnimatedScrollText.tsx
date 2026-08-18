'use client'

export function AnimatedScrollText() {
  return (
    <span className="relative inline-block animate-pulse font-mono text-lg font-bold tracking-[0.4em] text-zinc-500 uppercase transition-colors group-hover:text-neon-cyan group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] md:text-2xl">
      BEGIN DISCOVERY
      <span className="absolute -bottom-1 left-0 h-px w-full origin-center scale-x-0 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
    </span>
  )
}
