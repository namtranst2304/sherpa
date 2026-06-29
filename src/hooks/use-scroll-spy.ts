import { useState, useEffect, useRef } from "react";

export function useScrollSpy(
  itemIds: string[],
  offset: number = 120,
  forcedActiveId?: string
) {
  const [activeId, setActiveId] = useState<string>(forcedActiveId || "");
  // Cache DOM element references to avoid getElementById on every scroll event
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (forcedActiveId) {
      setActiveId(forcedActiveId);
      return;
    }

    // Build element cache
    const cache = new Map<string, HTMLElement>();
    for (const id of itemIds) {
      const el = document.getElementById(id);
      if (el) cache.set(id, el);
    }
    elementsRef.current = cache;

    // RAF-throttled scroll handler — runs at most once per animation frame
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId !== null) return; // Already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = null;
        let currentId = "";
        
        for (const id of itemIds) {
          const section = cache.get(id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= offset) {
              currentId = id;
            }
          }
        }
        
        setActiveId(prev => currentId !== prev ? currentId : prev);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [itemIds, forcedActiveId, offset]);

  return activeId;
}

