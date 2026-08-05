"use client"

import type { ExoticArmor, ExoticWeapon } from "@/types"

let weaponsCache: ExoticWeapon[] | null = null
let armorCache: ExoticArmor[] | null = null

export async function loadFullExoticWeapon(id: number): Promise<ExoticWeapon | null> {
  if (!weaponsCache) {
    const mod = await import("@/data/database/exotic-weapons.json")
    weaponsCache = mod.default as unknown as ExoticWeapon[]
  }
  return weaponsCache.find((w) => w.id === id) ?? null
}

export async function loadFullExoticArmor(id: number): Promise<ExoticArmor | null> {
  if (!armorCache) {
    const mod = await import("@/data/database/exotic-armor.json")
    armorCache = mod.default as unknown as ExoticArmor[]
  }
  return armorCache.find((a) => a.id === id) ?? null
}
