import { db } from "../db";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { count } from "./count";
import {
  listDates,
  listGameNames,
  listLocations,
  listRecordedPlays,
  listPlayerNames,
} from "./list";
import {
  withOnlyPlayerNames,
  withAllPlayerNames,
  withAnyPlayerNames,
} from "./filterByPlayerName";
import {
  whereSinglePlayerNameWon,
  wherePlayerNamesWon,
} from "./filterByWinningPlayer";
import { onDate, beforeDate, afterDate, betweenDates } from "./filterByDate";
import { gameName, gameNames } from "./filterByGameName";
import { location, locations } from "./filterByLocation";
import type { FilterType } from "./types";

/**
 * How it works:
 * 1. getInitialPlayData returns all the user plays as an array
 * 2. pipeWithFilters runs through the various filters and functions in order to return whatever the user has asked for
 *
 * TODO: create a wrapper function that takes in userId and filters, then runs bother getInitialPlayData and pipeWithFilters
 * TODO: How do I ensure filters happen in the right order? In particular, it needs to do things like count and list locations/player/gameNames/etc last
 * TODO: For filters, come up with pattern for including all/any/only when that makes sense. Maybe abstract it so it is less code.
 */

type Plays = PlayDataModel[];

export const getInitialPlayData = async (userId: number) => {
  try {
    const plays = await db.plays
      .where("recordingUserId")
      .equals(userId)
      .toArray();

    return plays || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * RUNS PIPE ON IndexDB DATA USING ARGS LIKE WE I WANT TO USE THEM IN BGGSTATS
 */

type FilterName =
  | "count"
  | "listGameNames"
  | "listLocations"
  | "listPlayerNames"
  | "listDate"
  | "listPlayData"
  | "gameName"
  | "location"
  | "withOnlyPlayerNames"
  | "withAllPlayerNames"
  | "withAnyPlayerNames"
  | "whereSinglePlayerNameWon"
  | "wherePlayerNamesWon"
  | "onDate"
  | "beforeDate"
  | "afterDate"
  | "betweenDates";

// export type FilterType = {
//   order: number | "aggregator";
//   filter: FilterName;
//   // the arg type will change as I build more filters that can take different arguments
//   // Maybe join all arg types for functions
//   arg: string | string[];
// };

const argFunctionPairs = {
  // AGGREGATES
  count: count,
  listLocations: listLocations,
  listGameNames: listGameNames,
  listPlayerNames: listPlayerNames,
  listDates: listDates,
  listRecordedPlays: listRecordedPlays,

  // FILTERS
  gameName: gameName,
  gameNames: gameNames,
  location: location,
  locations: locations,
  withAllPlayerNames: withAllPlayerNames,
  withOnlyPlayerNames: withOnlyPlayerNames,
  withAnyPlayerNames: withAnyPlayerNames,
  wherePlayerNamesWon: wherePlayerNamesWon,
  whereSinglePlayerNameWon: whereSinglePlayerNameWon,
  onDate: onDate,
  beforeDate: beforeDate,
  afterDate: afterDate,
  betweenDates: betweenDates,
};

const pipe = (initialPlays: Plays, ...fns: Function[]) =>
  fns.reduce((acc, cur) => {
    return cur(acc);
  }, initialPlays);

export function pipeWithArgs2(plays: Plays, args: FilterType[]) {
  // console.log({ plays, args });
  return pipe(
    plays,
    ...args.map(({ filter, arg }) => argFunctionPairs[filter](arg)) // I don't know TS well enough to type my way out of this linting error, but it runs fine
  );
}

export default async function filter(userId: number, filters: FilterType[]) {
  const plays = await getInitialPlayData(userId);
  const pipe = pipeWithArgs2(plays, filters);

  return pipe;
}
