import { Map } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { ActivityEncounterPhase } from "@/types"
import { CyberCard, CyberBadge } from "@/components/common/CyberComponents"
import { ImageCarousel } from "@/components/common/ImageCarousel"
import { markdownComponents } from "./EncounterMarkdown"

interface EncounterPhaseProps {
  walkthrough: Record<string, ActivityEncounterPhase>
}

export function EncounterPhase({ walkthrough }: EncounterPhaseProps) {
  const walkthroughEntries = Object.entries(walkthrough || {})
  const hasMultiplePhases = walkthroughEntries.length > 1

  return (
    <div className="space-y-6">
      {walkthroughEntries.map(([phaseKey, phaseVal], index) => {
        let phaseTitle = phaseVal.name || phaseKey.toUpperCase()
        // Always remove redundant "Phase X:" prefix since we have the numbered badge
        phaseTitle = phaseTitle.replace(/^(Giai đoạn \d+:\s*|Phase \d+:\s*)/i, '')
        
        const phaseObjective = phaseVal.objective
        const steps = phaseVal.steps || phaseVal.details || []

        return (
          <CyberCard key={phaseKey} variant="zinc" withCorners className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-neon-cyan mb-3 flex items-start gap-3 text-glow-cyan">
              {hasMultiplePhases && (
                <CyberBadge variant="cyan" className="shrink-0 mt-1">
                  {index + 1}
                </CyberBadge>
              )}
              <span className="break-words min-w-0 flex-1 leading-tight">
                {phaseTitle}
              </span>
            </h3>
            {phaseObjective && (
              <p className="text-muted-foreground italic mb-4 border-l-2 border-neon-cyan pl-4 py-1 text-sm bg-neon-cyan/5 rounded-r-lg">
                Mục tiêu: {phaseObjective}
              </p>
            )}
            {phaseVal.images && phaseVal.images.length > 0 && (
              <ImageCarousel images={phaseVal.images} />
            )}
            <ul className="space-y-3">
              {steps.map((step: string, i: number) => (
                <li key={i} className="text-sm text-foreground/80 leading-relaxed flex items-start gap-1.5">
                  <span className="text-neon-cyan font-bold shrink-0 min-w-[20px]">{i + 1}.</span>
                  <div className="flex-1">
                    <ReactMarkdown components={markdownComponents}>{step}</ReactMarkdown>
                  </div>
                </li>
              ))}
            </ul>
            {phaseVal.mine_locations && (
              <div className="mt-5 p-4 bg-neon-yellow/10 border border-neon-yellow/20 rounded-lg">
                <h4 className="font-semibold text-neon-yellow mb-3 flex items-center gap-2">
                  <Map className="w-4 h-4" /> Vị trí phân bổ Mìn:
                </h4>
                <ul className="space-y-2">
                  {phaseVal.mine_locations.map((loc: string, i: number) => (
                    <li key={i} className="text-sm text-neon-yellow/90 ml-6 list-disc">
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CyberCard>
        )
      })}
    </div>
  )
}
