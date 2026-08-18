import React from 'react'

function Skeleton({
  className,
  style,
}: {
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-800/60 ${className ?? ''}`}
      style={style}
    />
  )
}

export function ActivityLoadingSkeleton() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full flex-1 bg-background">
      {/* Sidebar skeleton */}
      <div className="hidden w-[220px] shrink-0 flex-col gap-3 border-r-2 border-neon-yellow/20 bg-black p-4 md:flex">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="mb-2 h-4 w-1/2" />
        <Skeleton className="mb-2 h-5 w-16" />
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-10 w-full"
            style={{ opacity: 1 - i * 0.12 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-8 overflow-hidden p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-zinc-800 pb-6">
          <Skeleton className="h-9 w-72 max-w-full" />
          <Skeleton className="h-4 w-[480px] max-w-full" />
          <Skeleton className="h-4 w-64 max-w-full opacity-60" />
        </div>

        {/* Encounter tabs row */}
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-28 shrink-0 rounded-md" />
          ))}
        </div>

        {/* Two-column grid */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_450px]">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            {/* Map card */}
            <div className="flex flex-col gap-4 rounded-lg border border-zinc-800/60 bg-zinc-900/20 p-5">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="aspect-video w-full rounded-md" />
            </div>

            {/* Mechanics card */}
            <div className="flex flex-col gap-4 rounded-lg border border-zinc-800/60 bg-zinc-900/20 p-5">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-5 w-44" />
              </div>
              <div className="flex flex-col gap-2.5">
                {[1, 0.9, 0.75, 1, 0.85].map((w, i) => (
                  <Skeleton
                    key={i}
                    className="h-4"
                    style={{ width: `${w * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            {/* Roles card */}
            <div className="flex flex-col gap-4 rounded-lg border border-zinc-800/60 bg-zinc-900/20 p-5">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-5 w-36" />
              </div>
              <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secrets card */}
            <div className="flex flex-col gap-4 rounded-lg border border-zinc-800/60 bg-zinc-900/20 p-5">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-5 w-48" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
