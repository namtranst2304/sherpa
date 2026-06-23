import { useState, useEffect } from "react";

export function useScrollSpy(
  itemIds: string[],
  offset: number = 120,
  forcedActiveId?: string
) {
  const [activeId, setActiveId] = useState<string>(forcedActiveId || "");

  useEffect(() => {
    if (forcedActiveId) {
      setActiveId(forcedActiveId);
      return;
    }

    const handleScroll = () => {
      const sections = itemIds.map(id => document.getElementById(id));
      let currentId = "";
      
      for (const section of sections) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= offset) {
            currentId = section.id;
          }
        }
      }
      
      setActiveId(prev => currentId !== prev ? currentId : prev);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [itemIds, forcedActiveId, offset]);

  return activeId;
}
