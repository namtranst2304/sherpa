"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, Swords, ShieldAlert, Crown, Target, Database, History, X, CornerDownLeft } from "lucide-react"
import { DESTINY_ACTIVITIES } from "@/config/constants"
import { cn } from "@/lib/utils"

interface SearchItem {
  id: string
  title: string
  subtitle: string
  href: string
  category: "Raid" | "Dungeon" | "Pantheon" | "Exotic Mission" | "Database" | "Timeline"
  color: "cyan" | "green" | "yellow" | "orange" | "zinc"
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Build searchable index from activities + timeline
  const allItems = React.useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [
      {
        id: "timeline",
        title: "Destiny 2 Timeline",
        subtitle: "Lịch sử điện ảnh toàn bộ các kỷ nguyên Destiny",
        href: "/timeline",
        category: "Timeline",
        color: "orange",
      },
    ]

    Object.values(DESTINY_ACTIVITIES).forEach((cat) => {
      let categoryType: SearchItem["category"] = "Database"
      let categoryColor: SearchItem["color"] = "zinc"

      if (cat.id === "raids") {
        categoryType = "Raid"
        categoryColor = "cyan"
      } else if (cat.id === "dungeons") {
        categoryType = "Dungeon"
        categoryColor = "green"
      } else if (cat.id === "pantheon") {
        categoryType = "Pantheon"
        categoryColor = "cyan"
      } else if (cat.id === "exotic-missions") {
        categoryType = "Exotic Mission"
        categoryColor = "yellow"
      }

      cat.items.forEach((item) => {
        items.push({
          id: `${cat.id}-${item.title}`,
          title: item.title,
          subtitle: item.description,
          href: item.href,
          category: categoryType,
          color: categoryColor,
        })
      })
    })

    return items
  }, [])

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allItems
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    )
  }, [allItems, query])

  const closePalette = () => {
    setIsOpen(false)
    setQuery("")
    setSelectedIndex(0)
  }

  // Global hotkey Ctrl+K / Cmd+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setIsOpen((prev) => {
          if (prev) {
            setQuery("")
            setSelectedIndex(0)
            return false
          }
          return true
        })
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        closePalette()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  const handleSelect = (href: string) => {
    closePalette()
    router.push(href)
  }

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault()
      handleSelect(filteredItems[selectedIndex].href)
    }
  }

  // Scroll active item into view
  React.useEffect(() => {
    const activeEl = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`)
    if (activeEl && typeof activeEl.scrollIntoView === "function") {
      activeEl.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  const getCategoryIcon = (category: SearchItem["category"]) => {
    switch (category) {
      case "Raid": return <Swords className="w-3.5 h-3.5 text-neon-cyan" />
      case "Dungeon": return <ShieldAlert className="w-3.5 h-3.5 text-neon-green" />
      case "Pantheon": return <Crown className="w-3.5 h-3.5 text-neon-cyan" />
      case "Exotic Mission": return <Target className="w-3.5 h-3.5 text-neon-yellow" />
      case "Timeline": return <History className="w-3.5 h-3.5 text-neon-orange" />
      default: return <Database className="w-3.5 h-3.5 text-zinc-400" />
    }
  }

  const getCategoryBadgeClass = (color: SearchItem["color"]) => {
    switch (color) {
      case "cyan": return "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/40"
      case "green": return "bg-neon-green/10 text-neon-green border-neon-green/40"
      case "yellow": return "bg-neon-yellow/10 text-neon-yellow border-neon-yellow/40"
      case "orange": return "bg-neon-orange/10 text-neon-orange border-neon-orange/40"
      default: return "bg-zinc-800 text-zinc-400 border-zinc-700"
    }
  }

  return (
    <>
      {/* Search trigger button for TopNav */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-none border border-zinc-800 bg-zinc-950/80 hover:bg-neon-cyan/10 hover:border-neon-cyan/40 text-zinc-400 hover:text-white transition-all text-xs font-mono group"
        title="Tìm kiếm nhanh (Ctrl + K)"
      >
        <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-neon-cyan transition-colors" />
        <span className="hidden sm:inline-block">Tìm kiếm...</span>
        <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-400 rounded">
          <span className="text-[11px]">⌘</span>K
        </kbd>
      </button>

      {/* Modal Backdrop & Command Palette */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closePalette}
        >
          <div
            className="relative w-full max-w-2xl bg-zinc-950/95 border-2 border-neon-cyan/40 shadow-[0_0_50px_rgba(0,243,255,0.25)] flex flex-col overflow-hidden cyber-grid animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Glow & Brackets */}
            <div className="pointer-events-none absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan z-20" />
            <div className="pointer-events-none absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan z-20" />
            <div className="pointer-events-none absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan z-20" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan z-20" />

            {/* Input Header */}
            <div className="relative flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-zinc-900/60">
              <Search className="w-5 h-5 text-neon-cyan shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSelectedIndex(0)
                }}
                onKeyDown={handleKeyDownInInput}
                placeholder="Tìm Raid, Dungeon, Vũ khí, Kỷ nguyên..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 font-mono outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("")
                    setSelectedIndex(0)
                  }}
                  className="text-zinc-500 hover:text-zinc-300 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : null}
            </div>

            {/* Results List */}
            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto p-2 space-y-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-neon-cyan/40"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-zinc-500 font-mono text-xs">
                  Không tìm thấy kết quả nào cho &quot;{query}&quot;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex
                  return (
                    <div
                      key={item.id}
                      data-index={index}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex items-center justify-between gap-3 px-3 py-2.5 cursor-pointer font-mono transition-all border-l-2",
                        isSelected
                          ? "bg-neon-cyan/10 border-neon-cyan text-white"
                          : "border-transparent text-zinc-300 hover:bg-zinc-900/60"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-1.5 bg-zinc-900 border border-zinc-800 shrink-0">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div className="truncate">
                          <p className="text-xs sm:text-sm font-bold tracking-wide uppercase truncate">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-zinc-500 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            "text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 border",
                            getCategoryBadgeClass(item.color)
                          )}
                        >
                          {item.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-neon-cyan hidden sm:block" />
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer helper */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-800 bg-zinc-950 text-[10px] font-mono text-zinc-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded">↑</kbd>{" "}
                  <kbd className="px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded">↓</kbd> để di chuyển
                </span>
                <span>
                  <kbd className="px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded">Enter</kbd> để chọn
                </span>
              </div>
              <span>
                <kbd className="px-1 py-0.5 bg-zinc-900 border border-zinc-800 rounded">ESC</kbd> để đóng
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
