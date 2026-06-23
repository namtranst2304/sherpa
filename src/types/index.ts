export interface ActivityRole {
  quantity?: number;
  description?: string;
  types?: string[];
  [key: string]: unknown;
}

export interface ActivityEncounterPhase {
  name?: string;
  objective?: string;
  steps?: string[];
  details?: string[];
  mine_locations?: string[];
  images?: { url: string; caption?: string }[];
  [key: string]: unknown;
}

export interface ActivityEncounter {
  id: string;
  name: string;
  walkthrough?: Record<string, ActivityEncounterPhase>;
  roles?: Record<string, ActivityRole | Record<string, ActivityRole>>;
  images?: { url: string; caption?: string }[];
  secrets?: {
    title: string;
    description?: string;
    steps?: string[];
    images?: { url: string; caption?: string }[];
  }[];
  [key: string]: unknown;
}

export interface LootWeapon {
  weapon: string;
  type: string;
  frame?: string;
  source: string;
  image?: string;
  element?: string;
  ammoType?: string;
  stats?: {
    impact?: number;
    range?: number;
    stability?: number;
    handling?: number;
    reload_speed?: number;
    aim_assist?: number;
    zoom?: number;
    rpm?: number;
    magazine?: number;
    draw_time?: number;
    efficiency?: number;
    defense?: number;
    charge_rate?: number;
    shield_duration?: number;
  };
  perks?: {
    column_3?: string[];
    column_4?: string[];
    recommended_pve?: string[];
    recommended_pvp?: string[];
  };
  tier?: string;
  isNew?: boolean;
  [key: string]: unknown;
}

export interface LootArmorSet {
  name: string;
  class: "Warlock" | "Titan" | "Hunter";
  source: string;
  image?: string;
  setBonus?: string;
}

export interface ActivityData {
  raid_name?: string;
  dungeon_name?: string;
  active_orbit?: string;
  location?: string;
  preface?: {
    author_notes?: string;
    formatting_rules?: string;
    non_linear_mechanic?: {
      description?: string;
      elevator_plates?: {
        plate_text?: string;
        target_encounter?: string;
      }[];
    };
    [key: string]: unknown;
  };
  loadout_tips?: {
    note?: string;
    weapons?: { name: string; description: string }[];
    warlocks?: { supers?: { name: string; utility: string }[]; exotics_and_abilities?: { name: string; recommendation: string }[] };
    titans?: { supers?: { name: string; utility: string }[]; exotics_and_abilities?: { name: string; recommendation: string }[] };
    hunters?: { supers?: { name: string; utility: string }[]; exotics_and_abilities?: { name: string; recommendation: string }[] };
    [key: string]: unknown;
  };
  epic_mode?: {
    requirements_and_contest?: string[];
    emblems_and_titles?: string[];
    encounter_changes?: { name: string; changes: string }[];
  };
  loot_table: LootWeapon[];
  armor_table?: LootArmorSet[];
  encounters: ActivityEncounter[];
  [key: string]: unknown;
}
