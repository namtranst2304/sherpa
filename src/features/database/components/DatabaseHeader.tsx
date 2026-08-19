import React from 'react'
import { Search } from 'lucide-react'
import { CyberInput } from '@/components/common/CyberComponents'

interface DatabaseHeaderProps {
  title: string
  description: string
  searchPlaceholder?: string
  searchValue: string
  onSearchChange: (value: string) => void
  actions?: React.ReactNode
}

export function DatabaseHeader({
  title,
  description,
  searchPlaceholder = 'Tìm kiếm...',
  searchValue,
  onSearchChange,
  actions,
}: DatabaseHeaderProps) {
  return (
    <div className="sticky top-0 z-20 border-b border-zinc-800/50 bg-background/80 pb-4 pt-4 pl-14 pr-14 backdrop-blur-md md:top-14 md:pl-0 md:pr-0 md:pt-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="animate-cyber-scan bg-gradient-to-r from-neon-cyan via-white to-neon-cyan bg-clip-text text-2xl font-black tracking-wider text-transparent uppercase drop-shadow-[0_0_10px_rgba(0,243,255,0.3)] sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl font-mono text-sm leading-relaxed text-zinc-400">
            {description}
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="group relative w-full sm:max-w-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-3">
              <Search className="h-5 w-5 text-zinc-500 transition-colors group-focus-within:text-neon-cyan" />
            </div>
            <CyberInput
              variant="cyan"
              className="pl-10"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {actions && (
            <div className="flex w-full flex-col flex-wrap gap-2 sm:ml-auto sm:w-auto sm:flex-row">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
