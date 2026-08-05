import { useState, useEffect, useRef } from "react"

export function useScrollSpy(
  itemIds: string[],
  offset: number = 120,
  forcedActiveId?: string
) {
  const [spiedId, setSpiedId] = useState("")
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    if (forcedActiveId) return

    const cache = new Map<string, HTMLElement>()
    for (const id of itemIds) {
      const el = document.getElementById(id)
      if (el) cache.set(id, el)
    }
    elementsRef.current = cache

    let rafId: number | null = null
    const handleScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        let currentId = ""

        for (const id of itemIds) {
          const section = cache.get(id)
          if (section) {
            const rect = section.getBoundingClientRect()
            if (rect.top <= offset) {
              currentId = id
            }
          }
        }

        setSpiedId((prev) => (currentId !== prev ? currentId : prev))
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [itemIds, forcedActiveId, offset])

  return forcedActiveId || spiedId
}
