// Auto-generated Destiny Timeline
export interface TimelineEvent {
  title: string;
  description: string;
  date?: string;
  tags?: string[];
}

export interface TimelineEra {
  id: string;
  name: string;
  description: string;
  themeColor: "cyan" | "green" | "yellow" | "orange" | "red" | "zinc";
  events: TimelineEvent[];
}

import theAncientPast from './01-the-ancient-past.json';
import historyOfTheCabal from './02-history-of-the-cabal.json';
import historyOfTheEliksni from './03-history-of-the-eliksni.json';
import preGoldenAge from './04-pre-golden-age.json';
import theGoldenAge from './05-the-golden-age.json';
import theCollapse from './06-the-collapse.json';
import darkAge from './07-dark-age.json';
import theCityAge from './08-the-city-age.json';
import theYoungWolfSAscension from './09-the-young-wolf-s-ascension.json';
import theRedWar from './10-the-red-war.json';
import cayde6SDeath from './11-cayde-6-s-death.json';
import returnOfTheBlackFleet from './12-return-of-the-black-fleet.json';
import theWarAgainstTheWitness from './13-the-war-against-the-witness.json';
import theEchoesArmsRace from './14-the-echoes-arms-race.json';
import theFateSaga from './15-the-fate-saga.json';

export const DESTINY_TIMELINE: TimelineEra[] = [
  theAncientPast,
  historyOfTheCabal,
  historyOfTheEliksni,
  preGoldenAge,
  theGoldenAge,
  theCollapse,
  darkAge,
  theCityAge,
  theYoungWolfSAscension,
  theRedWar,
  cayde6SDeath,
  returnOfTheBlackFleet,
  theWarAgainstTheWitness,
  theEchoesArmsRace,
  theFateSaga
];
