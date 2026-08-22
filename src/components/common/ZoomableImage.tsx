'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Sparkles,
} from 'lucide-react'

interface ZoomableImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  unoptimized?: boolean
}

export function ZoomableImage({
  src,
  alt,
  width = 1200,
  height = 800,
  className,
  unoptimized = true,
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const handleOpen = () => {
    setZoomLevel(1)
    setIsOpen(true)
  }

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setZoomLevel(1)
  }, [])

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel((prev) => Math.min(prev + 0.35, 3))
  }

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.7))
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel(1)
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === '+' || e.key === '=')
        setZoomLevel((prev) => Math.min(prev + 0.3, 3))
      if (e.key === '-' || e.key === '_')
        setZoomLevel((prev) => Math.max(prev - 0.3, 0.7))
      if (e.key === '0') setZoomLevel(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose])

  return (
    <>
      <div
        className={`group relative cursor-pointer overflow-hidden rounded-none border border-zinc-800 transition-all duration-300 hover:border-neon-cyan/60 hover:shadow-[0_0_25px_rgba(0,243,255,0.25)] ${className}`}
        onClick={handleOpen}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={unoptimized}
          className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Hover cyber overlay indicator */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2 border border-neon-cyan/70 bg-zinc-950/90 px-4 py-2 text-neon-cyan shadow-[0_0_20px_rgba(0,243,255,0.4)] backdrop-blur-md">
            <Maximize2 className="h-4 w-4 text-neon-cyan" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase">
              Phóng to Callout Map
            </span>
          </div>
        </div>
      </div>

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex animate-in flex-col items-center justify-between bg-black/95 cyber-grid p-3 backdrop-blur-md duration-200 select-none fade-in sm:p-6"
            onClick={handleClose}
          >
            {/* Top HUD Header */}
            <div
              className="relative z-50 flex w-full max-w-6xl shrink-0 items-center justify-between border border-neon-cyan/40 bg-zinc-950/90 px-4 py-2.5 shadow-[0_0_20px_rgba(0,243,255,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex min-w-0 items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0 text-neon-cyan" />
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neon-cyan/70 uppercase">
                    SYS.MAP // CALLOUT VIEWER
                  </span>
                  <span className="truncate text-xs font-black tracking-wider text-zinc-100 uppercase sm:text-sm">
                    {alt}
                  </span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-300 transition-all hover:border-neon-cyan hover:bg-neon-cyan/20 hover:text-neon-cyan sm:p-2"
                  title="Phóng to (+)"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="border border-zinc-700 bg-zinc-900 p-1.5 text-zinc-300 transition-all hover:border-neon-cyan hover:bg-neon-cyan/20 hover:text-neon-cyan sm:p-2"
                  title="Thu nhỏ (-)"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 border border-zinc-700 bg-zinc-900 p-1.5 font-mono text-xs text-zinc-300 transition-all hover:border-neon-cyan hover:bg-neon-cyan/20 hover:text-neon-cyan sm:p-2"
                  title="Đặt lại tỉ lệ (0)"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="ml-1 cursor-pointer border border-neon-red/60 bg-neon-red/20 p-1.5 text-neon-red transition-all hover:bg-neon-red/40 sm:p-2"
                  title="Đóng (ESC)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Main Zoom Canvas Area */}
            <div
              className="relative my-3 flex w-full max-w-6xl flex-1 items-center justify-center overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-center justify-center transition-transform duration-200 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  unoptimized={unoptimized}
                  className="max-h-[80vh] w-auto max-w-full rounded-none border border-zinc-800 object-contain shadow-[0_0_40px_rgba(0,243,255,0.2)]"
                />
              </div>
            </div>

            {/* Bottom Status bar */}
            <div
              className="flex w-full max-w-6xl shrink-0 items-center justify-between border border-zinc-800 bg-zinc-950/80 px-4 py-1.5 font-mono text-[10px] tracking-widest text-zinc-500 uppercase"
              onClick={(e) => e.stopPropagation()}
            >
              <span>
                Phím tắt: [+] Phóng to | [-] Thu nhỏ | [0] Đặt lại | [ESC] Đóng
              </span>
              <span className="font-bold text-neon-cyan">READY</span>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
