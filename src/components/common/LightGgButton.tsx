'use client'

import * as React from 'react'
import { ExternalLink } from 'lucide-react'
import { getLightGgUrl } from '@/lib/lightgg'
import { cn } from '@/lib/utils'

export interface LightGgButtonProps {
  itemId?: number | string | null
  name?: string
  variant?: 'icon' | 'badge' | 'button'
  size?: 'xs' | 'sm' | 'md'
  className?: string
  label?: string
}

export function LightGgButton({
  itemId,
  name,
  variant = 'icon',
  size = 'sm',
  className,
  label = 'Light.gg',
}: LightGgButtonProps) {
  const url = getLightGgUrl({ id: itemId, name })

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent event bubbling when clicked inside cards or clickable containers
    e.stopPropagation()
  }

  if (variant === 'badge') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        title={`Xem ${name || 'mục này'} trên Light.gg (God Rolls, Reviews, Perks)`}
        className={cn(
          'inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider',
          'border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 px-2 py-0.5 rounded-none',
          'transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500/20 hover:text-white hover:shadow-[0_0_10px_rgba(0,243,255,0.4)]',
          className
        )}
      >
        <span>{label}</span>
        <ExternalLink className="h-2.5 w-2.5 opacity-70" />
      </a>
    )
  }

  if (variant === 'button') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        title={`Xem ${name || 'mục này'} trên Light.gg`}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 font-mono text-xs uppercase tracking-widest',
          'border border-zinc-700 bg-zinc-900/80 px-3 py-1.5 text-zinc-300',
          'transition-all duration-300 hover:border-neon-cyan hover:bg-neon-cyan/10 hover:text-neon-cyan hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]',
          className
        )}
      >
        <span>{label}</span>
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    )
  }

  // Default 'icon' variant
  const iconSizeClasses = {
    xs: 'h-7 w-7 p-1.5',
    sm: 'h-8 w-8 p-2',
    md: 'h-9 w-9 p-2.5',
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      title={`Xem ${name || 'mục này'} trên Light.gg (God Rolls, Stats, Ratings)`}
      aria-label={`Xem ${name || 'mục này'} trên Light.gg`}
      className={cn(
        'group relative inline-flex items-center justify-center rounded border transition-all duration-300 select-none',
        'border-zinc-800 bg-zinc-950/60 text-zinc-400',
        'hover:border-neon-cyan/60 hover:bg-neon-cyan/10 hover:text-neon-cyan hover:shadow-[0_0_10px_rgba(0,243,255,0.3)]',
        iconSizeClasses[size],
        className
      )}
    >
      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  )
}
