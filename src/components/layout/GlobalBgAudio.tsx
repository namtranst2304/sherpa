'use client'

/** Persistent bg audio element — survives route changes; chrome is gated separately. */
export function GlobalBgAudio() {
  return (
    <audio
      id="global-bg-audio"
      src="/audio/timeline-theme.mp3"
      loop
      preload="none"
      className="hidden"
    />
  )
}
