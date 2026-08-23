import { Key } from 'lucide-react'
import { ImageCarousel } from '@/components/common/ImageCarousel'
import { MarkdownText } from '@/components/common/MarkdownText'
import { markdownComponents } from './EncounterMarkdown'

interface EncounterCatalystProps {
  catalyst: {
    title: string
    description?: string
    steps?: string[]
    images?: { url: string; caption?: string }[]
  }
}

export function EncounterCatalyst({ catalyst }: EncounterCatalystProps) {
  if (!catalyst) return null

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-neon-yellow/30 bg-black/40 p-5">
        <h4 className="mb-3 flex items-start gap-2 text-lg font-bold text-neon-yellow drop-shadow-[0_0_10px_rgba(255,234,0,0.5)]">
          <Key className="mt-1 h-4 w-4 shrink-0" />
          <span className="min-w-0 flex-1 leading-tight break-words">
            {catalyst.title}
          </span>
        </h4>
        {catalyst.description && (
          <div className="mb-4 text-sm text-muted-foreground">
            <MarkdownText components={markdownComponents}>
              {catalyst.description}
            </MarkdownText>
          </div>
        )}

        {catalyst.images && catalyst.images.length > 0 && (
          <ImageCarousel images={catalyst.images} />
        )}

        {catalyst.steps && (
          <ul className="space-y-2 mt-4">
            {catalyst.steps.map((step, i) => (
              <li
                key={i}
                className="border-l-2 border-neon-yellow/50 pl-4 text-sm leading-relaxed text-foreground/80"
              >
                <MarkdownText components={markdownComponents}>
                  {step}
                </MarkdownText>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
