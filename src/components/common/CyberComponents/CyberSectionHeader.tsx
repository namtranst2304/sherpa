import React from 'react'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const cyberSectionHeaderTone = {
  cyan: {
    border: 'border-zinc-800',
    iconBox: 'bg-neon-cyan/10',
    icon: 'text-neon-cyan',
    title: 'text-foreground',
  },
  orange: {
    border: 'border-neon-orange/30',
    iconBox: 'bg-neon-orange/20',
    icon: 'text-neon-orange',
    title: 'text-neon-orange glow-text-orange',
  },
  yellow: {
    border: 'border-neon-yellow/30',
    iconBox: 'bg-neon-yellow/20',
    icon: 'text-neon-yellow',
    title: 'text-neon-yellow glow-text-yellow',
  },
  red: {
    border: 'border-neon-red/30',
    iconBox: 'bg-neon-red/20',
    icon: 'text-neon-red',
    title: 'text-neon-red glow-text-red',
  },
  green: {
    border: 'border-neon-green/30',
    iconBox: 'bg-neon-green/20',
    icon: 'text-neon-green',
    title: 'text-neon-green glow-text-green',
  },
  purple: {
    border: 'border-neon-purple/30',
    iconBox: 'bg-neon-purple/20',
    icon: 'text-neon-purple',
    title: 'text-neon-purple glow-text-purple',
  },
  zinc: {
    border: 'border-zinc-800',
    iconBox: 'bg-zinc-800/60',
    icon: 'text-zinc-400',
    title: 'text-foreground',
  },
} as const

type CyberSectionHeaderVariant = keyof typeof cyberSectionHeaderTone

export interface CyberSectionHeaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title'
> {
  icon: LucideIcon
  title: React.ReactNode
  variant?: CyberSectionHeaderVariant
  actions?: React.ReactNode
}

export function CyberSectionHeader({
  icon: Icon,
  title,
  variant = 'cyan',
  actions,
  className,
  ...props
}: CyberSectionHeaderProps) {
  const tone = cyberSectionHeaderTone[variant]

  return (
    <div
      className={cn(
        'relative z-10 mb-4 flex flex-wrap items-center gap-3 border-b pb-4',
        actions && 'justify-between',
        tone.border,
        className
      )}
      {...props}
    >
      <div className="group flex min-w-0 items-center gap-3">
        <div className={cn('shrink-0 rounded-md p-2 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-[0_0_12px_currentColor]', tone.iconBox, tone.icon)}>
          <Icon className="h-5 w-5" />
        </div>
        <h2
          className={cn(
            'text-lg font-bold tracking-wider break-words uppercase sm:text-xl',
            tone.title
          )}
        >
          {title}
        </h2>
      </div>
      {actions ? (
        <div className="w-full shrink-0 sm:w-auto">{actions}</div>
      ) : null}
    </div>
  )
}
