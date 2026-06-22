"use client"
import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface CarouselImage {
  url: string
  caption?: string
}

export interface ImageCarouselProps {
  images: CarouselImage[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(0)

  if (!images || images.length === 0) return null
  
  // Single image fallback
  if (images.length === 1) {
    const img = images[0]
    return (
      <div className="flex flex-col items-center gap-3 w-full mb-4 mt-2">
        <Image 
          src={img.url} 
          alt={img.caption || "Image"} 
          width={1200} 
          height={800} 
          unoptimized={true}
          className="rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.1)] border border-zinc-700/50 max-w-full h-auto" 
        />
        {img.caption && <p className="text-sm text-muted-foreground italic bg-black/50 px-4 py-1.5 rounded-none border border-zinc-800">{img.caption}</p>}
      </div>
    )
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

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
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
              fill
              unoptimized={true}
              className="object-contain"
            />
            {images[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <p className="text-center text-sm md:text-base text-foreground font-medium drop-shadow-md">
                  {images[currentIndex].caption}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-cyan/20 border border-transparent hover:border-neon-cyan/50 z-10"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-cyan/20 border border-transparent hover:border-neon-cyan/50 z-10"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "bg-neon-cyan w-6 shadow-[0_0_8px_rgba(0,243,255,0.8)]" 
                : "bg-zinc-600 hover:bg-zinc-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
