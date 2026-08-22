import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function DatabasePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full flex-1 overflow-y-auto bg-background">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-neon-cyan/5 via-background to-background" />
      <div className="bg-scanline pointer-events-none absolute inset-0 z-0 opacity-5" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-8 px-4 pb-24 md:px-6 md:pb-28 lg:px-8">
        {children}
      </div>
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
