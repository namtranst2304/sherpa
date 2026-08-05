import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function DatabasePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 max-w-[1600px] w-full mx-auto relative min-h-screen pb-20">
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
  clearLabel = "Xóa tìm kiếm",
  clearClassName,
}: DatabaseResultsBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs font-mono uppercase tracking-wider text-zinc-500">
      <span>{label}</span>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className={cn("text-neon-cyan hover:text-white transition-colors", clearClassName)}
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
    <div className={cn("py-12 text-center text-zinc-500 font-mono", className)}>
      {message}
    </div>
  )
}
