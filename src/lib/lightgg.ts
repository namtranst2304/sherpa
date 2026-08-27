/**
 * Build direct light.gg item link by Bungie Item Hash ID.
 */
export function getLightGgItemUrl(id: number | string): string {
  return `https://www.light.gg/db/items/${id}`
}

/**
 * Build light.gg search query link by item name.
 */
export function getLightGgSearchUrl(name: string): string {
  const clean = name
    .replace(/\(Exotic\)|\(Adept\)|\(Harrowed\)|\(Timelost\)/gi, '')
    .trim()
  return `https://www.light.gg/db/search/?q=${encodeURIComponent(clean)}`
}

/**
 * Build light.gg link (prefer item ID if available, fallback to search query).
 */
export function getLightGgUrl(params: {
  id?: number | string | null
  name?: string
}): string {
  if (params.id) {
    return getLightGgItemUrl(params.id)
  }
  if (params.name) {
    return getLightGgSearchUrl(params.name)
  }
  return 'https://www.light.gg'
}
