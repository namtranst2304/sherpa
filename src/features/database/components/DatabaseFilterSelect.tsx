'use client'

import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatabaseFilterSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { value: string; label: string }[]
  className?: string
}

export function DatabaseFilterSelect({
  label,
  options,
  className,
  ...props
}: DatabaseFilterSelectProps) {
  return (
    <div className={cn('relative w-full sm:w-auto sm:min-w-[9rem]', className)}>
      <select
        aria-label={label}
        className="min-h-11 w-full cursor-pointer appearance-none rounded-md border border-zinc-800 bg-zinc-900/50 py-2.5 pr-10 pl-4 text-sm text-zinc-300 focus:ring-1 focus:ring-neon-cyan focus:outline-none"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
    </div>
  )
}
