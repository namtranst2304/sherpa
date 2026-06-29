// Dynamic imports — data is only loaded when requested, not bundled upfront.
// This avoids loading ~550KB of JSON into every page's client bundle.

import { ActivityData } from "@/types"

// --- Slug registries for route generation (generateStaticParams) ---
// These are lightweight string arrays, NOT the full JSON data.

export const RAID_SLUGS = [
  "the-desert-perpetual",
  "garden-of-salvation",
  "deep-stone-crypt",
  "crotas-end",
  "vault-of-glass",
  "vow-of-the-disciple",
  "last-wish",
  "kings-fall",
  "root-of-nightmares",
  "salvations-edge",
] as const;

export const DUNGEON_SLUGS = [
  "shattered-throne",
  "pit-of-heresy",
  "prophecy",
  "grasp-of-avarice",
  "duality",
  "spire-of-the-watcher",
  "ghosts-of-the-deep",
  "warlords-ruin",
  "equilibrium",
  "vespers-host",
  "sundered-doctrine",
] as const;

export const PANTHEON_SLUGS = [
  "calus-resplendent",
  "morgeth-surpassing",
  "insurrection-prime-revolution",
] as const;

export const EXOTIC_MISSION_SLUGS = [
  "the-whisper",
  "zero-hour",
  "presage",
  "vox-obscura",
  "seraphs-shield",
  "avalon",
  "starcrossed",
  "encore",
  "dual-destiny",
  "derealize",
  "heliostat",
] as const;

// --- Dynamic data loaders ---
// Each function loads only the requested JSON file via dynamic import().
// Next.js will code-split these into separate chunks automatically.

const raidImports: Record<string, () => Promise<{ default: unknown }>> = {
  "the-desert-perpetual": () => import("./raids/desert-perpetual.json"),
  "garden-of-salvation": () => import("./raids/garden-of-salvation.json"),
  "deep-stone-crypt": () => import("./raids/deep-stone-crypt.json"),
  "crotas-end": () => import("./raids/crotas-end.json"),
  "vault-of-glass": () => import("./raids/vault-of-glass.json"),
  "vow-of-the-disciple": () => import("./raids/vow-of-the-disciple.json"),
  "last-wish": () => import("./raids/last-wish.json"),
  "kings-fall": () => import("./raids/kings-fall.json"),
  "root-of-nightmares": () => import("./raids/root-of-nightmares.json"),
  "salvations-edge": () => import("./raids/salvations-edge.json"),
};

const dungeonImports: Record<string, () => Promise<{ default: unknown }>> = {
  "shattered-throne": () => import("./dungeons/shattered-throne.json"),
  "pit-of-heresy": () => import("./dungeons/pit-of-heresy.json"),
  "prophecy": () => import("./dungeons/prophecy.json"),
  "grasp-of-avarice": () => import("./dungeons/grasp-of-avarice.json"),
  "duality": () => import("./dungeons/duality.json"),
  "spire-of-the-watcher": () => import("./dungeons/spire-of-the-watcher.json"),
  "ghosts-of-the-deep": () => import("./dungeons/ghosts-of-the-deep.json"),
  "warlords-ruin": () => import("./dungeons/warlords-ruin.json"),
  "equilibrium": () => import("./dungeons/equilibrium.json"),
  "vespers-host": () => import("./dungeons/vespers-host.json"),
  "sundered-doctrine": () => import("./dungeons/sundered-doctrine.json"),
};

const pantheonImports: Record<string, () => Promise<{ default: unknown }>> = {
  "calus-resplendent": () => import("./pantheon/calus-resplendent.json"),
  "morgeth-surpassing": () => import("./pantheon/morgeth-surpassing.json"),
  "insurrection-prime-revolution": () => import("./pantheon/insurrection-prime-revolution.json"),
};

const exoticMissionImports: Record<string, () => Promise<{ default: unknown }>> = {
  "the-whisper": () => import("./exotic-missions/the-whisper.json"),
  "zero-hour": () => import("./exotic-missions/zero-hour.json"),
  "presage": () => import("./exotic-missions/presage.json"),
  "vox-obscura": () => import("./exotic-missions/vox-obscura.json"),
  "seraphs-shield": () => import("./exotic-missions/seraphs-shield.json"),
  "avalon": () => import("./exotic-missions/avalon.json"),
  "starcrossed": () => import("./exotic-missions/starcrossed.json"),
  "encore": () => import("./exotic-missions/encore.json"),
  "dual-destiny": () => import("./exotic-missions/dual-destiny.json"),
  "derealize": () => import("./exotic-missions/derealize.json"),
  "heliostat": () => import("./exotic-missions/heliostat.json"),
};

/** Load a single raid's data by slug. Returns null if slug not found. */
export async function getRaidData(slug: string): Promise<ActivityData | null> {
  const loader = raidImports[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default as unknown as ActivityData;
}

/** Load a single dungeon's data by slug. Returns null if slug not found. */
export async function getDungeonData(slug: string): Promise<ActivityData | null> {
  const loader = dungeonImports[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default as unknown as ActivityData;
}

/** Load a single pantheon's data by slug. Returns null if slug not found. */
export async function getPantheonData(slug: string): Promise<ActivityData | null> {
  const loader = pantheonImports[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default as unknown as ActivityData;
}

/** Load a single exotic mission's data by slug. Returns null if slug not found. */
export async function getExoticMissionData(slug: string): Promise<ActivityData | null> {
  const loader = exoticMissionImports[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default as unknown as ActivityData;
}