import { Trophy } from "lucide-react"
import { CyberCard, CyberSectionHeader } from "@/components/common/CyberComponents"
import { ActivityData } from "@/types"

interface OverviewEpicModeProps {
  epic_mode: ActivityData["epic_mode"]
}

function EpicList({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 border-b border-border/50 pb-2">{title}</h3>
      <ul className="space-y-2 text-sm text-foreground/80 list-disc pl-5">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function OverviewEpicMode({ epic_mode }: OverviewEpicModeProps) {
  if (!epic_mode) return null

  return (
    <div className="space-y-8">
      <CyberCard variant="red" withCorners className="h-full">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Trophy className="w-32 h-32 text-neon-red" />
        </div>
        <CyberSectionHeader icon={Trophy} title="The Epic Raid (Mastery)" variant="red" />
        <div className="space-y-6 relative z-10">
          <EpicList title="🛡️ Requirements & Contest Mode" items={epic_mode.requirements_and_contest} />
          <EpicList title="🏆 Emblems & Titles" items={epic_mode.emblems_and_titles} />

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
