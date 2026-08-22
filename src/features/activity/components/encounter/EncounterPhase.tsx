import { Map } from 'lucide-react'
import { ActivityEncounterPhase } from '@/types'
import { CyberCard, CyberBadge } from '@/components/common/CyberComponents'
import { ImageCarousel } from '@/components/common/ImageCarousel'
import { MarkdownText } from '@/components/common/MarkdownText'
import { markdownComponents } from './EncounterMarkdown'

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
        phaseTitle = phaseTitle.replace(
          /^(Giai đoạn \d+:\s*|Phase \d+:\s*)/i,
          '',
        )

        const phaseObjective = phaseVal.objective
        const steps = phaseVal.steps || phaseVal.details || []

        return (
          <CyberCard
            key={phaseKey}
            variant="zinc"
            withCorners
            className="group flex flex-col gap-2 transition-all duration-300 hover:-translate-y-1 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]"
          >
            <h3 className="mb-3 flex items-start gap-3 text-xl font-bold text-neon-cyan glow-text-cyan">
              {hasMultiplePhases && (
                <CyberBadge variant="cyan" className="mt-1 shrink-0">
                  {index + 1}
                </CyberBadge>
              )}
              <span className="min-w-0 flex-1 leading-tight break-words">
                {phaseTitle}
              </span>
            </h3>
            {phaseObjective && (
              <p className="mb-4 rounded-r-lg border-l-2 border-neon-cyan bg-neon-cyan/5 py-1 pl-4 text-sm text-muted-foreground italic">
                Mục tiêu: {phaseObjective}
              </p>
            )}
            {phaseVal.images && phaseVal.images.length > 0 && (
              <ImageCarousel images={phaseVal.images} />
            )}
            <ul className="space-y-3">
              {steps.map((step: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-sm leading-relaxed text-foreground/80"
                >
                  <span className="min-w-[20px] shrink-0 font-bold text-neon-cyan">
                    {i + 1}.
                  </span>
                  <div className="flex-1">
                    <MarkdownText components={markdownComponents}>
                      {step}
                    </MarkdownText>
                  </div>
                </li>
              ))}
            </ul>
            {phaseVal.mine_locations && (
              <div className="mt-5 rounded-lg border border-neon-yellow/20 bg-neon-yellow/10 p-4">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-neon-yellow">
                  <Map className="h-4 w-4" /> Vị trí phân bổ Mìn:
                </h4>
                <ul className="space-y-2">
                  {phaseVal.mine_locations.map((loc: string, i: number) => (
                    <li
                      key={i}
                      className="ml-6 list-disc text-sm text-neon-yellow/90"
                    >
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
