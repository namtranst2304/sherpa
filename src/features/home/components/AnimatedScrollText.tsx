"use client"

export function AnimatedScrollText() {
  return (
    <span className="relative inline-block text-lg md:text-2xl font-mono tracking-[0.4em] uppercase font-bold text-zinc-500 transition-colors group-hover:text-neon-cyan group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse">
      BEGIN DISCOVERY
      <span className="absolute -bottom-1 left-0 w-full h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
    </span>
  )
}
