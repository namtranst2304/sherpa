import { Sparkles } from 'lucide-react'
import { ImageCarousel } from '@/components/common/ImageCarousel'
import { MarkdownText } from '@/components/common/MarkdownText'
import { markdownComponents } from './EncounterMarkdown'

interface EncounterSecretsProps {
  secrets?: {
    title: string
    description?: string
    steps?: string[]
    images?: { url: string; caption?: string }[]
  }[]
}

export function EncounterSecrets({ secrets }: EncounterSecretsProps) {
  if (!secrets || secrets.length === 0) return null

  return (
    <div className="space-y-6">
      {secrets.map((secret, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-neon-cyan/30 bg-black/40 p-5"
        >
          <h4 className="mb-3 flex items-start gap-2 text-lg font-bold text-neon-cyan">
            <Sparkles className="mt-1 h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1 leading-tight break-words">
              {secret.title}
            </span>
          </h4>
          {secret.description && (
            <p className="mb-4 text-sm text-muted-foreground">
              <MarkdownText components={markdownComponents}>
                {secret.description}
              </MarkdownText>
            </p>
          )}

          {secret.images && secret.images.length > 0 && (
            <ImageCarousel images={secret.images} />
          )}

          {secret.steps && (
            <ul className="space-y-2">
              {secret.steps.map((step, i) => (
                <li
                  key={i}
                  className="border-l-2 border-neon-cyan/50 pl-4 text-sm leading-relaxed text-foreground/80"
                >
                  <MarkdownText components={markdownComponents}>
                    {step}
                  </MarkdownText>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
