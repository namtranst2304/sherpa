import * as React from 'react'
import { Sparkles, X } from 'lucide-react'

export function KeyboardShortcutsModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex animate-in items-center justify-center bg-black/80 p-4 backdrop-blur-md duration-200 fade-in"
      onClick={onClose}
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
            onClick={onClose}
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
            <span className="text-zinc-300">Nhảy tới Encounter 1 - 9</span>
            <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-neon-yellow">
              1 ~ 9
            </kbd>
          </div>

          <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
            <span className="text-zinc-300">Cuộn nhanh tới Bản đồ Callout</span>
            <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-zinc-200">
              M
            </kbd>
          </div>

          <div className="flex items-center justify-between border-b border-zinc-800/80 py-1.5">
            <span className="text-zinc-300">Cuộn nhanh tới Bảng vai trò</span>
            <kbd className="border border-zinc-700 bg-zinc-900 px-2 py-1 font-bold text-zinc-200">
              R
            </kbd>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <span className="text-zinc-300">Cử chỉ vuốt màn hình (Mobile)</span>
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
  )
}
