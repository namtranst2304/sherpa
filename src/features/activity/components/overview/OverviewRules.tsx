import { BookOpen, Map } from "lucide-react"
import { CyberCard, CyberBadge, CyberSectionHeader } from "@/components/common/CyberComponents"
import { ActivityData } from "@/types"

interface OverviewRulesProps {
  preface: ActivityData['preface']
}

export function OverviewRules({ preface }: OverviewRulesProps) {
  if (!preface) return null


  return (
    <div className="space-y-8">
      <CyberCard variant="zinc" withCorners className="cyber-grid relative">
        <CyberSectionHeader icon={BookOpen} title="General Rules" />
        <div className="text-muted-foreground leading-relaxed space-y-4 relative z-10">
          {preface.formatting_rules && (
            <div>
              <h3 className="font-bold text-foreground mb-2">Formatting & Callouts</h3>
              <p className="text-sm">{preface.formatting_rules}</p>
            </div>
          )}
          {preface.non_linear_mechanic && (
            <div className="mt-4 p-4 bg-secondary/20 rounded-lg border border-border/50">
              <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                <Map className="w-4 h-4" /> Non-Linear Progression
              </h3>
              <p className="text-sm mb-4">{preface.non_linear_mechanic.description}</p>
              {preface.non_linear_mechanic.elevator_plates && (
                <ul className="space-y-2">
                  {preface.non_linear_mechanic.elevator_plates.map((plate, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <CyberBadge variant="cyan" withIndicator={false}>
                        {plate.plate_text}
                      </CyberBadge>
                      <span>→ {plate.target_encounter}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </CyberCard>
    </div>
  )
}
