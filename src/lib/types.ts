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
  [key: string]: unknown;
}

export interface ActivityEncounter {
  id: string;
  name: string;
  walkthrough?: Record<string, ActivityEncounterPhase>;
  roles?: Record<string, ActivityRole | Record<string, ActivityRole>>;
  images?: { url: string; caption?: string }[];
  [key: string]: unknown;
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
    warlocks?: { supers?: any[]; exotics_and_abilities?: any[] };
    titans?: { supers?: any[]; exotics_and_abilities?: any[] };
    hunters?: { supers?: any[]; exotics_and_abilities?: any[] };
    [key: string]: unknown;
  };
  encounters: ActivityEncounter[];
  [key: string]: unknown;
}
