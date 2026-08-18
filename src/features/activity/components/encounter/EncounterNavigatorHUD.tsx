import * as React from 'react'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Volume2,
  VolumeX,
  Keyboard,
  Sparkles,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCheckpoints } from '@/hooks/use-sherpa-store'
import {
  useSfxStore,
  toggleSfx,
  playNavSound,
  playClearSound,
  playHoverSound,
} from '@/lib/cyber-audio'
import { useEncounterHotkeys } from '@/hooks/use-encounter-hotkeys'

export interface NavItem {
  id: string
  title: string
  href?: string
}

interface EncounterNavigatorHUDProps {
  items: NavItem[]
  currentId?: string
  activityTitle: string
  onNavigate: (item: NavItem) => void
}

export function EncounterNavigatorHUD({
  items,
  currentId,
  activityTitle,
  onNavigate,
}: EncounterNavigatorHUDProps) {
  const sfxOn = useSfxStore()
  const [showShortcuts, setShowShortcuts] = React.useState<boolean>(false)
  const { isEncounterCompleted, toggleEncounterCompleted } = useCheckpoints()

  const currentIndex = items.findIndex((item) => item.id === currentId)
  const effectiveIndex = currentIndex >= 0 ? currentIndex : 0

  const prevItem = effectiveIndex > 0 ? items[effectiveIndex - 1] : null
  const nextItem =
    effectiveIndex < items.length - 1 ? items[effectiveIndex + 1] : null
  const currentItem = items[effectiveIndex]

  const isCurrentEncounter =
    currentItem &&
    currentItem.id !== 'overview' &&
    currentItem.id !== 'secrets' &&
    currentItem.id !== 'walkthrough' &&
    currentItem.id !== 'catalyst'

  const isCurrentCompleted =
    isCurrentEncounter && currentItem
      ? isEncounterCompleted(activityTitle, currentItem.id)
      : false

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

  const handleToggleClear = React.useCallback(() => {
    if (isCurrentEncounter && currentItem) {
      const willBeCompleted = !isCurrentCompleted
      if (willBeCompleted) {
        playClearSound()
      } else {
        playNavSound()
      }
      toggleEncounterCompleted(activityTitle, currentItem.id)
    }
  }, [
    isCurrentEncounter,
    currentItem,
    isCurrentCompleted,
    activityTitle,
    toggleEncounterCompleted,
  ])

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
    onToggleClear: handleToggleClear,
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
      <div className="pointer-events-auto fixed bottom-3 left-1/2 z-40 w-auto max-w-[95vw] -translate-x-1/2 select-none sm:bottom-6 sm:max-w-xl">
        <div className="relative flex items-center gap-1.5 border-2 border-neon-cyan/40 bg-[#08090d]/90 cyber-grid p-1.5 shadow-[0_0_30px_rgba(0,243,255,0.25)] backdrop-blur-xl sm:gap-2 sm:p-2">
          {/* Cyber Corner Brackets */}
          <div className="pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-neon-cyan" />
          <div className="pointer-events-none absolute top-0 right-0 h-2.5 w-2.5 border-t-2 border-r-2 border-neon-cyan" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2 border-neon-cyan" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 border-neon-cyan" />

          {/* Top subtle scan line */}
          <div className="pointer-events-none absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent" />

          {/* Prev Button */}
          <button
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
          </button>

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
                  const itCleared =
                    it.id !== 'overview' &&
                    it.id !== 'secrets' &&
                    it.id !== 'walkthrough' &&
                    it.id !== 'catalyst' &&
                    isEncounterCompleted(activityTitle, it.id)

                  return (
                    <div
                      key={`hud-dot-${it.id}`}
                      onClick={() => handleJumpToIndex(idx)}
                      title={it.title}
                      className={cn(
                        'h-1.5 cursor-pointer rounded-none transition-all',
                        itActive
                          ? 'w-4 bg-neon-cyan shadow-[0_0_8px_#00f3ff]'
                          : itCleared
                            ? 'w-2 bg-neon-green shadow-[0_0_6px_#39ff14]'
                            : 'w-2 bg-zinc-700 hover:bg-zinc-500',
                      )}
                    />
                  )
                })}
              </div>
            </div>

            {/* Quick Checkpoint Action (for encounters) */}
            {isCurrentEncounter && (
              <button
                type="button"
                onClick={handleToggleClear}
                onMouseEnter={playHoverSound}
                className={cn(
                  'flex shrink-0 cursor-pointer items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-all outline-none',
                  isCurrentCompleted
                    ? 'border-neon-green bg-neon-green/20 text-neon-green shadow-[0_0_12px_rgba(57,255,20,0.3)] hover:bg-neon-green/30'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200',
                )}
                title="Đánh dấu đã hoàn thành Encounter này (Phím [C])"
              >
                <CheckCircle2
                  className={cn(
                    'h-3.5 w-3.5',
                    isCurrentCompleted && 'text-neon-green',
                  )}
                />
                <span className="hidden sm:inline">
                  {isCurrentCompleted ? 'Cleared' : 'Clear'}
                </span>
              </button>
            )}
          </div>

          {/* Next Button */}
          <button
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
          </button>

          {/* Sound Toggle */}
          <button
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
          </button>

          {/* Keyboard Shortcuts Trigger Button */}
          <button
            type="button"
            onClick={() => setShowShortcuts(true)}
            onMouseEnter={playHoverSound}
            className="hidden min-h-11 w-9 cursor-pointer items-center justify-center border border-zinc-800 bg-zinc-900/80 text-zinc-400 transition-all outline-none hover:border-neon-cyan/50 hover:bg-neon-cyan/10 hover:text-neon-cyan sm:flex"
            title="Bảng phím tắt Gamer (Phím [?])"
          >
            <Keyboard className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Cyber Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-50 flex animate-in items-center justify-center bg-black/80 p-4 backdrop-blur-md duration-200 fade-in"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="relative w-full max-w-md border-2 border-neon-cyan/60 bg-zinc-950 cyber-grid p-6 shadow-[0_0_40px_rgba(0,243,255,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner brackets */}
            <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-neon-cyan" />
            <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-neon-cyan" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-neon-cyan" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-neon-cyan" />

            <div className="mb-5 flex items-center justify-between border-b border-neon-cyan/30 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-neon-cyan" />
                <h3 className="text-sm font-black tracking-widest text-neon-cyan uppercase glow-text-cyan">
                  Gamer Shortcuts HUD
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShortcuts(false)}
                className="cursor-pointer p-1 text-zinc-400 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
                <span className="text-zinc-300">Encounter kế tiếp</span>
                <div className="flex gap-1">
                  <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-cyan">
                    →
                  </kbd>
                  <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-cyan">
                    J
                  </kbd>
                  <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-cyan">
                    L
                  </kbd>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
                <span className="text-zinc-300">Encounter trước đó</span>
                <div className="flex gap-1">
                  <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-cyan">
                    ←
                  </kbd>
                  <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-cyan">
                    K
                  </kbd>
                  <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-cyan">
                    H
                  </kbd>
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
                <span className="text-zinc-300">
                  Bật/tắt Đã hoàn thành (Clear)
                </span>
                <kbd className="border border-neon-green bg-neon-green/20 px-2.5 py-1 font-bold text-neon-green">
                  C
                </kbd>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
                <span className="text-zinc-300">Nhảy tới Encounter 1 - 9</span>
                <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-yellow">
                  1 ~ 9
                </kbd>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
                <span className="text-zinc-300">
                  Cuộn nhanh tới Bản đồ Callout
                </span>
                <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-zinc-200">
                  M
                </kbd>
              </div>

              <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
                <span className="text-zinc-300">
                  Cuộn nhanh tới Bảng vai trò
                </span>
                <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-zinc-200">
                  R
                </kbd>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-zinc-300">
                  Cử chỉ vuốt màn hình (Mobile)
                </span>
                <span className="text-[11px] font-bold text-neon-cyan">
                  Vuốt Trái / Phải
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-zinc-800 pt-3 text-center">
              <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                sys.hud // press [ESC] to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
