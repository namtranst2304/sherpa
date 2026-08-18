import { Trophy } from 'lucide-react'
import {
  CyberCard,
  CyberSectionHeader,
} from '@/components/common/CyberComponents'
import { ActivityData } from '@/types'

interface OverviewEpicModeProps {
  epic_mode: ActivityData['epic_mode']
}

function EpicList({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null

  return (
    <div>
      <h3 className="mb-3 border-b border-border/50 pb-2 text-sm font-bold tracking-wider text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/80">
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
        <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-5">
          <Trophy className="h-32 w-32 text-neon-red" />
        </div>
        <CyberSectionHeader
          icon={Trophy}
          title="The Epic Raid (Mastery)"
          variant="red"
        />
        <div className="relative z-10 space-y-6">
          <EpicList
            title="🛡️ Requirements & Contest Mode"
            items={epic_mode.requirements_and_contest}
          />
          <EpicList
            title="🏆 Emblems & Titles"
            items={epic_mode.emblems_and_titles}
          />

          {epic_mode.encounter_changes && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 border-b border-border/50 pb-2 text-sm font-bold tracking-wider text-red-500 uppercase">
                ⚠️ Encounter Changes
              </h3>
              <div className="space-y-3">
                {epic_mode.encounter_changes.map((enc, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border/50 bg-secondary/20 p-3"
                  >
                    <strong className="mb-1 block text-primary">
                      {enc.name}
                    </strong>
                    <span className="text-sm text-muted-foreground">
                      {enc.changes}
                    </span>
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
