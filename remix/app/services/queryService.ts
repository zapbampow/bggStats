import { db, StoreName } from "./db";
import { Table, IndexableType, Collection } from "dexie";
import { PlayDataModel } from "~/models/bgg/gameDataModels";

/**
 * How it works:
 * 1. getInitialPlayData returns all the user plays as an array
 * 2. pipeWithFilters runs through the various filters and functions in order to return whatever the user has asked for
 *
 * TODO: create a wrapper function that takes in userId and filters, then runs bother getInitialPlayData and pipeWithFilters
 * TODO: How do I ensure filters happen in the right order? In particular, it needs to do things like count and list locations/player/gameNames/etc last
 */

type Plays = PlayDataModel[];

export const getInitialPlayData = async (userId: number) => {
  try {
    const plays = await db.plays
      .where("recordingUserId")
      .equals(userId)
      .toArray();
    return plays;
  } catch (err) {
    console.log(err);
  }
};

/**
 * RUNS PIPE ON IndexDB DATA USING ARGS LIKE WE I WANT TO USE THEM IN BGGSTATS
 */
const args = {
  gameName: "",
  location: "",
  withPlayer: "",
};

export type ArgsType = {
  gameName?: string;
  // gameNames?: string[];
  // withPlayer?: string;
  // withPlayers?: string[];
  location?: string;
  // locations?: string[];
};

const argFunctionPairs = {
  gameName: gameName,
  // gameNames: gameNames,
  // withPlayer: withPlayer,
  // withPlayers: withPlayers,
  location: location,
  // locations: locations,
};

const pipe = (initialPlays: Plays, ...fns: Function[]) =>
  fns.reduce((acc, cur) => {
    return cur(acc);
  }, initialPlays);

export function pipeWithArgs(plays: Plays, args: ArgsType) {
  let keysAndValues = [];
  for (const [key, value] of Object.entries(args)) {
    keysAndValues.push([key, value]);
  }
  return pipe(
    plays,
    ...keysAndValues.map(([key, value]) => argFunctionPairs[key](value))
  );
}

function gameName(gameName: string) {
  return (plays: Plays) => {
    return plays.filter((item) => item.gameName === gameName);
  };
}

function location(location: string) {
  return (plays: Plays) => plays.filter((item) => item.location === location);
}
