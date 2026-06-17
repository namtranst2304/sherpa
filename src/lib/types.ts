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
  [key: string]: unknown;
}

export interface ActivityData {
  raid_name?: string;
  dungeon_name?: string;
  active_orbit?: string;
  location?: string;
  preface?: {
    author_notes?: string;
    [key: string]: unknown;
  };
  encounters: ActivityEncounter[];
  [key: string]: unknown;
}
