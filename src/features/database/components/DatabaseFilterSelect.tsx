"use client"

import type { SelectHTMLAttributes } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <div className={cn("relative w-full sm:w-auto sm:min-w-[9rem]", className)}>
      <select
        aria-label={label}
        className="w-full min-h-11 pl-4 pr-10 py-2.5 bg-zinc-900/50 border border-zinc-800 rounded-md text-sm text-zinc-300 focus:outline-none focus:ring-1 focus:ring-neon-cyan appearance-none cursor-pointer"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
    </div>
  )
}
