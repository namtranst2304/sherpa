'use client'

import type { SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { CyberSelect } from '@/components/common/CyberComponents'

interface DatabaseFilterSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
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
      <CyberSelect
        variant="cyan"
        aria-label={label}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </CyberSelect>
    </div>
  )
}
