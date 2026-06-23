import { Shield, Crosshair } from "lucide-react"
import { CyberCard } from "@/components/ui/CyberComponents"
import { ActivityData } from "@/types"

interface OverviewLoadoutsProps {
  loadout_tips: ActivityData['loadout_tips']
}

export function OverviewLoadouts({ loadout_tips }: OverviewLoadoutsProps) {
  if (!loadout_tips) return null;

  return (
    <div className="space-y-8">
      <CyberCard variant="zinc" withCorners className="h-full">
        <div className="border-b border-zinc-800 pb-4 mb-4 flex items-center gap-3">
          <div className="p-2 bg-neon-cyan/10 rounded-md">
            <Shield className="w-5 h-5 text-neon-cyan" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-foreground">Recommended Loadouts</h2>
        </div>
        <div className="space-y-6 relative z-10">
          {loadout_tips.note && (
            <p className="text-sm italic text-muted-foreground bg-secondary/10 p-3 rounded border-l-2 border-primary">
              {loadout_tips.note}
            </p>
          )}
          {loadout_tips.weapons && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Crosshair className="w-4 h-4" /> Recommended Weapons
              </h3>
              <div className="flex flex-col gap-2">
                {loadout_tips.weapons.map((w: { name: string; description: string }) => (
                  <div key={w.name} className="flex flex-col bg-secondary/10 p-3 rounded-md border border-border/50">
                    <span className="font-bold text-foreground text-sm">{w.name}</span>
                    <span className="text-xs text-muted-foreground mt-1">{w.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {['warlocks', 'titans', 'hunters'].map((cls) => {
            const data = loadout_tips?.[cls as keyof typeof loadout_tips] as { supers?: { name: string; utility: string }[]; exotics_and_abilities?: { name: string; recommendation: string }[] } | undefined;
            if (!data) return null;
            
            return (
              <div key={cls}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> {cls.charAt(0).toUpperCase() + cls.slice(1)}
                </h3>
                <div className="space-y-3 pl-2 border-l border-border/50">
                  {(data.supers?.length ?? 0) > 0 && (
                    <div>
                      <strong className="text-xs text-muted-foreground uppercase">Supers:</strong>
                      <div className="flex flex-col gap-2 mt-2">
                        {data.supers!.map((s: { name: string; utility: string }) => (
                          <div key={s.name} className="flex flex-col bg-secondary/10 p-3 rounded-md border border-border/50">
                            <span className="font-bold text-primary text-sm">{s.name}</span>
                            <span className="text-xs text-muted-foreground mt-1">{s.utility}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {(data.exotics_and_abilities?.length ?? 0) > 0 && (
                    <div className="mt-4">
                      <strong className="text-xs text-muted-foreground uppercase">Exotics & Abilities:</strong>
                      <div className="flex flex-col gap-2 mt-2">
                        {data.exotics_and_abilities!.map((e: { name: string; recommendation: string }) => (
                          <div key={e.name} className="flex flex-col bg-amber-500/5 p-3 rounded-md border border-amber-500/20">
                            <span className="font-bold text-amber-500 text-sm">{e.name}</span>
                            <span className="text-xs text-muted-foreground mt-1">{e.recommendation}</span>
                          </div>
                        ))}
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
