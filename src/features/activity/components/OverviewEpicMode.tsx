import { Trophy } from "lucide-react"
import { CyberCard } from "@/components/ui/CyberComponents"
import { ActivityData } from "@/types"

interface OverviewEpicModeProps {
  epic_mode: ActivityData['epic_mode']
}

export function OverviewEpicMode({ epic_mode }: OverviewEpicModeProps) {
  if (!epic_mode) return null;

  return (
    <div className="space-y-8">
      <CyberCard variant="red" withCorners className="h-full">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Trophy className="w-32 h-32 text-neon-red" />
        </div>
        <div className="border-b border-neon-red/30 pb-4 mb-4 flex items-center gap-3 relative z-10">
          <div className="p-2 bg-neon-red/20 rounded-md">
            <Trophy className="w-5 h-5 text-neon-red" />
          </div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-neon-red text-glow-red">The Epic Raid (Mastery)</h2>
        </div>
        <div className="space-y-6 relative z-10">
          {epic_mode.requirements_and_contest && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">🛡️ Requirements & Contest Mode</h3>
              <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
                {epic_mode.requirements_and_contest.map((req, i) => <li key={i}>{req}</li>)}
              </ul>
            </div>
          )}
          {epic_mode.emblems_and_titles && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">🏆 Emblems & Titles</h3>
              <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
                {epic_mode.emblems_and_titles.map((emb, i) => <li key={i}>{emb}</li>)}
              </ul>
            </div>
          )}
          {epic_mode.encounter_changes && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-500 mb-3 border-b border-border/50 pb-2 flex items-center gap-2">⚠️ Encounter Changes</h3>
              <div className="space-y-3">
                {epic_mode.encounter_changes.map((enc, i) => (
                  <div key={i} className="p-3 bg-secondary/20 border border-border/50 rounded-lg">
                    <strong className="text-primary block mb-1">{enc.name}</strong>
                    <span className="text-sm text-muted-foreground">{enc.changes}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CyberCard>
    </div>
  )
}
