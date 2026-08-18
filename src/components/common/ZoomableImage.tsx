"use client"

import { useState, useEffect, useCallback } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, Sparkles } from "lucide-react"
import { playNavSound, playHoverSound } from "@/lib/cyber-audio"

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
    playNavSound()
    setZoomLevel(1)
    setIsOpen(true)
  }

  const handleClose = useCallback(() => {
    playNavSound()
    setIsOpen(false)
    setZoomLevel(1)
  }, [])

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation()
    playNavSound()
    setZoomLevel((prev) => Math.min(prev + 0.35, 3))
  }

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation()
    playNavSound()
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.7))
  }

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation()
    playNavSound()
    setZoomLevel(1)
  }

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "+" || e.key === "=") setZoomLevel((prev) => Math.min(prev + 0.3, 3))
      if (e.key === "-" || e.key === "_") setZoomLevel((prev) => Math.max(prev - 0.3, 0.7))
      if (e.key === "0") setZoomLevel(1)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  return (
    <>
      <div
        className={`relative group cursor-pointer overflow-hidden rounded-none border border-zinc-800 transition-all duration-300 hover:border-neon-cyan/60 hover:shadow-[0_0_25px_rgba(0,243,255,0.25)] ${className}`}
        onClick={handleOpen}
        onMouseEnter={playHoverSound}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={unoptimized}
          className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Hover cyber overlay indicator */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-zinc-950/90 px-4 py-2 border border-neon-cyan/70 text-neon-cyan backdrop-blur-md flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
            <Maximize2 className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">Phóng to Callout Map</span>
          </div>
        </div>
      </div>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/95 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200 select-none cyber-grid"
            onClick={handleClose}
          >
            {/* Top HUD Header */}
            <div
              className="relative w-full max-w-6xl flex items-center justify-between px-4 py-2.5 bg-zinc-950/90 border border-neon-cyan/40 shadow-[0_0_20px_rgba(0,243,255,0.15)] z-50 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-4 h-4 text-neon-cyan shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono text-neon-cyan/70 tracking-[0.2em] uppercase">
                    SYS.MAP // CALLOUT VIEWER
                  </span>
                  <span className="text-xs sm:text-sm font-black text-zinc-100 uppercase tracking-wider truncate">
                    {alt}
                  </span>
                </div>
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 sm:p-2 bg-zinc-900 hover:bg-neon-cyan/20 text-zinc-300 hover:text-neon-cyan border border-zinc-700 hover:border-neon-cyan transition-all"
                  title="Phóng to (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 sm:p-2 bg-zinc-900 hover:bg-neon-cyan/20 text-zinc-300 hover:text-neon-cyan border border-zinc-700 hover:border-neon-cyan transition-all"
                  title="Thu nhỏ (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 sm:p-2 bg-zinc-900 hover:bg-neon-cyan/20 text-zinc-300 hover:text-neon-cyan border border-zinc-700 hover:border-neon-cyan transition-all font-mono text-xs flex items-center gap-1"
                  title="Đặt lại tỉ lệ (0)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{Math.round(zoomLevel * 100)}%</span>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 sm:p-2 bg-neon-red/20 hover:bg-neon-red/40 text-neon-red border border-neon-red/60 transition-all ml-1 cursor-pointer"
                  title="Đóng (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Zoom Canvas Area */}
            <div
              className="relative flex-1 flex items-center justify-center w-full max-w-6xl overflow-auto my-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="transition-transform duration-200 ease-out flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  unoptimized={unoptimized}
                  className="object-contain max-h-[80vh] w-auto max-w-full rounded-none border border-zinc-800 shadow-[0_0_40px_rgba(0,243,255,0.2)]"
                />
              </div>
            </div>

            {/* Bottom Status bar */}
            <div
              className="w-full max-w-6xl px-4 py-1.5 bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Phím tắt: [+] Phóng to | [-] Thu nhỏ | [0] Đặt lại | [ESC] Đóng</span>
              <span className="text-neon-cyan font-bold">READY</span>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

