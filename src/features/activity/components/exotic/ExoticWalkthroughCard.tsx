import Image from 'next/image'
import { ActivityEncounterPhase } from '@/types'
import { bungieUrl } from '@/lib/bungie'
import { CyberCard, CyberHeading } from '@/components/common/CyberComponents'

interface ExoticWalkthroughCardProps {
  title: string
  phase: ActivityEncounterPhase
  index: number
}

export function ExoticWalkthroughCard({
  title,
  phase,
  index,
}: ExoticWalkthroughCardProps) {
  return (
    <CyberCard variant="zinc" padding="none" className="mb-8 flex flex-col overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-1 bg-neon-cyan/50" />

      <div className="border-b border-zinc-800/50 bg-black/40 p-4 md:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neon-cyan/30 bg-neon-cyan/10 font-mono font-black text-neon-cyan">
            {index}
          </div>
          <CyberHeading size="sm" className="text-zinc-100">
            {title}
          </CyberHeading>
        </div>
        {phase.objective && (
          <p className="mt-2 font-mono text-sm tracking-wider text-neon-cyan/80 uppercase">
            {phase.objective}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-6 p-4 md:p-6">
        {phase.steps && phase.steps.length > 0 && (
          <div className="flex flex-col gap-3">
            {phase.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 text-neon-cyan/50">▸</span>
                <p className="font-mono text-sm leading-relaxed text-zinc-300">
                  {step}
                </p>
              </div>
            ))}
          </div>
        )}

        {phase.images && phase.images.length > 0 && (
          <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            {phase.images.map((img, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="relative aspect-video w-full overflow-hidden rounded border border-zinc-700/50 bg-black/50">
                  <Image
                    src={bungieUrl(img.url)}
                    alt={img.caption || `Image ${i + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>
                {img.caption && (
                  <span className="text-center font-mono text-xs text-zinc-500">
                    {img.caption}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </CyberCard>
  )
}
