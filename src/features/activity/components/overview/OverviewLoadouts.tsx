import { Shield, Crosshair } from 'lucide-react'
import {
  CyberCard,
  CyberSectionHeader,
} from '@/components/common/CyberComponents'
import { ActivityData } from '@/types'
import { cn } from '@/lib/utils'

interface OverviewLoadoutsProps {
  loadout_tips: ActivityData['loadout_tips']
}

type ClassLoadout = {
  supers?: { name: string; utility: string }[]
  exotics_and_abilities?: { name: string; recommendation: string }[]
}

const CLASS_KEYS = ['warlocks', 'titans', 'hunters'] as const

const CLASS_STYLES = {
  titans: {
    text: 'text-neon-red',
    border: 'border-neon-red/30',
    dropShadow: 'drop-shadow-[0_0_5px_currentColor]',
    cardBorder: 'border-neon-red/20',
    cardBg: 'bg-neon-red/5',
  },
  hunters: {
    text: 'text-neon-cyan',
    border: 'border-neon-cyan/30',
    dropShadow: 'drop-shadow-[0_0_5px_currentColor]',
    cardBorder: 'border-neon-cyan/20',
    cardBg: 'bg-neon-cyan/5',
  },
  warlocks: {
    text: 'text-neon-yellow',
    border: 'border-neon-yellow/30',
    dropShadow: 'drop-shadow-[0_0_5px_currentColor]',
    cardBorder: 'border-neon-yellow/20',
    cardBg: 'bg-neon-yellow/5',
  },
} as const

function LoadoutItemCard({
  title,
  description,
  borderClass = 'border-zinc-800',
  bgClass = 'bg-zinc-900/50',
  titleClass = 'text-white',
  hoverClass = 'hover:border-zinc-700',
}: {
  title: string
  description: string
  borderClass?: string
  bgClass?: string
  titleClass?: string
  hoverClass?: string
}) {
  return (
    <div
      className={cn(
        'group flex flex-col rounded-md border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg',
        borderClass,
        bgClass,
        hoverClass
      )}
    >
      <span className={`text-sm font-bold ${titleClass}`}>{title}</span>
      <span className="mt-1 text-xs text-zinc-400">{description}</span>
    </div>
  )
}

export function OverviewLoadouts({ loadout_tips }: OverviewLoadoutsProps) {
  if (!loadout_tips) return null

  return (
    <div className="space-y-8">
      <CyberCard variant="zinc" withCorners className="h-full">
        <CyberSectionHeader icon={Shield} title="Loadout đề xuất" />
        <div className="relative z-10 space-y-6">
          {loadout_tips.note && (
            <p className="rounded border-l-2 border-neon-cyan bg-neon-cyan/10 p-3 text-sm text-zinc-300 italic">
              {loadout_tips.note}
            </p>
          )}
          
          {loadout_tips.weapons && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-zinc-400 uppercase">
                <Crosshair className="h-4 w-4" /> Vũ khí đề xuất
              </h3>
              <div className="flex flex-col gap-2">
                {loadout_tips.weapons.map(
                  (w: { name: string; description: string }) => (
                    <LoadoutItemCard
                      key={w.name}
                      title={w.name}
                      description={w.description}
                    />
                  ),
                )}
              </div>
            </div>
          )}

          {CLASS_KEYS.map((cls) => {
            const data = loadout_tips[cls] as ClassLoadout | undefined
            if (!data) return null

            const style = CLASS_STYLES[cls]

            return (
              <div key={cls}>
                <h3 className={`mb-3 flex items-center gap-2 text-sm font-bold tracking-wider uppercase ${style.text} ${style.dropShadow}`}>
                  <Shield className="h-4 w-4" />{' '}
                  {cls.charAt(0).toUpperCase() + cls.slice(1)}
                </h3>
                <div className={`space-y-3 border-l-2 ${style.border} pl-3`}>
                  
                  {(data.supers?.length ?? 0) > 0 && (
                    <div>
                      <strong className="text-xs text-zinc-500 uppercase">
                        Supers:
                      </strong>
                      <div className="mt-2 flex flex-col gap-2">
                        {(data.supers ?? []).map(
                          (s: { name: string; utility: string }) => (
                            <LoadoutItemCard
                              key={s.name}
                              title={s.name}
                              description={s.utility}
                              borderClass={style.cardBorder}
                              bgClass={style.cardBg}
                              titleClass={style.text}
                              hoverClass=""
                            />
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {(data.exotics_and_abilities?.length ?? 0) > 0 && (
                    <div className="mt-4">
                      <strong className="text-xs text-zinc-500 uppercase">
                        Exotics & Abilities:
                      </strong>
                      <div className="mt-2 flex flex-col gap-2">
                        {(data.exotics_and_abilities ?? []).map(
                          (e: { name: string; recommendation: string }) => (
                            <LoadoutItemCard
                              key={e.name}
                              title={e.name}
                              description={e.recommendation}
                              borderClass="border-amber-500/30"
                              bgClass="bg-amber-500/10"
                              titleClass="text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]"
                              hoverClass=""
                            />
                          ),
                        )}
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>
            )
          })}
        </div>
      </CyberCard>
    </div>
  )
}
