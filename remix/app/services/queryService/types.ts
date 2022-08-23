import type { PlayDataModel } from "~/models/bgg/gameDataModels";

export type Plays = PlayDataModel[];

export type FilterType = {
  order: number | "aggregator";
  filter: string;
  arg: string | string[];
};
