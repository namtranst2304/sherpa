'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertOctagon, RefreshCw, Radio } from 'lucide-react'
import { CyberButton } from '@/components/common/CyberComponents'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Sherpa System Error:', error)
  }, [error])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black cyber-grid p-4">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[50vw] max-h-[600px] w-[50vw] max-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-red/10 blur-[140px]" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center space-y-6 text-center">
        {/* Animated Warning Icon */}
        <div className="relative">
          <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-full border-2 border-neon-red/40 bg-neon-red/10 shadow-[0_0_30px_rgba(255,0,0,0.3)]">
            <AlertOctagon className="h-10 w-10 text-neon-red drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]" />
          </div>
        </div>

        {/* Title */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 border border-neon-red/40 bg-neon-red/15 px-3 py-1 font-mono text-xs tracking-widest text-neon-red uppercase">
            <Radio className="h-3.5 w-3.5 animate-pulse" />
            Ghost Link Disrupted // Error Code: Critical
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase sm:text-4xl md:text-5xl">
            System Failure
          </h1>
        </div>

        {/* Diagnostic Terminal Box */}
        <div className="relative w-full space-y-2 overflow-hidden border border-zinc-800 bg-zinc-950/90 p-4 text-left font-mono text-xs text-zinc-400">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 text-[10px] tracking-wider text-zinc-500 uppercase">
            <span>Diagnostic Console</span>
            <span>Status: Offline</span>
          </div>
          <p className="font-semibold break-words text-neon-red">
            {error.message ||
              'An unexpected neural network synchronization error occurred.'}
          </p>
          {error.digest && (
            <p className="text-[10px] text-zinc-600">
              Digest ID: {error.digest}
            </p>
          )}
          <p className="pt-1 text-[11px] text-zinc-500">
            Re-initializing Vanguard subsystem may restore full functionality.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
          <CyberButton
            variant="red"
            size="md"
            glow
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Re-establish Link
          </CyberButton>

          <Link href="/" className="w-full sm:w-auto">
            <CyberButton
              variant="cyan"
              size="md"
              glow
              className="w-full sm:w-auto"
            >
              Return to Orbit
            </CyberButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
