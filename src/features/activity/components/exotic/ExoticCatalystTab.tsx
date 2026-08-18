import * as React from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { ActivityData } from '@/types'
import { bungieUrl } from '@/lib/bungie'

export function ExoticCatalystTab({
  catalystGuide,
}: {
  catalystGuide: ActivityData['catalyst_guide']
}) {
  if (!catalystGuide) return null

  return (
    <div className="flex max-w-4xl flex-col gap-6 p-6">
      <div className="flex items-center gap-3 border-b border-neon-yellow/30 pb-4">
        <Sparkles className="h-8 w-8 text-neon-yellow" />
        <div>
          <h2 className="text-3xl font-black tracking-widest text-neon-yellow uppercase glow-text-yellow">
            {catalystGuide.title || 'Cách Lấy Catalyst'}
          </h2>
          {catalystGuide.description && (
            <p className="mt-2 font-mono text-sm text-zinc-400">
              {catalystGuide.description}
            </p>
          )}
        </div>
      </div>

      {catalystGuide.steps && catalystGuide.steps.length > 0 && (
        <div className="mt-4 flex flex-col gap-4">
          <h3 className="text-xl font-bold tracking-wider text-zinc-200 uppercase">
            Hướng dẫn chi tiết
          </h3>
          <div className="flex flex-col gap-4 rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            {catalystGuide.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-neon-yellow/30 bg-neon-yellow/10 font-mono text-xs font-bold text-neon-yellow">
                  {i + 1}
                </div>
                <p className="font-mono text-sm leading-relaxed text-zinc-300">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {catalystGuide.images && catalystGuide.images.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          <h3 className="text-xl font-bold tracking-wider text-zinc-200 uppercase">
            Hình ảnh minh họa
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {catalystGuide.images.map((img, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-zinc-800 bg-black/50 transition-colors hover:border-neon-yellow/50">
                  <Image
                    src={bungieUrl(img.url)}
                    alt={img.caption || 'Catalyst Image'}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                {img.caption && (
                  <span className="text-center font-mono text-sm text-neon-yellow/70">
                    {img.caption}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
