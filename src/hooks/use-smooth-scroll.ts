"use client";

import { useRef, useEffect, useCallback } from "react";

export function useSmoothScroll({ 
  totalItems, 
  containerId = "timeline-scroll-container" 
}: { 
  totalItems: number; 
  containerId?: string;
}) {
  const currentIndexRef = useRef(0);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalItems - 1));
    if (clamped === currentIndexRef.current) return;

    currentIndexRef.current = clamped;

    const container = document.getElementById(containerId);
    if (!container) return;

    const targetTop = clamped * container.clientHeight;
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  }, [totalItems, containerId]);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Track current index from scroll position (for EraNav sync & keyboard nav)
    const onScroll = () => {
      const vh = container.clientHeight;
      const idx = Math.round(container.scrollTop / vh);
      currentIndexRef.current = idx;
    };

    // Keyboard support
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current - 1);
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [scrollToIndex, containerId]);
}
