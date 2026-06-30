"use client"
import { useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"

interface ZoomableImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  unoptimized?: boolean
}

export function ZoomableImage({ src, alt, width = 1200, height = 800, className, unoptimized = true }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        className={`relative group cursor-pointer ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized={unoptimized}
          className="rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.1)] border border-border max-w-full h-auto transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(0,243,255,0.3)]"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
          <div className="bg-background/80 p-3 rounded-full border border-neon-cyan/50 text-neon-cyan backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.3)]">
            <ZoomIn className="w-6 h-6" />
          </div>
        </div>
      </div>

      {isOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative flex flex-col items-center justify-center w-[95vw] max-w-[1800px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative inline-flex items-center justify-center max-w-full">
              <button
                className="absolute -top-4 -right-4 md:-top-5 md:-right-5 p-2 md:p-2.5 bg-zinc-900/90 hover:bg-zinc-800 text-white rounded-full transition-colors z-50 border border-zinc-700 shadow-xl"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized={unoptimized}
                className="object-contain max-h-[95vh] w-auto max-w-full rounded-lg shadow-[0_0_30px_rgba(0,243,255,0.2)] border border-zinc-800"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
