/**
 * Safely copy text to clipboard across all browser environments.
 * Supports modern Clipboard API with fallback for restricted/HTTP contexts.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false

  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fallback if permission is denied or unsupported
    }
  }

  try {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand("copy")
    document.body.removeChild(textarea)
    return success
  } catch {
    return false
  }
}
