import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cyberBadgeVariants = cva(
  'inline-flex items-center justify-center gap-2 uppercase font-mono border-l-[3px] border-y border-r border-t-zinc-800/30 border-b-zinc-800/30 border-r-zinc-800/30 select-none transition-all duration-300 hover:brightness-125 hover:-translate-y-0.5',
  {
    variants: {
      variant: {
        cyan: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.15)]',
        orange:
          'bg-neon-orange/10 text-neon-orange border-neon-orange shadow-[0_0_8px_rgba(255,140,0,0.15)]',
        yellow:
          'bg-neon-yellow/10 text-neon-yellow border-neon-yellow shadow-[0_0_8px_rgba(252,226,5,0.15)]',
        red: 'bg-neon-red/10 text-neon-red border-neon-red shadow-[0_0_8px_rgba(255,0,0,0.15)]',
        green:
          'bg-neon-green/10 text-neon-green border-neon-green shadow-[0_0_8px_rgba(57,255,20,0.15)]',
        purple:
          'bg-neon-purple/10 text-neon-purple border-neon-purple shadow-[0_0_8px_rgba(178,65,255,0.15)]',
        zinc: 'bg-zinc-900/50 text-zinc-500 border-zinc-700',
        exotic:
          'bg-amber-500/10 text-amber-400 border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.15)]',
      },
      size: {
        xs: 'px-1 py-0.5 text-[8px] font-black tracking-widest',
        sm: 'px-2 py-1 text-[10px] font-bold tracking-wider',
        md: 'px-3 py-1 text-xs font-bold tracking-wider',
      },
    },
    defaultVariants: {
      variant: 'cyan',
      size: 'md',
    },
  }
)

const cyberBadgeIndicator = {
  cyan: 'bg-neon-cyan shadow-[0_0_8px_#00f3ff]',
  orange: 'bg-neon-orange shadow-[0_0_8px_#ff8c00]',
  yellow: 'bg-neon-yellow shadow-[0_0_8px_#fce205]',
  red: 'bg-neon-red shadow-[0_0_8px_#ff0000]',
  green: 'bg-neon-green shadow-[0_0_8px_#39ff14]',
  purple: 'bg-neon-purple shadow-[0_0_8px_#b241ff]',
  zinc: 'bg-zinc-600',
  exotic: 'bg-amber-500 shadow-[0_0_8px_#f59e0b]',
}

export interface CyberBadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof cyberBadgeVariants> {
  pulse?: boolean
  withIndicator?: boolean
}

export function CyberBadge({
  variant,
  size,
  pulse = false,
  withIndicator = true,
  className,
  children,
  ...props
}: CyberBadgeProps) {
  const currentVariant = variant || 'cyan'
  return (
    <span
      className={cn(cyberBadgeVariants({ variant, size, className }))}
      {...props}
    >
      {withIndicator && (
        <div
          className={cn(
            'h-1.5 w-1.5 shrink-0 rounded-none',
            cyberBadgeIndicator[currentVariant],
            pulse && 'animate-pulse'
          )}
        />
      )}
      {children}
    </span>
  )
}
