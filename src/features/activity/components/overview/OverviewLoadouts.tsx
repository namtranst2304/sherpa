import { Shield, Crosshair } from 'lucide-react'
import {
  CyberCard,
  CyberSectionHeader,
} from '@/components/common/CyberComponents'
import { ActivityData } from '@/types'

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
    cardBorder: 'border-neon-red/20',
    cardBg: 'bg-neon-red/5',
    dropShadow: 'drop-shadow-[0_0_5px_currentColor]',
  },
  hunters: {
    text: 'text-neon-cyan',
    border: 'border-neon-cyan/30',
    cardBorder: 'border-neon-cyan/20',
    cardBg: 'bg-neon-cyan/5',
    dropShadow: 'drop-shadow-[0_0_5px_currentColor]',
  },
  warlocks: {
    text: 'text-neon-yellow',
    border: 'border-neon-yellow/30',
    cardBorder: 'border-neon-yellow/20',
    cardBg: 'bg-neon-yellow/5',
    dropShadow: 'drop-shadow-[0_0_5px_currentColor]',
  },
} as const

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
                    <div
                      key={w.name}
                      className="flex flex-col rounded-md border border-zinc-800 bg-zinc-900/50 p-3 transition-colors hover:border-zinc-700"
                    >
                      <span className="text-sm font-bold text-white">
                        {w.name}
                      </span>
                      <span className="mt-1 text-xs text-zinc-400">
                        {w.description}
                      </span>
                    </div>
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
                            <div
                              key={s.name}
                              className={`flex flex-col rounded-md border ${style.cardBorder} ${style.cardBg} p-3`}
                            >
                              <span className={`text-sm font-bold ${style.text}`}>
                                {s.name}
                              </span>
                              <span className="mt-1 text-xs text-zinc-400">
                                {s.utility}
                              </span>
                            </div>
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
                            <div
                              key={e.name}
                              className="flex flex-col rounded-md border border-amber-500/30 bg-amber-500/10 p-3"
                            >
                              <span className="text-sm font-bold text-amber-500 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
                                {e.name}
                              </span>
                              <span className="mt-1 text-xs text-zinc-400">
                                {e.recommendation}
                              </span>
                            </div>
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
