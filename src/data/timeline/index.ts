// Auto-generated Destiny Timeline
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
import epilogue from './16-epilogue.json';

export interface TimelineEvent {
  title: string;
  description: string;
  date?: string;
  tags?: string[];
  image?: string;
}

export interface TimelineEra {
  id: string;
  name: string;
  description: string;
  themeColor: "cyan" | "green" | "yellow" | "orange" | "red" | "zinc" | "purple" | "blue" | "prismatic";
  image?: string;
  events: TimelineEvent[];
}

export const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX"];

export const DESTINY_TIMELINE: TimelineEra[] = [
  theAncientPast as unknown as TimelineEra,
  historyOfTheCabal as unknown as TimelineEra,
  historyOfTheEliksni as unknown as TimelineEra,
  preGoldenAge as unknown as TimelineEra,
  theGoldenAge as unknown as TimelineEra,
  theCollapse as unknown as TimelineEra,
  darkAge as unknown as TimelineEra,
  theCityAge as unknown as TimelineEra,
  theYoungWolfSAscension as unknown as TimelineEra,
  theRedWar as unknown as TimelineEra,
  cayde6SDeath as unknown as TimelineEra,
  returnOfTheBlackFleet as unknown as TimelineEra,
  theWarAgainstTheWitness as unknown as TimelineEra,
  theEchoesArmsRace as unknown as TimelineEra,
  theFateSaga as unknown as TimelineEra,
  epilogue as unknown as TimelineEra
];
