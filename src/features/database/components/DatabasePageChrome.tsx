import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function DatabasePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-8 pb-20">
      {children}
    </div>
  )
}

interface DatabaseResultsBarProps {
  label: string
  onClear?: () => void
  clearLabel?: string
  clearClassName?: string
}

export function DatabaseResultsBar({
  label,
  onClear,
  clearLabel = 'Xóa tìm kiếm',
  clearClassName,
}: DatabaseResultsBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 font-mono text-xs tracking-wider text-zinc-500 uppercase">
      <span>{label}</span>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className={cn(
            'text-neon-cyan transition-colors hover:text-white',
            clearClassName,
          )}
        >
          {clearLabel}
        </button>
      )}
    </div>
  )
}

export function DatabaseEmptyState({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  return (
    <div className={cn('py-12 text-center font-mono text-zinc-500', className)}>
      {message}
    </div>
  )
}
