"use client";

import { useState, useEffect } from "react";
import { DoorOverlay } from "@/components/common/DoorOverlay";

export function TimelineDoorTransition() {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Open the doors immediately after mount
    const timer = setTimeout(() => {
      setIsOpened(true);
    }, 100);

    // Unmount the component after animation
    const unmountTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      <DoorOverlay isOpened={isOpened} duration={1.0} />
    </div>
  );
}
