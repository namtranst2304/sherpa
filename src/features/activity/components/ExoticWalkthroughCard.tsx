import * as React from "react"
import { ActivityEncounterPhase } from "@/types"
import Image from "next/image"

interface ExoticWalkthroughCardProps {
  title: string
  phase: ActivityEncounterPhase
  index: number
}

export function ExoticWalkthroughCard({ title, phase, index }: ExoticWalkthroughCardProps) {
  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden flex flex-col mb-8 relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-neon-cyan/50" />
      
      <div className="p-4 md:p-6 border-b border-zinc-800/50 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan font-black font-mono">
            {index}
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest text-zinc-100">{title}</h3>
        </div>
        {phase.objective && (
          <p className="mt-2 text-neon-cyan/80 font-mono text-sm uppercase tracking-wider">{phase.objective}</p>
        )}
      </div>

      <div className="p-4 md:p-6 flex flex-col gap-6">
        {phase.steps && phase.steps.length > 0 && (
          <div className="flex flex-col gap-3">
            {phase.steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-neon-cyan/50 mt-1">▸</span>
                <p className="text-zinc-300 leading-relaxed font-mono text-sm">{step}</p>
              </div>
            ))}
          </div>
        )}

        {phase.images && phase.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {phase.images.map((img, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="relative w-full aspect-video rounded border border-zinc-700/50 overflow-hidden bg-black/50">
                  <Image src={img.url} alt={img.caption || `Image ${i + 1}`} fill className="object-contain" unoptimized />
                </div>
                {img.caption && (
                  <span className="text-xs font-mono text-zinc-500 text-center">{img.caption}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
