import * as React from 'react'
import { DESTINY_PHONETICS } from '@/data/phonetics'
import type { TimelineEvent } from '@/data/timeline/index'

const applyPhonetics = (text: string) => {
  let result = text
  const sortedKeys = Object.keys(DESTINY_PHONETICS).sort(
    (a, b) => b.length - a.length
  )

  sortedKeys.forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi')
    result = result.replace(regex, DESTINY_PHONETICS[key])
  })
  return result
}

export interface UseTTSAudioProps {
  events: TimelineEvent[]
  currentEventIndex: number
  onEventChange?: (index: number) => void
  eraTitle?: string
  eraDescription?: string
}

export function useTTSAudio({
  events,
  currentEventIndex,
  onEventChange,
  eraTitle,
  eraDescription,
}: UseTTSAudioProps) {
  const instanceId = React.useId()
  const [mode, setMode] = React.useState<'NONE' | 'SINGLE' | 'CHAPTER'>('NONE')
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isPaused, setIsPaused] = React.useState(false)
  const [selectedVoice, setSelectedVoice] = React.useState(
    'vi-VN-NamMinhNeural'
  )
  const [isLoading, setIsLoading] = React.useState(false)

  const playlistRef = React.useRef<
    { audio: HTMLAudioElement; url: string; eventIndex: number }[]
  >([])
  const currentIndexRef = React.useRef(0)
  const stopRef = React.useRef<{ stop: () => void }>({ stop: () => {} })

  const currentVoiceRef = React.useRef('')
  const playingEventIndexRef = React.useRef(-1)
  const isAutoScrollingRef = React.useRef(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const stopPlayback = React.useCallback(() => {
    stopRef.current.stop()
    playlistRef.current.forEach((item) => {
      item.audio.pause()
      URL.revokeObjectURL(item.url)
    })
    playlistRef.current = []
    currentIndexRef.current = 0
    setIsPlaying(false)
    setIsPaused(false)
    setMode('NONE')
    window.dispatchEvent(
      new CustomEvent('toggle-global-music', { detail: { pause: false } })
    )
  }, [])

  React.useEffect(() => {
    if (
      isPlaying &&
      playingEventIndexRef.current !== -1 &&
      playingEventIndexRef.current !== currentEventIndex
    ) {
      if (!isAutoScrollingRef.current) {
        stopPlayback()
      }
    }
  }, [currentEventIndex, isPlaying, stopPlayback])

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isPlaying) {
            stopPlayback()
          }
        })
      },
      { threshold: 0 }
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) observer.unobserve(currentContainer)
    }
  }, [isPlaying, stopPlayback])

  React.useEffect(() => {
    if (selectedVoice !== currentVoiceRef.current) {
      stopPlayback()
      currentVoiceRef.current = selectedVoice
    }
  }, [selectedVoice, stopPlayback])

  React.useEffect(() => {
    const handleOtherPlay = (e: Event) => {
      const customEvent = e as CustomEvent
      if (customEvent.detail?.id !== instanceId) {
        if (isPlaying) {
          stopRef.current.stop()
          if (playlistRef.current[currentIndexRef.current]) {
            playlistRef.current[currentIndexRef.current].audio.pause()
          }
          setIsPlaying(false)
          setIsPaused(true)
        }
      }
    }
    window.addEventListener('tts-play-started', handleOtherPlay)
    return () => window.removeEventListener('tts-play-started', handleOtherPlay)
  }, [instanceId, isPlaying])

  React.useEffect(() => {
    return () => stopPlayback()
  }, [stopPlayback])

  const startPlayLoop = async (
    chunksProvided?: { text: string; eventIndex: number }[]
  ) => {
    const chunksToPlay =
      chunksProvided ||
      playlistRef.current.map((p) => ({ text: '', eventIndex: p.eventIndex }))

    let isCancelled = false
    stopRef.current.stop = () => {
      isCancelled = true
    }

    const fetchChunk = async (index: number) => {
      if (playlistRef.current[index]) return playlistRef.current[index]

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: chunksToPlay[index].text,
          voice: selectedVoice,
        }),
      })

      if (!response.ok) throw new Error('TTS chunk failed')

      const blob = await response.blob()
      const audioBlob = new Blob([blob], { type: 'audio/mpeg' })
      const url = URL.createObjectURL(audioBlob)
      const audio = new Audio(url)

      const item = { audio, url, eventIndex: chunksToPlay[index].eventIndex }
      playlistRef.current[index] = item
      return item
    }

    try {
      if (currentIndexRef.current === 0 && !playlistRef.current[0]) {
        setIsLoading(true)
      }

      let lastNotifiedEventIndex = -1

      let autoScrollTimer: ReturnType<typeof setTimeout> | null = null

      while (currentIndexRef.current < chunksToPlay.length) {
        if (isCancelled) break

        const currentEventIndex =
          chunksToPlay[currentIndexRef.current].eventIndex
        if (onEventChange && currentEventIndex !== lastNotifiedEventIndex) {
          isAutoScrollingRef.current = true
          onEventChange(currentEventIndex)
          lastNotifiedEventIndex = currentEventIndex
          playingEventIndexRef.current = currentEventIndex

          if (autoScrollTimer) clearTimeout(autoScrollTimer)
          autoScrollTimer = setTimeout(() => {
            isAutoScrollingRef.current = false
          }, 1000)
          
          stopRef.current.stop = () => {
            isCancelled = true
            if (autoScrollTimer) clearTimeout(autoScrollTimer)
          }
        }

        const currentItem = await fetchChunk(currentIndexRef.current)
        setIsLoading(false)

        if (currentIndexRef.current + 1 < chunksToPlay.length) {
          fetchChunk(currentIndexRef.current + 1).catch(() => {})
        }
        if (currentIndexRef.current + 2 < chunksToPlay.length) {
          fetchChunk(currentIndexRef.current + 2).catch(() => {})
        }

        const audio = currentItem.audio

        await new Promise((resolve) => {
          audio.onended = resolve
          audio.onerror = resolve
          stopRef.current.stop = () => {
            isCancelled = true
            if (autoScrollTimer) clearTimeout(autoScrollTimer)
            audio.pause()
            resolve(false)
          }
          audio.play().catch(resolve)
        })

        if (!isCancelled) {
          currentIndexRef.current++
        }
      }

      if (!isCancelled && currentIndexRef.current >= chunksToPlay.length) {
        setIsPlaying(false)
        setIsPaused(false)
        setMode('NONE')
        currentIndexRef.current = 0
        window.dispatchEvent(
          new CustomEvent('toggle-global-music', { detail: { pause: false } })
        )
      }
    } catch (error) {
      console.error(error)
      setIsPlaying(false)
      setIsPaused(false)
      setIsLoading(false)
      setMode('NONE')
      window.dispatchEvent(
        new CustomEvent('toggle-global-music', { detail: { pause: false } })
      )
    }
  }

  const handlePlay = async (targetMode: 'SINGLE' | 'CHAPTER') => {
    if (!events || events.length === 0) return

    if (mode === targetMode && isPlaying) {
      stopRef.current.stop()
      if (playlistRef.current[currentIndexRef.current]) {
        playlistRef.current[currentIndexRef.current].audio.pause()
      }
      setIsPlaying(false)
      setIsPaused(true)
      window.dispatchEvent(
        new CustomEvent('toggle-global-music', { detail: { pause: false } })
      )
      return
    }

    if (mode === targetMode && isPaused) {
      setIsPlaying(true)
      setIsPaused(false)
      window.dispatchEvent(
        new CustomEvent('toggle-global-music', { detail: { pause: true } })
      )
      window.dispatchEvent(
        new CustomEvent('tts-play-started', { detail: { id: instanceId } })
      )
      startPlayLoop()
      return
    }

    stopPlayback()
    setMode(targetMode)
    setIsPlaying(true)
    setIsPaused(false)
    playingEventIndexRef.current = currentEventIndex

    window.dispatchEvent(
      new CustomEvent('toggle-global-music', { detail: { pause: true } })
    )
    window.dispatchEvent(
      new CustomEvent('tts-play-started', { detail: { id: instanceId } })
    )

    const chunks: { text: string; eventIndex: number }[] = []

    const eventsToProcess =
      targetMode === 'SINGLE'
        ? [
            {
              text: `${events[currentEventIndex].title}. ${events[currentEventIndex].description.replace(/\*\*(.*?)\*\*/g, '$1')}`,
              eIdx: currentEventIndex,
            },
          ]
        : events.map((e, idx) => {
            let text = `${e.title}. ${e.description.replace(/\*\*(.*?)\*\*/g, '$1')}`
            if (idx === 0 && eraTitle) {
              const prefix = `${eraTitle}. ${eraDescription ? eraDescription + '. ' : ''}`
              text = prefix + text
            }
            return { text, eIdx: idx }
          })

    if (targetMode === 'CHAPTER' && onEventChange) {
      onEventChange(0)
    }

    eventsToProcess.forEach(({ text: txt, eIdx }) => {
      const phoneticText = applyPhonetics(txt)

      const rawChunks = phoneticText
        .split('\n')
        .flatMap((line) => line.match(/.*?[.!?](?:\s|$)|.+/g) || [])
        .map((s) => s.trim())
        .filter(Boolean)

      let currentChunk = ''
      for (const c of rawChunks) {
        if (!currentChunk || currentChunk.length + c.length < 100) {
          currentChunk += (currentChunk ? ' ' : '') + c
        } else {
          chunks.push({ text: currentChunk, eventIndex: eIdx })
          currentChunk = c
        }
      }
      if (currentChunk) chunks.push({ text: currentChunk, eventIndex: eIdx })
    })

    startPlayLoop(chunks)
  }

  return {
    mode,
    isPlaying,
    isPaused,
    isLoading,
    selectedVoice,
    setSelectedVoice,
    handlePlay,
    containerRef,
  }
}
