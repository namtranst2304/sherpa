import React from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type CyberVariant } from './types'

const cyberHUDBarTone: Record<CyberVariant, { border: string; bg: string; icon: string; title: string }> = {
  cyan: {
    border: 'border-neon-cyan/40',
    bg: 'glass-panel',
    icon: 'text-neon-cyan',
    title: 'text-neon-cyan/70',
  },
  orange: {
    border: 'border-neon-orange/40',
    bg: 'glass-panel',
    icon: 'text-neon-orange',
    title: 'text-neon-orange/70',
  },
  yellow: {
    border: 'border-neon-yellow/40',
    bg: 'glass-panel',
    icon: 'text-neon-yellow',
    title: 'text-neon-yellow/70',
  },
  red: {
    border: 'border-neon-red/40',
    bg: 'glass-panel',
    icon: 'text-neon-red',
    title: 'text-neon-red/70',
  },
  green: {
    border: 'border-neon-green/40',
    bg: 'glass-panel',
    icon: 'text-neon-green',
    title: 'text-neon-green/70',
  },
  purple: {
    border: 'border-neon-purple/40',
    bg: 'glass-panel',
    icon: 'text-neon-purple',
    title: 'text-neon-purple/70',
  },
  zinc: {
    border: 'border-zinc-800',
    bg: 'glass-panel',
    icon: 'text-neon-cyan',
    title: 'text-zinc-300',
  },
  exotic: {
    border: 'border-amber-500/40',
    bg: 'glass-panel',
    icon: 'text-amber-400',
    title: 'text-amber-500/70',
  },
}

export interface CyberHUDBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: LucideIcon
  title: React.ReactNode
  subtitle?: React.ReactNode
  variant?: CyberVariant
  actions?: React.ReactNode
}

export function CyberHUDBar({
  icon: Icon,
  title,
  subtitle,
  variant = 'cyan',
  actions,
  className,
  ...props
}: CyberHUDBarProps) {
  const tone = cyberHUDBarTone[variant] || cyberHUDBarTone.zinc

  return (
    <div
      className={cn(
        'relative z-50 flex w-full shrink-0 items-center justify-between border px-4 py-2.5',
        variant === 'cyan' && 'shadow-[0_0_20px_rgba(0,243,255,0.15)]',
        tone.border,
        tone.bg,
        className
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2">
        {Icon && <Icon className={cn('h-4 w-4 shrink-0', tone.icon)} />}
        <div className="flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-2">
          <span
            className={cn(
              'font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase',
              tone.title
            )}
          >
            {title}
          </span>
          {subtitle && (
            <span className="truncate text-xs font-black tracking-wider text-zinc-100 uppercase sm:text-sm">
              {subtitle}
            </span>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-4">
          {actions}
        </div>
      )}
    </div>
  )
}
