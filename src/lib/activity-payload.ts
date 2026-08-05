import type { ActivityData, ActivityEncounter } from "@/types"

function stubEncounter(enc: ActivityEncounter): ActivityEncounter {
  return { id: enc.id, name: enc.name }
}

/**
 * Send only the data needed for the active activity view to the client.
 * Sidebar still gets encounter id/name stubs for navigation.
 */
export function slimActivityForClient(
  data: ActivityData,
  activeEncounterId?: string
): ActivityData {
  const view =
    !activeEncounterId || activeEncounterId === "overview"
      ? "overview"
      : activeEncounterId === "secrets"
        ? "secrets"
        : "encounter"

  const hasSecrets = Boolean(data.activity_secrets)
  const base = {
    raid_name: data.raid_name,
    dungeon_name: data.dungeon_name,
    active_orbit: data.active_orbit,
    location: data.location,
  }

  if (view === "overview") {
    return {
      ...base,
      preface: data.preface,
      loadout_tips: data.loadout_tips,
      epic_mode: data.epic_mode,
      loot_table: data.loot_table,
      armor_table: data.armor_table,
      encounters: data.encounters.map(stubEncounter),
      // Empty array keeps sidebar "Secrets" link without shipping secret bodies.
      activity_secrets: hasSecrets ? [] : undefined,
    }
  }

  if (view === "secrets") {
    return {
      ...base,
      loot_table: [],
      encounters: data.encounters.map(stubEncounter),
      activity_secrets: data.activity_secrets,
    }
  }

  const active =
    data.encounters.find((enc) => enc.id === activeEncounterId) || data.encounters[0]

  return {
    ...base,
    loot_table: [],
    preface: data.preface?.author_notes
      ? { author_notes: data.preface.author_notes }
      : undefined,
    encounters: data.encounters.map((enc) =>
      enc.id === active?.id ? enc : stubEncounter(enc)
    ),
    activity_secrets: hasSecrets ? [] : undefined,
  }
}

/**
 * Slim exotic mission payload to the active tab.
 */
export function slimExoticMissionForClient(
  data: ActivityData,
  activeTabId = "overview"
): ActivityData {
  const base = {
    raid_name: data.raid_name,
    dungeon_name: data.dungeon_name,
    active_orbit: data.active_orbit,
    location: data.location,
  }

  const hasCatalyst = Boolean(data.catalyst_guide)
  const encounterStub = data.encounters?.[0]
    ? [{ id: data.encounters[0].id, name: data.encounters[0].name }]
    : []

  if (activeTabId === "walkthrough") {
    return {
      ...base,
      loot_table: [],
      encounters: data.encounters,
      catalyst_guide: hasCatalyst ? { title: data.catalyst_guide!.title } : undefined,
    }
  }

  if (activeTabId === "catalyst") {
    return {
      ...base,
      loot_table: [],
      encounters: encounterStub,
      catalyst_guide: data.catalyst_guide,
    }
  }

  // overview
  return {
    ...base,
    preface: data.preface,
    loadout_tips: data.loadout_tips,
    epic_mode: data.epic_mode,
    loot_table: data.loot_table,
    armor_table: data.armor_table,
    encounters: encounterStub,
    catalyst_guide: hasCatalyst ? { title: data.catalyst_guide!.title } : undefined,
  }
}
