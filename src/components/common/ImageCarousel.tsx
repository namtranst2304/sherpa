'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MarkdownText } from '@/components/common/MarkdownText'
import { bungieUrl } from '@/lib/bungie'
import type { Components } from 'react-markdown'

export interface CarouselImage {
  url: string
  caption?: string
}

export interface ImageCarouselProps {
  images: CarouselImage[]
}

const captionMarkdownComponents: Components = {
  a: ({ ...props }) => (
    <a
      className="text-neon-cyan not-italic underline hover:text-white"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
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
      <div className="mt-2 mb-4 flex w-full flex-col items-center gap-3">
        <Image
          src={bungieUrl(img.url)}
          alt={img.caption || 'Image'}
          width={1200}
          height={800}
          unoptimized={true}
          className="h-auto max-w-full rounded-lg border border-zinc-700/50 shadow-[0_0_15px_rgba(0,243,255,0.1)]"
        />
        {img.caption && (
          <Caption
            text={img.caption}
            className="w-full rounded-none border border-zinc-800 bg-black/50 px-4 py-1.5 text-center text-sm text-muted-foreground italic"
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
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity

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
    <div className="group relative mt-2 mb-4 w-full rounded-lg">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800 bg-black/40 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
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
            className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
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
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                <Caption
                  text={current.caption}
                  className="text-center text-sm font-medium text-foreground drop-shadow-md md:text-base"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Ảnh trước"
          className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-none border border-neon-cyan/40 bg-black/70 text-neon-cyan opacity-100 transition-opacity hover:bg-neon-cyan/20 md:opacity-0 md:group-hover:opacity-100"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Ảnh sau"
          className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-none border border-neon-cyan/40 bg-black/70 text-neon-cyan opacity-100 transition-opacity hover:bg-neon-cyan/20 md:opacity-0 md:group-hover:opacity-100"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-1">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className="inline-flex min-h-11 min-w-11 items-center justify-center p-3"
            aria-label={`Chuyển tới ảnh ${idx + 1}`}
            aria-current={idx === currentIndex ? 'true' : undefined}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'h-2 w-6 bg-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.8)]'
                  : 'h-2 w-2 bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
