import * as React from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Keyboard,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  useSfxStore,
  toggleSfx,
  playNavSound,
  playHoverSound,
} from '@/lib/cyber-audio'
import { useEncounterHotkeys } from '@/hooks/use-encounter-hotkeys'
import { MagneticButton } from '@/components/common/MagneticButton'
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal'

export interface NavItem {
  id: string
  title: string
  href?: string
}

interface EncounterNavigatorHUDProps {
  items: NavItem[]
  currentId?: string
  onNavigate: (item: NavItem) => void
}

export function EncounterNavigatorHUD({
  items,
  currentId,
  onNavigate,
}: EncounterNavigatorHUDProps) {
  const sfxOn = useSfxStore()
  const [showShortcuts, setShowShortcuts] = React.useState<boolean>(false)

  const currentIndex = items.findIndex((item) => item.id === currentId)
  const effectiveIndex = currentIndex >= 0 ? currentIndex : 0

  const prevItem = effectiveIndex > 0 ? items[effectiveIndex - 1] : null
  const nextItem =
    effectiveIndex < items.length - 1 ? items[effectiveIndex + 1] : null
  const currentItem = items[effectiveIndex]

  const handlePrev = React.useCallback(() => {
    if (prevItem) {
      playNavSound()
      onNavigate(prevItem)
    }
  }, [prevItem, onNavigate])

  const handleNext = React.useCallback(() => {
    if (nextItem) {
      playNavSound()
      onNavigate(nextItem)
    }
  }, [nextItem, onNavigate])


  const handleJumpToIndex = React.useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        playNavSound()
        onNavigate(items[index])
      }
    },
    [items, onNavigate],
  )

  // Register hotkeys & swipe gesture
  useEncounterHotkeys({
    onNext: handleNext,
    onPrev: handlePrev,
    onJumpToIndex: handleJumpToIndex,
    onToggleShortcuts: () => setShowShortcuts((prev) => !prev),
    enableSwipe: true,
  })

  const totalEncounters = items.filter(
    (it) =>
      it.id !== 'overview' &&
      it.id !== 'secrets' &&
      it.id !== 'walkthrough' &&
      it.id !== 'catalyst',
  ).length

  if (!items.length) return null

  return (
    <>
      {/* Floating Action HUD Bar */}
      <div className="pointer-events-auto fixed bottom-20 left-1/2 z-40 w-auto max-w-[95vw] -translate-x-1/2 select-none md:bottom-8 sm:max-w-xl">
        <div className="relative flex items-center gap-1.5 border-2 border-neon-cyan/40 bg-[#08090d]/90 cyber-grid p-1.5 shadow-[0_0_30px_rgba(0,243,255,0.25)] backdrop-blur-xl sm:gap-2 sm:p-2">
          {/* Cyber Corner Brackets */}
          <div className="pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-neon-cyan" />
          <div className="pointer-events-none absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 border-neon-cyan" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-neon-cyan" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 border-neon-cyan" />

          {/* Top subtle scan line */}
          <div className="pointer-events-none absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent" />

          {/* Prev Button */}
          <MagneticButton
            type="button"
            onClick={handlePrev}
            onMouseEnter={playHoverSound}
            disabled={!prevItem}
            title={
              prevItem
                ? `Encounter trước: ${prevItem.title} (Phím [K] hoặc [←])`
                : 'Đã ở đầu trang'
            }
            className={cn(
              'flex min-h-11 min-w-11 items-center justify-center border px-2 font-mono text-xs font-bold uppercase transition-all outline-none sm:min-w-10 sm:px-3',
              prevItem
                ? 'cursor-pointer border-neon-cyan/40 bg-zinc-900/80 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_12px_rgba(0,243,255,0.4)] active:scale-95'
                : 'cursor-not-allowed border-zinc-800/50 bg-zinc-950/50 text-zinc-600 opacity-40',
            )}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="ml-1 hidden text-[11px] font-black md:inline-block">
              PREV
            </span>
          </MagneticButton>

          {/* Center Info & Quick Checkpoint Status */}
          <div className="flex min-h-11 max-w-[280px] flex-1 items-center justify-between gap-2 border border-zinc-800 bg-black/60 px-2 py-1 sm:max-w-[340px] sm:gap-3 sm:px-4">
            <div className="flex min-w-0 flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="max-w-[130px] truncate font-mono text-[9px] font-black tracking-widest text-neon-yellow uppercase sm:max-w-[180px] sm:text-[10px]">
                  {currentItem?.title || 'Overview'}
                </span>
                {totalEncounters > 0 && (
                  <span className="py-0.2 bg-zinc-800 px-1 font-mono text-[9px] font-bold text-zinc-300">
                    {effectiveIndex + 1}/{items.length}
                  </span>
                )}
              </div>

              {/* Progress mini dots */}
              <div className="mt-1 flex items-center gap-1">
                {items.map((it, idx) => {
                  const itActive = it.id === currentId

                  return (
                    <div
                      key={`hud-dot-${it.id}`}
                      onClick={() => handleJumpToIndex(idx)}
                      title={it.title}
                      className={cn(
                        'h-1.5 cursor-pointer rounded-none transition-all',
                        itActive
                          ? 'w-4 bg-neon-cyan shadow-[0_0_8px_#00f3ff]'
                          : 'w-2 bg-zinc-700 hover:bg-zinc-500',
                      )}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <MagneticButton
            type="button"
            onClick={handleNext}
            onMouseEnter={playHoverSound}
            disabled={!nextItem}
            title={
              nextItem
                ? `Encounter kế tiếp: ${nextItem.title} (Phím [J] hoặc [→])`
                : 'Đã ở cuối trang'
            }
            className={cn(
              'flex min-h-11 min-w-11 items-center justify-center border px-2 font-mono text-xs font-bold uppercase transition-all outline-none sm:min-w-10 sm:px-3',
              nextItem
                ? 'cursor-pointer border-neon-cyan/40 bg-zinc-900/80 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_12px_rgba(0,243,255,0.4)] active:scale-95'
                : 'cursor-not-allowed border-zinc-800/50 bg-zinc-950/50 text-zinc-600 opacity-40',
            )}
          >
            <span className="mr-1 hidden text-[11px] font-black md:inline-block">
              NEXT
            </span>
            <ChevronRight className="h-5 w-5" />
          </MagneticButton>

          {/* Sound Toggle */}
          <MagneticButton
            type="button"
            onClick={() => toggleSfx()}
            onMouseEnter={playHoverSound}
            className={cn(
              'flex min-h-11 w-11 cursor-pointer items-center justify-center border bg-zinc-900/80 transition-all outline-none sm:w-9',
              sfxOn
                ? 'border-neon-cyan/30 text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/15'
                : 'border-zinc-800 text-zinc-600 hover:text-zinc-400',
            )}
            title={
              sfxOn ? 'Âm thanh Sci-Fi: Đang BẬT' : 'Âm thanh Sci-Fi: Đang TẮT'
            }
          >
            {sfxOn ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
          </MagneticButton>

          {/* Keyboard Shortcuts Trigger Button */}
          <MagneticButton
            type="button"
            onClick={() => setShowShortcuts(true)}
            onMouseEnter={playHoverSound}
            className="hidden min-h-11 w-9 cursor-pointer items-center justify-center border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-all outline-none hover:border-neon-cyan/50 hover:bg-neon-cyan/10 hover:text-neon-cyan sm:flex"
            title="Bảng phím tắt Gamer (Phím [?])"
          >
            <Keyboard className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>

      {/* Cyber Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <KeyboardShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}
    </>
  )
}
