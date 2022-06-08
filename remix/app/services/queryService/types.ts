import type { PlayDataModel } from "~/models/bgg/gameDataModels";

export type Plays = PlayDataModel[];

export type FilterType = {
  order: number | "accumulator";
  filter: string;
  arg: string;
};
