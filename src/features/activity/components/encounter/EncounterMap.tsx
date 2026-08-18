import { Map } from 'lucide-react'
import type { Components } from 'react-markdown'
import { ZoomableImage } from '@/components/common/ZoomableImage'
import { MarkdownText } from '@/components/common/MarkdownText'
import { bungieUrl } from '@/lib/bungie'

const captionComponents: Components = {
  a: ({ ...props }) => (
    <a
      className="text-neon-cyan not-italic underline hover:text-white"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
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
      <div className="flex w-full flex-col gap-6 p-4">
        {images.map((img, idx) => (
          <div key={idx} className="flex w-full flex-col items-center gap-3">
            <ZoomableImage
              src={bungieUrl(img.url)}
              alt={img.caption || 'Encounter map'}
              width={1200}
              height={800}
              unoptimized={true}
              className="w-full"
            />
            {img.caption && (
              <div className="w-full rounded-none border border-zinc-800 bg-black/50 px-4 py-1.5 text-center text-sm text-muted-foreground italic">
                <MarkdownText components={captionComponents}>
                  {img.caption}
                </MarkdownText>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card/50 p-12 text-center text-muted-foreground">
      <Map className="mb-4 h-16 w-16 opacity-20" />
      <p className="font-mono text-sm tracking-widest uppercase">
        Không có sơ đồ cho {encounterName}
      </p>
    </div>
  )
}
