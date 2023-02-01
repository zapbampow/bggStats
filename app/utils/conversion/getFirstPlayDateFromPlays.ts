import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { db } from "~/services/db";

export type RowData = {
  playId: number;
  gameId: number;
  date: string;
  gameName: string;
  username: string | null | undefined;
  name: string;
};

// TODO: Some options
// 1. get first time I recorded play by game, regardless of players (getFirstGameRecordsForUsername) - ignores players altogether and just gets first play record for each game
// 2. get first recorded play by game, username, and name (getFirstGameRecordForAllPlayers)
// USE #1 for now with option to create a new tab for #2 later with an explanation of what the difference is

export async function getAllFirstGamePlaysFromPlays(username: string) {
  if (!username) return [];
  const user = await db.users.get({ username: username });
  // console.log("user", user);
  const plays = await db.plays
    .where({ recordingUserId: user?.userId })
    .toArray();

  const firstPlays: RowData[] = [];

  plays.forEach((play) => {
    let { playId, gameId, date, gameName } = play;
    // check each player to see if they are in firstPlays with this game
    let players = play.players;

    players.forEach((player) => {
      let { username, name } = player;
      let inFirstPlays = firstPlays.some(
        (play) =>
          play.username === username &&
          play.name === name &&
          play.gameId === gameId &&
          play.gameName == gameName
      );

      if (inFirstPlays) {
        // console.log("inFirstPlays", inFirstPlays);
        return;
      }

      firstPlays.push({
        playId,
        gameId,
        date,
        gameName,
        username,
        name,
      });
    });
  });

  return firstPlays;
}

export type FirstRecordRow = {
  playId: number;
  gameId: number;
  date: string;
  gameName: string;
};
export const getFirstRecordPerGameForUsername = async (username: string) => {
  if (!username) return [];
  const user = await db.users.get({ username: username });

  const plays = await db.plays
    .where({ recordingUserId: user?.userId })
    .toArray();

  const firstPlays: FirstRecordRow[] = [];

  plays.forEach((play) => {
    let { playId, gameId, date, gameName } = play;

    let inFirstPlays = firstPlays.some((play) => play.gameId === gameId);
    if (inFirstPlays) return;

    firstPlays.push({
      playId,
      gameId,
      date,
      gameName,
    });
  });

  return firstPlays;
};
