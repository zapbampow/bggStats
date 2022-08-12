import { db } from "../../services/db";
import type { SelectionType } from "~/components/bggStats/types";

// All these must filter by recordingUserId too
export const getAllPlayerNames = async (recordingUserId: number) => {
  const names: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play.players.forEach((player) => player?.name && names.push(player.name));
    });

  const uniqueNames = [...new Set(names)];

  return uniqueNames;
};

export const getAllUserNames = async (recordingUserId: number) => {
  const usernames: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play.players.forEach(
        (player) => player?.username && usernames.push(player.username)
      );
    });

  const uniqueUsernames = [...new Set(usernames)];

  return uniqueUsernames;
};

export const getAllPlayedColors = async (recordingUserId: number) => {
  const colors: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play.players.forEach(
        (player) => player?.color && colors.push(player.color)
      );
    });

  const uniqueColors = [...new Set(colors)];

  return uniqueColors;
};

export const getAllLocations = async (recordingUserId: number) => {
  const locations: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play?.location && locations.push(play.location);
    });

  const uniqueLocations = [...new Set(locations)];

  return uniqueLocations;
};

export const getAllGameNames = async (recordingUserId: number) => {
  if (!recordingUserId) return [];

  const gameNames: string[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      play?.gameName && gameNames.push(play.gameName);
    });

  const uniqueGameNames = [...new Set(gameNames)];
  const sortedGames = sortGameNames(uniqueGameNames);

  return sortedGames;
};
export const getAllGames = async (recordingUserId: number) => {
  if (!recordingUserId) return [];

  const games: SelectionType[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      const game: SelectionType = {
        value: play?.gameId.toString(),
        label: play?.gameName,
      };
      game?.value && game?.label && games.push(game);
    });

  if (!games || games.length <= 0) return [];

  const uniqueGames = [
    ...new Map(games.map((game) => [game["value"], game])).values(),
  ];

  const sortedGames = sortGames(uniqueGames);

  return sortedGames;
};

const sortGames = (games: SelectionType[]) => {
  let sorted = games.sort((a, b) => {
    let noArticleA = removeStartArticles(a.label.toLowerCase());
    let noArticleB = removeStartArticles(b.label.toLowerCase());

    if (noArticleA > noArticleB) return 1;
    if (noArticleA < noArticleB) return -1;
    return 0;
  });

  return sorted;
};

const removeStartArticles = (game: string) => {
  if (game.startsWith("the ")) {
    return game.slice(3).trim();
  } else if (game.startsWith("a ")) {
    return game.slice(1).trim();
  } else {
    return game;
  }
};
