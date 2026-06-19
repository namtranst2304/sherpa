// Import file json
import desertPerpetual from "./raids/desert-perpetual.json"
import { ActivityData } from "@/lib/types"

export const RAIDS_DATA: Record<string, ActivityData> = {
  // Sửa key ở đây thành "the-desert-perpetual" để khớp với URL
  "the-desert-perpetual": desertPerpetual as unknown as ActivityData,
}

import week1 from "./pantheon/week-1.json"
import week2 from "./pantheon/week-2.json"
import week3 from "./pantheon/week-3.json"
import week4 from "./pantheon/week-4.json"

import equilibrium from "./dungeons/equilibrium.json"

export const DUNGEONS_DATA: Record<string, ActivityData> = {
  "equilibrium": equilibrium as unknown as ActivityData,
}

export const PANTHEON_DATA: Record<string, ActivityData> = {
  "week-1": week1 as unknown as ActivityData,
  "week-2": week2 as unknown as ActivityData,
  "week-3": week3 as unknown as ActivityData,
  "week-4": week4 as unknown as ActivityData,
}