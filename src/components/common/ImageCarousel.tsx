"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MarkdownText } from "@/components/common/MarkdownText"
import { bungieUrl } from "@/lib/bungie"
import type { Components } from "react-markdown"

export interface CarouselImage {
  url: string
  caption?: string
}

export interface ImageCarouselProps {
  images: CarouselImage[]
}

const captionMarkdownComponents: Components = {
  a: ({ ...props }) => (
    <a className="text-neon-cyan underline hover:text-white not-italic" target="_blank" rel="noreferrer" {...props} />
  ),
  p: ({ ...props }) => <span {...props} />,
}

function Caption({ text, className }: { text: string; className?: string }) {
  return (
    <MarkdownText className={className} components={captionMarkdownComponents}>
      {text}
    </MarkdownText>
  )
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    const img = images[0]
    return (
      <div className="flex flex-col items-center gap-3 w-full mb-4 mt-2">
        <Image
          src={bungieUrl(img.url)}
          alt={img.caption || "Image"}
          width={1200}
          height={800}
          unoptimized={true}
          className="rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.1)] border border-zinc-700/50 max-w-full h-auto"
        />
        {img.caption && (
          <Caption
            text={img.caption}
            className="text-sm text-muted-foreground italic bg-black/50 px-4 py-1.5 rounded-none border border-zinc-800 text-center w-full"
          />
        )}
      </div>
    )
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = images.length - 1
      if (nextIndex >= images.length) nextIndex = 0
      return nextIndex
    })
  }

  const current = images[currentIndex]

  return (
    <div className="relative w-full rounded-lg group mb-4 mt-2">
      <div className="relative w-full aspect-video flex items-center justify-center bg-black/40 border border-zinc-800 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(0,243,255,0.1)]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) paginate(1)
              else if (swipe > swipeConfidenceThreshold) paginate(-1)
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={bungieUrl(current.url)}
              alt={current.caption || `Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              quality={100}
              unoptimized={true}
            />
            {current.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <Caption
                  text={current.caption}
                  className="text-center text-sm md:text-base text-foreground font-medium drop-shadow-md"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Ảnh trước"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-none bg-black/70 text-neon-cyan flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-neon-cyan/20 border border-neon-cyan/40 z-10"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          aria-label="Ảnh sau"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-none bg-black/70 text-neon-cyan flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-neon-cyan/20 border border-neon-cyan/40 z-10"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-1 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className="inline-flex items-center justify-center min-h-11 min-w-11 p-3"
            aria-label={`Chuyển tới ảnh ${idx + 1}`}
            aria-current={idx === currentIndex ? "true" : undefined}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-neon-cyan w-6 h-2 shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                  : "bg-zinc-600 w-2 h-2 hover:bg-zinc-400"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
