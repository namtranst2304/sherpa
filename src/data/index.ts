// Import file json
import desertPerpetual from "./raids/desert-perpetual.json"
import gardenOfSalvation from "./raids/garden-of-salvation.json"
import deepStoneCrypt from "./raids/deep-stone-crypt.json"
import crotasEnd from "./raids/crotas-end.json"
import vaultOfGlass from "./raids/vault-of-glass.json"
import vowOfTheDisciple from "./raids/vow-of-the-disciple.json"
import lastWish from "./raids/last-wish.json"
import kingsFall from "./raids/kings-fall.json"
import rootOfNightmares from "./raids/root-of-nightmares.json"
import salvationsEdge from "./raids/salvations-edge.json"
import { ActivityData } from "@/types"

export const RAIDS_DATA: Record<string, ActivityData> = {
  "the-desert-perpetual": desertPerpetual as unknown as ActivityData,
  "garden-of-salvation": gardenOfSalvation as unknown as ActivityData,
  "deep-stone-crypt": deepStoneCrypt as unknown as ActivityData,
  "crotas-end": crotasEnd as unknown as ActivityData,
  "vault-of-glass": vaultOfGlass as unknown as ActivityData,
  "vow-of-the-disciple": vowOfTheDisciple as unknown as ActivityData,
  "last-wish": lastWish as unknown as ActivityData,
  "kings-fall": kingsFall as unknown as ActivityData,
  "root-of-nightmares": rootOfNightmares as unknown as ActivityData,
  "salvations-edge": salvationsEdge as unknown as ActivityData,
}

import week1 from "./pantheon/week-1.json"
import week2 from "./pantheon/week-2.json"
import week3 from "./pantheon/week-3.json"
import week4 from "./pantheon/week-4.json"

import equilibrium from "./dungeons/equilibrium.json"
import vespersHost from "./dungeons/vespers-host.json"
import sunderedDoctrine from "./dungeons/sundered-doctrine.json"

export const DUNGEONS_DATA: Record<string, ActivityData> = {
  "equilibrium": equilibrium as unknown as ActivityData,
  "vespers-host": vespersHost as unknown as ActivityData,
  "sundered-doctrine": sunderedDoctrine as unknown as ActivityData,
}

export const PANTHEON_DATA: Record<string, ActivityData> = {
  "week-1": week1 as unknown as ActivityData,
  "week-2": week2 as unknown as ActivityData,
  "week-3": week3 as unknown as ActivityData,
  "week-4": week4 as unknown as ActivityData,
}