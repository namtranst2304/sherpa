// Import file json
import desertPerpetual from "./raids/desert-perpetual.json"
import { ActivityData } from "@/lib/types"

export const RAIDS_DATA: Record<string, ActivityData> = {
  // Sửa key ở đây thành "the-desert-perpetual" để khớp với URL
  "the-desert-perpetual": desertPerpetual as unknown as ActivityData,
}

export const DUNGEONS_DATA: Record<string, ActivityData> = {
  // Dungeons ...
}