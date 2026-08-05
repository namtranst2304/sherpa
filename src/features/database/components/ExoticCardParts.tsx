import type { ReactNode } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function ExoticSectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3 text-neon-cyan text-sm font-black tracking-widest uppercase">
      <Sparkles className="w-4 h-4" />
      <span>{children}</span>
    </div>
  )
}

interface ExoticCardHeaderProps {
  iconUrl: string | null
  name: string
  meta: ReactNode
}

export function ExoticCardHeader({ iconUrl, name, meta }: ExoticCardHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-zinc-800 bg-zinc-950/50">
      <div className="relative w-12 h-12 flex-shrink-0 bg-zinc-800 rounded">
        {iconUrl ? (
          <Image src={iconUrl} alt={name} fill className="object-cover rounded" unoptimized />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-600">?</div>
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-white leading-tight">{name}</h3>
        {meta}
      </div>
    </div>
  )
}

interface ExoticTraitBlockProps {
  label: string
  iconUrl: string | null
  name: string
  description: string
  expanded: boolean
  iconClassName?: string
}

export function ExoticTraitBlock({
  label,
  iconUrl,
  name,
  description,
  expanded,
  iconClassName,
}: ExoticTraitBlockProps) {
  return (
    <div>
      <ExoticSectionLabel>{label}</ExoticSectionLabel>
      <div className="flex gap-3 items-start p-3 rounded bg-black/30 border border-zinc-800/50">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt={name}
            width={32}
            height={32}
            className={cn("rounded-sm shrink-0", iconClassName)}
            unoptimized
          />
        )}
        <div className="flex flex-col flex-1">
          <span className="font-bold text-white mb-1">{name}</span>
          <span
            className={cn(
              "text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap",
              !expanded && "line-clamp-3"
            )}
          >
            {description}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ItemSourceLine({
  source,
  className,
}: {
  source: string
  className?: string
}) {
  return (
    <div className={cn("mt-2 pt-3 border-t border-zinc-800/50", className)}>
      <div className="flex gap-2 text-xs">
        <span className="text-zinc-500 font-bold uppercase tracking-wider shrink-0">Source:</span>
        <span className="text-zinc-300 italic">{source.replace(/^Source:\s*/, "")}</span>
      </div>
    </div>
  )
}
