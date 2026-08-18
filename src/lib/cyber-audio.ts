import { useSyncExternalStore } from 'react'

const SFX_STORAGE_KEY = 'sherpa_sfx_enabled_v1'
const SYNC_SFX_EVENT = 'sherpa_sfx_sync'

let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

function getSfxSnapshot(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const val = localStorage.getItem(SFX_STORAGE_KEY)
    return val === null ? true : val === 'true'
  } catch {
    return true
  }
}

function subscribeSfx(callback: () => void) {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', callback)
  window.addEventListener(SYNC_SFX_EVENT, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(SYNC_SFX_EVENT, callback)
  }
}

export function useSfxStore(): boolean {
  return useSyncExternalStore(subscribeSfx, getSfxSnapshot, () => true)
}

export function isSfxEnabled(): boolean {
  return getSfxSnapshot()
}

export function setSfxEnabled(enabled: boolean) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(SFX_STORAGE_KEY, String(enabled))
    window.dispatchEvent(new Event(SYNC_SFX_EVENT))
  } catch (e) {
    console.error('Failed to save SFX state:', e)
  }
}

export function toggleSfx(): boolean {
  const current = isSfxEnabled()
  const next = !current
  setSfxEnabled(next)
  if (next) {
    playClearSound()
  }
  return next
}

/** Soft cyber sine hum on hover */
export function playHoverSound() {
  if (!isSfxEnabled()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(720, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.025, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.045)
  } catch {
    // AudioContext blocked or not supported
  }
}

/** Crisp futuristic chirp on navigation or tab switch */
export function playNavSound() {
  if (!isSfxEnabled()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(580, now)
    osc.frequency.exponentialRampToValueAtTime(1160, now + 0.06)

    gain.gain.setValueAtTime(0.05, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.065)
  } catch {
    // AudioContext blocked or not supported
  }
}

/** Celebratory high-tech two-tone cyber chime when marking encounter cleared */
export function playClearSound() {
  if (!isSfxEnabled()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const notes = [523.25, 659.25, 1046.5] // C5, E5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const start = now + idx * 0.05

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, start)

      gain.gain.setValueAtTime(0.08, start)
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(start)
      osc.stop(start + 0.26)
    })
  } catch {
    // AudioContext blocked or not supported
  }
}

/** Tactile UI click for toggles */
export function playToggleSound() {
  if (!isSfxEnabled()) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(320, now)
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.03)

    gain.gain.setValueAtTime(0.03, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.035)
  } catch {
    // AudioContext blocked
  }
}
