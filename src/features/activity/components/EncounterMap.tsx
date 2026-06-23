import { Map } from "lucide-react"
import { ZoomableImage } from "@/components/common/ZoomableImage"

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
              src={img.url} 
              alt={img.caption || "Encounter map"} 
              width={1200} 
              height={800} 
              unoptimized={true}
              className="w-full"
            />
            {img.caption && (
              <p className="text-sm text-muted-foreground italic bg-black/50 px-4 py-1.5 rounded-none border border-zinc-800">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="text-center text-muted-foreground flex flex-col items-center justify-center gap-4 p-8 w-full h-full min-h-[300px] border border-dashed border-zinc-800 rounded-none bg-black/50">
      <Map className="w-16 h-16 opacity-30 text-neon-cyan" />
      <p className="text-lg font-medium text-foreground/80">Sơ đồ vị trí: {encounterName}</p>
      <p className="text-sm opacity-60 max-w-md">Khu vực này sẽ hiển thị bản đồ chiến thuật chi tiết, vị trí bệ đứng, bẫy điện và đường di chuyển của Boss.</p>
    </div>
  )
}
