import * as React from "react"
import { ChevronLeft, ChevronRight, CheckCircle2, Volume2, VolumeX, Keyboard, Sparkles, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCheckpoints } from "@/hooks/use-sherpa-store"
import { useSfxStore, toggleSfx, playNavSound, playClearSound, playHoverSound } from "@/lib/cyber-audio"
import { useEncounterHotkeys } from "@/hooks/use-encounter-hotkeys"

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
  const nextItem = effectiveIndex < items.length - 1 ? items[effectiveIndex + 1] : null
  const currentItem = items[effectiveIndex]

  const isCurrentEncounter =
    currentItem &&
    currentItem.id !== "overview" &&
    currentItem.id !== "secrets" &&
    currentItem.id !== "walkthrough" &&
    currentItem.id !== "catalyst"

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
  }, [isCurrentEncounter, currentItem, isCurrentCompleted, activityTitle, toggleEncounterCompleted])

  const handleJumpToIndex = React.useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        playNavSound()
        onNavigate(items[index])
      }
    },
    [items, onNavigate]
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
      it.id !== "overview" &&
      it.id !== "secrets" &&
      it.id !== "walkthrough" &&
      it.id !== "catalyst"
  ).length

  if (!items.length) return null

  return (
    <>
      {/* Floating Action HUD Bar */}
      <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-xl w-auto pointer-events-auto select-none">
        <div className="relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-[#08090d]/90 backdrop-blur-xl border-2 border-neon-cyan/40 shadow-[0_0_30px_rgba(0,243,255,0.25)] cyber-grid">
          {/* Cyber Corner Brackets */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-neon-cyan pointer-events-none" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-neon-cyan pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-neon-cyan pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-neon-cyan pointer-events-none" />

          {/* Top subtle scan line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/80 to-transparent pointer-events-none" />

          {/* Prev Button */}
          <button
            type="button"
            onClick={handlePrev}
            onMouseEnter={playHoverSound}
            disabled={!prevItem}
            title={prevItem ? `Encounter trước: ${prevItem.title} (Phím [K] hoặc [←])` : "Đã ở đầu trang"}
            className={cn(
              "flex items-center justify-center min-h-11 min-w-11 sm:min-w-10 px-2 sm:px-3 font-mono text-xs font-bold uppercase transition-all border outline-none",
              prevItem
                ? "bg-zinc-900/80 border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(0,243,255,0.4)] active:scale-95 cursor-pointer"
                : "bg-zinc-950/50 border-zinc-800/50 text-zinc-600 cursor-not-allowed opacity-40"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden md:inline-block ml-1 text-[11px] font-black">PREV</span>
          </button>

          {/* Center Info & Quick Checkpoint Status */}
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1 bg-black/60 border border-zinc-800 min-h-11 flex-1 justify-between max-w-[280px] sm:max-w-[340px]">
            <div className="flex flex-col min-w-0 justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase text-neon-yellow tracking-widest truncate max-w-[130px] sm:max-w-[180px]">
                  {currentItem?.title || "Overview"}
                </span>
                {totalEncounters > 0 && (
                  <span className="text-[9px] font-mono px-1 py-0.2 bg-zinc-800 text-zinc-300 font-bold">
                    {effectiveIndex + 1}/{items.length}
                  </span>
                )}
              </div>

              {/* Progress mini dots */}
              <div className="flex items-center gap-1 mt-1">
                {items.map((it, idx) => {
                  const itActive = it.id === currentId
                  const itCleared =
                    it.id !== "overview" &&
                    it.id !== "secrets" &&
                    it.id !== "walkthrough" &&
                    it.id !== "catalyst" &&
                    isEncounterCompleted(activityTitle, it.id)

                  return (
                    <div
                      key={`hud-dot-${it.id}`}
                      onClick={() => handleJumpToIndex(idx)}
                      title={it.title}
                      className={cn(
                        "h-1.5 rounded-none transition-all cursor-pointer",
                        itActive
                          ? "w-4 bg-neon-cyan shadow-[0_0_8px_#00f3ff]"
                          : itCleared
                            ? "w-2 bg-neon-green shadow-[0_0_6px_#39ff14]"
                            : "w-2 bg-zinc-700 hover:bg-zinc-500"
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
                  "flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold uppercase transition-all border outline-none cursor-pointer shrink-0",
                  isCurrentCompleted
                    ? "bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_12px_rgba(57,255,20,0.3)] hover:bg-neon-green/30"
                    : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500"
                )}
                title="Đánh dấu đã hoàn thành Encounter này (Phím [C])"
              >
                <CheckCircle2 className={cn("w-3.5 h-3.5", isCurrentCompleted && "text-neon-green")} />
                <span className="hidden sm:inline">{isCurrentCompleted ? "Cleared" : "Clear"}</span>
              </button>
            )}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            onMouseEnter={playHoverSound}
            disabled={!nextItem}
            title={nextItem ? `Encounter kế tiếp: ${nextItem.title} (Phím [J] hoặc [→])` : "Đã ở cuối trang"}
            className={cn(
              "flex items-center justify-center min-h-11 min-w-11 sm:min-w-10 px-2 sm:px-3 font-mono text-xs font-bold uppercase transition-all border outline-none",
              nextItem
                ? "bg-zinc-900/80 border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(0,243,255,0.4)] active:scale-95 cursor-pointer"
                : "bg-zinc-950/50 border-zinc-800/50 text-zinc-600 cursor-not-allowed opacity-40"
            )}
          >
            <span className="hidden md:inline-block mr-1 text-[11px] font-black">NEXT</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => toggleSfx()}
            onMouseEnter={playHoverSound}
            className={cn(
              "flex items-center justify-center min-h-11 w-11 sm:w-9 bg-zinc-900/80 border transition-all cursor-pointer outline-none",
              sfxOn
                ? "border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/15 hover:border-neon-cyan"
                : "border-zinc-800 text-zinc-600 hover:text-zinc-400"
            )}
            title={sfxOn ? "Âm thanh Sci-Fi: Đang BẬT" : "Âm thanh Sci-Fi: Đang TẮT"}
          >
            {sfxOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Keyboard Shortcuts Trigger Button */}
          <button
            type="button"
            onClick={() => setShowShortcuts(true)}
            onMouseEnter={playHoverSound}
            className="hidden sm:flex items-center justify-center min-h-11 w-9 bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all cursor-pointer outline-none"
            title="Bảng phím tắt Gamer (Phím [?])"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cyber Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="relative w-full max-w-md bg-zinc-950 border-2 border-neon-cyan/60 p-6 shadow-[0_0_40px_rgba(0,243,255,0.3)] cyber-grid"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan pointer-events-none" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan pointer-events-none" />

            <div className="flex items-center justify-between border-b border-neon-cyan/30 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-neon-cyan" />
                <h3 className="font-black text-neon-cyan text-sm uppercase tracking-widest text-glow-cyan">
                  Gamer Shortcuts HUD
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowShortcuts(false)}
                className="text-zinc-400 hover:text-white p-1 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Encounter kế tiếp</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-neon-cyan font-bold">→</kbd>
                  <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-neon-cyan font-bold">J</kbd>
                  <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-neon-cyan font-bold">L</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Encounter trước đó</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-neon-cyan font-bold">←</kbd>
                  <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-neon-cyan font-bold">K</kbd>
                  <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-neon-cyan font-bold">H</kbd>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Bật/tắt Đã hoàn thành (Clear)</span>
                <kbd className="px-2.5 py-1 bg-neon-green/20 border border-neon-green text-neon-green font-bold">C</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Nhảy tới Encounter 1 - 9</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-neon-yellow font-bold">1 ~ 9</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Cuộn nhanh tới Bản đồ Callout</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold">M</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-zinc-800/80">
                <span className="text-zinc-300">Cuộn nhanh tới Bảng vai trò</span>
                <kbd className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold">R</kbd>
              </div>

              <div className="flex items-center justify-between py-1.5">
                <span className="text-zinc-300">Cử chỉ vuốt màn hình (Mobile)</span>
                <span className="text-[11px] text-neon-cyan font-bold">Vuốt Trái / Phải</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-zinc-800 text-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                sys.hud // press [ESC] to close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
