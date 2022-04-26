import { db } from "./db";
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

    return plays || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

/**
 * RUNS PIPE ON IndexDB DATA USING ARGS LIKE WE I WANT TO USE THEM IN BGGSTATS
 */

type FilterArgsType = {
  order: number;
  // figure out how to generate a union type of functions in argfunctionpairs
  filter: string;
  // the arg type will change as I build more filters that can take different arguments
  // Maybe join all arg types for functions
  arg: string | string[];
};

export type ArgsType = {
  gameName?: string;
  // gameNames?: string[];
  // withPlayer?: string;
  // withPlayers?: string[];
  location?: string;
};

const argFunctionPairs = {
  // AGGREGATES
  count: count,
  locations: locations,
  // gameNames: gameNames,
  // players: players,

  // FILTERS
  gameName: gameName,
  location: location,
  // withPlayer: withPlayer,
  // withPlayers: withPlayers,
};

const pipe = (initialPlays: Plays, ...fns: Function[]) =>
  fns.reduce((acc, cur) => {
    return cur(acc);
  }, initialPlays);

// export function pipeWithArgs(plays: Plays, args: ArgsType) {
//   let keysAndValues = [];
//   for (const [key, value] of Object.entries(args)) {
//     keysAndValues.push([key, value]);
//   }
//   return pipe(
//     plays,
//     ...keysAndValues.map(([key, value]) => argFunctionPairs[key](value))
//   );
// }

export function pipeWithArgs2(plays: Plays, args: FilterArgsType[]) {
  console.log(args);
  return pipe(
    plays,
    ...args.map(({ filter, arg }) => argFunctionPairs[filter](arg))
  );
}

export async function filter(userId: number, filters: FilterArgsType[]) {
  const plays = await getInitialPlayData(userId);
  const pipe = pipeWithArgs2(plays, filters);

  return pipe;
}

// AGGREGATE functions
type CountArgsType = "plays" | "locations" | "games";

function count(arg: CountArgsType) {
  return (plays: Plays) => {
    // PLAYS
    if (arg === "plays") {
      return plays.reduce((acc, cur) => {
        const curQuantity = cur.quantity ?? 1;
        return acc + curQuantity;
      }, 0);
    }

    // LOCATIONS
    if (arg === "locations") {
      return plays
        .map((play) => play?.location || null)
        .filter((location) => location !== null).length;
    }

    return 0;
  };
}

function locations() {
  return (plays: Plays) => {
    const everyLocation = plays
      .filter((play) => play?.location?.length > 0)
      .map((play) => play.location);
    return Array.from(new Set(everyLocation));
  };
}

// FILTER functions
function gameName(gameName: string) {
  return (plays: Plays) => {
    return plays.filter((item) => item.gameName === gameName);
  };
}

function location(location: string) {
  return (plays: Plays) => plays.filter((item) => item.location === location);
}
