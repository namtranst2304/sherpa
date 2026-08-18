/** Play the global background audio element if present. */
export function playGlobalBgAudio() {
  const el = document.getElementById('global-bg-audio')
  if (!(el instanceof HTMLAudioElement)) return
  el.play().catch((e) => console.error('Audio error:', e))
}
