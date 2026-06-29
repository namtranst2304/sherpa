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
  const isAnimatingRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);

  const scrollToIndex = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalItems - 1));
    if (clamped === currentIndexRef.current && isAnimatingRef.current) return;

    currentIndexRef.current = clamped;
    isAnimatingRef.current = true;

    const container = document.getElementById(containerId);
    if (!container) return;

    const targetTop = clamped * container.clientHeight;
    container.scrollTo({ top: targetTop, behavior: "smooth" });

    // Wait for scroll to finish, then unlock
    const checkDone = () => {
      const diff = Math.abs(container.scrollTop - targetTop);
      if (diff < 2) {
        isAnimatingRef.current = false;
      } else {
        requestAnimationFrame(checkDone);
      }
    };
    requestAnimationFrame(checkDone);

    // Failsafe unlock
    setTimeout(() => { isAnimatingRef.current = false; }, 1200);
  }, [totalItems, containerId]);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const WHEEL_THRESHOLD = 80; // Accumulate small wheel deltas before triggering

    const onWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      
      // Check if we are scrolling inside a Radix ScrollArea
      const scrollableNode = target?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null;
      if (scrollableNode) {
        const isAtTop = scrollableNode.scrollTop <= 0;
        const isAtBottom = scrollableNode.scrollTop + scrollableNode.clientHeight >= scrollableNode.scrollHeight - 1;
        
        const scrollingUp = e.deltaY < 0;
        const scrollingDown = e.deltaY > 0;

        // Allow default scroll if we are not at the edges
        if (scrollingUp && !isAtTop) return;
        if (scrollingDown && !isAtBottom) return;
      }

      e.preventDefault();

      if (isAnimatingRef.current) return;

      wheelAccumulatorRef.current += e.deltaY;

      if (Math.abs(wheelAccumulatorRef.current) >= WHEEL_THRESHOLD) {
        const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
        wheelAccumulatorRef.current = 0;
        scrollToIndex(currentIndexRef.current + direction);
      }
    };

    // Touch handling for mobile
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      const scrollableNode = target?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null;
      // We store the start node to check bounds in touchEnd/touchMove if needed, 
      // but simple fallback is just ignoring if it's over a scrollable node entirely
      if (scrollableNode) return; 

      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      const scrollableNode = target?.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null;
      if (scrollableNode) return;

      if (isAnimatingRef.current) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        scrollToIndex(currentIndexRef.current + (diff > 0 ? 1 : -1));
      }
    };

    // Keep currentIndexRef in sync when scrolled by EraNav (scrollIntoView)
    const onScroll = () => {
      if (isAnimatingRef.current) return;
      const vh = container.clientHeight;
      const idx = Math.round(container.scrollTop / vh);
      currentIndexRef.current = idx;
    };

    // Keyboard support
    const onKeyDown = (e: KeyboardEvent) => {
      if (isAnimatingRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(currentIndexRef.current - 1);
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [scrollToIndex, containerId]);
}
