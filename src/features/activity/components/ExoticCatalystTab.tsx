import * as React from "react"
import { ActivityData } from "@/types"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export function ExoticCatalystTab({ catalystGuide }: { catalystGuide: ActivityData["catalyst_guide"] }) {
  if (!catalystGuide) return null;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl">
      <div className="flex items-center gap-3 border-b border-neon-yellow/30 pb-4">
        <Sparkles className="w-8 h-8 text-neon-yellow" />
        <div>
          <h2 className="text-3xl font-black tracking-widest uppercase text-neon-yellow text-glow-yellow">
            {catalystGuide.title || "Cách Lấy Catalyst"}
          </h2>
          {catalystGuide.description && (
            <p className="mt-2 text-zinc-400 font-mono text-sm">{catalystGuide.description}</p>
          )}
        </div>
      </div>

      {catalystGuide.steps && catalystGuide.steps.length > 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-xl font-bold uppercase tracking-wider text-zinc-200">Hướng dẫn chi tiết</h3>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 flex flex-col gap-4">
            {catalystGuide.steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 rounded bg-neon-yellow/10 border border-neon-yellow/30 flex items-center justify-center text-neon-yellow text-xs font-bold font-mono mt-0.5">
                  {i + 1}
                </div>
                <p className="text-zinc-300 font-mono text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {catalystGuide.images && catalystGuide.images.length > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-xl font-bold uppercase tracking-wider text-zinc-200">Hình ảnh minh họa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {catalystGuide.images.map((img, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="relative w-full aspect-video rounded-lg border-2 border-zinc-800 overflow-hidden bg-black/50 hover:border-neon-yellow/50 transition-colors">
                  <Image src={img.url} alt={img.caption || "Catalyst Image"} fill className="object-cover" unoptimized />
                </div>
                {img.caption && (
                  <span className="text-sm font-mono text-neon-yellow/70 text-center">{img.caption}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
