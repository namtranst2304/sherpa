/**
 * Resolve media URLs for Next/Image.
 * - Absolute http(s) → unchanged (Shacknews, already-absolute Bungie, etc.)
 * - `/common/...` → Bungie CDN
 * - Other site paths (`/images/...`) → unchanged
 */
export function bungieUrl(path: string): string {
  if (!path) return path
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  if (path.startsWith("/common/")) return `https://www.bungie.net${path}`
  if (path.startsWith("common/")) return `https://www.bungie.net/${path}`
  return path
}
