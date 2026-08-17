"use client"

import { useCallback, useSyncExternalStore } from "react"

const WISHLIST_STORAGE_KEY = "sherpa_wishlist_v1"
const CHECKPOINTS_STORAGE_KEY = "sherpa_checkpoints_v1"

// Custom event to sync state across same-tab components
const SYNC_EVENT = "sherpa_storage_sync"

function notifySync() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SYNC_EVENT))
  }
}

// ─── WISHLIST STORE ─────────────────────────────────────────────────────────

function getWishlistSnapshot(): string {
  if (typeof window === "undefined") return "[]"
  try {
    return localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]"
  } catch {
    return "[]"
  }
}

function getWishlistServerSnapshot(): string {
  return "[]"
}

function subscribeStore(callback: () => void) {
  if (typeof window === "undefined") return () => {}
  window.addEventListener("storage", callback)
  window.addEventListener(SYNC_EVENT, callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener(SYNC_EVENT, callback)
  }
}

export function useWishlist() {
  const rawList = useSyncExternalStore(
    subscribeStore,
    getWishlistSnapshot,
    getWishlistServerSnapshot
  )

  const wishlist = (() => {
    try {
      const parsed = JSON.parse(rawList)
      return Array.isArray(parsed) ? (parsed as string[]) : []
    } catch {
      return []
    }
  })()

  const isWishlisted = useCallback(
    (name: string) => wishlist.includes(name),
    [wishlist]
  )

  const toggleWishlist = useCallback((name: string) => {
    try {
      const current = (() => {
        try {
          const parsed = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || "[]")
          return Array.isArray(parsed) ? (parsed as string[]) : []
        } catch {
          return []
        }
      })()

      const next = current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name]

      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next))
      notifySync()
    } catch (e) {
      console.error("Failed to update wishlist:", e)
    }
  }, [])

  return { wishlist, isWishlisted, toggleWishlist }
}

// ─── CHECKPOINTS STORE ──────────────────────────────────────────────────────

type CheckpointsMap = Record<string, string[]> // activitySlug -> array of completed encounterIds

function getCheckpointsSnapshot(): string {
  if (typeof window === "undefined") return "{}"
  try {
    return localStorage.getItem(CHECKPOINTS_STORAGE_KEY) || "{}"
  } catch {
    return "{}"
  }
}

function getCheckpointsServerSnapshot(): string {
  return "{}"
}

export function useCheckpoints() {
  const rawMap = useSyncExternalStore(
    subscribeStore,
    getCheckpointsSnapshot,
    getCheckpointsServerSnapshot
  )

  const checkpoints = (() => {
    try {
      const parsed = JSON.parse(rawMap)
      return (parsed && typeof parsed === "object" ? parsed : {}) as CheckpointsMap
    } catch {
      return {} as CheckpointsMap
    }
  })()

  const isEncounterCompleted = useCallback(
    (activitySlug: string, encounterId: string) => {
      return Boolean(checkpoints[activitySlug]?.includes(encounterId))
    },
    [checkpoints]
  )

  const toggleEncounterCompleted = useCallback(
    (activitySlug: string, encounterId: string) => {
      try {
        const current = (() => {
          try {
            const parsed = JSON.parse(localStorage.getItem(CHECKPOINTS_STORAGE_KEY) || "{}")
            return (parsed && typeof parsed === "object" ? parsed : {}) as CheckpointsMap
          } catch {
            return {} as CheckpointsMap
          }
        })()

        const list = current[activitySlug] || []
        const nextList = list.includes(encounterId)
          ? list.filter((id) => id !== encounterId)
          : [...list, encounterId]

        const next = { ...current, [activitySlug]: nextList }
        localStorage.setItem(CHECKPOINTS_STORAGE_KEY, JSON.stringify(next))
        notifySync()
      } catch (e) {
        console.error("Failed to update checkpoints:", e)
      }
    },
    []
  )

  const clearActivityCheckpoints = useCallback((activitySlug: string) => {
    try {
      const current = (() => {
        try {
          const parsed = JSON.parse(localStorage.getItem(CHECKPOINTS_STORAGE_KEY) || "{}")
          return (parsed && typeof parsed === "object" ? parsed : {}) as CheckpointsMap
        } catch {
          return {} as CheckpointsMap
        }
      })()

      const next = { ...current, [activitySlug]: [] }
      localStorage.setItem(CHECKPOINTS_STORAGE_KEY, JSON.stringify(next))
      notifySync()
    } catch (e) {
      console.error("Failed to clear checkpoints:", e)
    }
  }, [])

  return {
    checkpoints,
    isEncounterCompleted,
    toggleEncounterCompleted,
    clearActivityCheckpoints,
  }
}
