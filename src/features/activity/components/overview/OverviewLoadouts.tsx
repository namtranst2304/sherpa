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

export function OverviewLoadouts({ loadout_tips }: OverviewLoadoutsProps) {
  if (!loadout_tips) return null

  return (
    <div className="space-y-8">
      <CyberCard variant="zinc" withCorners className="h-full">
        <CyberSectionHeader icon={Shield} title="Loadout đề xuất" />
        <div className="relative z-10 space-y-6">
          {loadout_tips.note && (
            <p className="rounded border-l-2 border-primary bg-secondary/10 p-3 text-sm text-muted-foreground italic">
              {loadout_tips.note}
            </p>
          )}
          {loadout_tips.weapons && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-muted-foreground uppercase">
                <Crosshair className="h-4 w-4" /> Vũ khí đề xuất
              </h3>
              <div className="flex flex-col gap-2">
                {loadout_tips.weapons.map(
                  (w: { name: string; description: string }) => (
                    <div
                      key={w.name}
                      className="flex flex-col rounded-md border border-border/50 bg-secondary/10 p-3"
                    >
                      <span className="text-sm font-bold text-foreground">
                        {w.name}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
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

            return (
              <div key={cls}>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-primary uppercase">
                  <Shield className="h-4 w-4" />{' '}
                  {cls.charAt(0).toUpperCase() + cls.slice(1)}
                </h3>
                <div className="space-y-3 border-l border-border/50 pl-2">
                  {(data.supers?.length ?? 0) > 0 && (
                    <div>
                      <strong className="text-xs text-muted-foreground uppercase">
                        Supers:
                      </strong>
                      <div className="mt-2 flex flex-col gap-2">
                        {(data.supers ?? []).map(
                          (s: { name: string; utility: string }) => (
                            <div
                              key={s.name}
                              className="flex flex-col rounded-md border border-border/50 bg-secondary/10 p-3"
                            >
                              <span className="text-sm font-bold text-primary">
                                {s.name}
                              </span>
                              <span className="mt-1 text-xs text-muted-foreground">
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
                      <strong className="text-xs text-muted-foreground uppercase">
                        Exotics & Abilities:
                      </strong>
                      <div className="mt-2 flex flex-col gap-2">
                        {(data.exotics_and_abilities ?? []).map(
                          (e: { name: string; recommendation: string }) => (
                            <div
                              key={e.name}
                              className="flex flex-col rounded-md border border-amber-500/20 bg-amber-500/5 p-3"
                            >
                              <span className="text-sm font-bold text-amber-500">
                                {e.name}
                              </span>
                              <span className="mt-1 text-xs text-muted-foreground">
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
