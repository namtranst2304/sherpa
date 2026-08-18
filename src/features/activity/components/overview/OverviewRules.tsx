import { BookOpen, Map } from 'lucide-react'
import {
  CyberCard,
  CyberBadge,
  CyberSectionHeader,
} from '@/components/common/CyberComponents'
import { ActivityData } from '@/types'

interface OverviewRulesProps {
  preface: ActivityData['preface']
}

export function OverviewRules({ preface }: OverviewRulesProps) {
  if (!preface) return null

  return (
    <div className="space-y-8">
      <CyberCard variant="zinc" withCorners className="relative cyber-grid">
        <CyberSectionHeader icon={BookOpen} title="General Rules" />
        <div className="relative z-10 space-y-4 leading-relaxed text-muted-foreground">
          {preface.formatting_rules && (
            <div>
              <h3 className="mb-2 font-bold text-foreground">
                Formatting & Callouts
              </h3>
              <p className="text-sm">{preface.formatting_rules}</p>
            </div>
          )}
          {preface.non_linear_mechanic && (
            <div className="mt-4 rounded-lg border border-border/50 bg-secondary/20 p-4">
              <h3 className="mb-2 flex items-center gap-2 font-bold text-primary">
                <Map className="h-4 w-4" /> Non-Linear Progression
              </h3>
              <p className="mb-4 text-sm">
                {preface.non_linear_mechanic.description}
              </p>
              {preface.non_linear_mechanic.elevator_plates && (
                <ul className="space-y-2">
                  {preface.non_linear_mechanic.elevator_plates.map(
                    (plate, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CyberBadge variant="cyan" withIndicator={false}>
                          {plate.plate_text}
                        </CyberBadge>
                        <span>→ {plate.target_encounter}</span>
                      </li>
                    ),
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
      </CyberCard>
    </div>
  )
}
