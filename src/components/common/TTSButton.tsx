'use client'

import * as React from 'react'
import { Volume2, Settings2, Square, BookOpen } from 'lucide-react'
import type { ThemeColorTokens } from '@/lib/theme'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { TimelineEvent } from '@/data/timeline/index'
import { useTTSAudio } from '@/hooks/useTTSAudio'

export interface TTSControlsProps {
  events: TimelineEvent[]
  currentEventIndex: number
  theme?: ThemeColorTokens
  onEventChange?: (index: number) => void
  className?: string
  eraTitle?: string
  eraDescription?: string
}

export function TTSButton({
  events,
  currentEventIndex,
  theme,
  onEventChange,
  className,
  eraTitle,
  eraDescription,
}: TTSControlsProps) {
  const {
    mode,
    isPlaying,
    isPaused,
    isLoading,
    selectedVoice,
    setSelectedVoice,
    handlePlay,
    containerRef,
  } = useTTSAudio({
    events,
    currentEventIndex,
    onEventChange,
    eraTitle,
    eraDescription,
  })

  if (!events || events.length === 0) return null

  const voices = [
    { id: 'vi-VN-NamMinhNeural', name: 'Nam Minh (Nam)' },
    { id: 'vi-VN-HoaiMyNeural', name: 'Hoài My (Nữ)' },
  ]

  const isActive = isPlaying || isLoading

  return (
    <div
      ref={containerRef}
      className={`tts-btn-group group inline-flex shrink-0 items-center rounded-full border border-white/10 bg-black/60 p-1 shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 ${className || ''}`}
      style={{
        boxShadow: isActive
          ? `0 0 20px ${theme?.hex || '#22d3ee'}30`
          : undefined,
        borderColor: isActive ? `${theme?.hex || '#22d3ee'}50` : undefined,
      }}
    >
      {/* Read Single Button */}
      <button
        onClick={() => handlePlay('SINGLE')}
        className="flex items-center justify-center gap-2.5 rounded-full px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-all hover:bg-white/10 md:px-5 md:text-xs"
        style={{
          color:
            mode === 'SINGLE' && isActive ? theme?.hex || '#22d3ee' : '#a1a1aa',
        }}
        title={
          mode === 'SINGLE' && isPlaying
            ? 'Pause Reading'
            : mode === 'SINGLE' && isPaused
              ? 'Resume Reading'
              : 'Read Current Card'
        }
      >
        {mode === 'SINGLE' && isLoading ? (
          <div className="relative flex h-4 w-4 items-center justify-center">
            <div
              className="absolute inset-0 animate-spin rounded-full border-2 border-t-transparent"
              style={{
                borderColor: theme?.hex || '#22d3ee',
                borderTopColor: 'transparent',
              }}
            />
          </div>
        ) : mode === 'SINGLE' && isPlaying ? (
          <Square className="h-4 w-4 animate-pulse fill-current" />
        ) : (
          <Volume2 className="h-4 w-4 transition-transform group-hover:scale-110" />
        )}
        <span className="font-semibold">Read</span>
      </button>

      <div className="mx-1 h-5 w-[1px] bg-white/10" />

      {/* Read Chapter Button */}
      <button
        onClick={() => handlePlay('CHAPTER')}
        className="flex items-center justify-center gap-2.5 rounded-full px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-all hover:bg-white/10 md:px-5 md:text-xs"
        style={{
          color:
            mode === 'CHAPTER' && isActive
              ? theme?.hex || '#22d3ee'
              : '#a1a1aa',
        }}
        title={
          mode === 'CHAPTER' && isPlaying
            ? 'Pause Chapter'
            : mode === 'CHAPTER' && isPaused
              ? 'Resume Chapter'
              : 'Read Entire Chapter'
        }
      >
        {mode === 'CHAPTER' && isLoading ? (
          <div className="relative flex h-4 w-4 items-center justify-center">
            <div
              className="absolute inset-0 animate-spin rounded-full border-2 border-t-transparent"
              style={{
                borderColor: theme?.hex || '#22d3ee',
                borderTopColor: 'transparent',
              }}
            />
          </div>
        ) : mode === 'CHAPTER' && isPlaying ? (
          <Square className="h-4 w-4 animate-pulse fill-current" />
        ) : (
          <BookOpen className="h-4 w-4 transition-transform group-hover:scale-110" />
        )}
        <span className="font-semibold">Read Chapter</span>
      </button>

      <div className="mx-1 h-5 w-[1px] bg-white/10" />

      {/* Voice Settings */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-all hover:bg-white/10 hover:text-white md:h-9 md:w-9"
            title="Voice Settings"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-52 border border-white/10 bg-black/95 p-2 text-white shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          sideOffset={12}
        >
          <div className="space-y-1">
            <h4 className="mb-1 border-b border-white/10 px-2 pb-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
              AI Voice Engine
            </h4>
            {voices.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVoice(v.id)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-medium transition-all ${selectedVoice === v.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'} `}
              >
                {v.name}
                {selectedVoice === v.id && (
                  <div
                    className="h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]"
                    style={{
                      backgroundColor: theme?.hex || '#22d3ee',
                      color: theme?.hex || '#22d3ee',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
