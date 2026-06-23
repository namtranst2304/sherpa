import { Sparkles } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { ImageCarousel } from "@/components/common/ImageCarousel"
import { markdownComponents } from "./EncounterMarkdown"

interface EncounterSecretsProps {
  secrets?: {
    title: string
    description?: string
    steps?: string[]
    images?: { url: string; caption?: string }[]
  }[]
}

export function EncounterSecrets({ secrets }: EncounterSecretsProps) {
  if (!secrets || secrets.length === 0) return null;

  return (
    <div className="space-y-6">
      {secrets.map((secret, idx) => (
        <div key={idx} className="bg-black/40 border border-neon-cyan/30 rounded-lg p-5">
          <h4 className="text-lg font-bold text-neon-cyan mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> {secret.title}
          </h4>
          {secret.description && (
            <p className="text-muted-foreground text-sm mb-4">
              <ReactMarkdown components={markdownComponents}>{secret.description}</ReactMarkdown>
            </p>
          )}
          
          {secret.images && secret.images.length > 0 && (
            <ImageCarousel images={secret.images} />
          )}

          {secret.steps && (
            <ul className="space-y-2">
              {secret.steps.map((step, i) => (
                <li key={i} className="text-sm text-foreground/80 pl-4 border-l-2 border-neon-cyan/50 leading-relaxed">
                  <ReactMarkdown components={markdownComponents}>{step}</ReactMarkdown>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
