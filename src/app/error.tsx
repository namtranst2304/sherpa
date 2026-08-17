"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertOctagon, RefreshCw, Radio } from "lucide-react"
import { CyberButton } from "@/components/common/CyberComponents"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Sherpa System Error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-black cyber-grid flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-neon-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full space-y-6">
        {/* Animated Warning Icon */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-2 border-neon-red/40 bg-neon-red/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,0,0.3)] animate-pulse">
            <AlertOctagon className="w-10 h-10 text-neon-red drop-shadow-[0_0_12px_rgba(255,0,0,0.8)]" />
          </div>
        </div>

        {/* Title */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-red/15 border border-neon-red/40 text-neon-red font-mono text-xs uppercase tracking-widest mb-3">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Ghost Link Disrupted // Error Code: Critical
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
            System Failure
          </h1>
        </div>

        {/* Diagnostic Terminal Box */}
        <div className="w-full bg-zinc-950/90 border border-zinc-800 p-4 text-left font-mono text-xs text-zinc-400 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2 text-zinc-500 text-[10px] uppercase tracking-wider">
            <span>Diagnostic Console</span>
            <span>Status: Offline</span>
          </div>
          <p className="text-neon-red break-words font-semibold">
            {error.message || "An unexpected neural network synchronization error occurred."}
          </p>
          {error.digest && (
            <p className="text-zinc-600 text-[10px]">
              Digest ID: {error.digest}
            </p>
          )}
          <p className="text-zinc-500 text-[11px] pt-1">
            Re-initializing Vanguard subsystem may restore full functionality.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center pt-2">
          <CyberButton
            variant="red"
            size="md"
            glow
            onClick={() => reset()}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
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
