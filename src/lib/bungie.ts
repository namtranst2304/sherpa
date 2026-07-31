/** Build an absolute Bungie CDN URL from a relative content path. */
export function bungieUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `https://www.bungie.net${path}`
}
