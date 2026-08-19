import type { ReactNode } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

function ExoticSectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-sm font-black tracking-widest text-neon-cyan uppercase">
      <Sparkles className="h-4 w-4" />
      <span>{children}</span>
    </div>
  )
}

interface ExoticCardHeaderProps {
  iconUrl: string | null
  name: string
  meta: ReactNode
  action?: ReactNode
}

export function ExoticCardHeader({
  iconUrl,
  name,
  meta,
  action,
}: ExoticCardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-950/50 p-4">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-12 w-12 flex-shrink-0 rounded bg-zinc-800">
          {iconUrl ? (
            <Image
              src={iconUrl}
              alt={name}
              fill
              className="rounded object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-600">
              ?
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-col">
          <h3 className="truncate text-lg leading-tight font-bold text-white">
            {name}
          </h3>
          {meta}
        </div>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
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
      <div className="flex items-start gap-3 rounded border border-zinc-800/50 bg-black/30 p-3">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt={name}
            width={32}
            height={32}
            className={cn('shrink-0 rounded-sm', iconClassName)}
            unoptimized
          />
        )}
        <div className="flex flex-1 flex-col">
          <span className="mb-1 font-bold text-white">{name}</span>
          <span
            className={cn(
              'text-sm leading-relaxed whitespace-pre-wrap text-zinc-400',
              !expanded && 'line-clamp-3',
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
    <div className={cn('mt-2 border-t border-zinc-800/50 pt-3', className)}>
      <div className="flex gap-2 text-xs">
        <span className="shrink-0 font-bold tracking-wider text-zinc-500 uppercase">
          Source:
        </span>
        <span className="text-zinc-300 italic">
          {source.replace(/^Source:\s*/, '')}
        </span>
      </div>
    </div>
  )
}

export function ExoticCatalystBlock({
  catalysts,
}: {
  catalysts: {
    name: string
    description: string
    icon?: string
    objectives?: { description: string; completionValue: number }[]
    effects?: { name: string; description: string; icon?: string }[]
  }[]
}) {
  if (!catalysts || catalysts.length === 0) return null

  return (
    <div>
      <ExoticSectionLabel>Catalyst(s)</ExoticSectionLabel>
      <div className="flex flex-col gap-4">
        {catalysts.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 rounded border border-zinc-800/80 bg-zinc-950/80 p-3"
          >
            <div className="flex items-start gap-3">
              {cat.icon && (
                <Image
                  src={`https://www.bungie.net${cat.icon}`}
                  alt={cat.name}
                  width={32}
                  height={32}
                  className="shrink-0 rounded-sm border border-zinc-800 bg-zinc-900"
                  unoptimized
                />
              )}
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{cat.name}</span>
                <span className="mt-1 text-xs leading-relaxed whitespace-pre-wrap text-zinc-400">
                  {cat.description}
                </span>
              </div>
            </div>

            {cat.effects && cat.effects.length > 0 && (
              <div className="mt-2 flex flex-col gap-2 border-t border-zinc-800/50 pt-2">
                {cat.effects.map((effect, eIdx) => (
                  <div key={eIdx} className="flex items-start gap-2">
                    {effect.icon && (
                      <Image
                        src={`https://www.bungie.net${effect.icon}`}
                        alt={effect.name}
                        width={20}
                        height={20}
                        className="shrink-0 rounded-sm"
                        unoptimized
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-300">
                        {effect.name}
                      </span>
                      <span className="text-xs leading-relaxed text-zinc-500">
                        {effect.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cat.objectives && cat.objectives.length > 0 && (
              <div className="mt-2 flex flex-col gap-1 text-xs text-zinc-500">
                <div className="font-semibold text-zinc-400">
                  Unlock Requirements:
                </div>
                {cat.objectives.map((obj, oIdx) => (
                  <div key={oIdx} className="flex items-center justify-between">
                    <span>{obj.description || 'Kills'}</span>
                    <span className="font-mono text-neon-cyan">
                      {obj.completionValue}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

