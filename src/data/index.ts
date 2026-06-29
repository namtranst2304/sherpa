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

import calusResplendent from "./pantheon/calus-resplendent.json"
import morgethSurpassing from "./pantheon/morgeth-surpassing.json"
import insurrectionPrimeRevolution from "./pantheon/insurrection-prime-revolution.json"

import equilibrium from "./dungeons/equilibrium.json"
import vespersHost from "./dungeons/vespers-host.json"
import sunderedDoctrine from "./dungeons/sundered-doctrine.json"
import shatteredThrone from "./dungeons/shattered-throne.json"
import pitOfHeresy from "./dungeons/pit-of-heresy.json"
import prophecy from "./dungeons/prophecy.json"
import graspOfAvarice from "./dungeons/grasp-of-avarice.json"
import duality from "./dungeons/duality.json"
import spireOfTheWatcher from "./dungeons/spire-of-the-watcher.json"
import ghostsOfTheDeep from "./dungeons/ghosts-of-the-deep.json"
import warlordsRuin from "./dungeons/warlords-ruin.json"

export const DUNGEONS_DATA: Record<string, ActivityData> = {
  "shattered-throne": shatteredThrone as unknown as ActivityData,
  "pit-of-heresy": pitOfHeresy as unknown as ActivityData,
  "prophecy": prophecy as unknown as ActivityData,
  "grasp-of-avarice": graspOfAvarice as unknown as ActivityData,
  "duality": duality as unknown as ActivityData,
  "spire-of-the-watcher": spireOfTheWatcher as unknown as ActivityData,
  "ghosts-of-the-deep": ghostsOfTheDeep as unknown as ActivityData,
  "warlords-ruin": warlordsRuin as unknown as ActivityData,
  "equilibrium": equilibrium as unknown as ActivityData,
  "vespers-host": vespersHost as unknown as ActivityData,
  "sundered-doctrine": sunderedDoctrine as unknown as ActivityData,
}

export const PANTHEON_DATA: Record<string, ActivityData> = {
  "calus-resplendent": calusResplendent as unknown as ActivityData,
  "morgeth-surpassing": morgethSurpassing as unknown as ActivityData,
  "insurrection-prime-revolution": insurrectionPrimeRevolution as unknown as ActivityData,
}

import theWhisper from "./exotic-missions/the-whisper.json"
import zeroHour from "./exotic-missions/zero-hour.json"
import presage from "./exotic-missions/presage.json"
import voxObscura from "./exotic-missions/vox-obscura.json"
import seraphsShield from "./exotic-missions/seraphs-shield.json"
import avalon from "./exotic-missions/avalon.json"
import starcrossed from "./exotic-missions/starcrossed.json"
import encore from "./exotic-missions/encore.json"
import dualDestiny from "./exotic-missions/dual-destiny.json"
import derealize from "./exotic-missions/derealize.json"
import heliostat from "./exotic-missions/heliostat.json"



export const EXOTIC_MISSIONS_DATA: Record<string, ActivityData> = {
  "the-whisper": theWhisper as unknown as ActivityData,
  "zero-hour": zeroHour as unknown as ActivityData,
  "presage": presage as unknown as ActivityData,
  "vox-obscura": voxObscura as unknown as ActivityData,
  "seraphs-shield": seraphsShield as unknown as ActivityData,
  "avalon": avalon as unknown as ActivityData,
  "starcrossed": starcrossed as unknown as ActivityData,
  "encore": encore as unknown as ActivityData,
  "dual-destiny": dualDestiny as unknown as ActivityData,
  "derealize": derealize as unknown as ActivityData,
  "heliostat": heliostat as unknown as ActivityData,
}