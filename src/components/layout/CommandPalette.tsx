'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import {
  Search,
  Swords,
  ShieldAlert,
  Crown,
  Target,
  Database,
  History,
  X,
  CornerDownLeft,
} from 'lucide-react'
import { DESTINY_ACTIVITIES } from '@/config/constants'
import { getDestinyTimelineSummaries } from '@/data/timeline/index'
import { getLeanExoticWeaponsData, getLeanExoticArmorData } from '@/data/index'
import { cn } from '@/lib/utils'
import { MagneticButton } from '../common/MagneticButton'

interface SearchItem {
  id: string
  title: string
  subtitle: string
  href: string
  category:
    | 'Raid'
    | 'Dungeon'
    | 'Pantheon'
    | 'Exotic Mission'
    | 'Database'
    | 'Timeline'
    | 'Weapon'
    | 'Armor'
  color: 'cyan' | 'green' | 'yellow' | 'orange' | 'zinc'
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [dynamicItems, setDynamicItems] = React.useState<SearchItem[]>([])
  
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Build static index
  const staticItems = React.useMemo<SearchItem[]>(() => {
    const items: SearchItem[] = [
      {
        id: 'timeline-root',
        title: 'Destiny 2 Timeline',
        subtitle: 'Lịch sử điện ảnh toàn bộ các kỷ nguyên Destiny',
        href: '/timeline',
        category: 'Timeline',
        color: 'orange',
      },
    ]

    Object.values(DESTINY_ACTIVITIES).forEach((cat) => {
      let categoryType: SearchItem['category'] = 'Database'
      let categoryColor: SearchItem['color'] = 'zinc'

      if (cat.id === 'raids') {
        categoryType = 'Raid'
        categoryColor = 'cyan'
      } else if (cat.id === 'dungeons') {
        categoryType = 'Dungeon'
        categoryColor = 'green'
      } else if (cat.id === 'pantheon') {
        categoryType = 'Pantheon'
        categoryColor = 'cyan'
      } else if (cat.id === 'exotic-missions') {
        categoryType = 'Exotic Mission'
        categoryColor = 'yellow'
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

  // Load dynamic data on mount
  React.useEffect(() => {
    let mounted = true
    Promise.all([
      getDestinyTimelineSummaries().catch(() => []),
      getLeanExoticWeaponsData().catch(() => []),
      getLeanExoticArmorData().catch(() => [])
    ]).then(([eras, weapons, armors]) => {
      if (!mounted) return
      
      const dyn: SearchItem[] = []
      
      eras.forEach(e => {
        dyn.push({
          id: `era-${e.id}`,
          title: e.name,
          subtitle: 'Kỷ nguyên Timeline',
          href: `/timeline#${e.id}`,
          category: 'Timeline',
          color: 'orange'
        })
      })

      weapons.forEach(w => {
        const damageColor = 
          w.damageType === 'Solar' ? 'orange' :
          w.damageType === 'Void' ? 'zinc' : // no purple yet, fallback zinc
          w.damageType === 'Arc' ? 'cyan' :
          w.damageType === 'Strand' ? 'green' : 'zinc'

        dyn.push({
          id: `wep-${w.id}`,
          title: w.name,
          subtitle: `${w.weaponType} • ${w.damageType}`,
          href: `/database/exotic-weapons#${w.id}`,
          category: 'Weapon',
          color: damageColor as SearchItem['color']
        })
      })

      armors.forEach(a => {
        dyn.push({
          id: `arm-${a.id}`,
          title: a.name,
          subtitle: `${a.class} • ${a.type}`,
          href: `/database/exotic-armor#${a.id}`,
          category: 'Armor',
          color: 'zinc'
        })
      })

      setDynamicItems(dyn)
    })
    
    return () => { mounted = false }
  }, [])

  const allItems = React.useMemo(() => [...staticItems, ...dynamicItems], [staticItems, dynamicItems])

  // Filter items based on query
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return staticItems // show static by default
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q),
      )
      .slice(0, 15) // Limit to 15 results for performance
  }, [allItems, query, staticItems])

  const closePalette = () => {
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }

  // Global hotkey Ctrl+K / Cmd+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsOpen((prev) => {
          if (prev) {
            setQuery('')
            setSelectedIndex(0)
            return false
          }
          return true
        })
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        closePalette()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSelect = (href: string) => {
    closePalette()
    router.push(href)
  }

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0,
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1,
      )
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault()
      handleSelect(filteredItems[selectedIndex].href)
    }
  }

  // Scroll active item into view
  React.useEffect(() => {
    const activeEl = listRef.current?.querySelector(
      `[data-index="${selectedIndex}"]`,
    )
    if (activeEl && typeof activeEl.scrollIntoView === 'function') {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  const getCategoryIcon = (category: SearchItem['category']) => {
    switch (category) {
      case 'Raid':
        return <Swords className="h-3.5 w-3.5 text-neon-cyan" />
      case 'Dungeon':
        return <ShieldAlert className="h-3.5 w-3.5 text-neon-green" />
      case 'Pantheon':
        return <Crown className="h-3.5 w-3.5 text-neon-cyan" />
      case 'Exotic Mission':
        return <Target className="h-3.5 w-3.5 text-neon-yellow" />
      case 'Timeline':
        return <History className="h-3.5 w-3.5 text-neon-orange" />
      case 'Weapon':
      case 'Armor':
      default:
        return <Database className="h-3.5 w-3.5 text-zinc-400" />
    }
  }

  const getCategoryBadgeClass = (color: SearchItem['color']) => {
    switch (color) {
      case 'cyan':
        return 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/40 shadow-[0_0_8px_rgba(0,243,255,0.2)]'
      case 'green':
        return 'bg-neon-green/10 text-neon-green border-neon-green/40 shadow-[0_0_8px_rgba(57,255,20,0.2)]'
      case 'yellow':
        return 'bg-neon-yellow/10 text-neon-yellow border-neon-yellow/40 shadow-[0_0_8px_rgba(255,234,0,0.2)]'
      case 'orange':
        return 'bg-neon-orange/10 text-neon-orange border-neon-orange/40 shadow-[0_0_8px_rgba(255,100,0,0.2)]'
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700'
    }
  }

  return (
    <>
      {/* Search trigger button for TopNav */}
      <MagneticButton
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 rounded-none border border-zinc-800 bg-zinc-950/80 px-3 py-1.5 font-mono text-xs text-zinc-400 transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/10 hover:text-white hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
        title="Tìm kiếm nhanh (Ctrl + K)"
      >
        <Search className="h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-neon-cyan" />
        <span className="hidden sm:inline-block">Tìm kiếm...</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 md:inline-flex group-hover:border-neon-cyan/40 group-hover:bg-neon-cyan/20 group-hover:text-neon-cyan transition-colors">
          <span className="text-[11px]">⌘</span>K
        </kbd>
      </MagneticButton>

      {/* Modal Backdrop & Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10dvh] md:pt-[15dvh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={closePalette}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative flex w-full max-w-2xl flex-col overflow-hidden border-2 border-neon-cyan/40 bg-zinc-950/95 shadow-[0_0_50px_rgba(0,243,255,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scanlines Overlay for modal */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-10 mix-blend-overlay [background-image:repeating-linear-gradient(transparent,transparent_2px,black_2px,black_4px)]" />

              {/* Top Bar Glow & Brackets */}
              <div className="pointer-events-none absolute top-0 left-0 z-20 h-3 w-3 border-t-2 border-l-2 border-neon-cyan" />
              <div className="pointer-events-none absolute top-0 right-0 z-20 h-3 w-3 border-t-2 border-r-2 border-neon-cyan" />
              <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-3 w-3 border-b-2 border-l-2 border-neon-cyan" />
              <div className="pointer-events-none absolute right-0 bottom-0 z-20 h-3 w-3 border-r-2 border-b-2 border-neon-cyan" />

              {/* Input Header */}
              <div className="relative z-10 flex items-center gap-3 border-b border-zinc-800 bg-zinc-900/80 px-4 py-4">
                <Search className="h-5 w-5 shrink-0 text-neon-cyan" />
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
                  className="w-full bg-transparent font-mono text-sm text-white placeholder-zinc-500 outline-none sm:text-base"
                  autoComplete="off"
                  spellCheck="false"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setSelectedIndex(0)
                      inputRef.current?.focus()
                    }}
                    className="rounded bg-zinc-800/50 p-1 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 font-mono text-xs text-zinc-400">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Results List */}
              <div
                ref={listRef}
                className="relative z-10 max-h-[60vh] space-y-1 overflow-y-auto p-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-neon-cyan/40"
              >
                {filteredItems.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-3 font-mono text-sm text-zinc-500">
                    <Search className="h-8 w-8 opacity-20" />
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
                          'group flex cursor-pointer items-center justify-between gap-3 border-l-2 px-3 py-3 font-mono transition-all',
                          isSelected
                            ? 'border-neon-cyan bg-neon-cyan/15 text-white'
                            : 'border-transparent text-zinc-300 hover:bg-zinc-900/60',
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className={cn(
                            "shrink-0 border border-zinc-800 p-2 transition-colors",
                            isSelected ? "bg-neon-cyan/20 border-neon-cyan/50" : "bg-zinc-900"
                          )}>
                            {getCategoryIcon(item.category)}
                          </div>
                          <div className="truncate">
                            <p className={cn(
                              "truncate text-sm font-bold tracking-wide uppercase transition-colors",
                              isSelected ? "text-neon-cyan" : "text-white"
                            )}>
                              {item.title}
                            </p>
                            <p className="mt-0.5 truncate text-[10px] sm:text-xs text-zinc-400">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <span
                            className={cn(
                              'border px-2 py-1 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase transition-colors',
                              getCategoryBadgeClass(item.color),
                            )}
                          >
                            {item.category}
                          </span>
                          {isSelected && (
                            <CornerDownLeft className="hidden h-4 w-4 text-neon-cyan sm:block" />
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
