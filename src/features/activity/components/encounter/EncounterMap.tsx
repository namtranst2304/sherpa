import { Map } from "lucide-react"
import type { Components } from "react-markdown"
import { ZoomableImage } from "@/components/common/ZoomableImage"
import { MarkdownText } from "@/components/common/MarkdownText"
import { bungieUrl } from "@/lib/bungie"

const captionComponents: Components = {
  a: ({ ...props }) => (
    <a className="text-neon-cyan underline hover:text-white not-italic" target="_blank" rel="noreferrer" {...props} />
  ),
  p: ({ ...props }) => <span {...props} />,
}

interface EncounterMapProps {
  images?: { url: string; caption?: string }[]
  encounterName: string
}

export function EncounterMap({ images, encounterName }: EncounterMapProps) {
  if (images && images.length > 0) {
    return (
      <div className="w-full flex flex-col gap-6 p-4">
        {images.map((img, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3 w-full">
            <ZoomableImage
              src={bungieUrl(img.url)}
              alt={img.caption || "Encounter map"}
              width={1200}
              height={800}
              unoptimized={true}
              className="w-full"
            />
            {img.caption && (
              <div className="text-sm text-muted-foreground italic bg-black/50 px-4 py-1.5 rounded-none border border-zinc-800 w-full text-center">
                <MarkdownText components={captionComponents}>{img.caption}</MarkdownText>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl bg-card/50 h-full min-h-[300px]">
      <Map className="w-16 h-16 mb-4 opacity-20" />
      <p className="font-mono text-sm uppercase tracking-widest">
        Không có sơ đồ cho {encounterName}
      </p>
    </div>
  )
}
