import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CyberExpandToggleProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> {
  expanded: boolean
  onToggle?: () => void
  collapsedLabel?: string
  expandedLabel?: string
}

export function CyberExpandToggle({
  expanded,
  onToggle,
  collapsedLabel = 'Chi tiết',
  expandedLabel = 'Thu gọn',
  className,
  onClick,
  type = 'button',
  ...props
}: CyberExpandToggleProps) {
  return (
    <button
      type={type}
      onClick={(e) => {
        onToggle?.()
        onClick?.(e)
      }}
      className={cn(
        'flex min-h-11 w-full items-center justify-between border border-zinc-800 bg-zinc-950/60 px-3 py-2.5 font-mono text-xs tracking-wider text-neon-cyan uppercase transition-colors hover:border-neon-cyan/50',
        className
      )}
      aria-expanded={expanded}
      {...props}
    >
      <span>{expanded ? expandedLabel : collapsedLabel}</span>
      <ChevronDown
        className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')}
      />
    </button>
  )
}
