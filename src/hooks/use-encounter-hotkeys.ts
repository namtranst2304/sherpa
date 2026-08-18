"use client"

import { useEffect, useRef } from "react"

interface UseEncounterHotkeysOptions {
  onNext?: () => void
  onPrev?: () => void
  onToggleClear?: () => void
  onJumpToIndex?: (index: number) => void
  onToggleShortcuts?: () => void
  enableSwipe?: boolean
}

export function useEncounterHotkeys({
  onNext,
  onPrev,
  onToggleClear,
  onJumpToIndex,
  onToggleShortcuts,
  enableSwipe = true,
}: UseEncounterHotkeysOptions) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore when typing in input, textarea or contenteditable
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return
      }

      // Modifier keys check - don't trigger if Ctrl/Cmd/Alt is pressed
      if (e.ctrlKey || e.metaKey || e.altKey) return

      switch (e.code) {
        case "ArrowRight":
        case "KeyL":
        case "KeyJ":
          e.preventDefault()
          onNext?.()
          break

        case "ArrowLeft":
        case "KeyH":
        case "KeyK":
          e.preventDefault()
          onPrev?.()
          break

        case "KeyC":
          e.preventDefault()
          onToggleClear?.()
          break

        case "KeyM": {
          e.preventDefault()
          const mapEl = document.querySelector('[data-section="map"]') || document.querySelector("img")
          mapEl?.scrollIntoView({ behavior: "smooth", block: "center" })
          break
        }

        case "KeyR": {
          e.preventDefault()
          const rolesEl = document.querySelector('[data-section="roles"]')
          rolesEl?.scrollIntoView({ behavior: "smooth", block: "start" })
          break
        }

        case "Digit1":
        case "Digit2":
        case "Digit3":
        case "Digit4":
        case "Digit5":
        case "Digit6":
        case "Digit7":
        case "Digit8":
        case "Digit9": {
          const idx = parseInt(e.key, 10) - 1
          if (!isNaN(idx)) {
            e.preventDefault()
            onJumpToIndex?.(idx)
          }
          break
        }

        case "Slash":
          if (e.shiftKey || e.key === "?") {
            e.preventDefault()
            onToggleShortcuts?.()
          }
          break

        default:
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onNext, onPrev, onToggleClear, onJumpToIndex, onToggleShortcuts])

  // Touch Swipe Handlers for Mobile
  useEffect(() => {
    if (!enableSwipe || typeof window === "undefined") return

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        touchStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          time: Date.now(),
        }
      }
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStartRef.current || e.changedTouches.length === 0) return

      const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x
      const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y
      const deltaTime = Date.now() - touchStartRef.current.time

      touchStartRef.current = null

      // Only trigger if fast gesture (<400ms) and horizontal dominant (|dx| > 2*|dy| and |dx| > 50)
      if (deltaTime < 400 && Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.8) {
        if (deltaX < 0) {
          // Swipe Left -> Next
          onNext?.()
        } else {
          // Swipe Right -> Prev
          onPrev?.()
        }
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [enableSwipe, onNext, onPrev])
}
