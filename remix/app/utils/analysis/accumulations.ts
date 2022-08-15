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
  if (!recordingUserId) return [];

  const locations: SelectionType[] = [];
  await db.plays
    .filter((play) => play.recordingUserId === recordingUserId)
    .each((play) => {
      const location = {
        value: play?.location?.replace(/\s+/g, ""),
        label: play?.location,
      };
      play?.location && locations.push(location);
    });

  const uniqueLocations = [
    ...new Map(
      locations.map((location) => [location["value"], location])
    ).values(),
  ];

  const sortedLocations = sortSelections(uniqueLocations);

  return sortedLocations;
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

  const sortedGames = sortSelections(uniqueGames);

  return sortedGames;
};

// export const getAllGameNames = async (recordingUserId: number) => {
//   if (!recordingUserId) return [];

//   const gameNames: string[] = [];
//   await db.plays
//     .filter((play) => play.recordingUserId === recordingUserId)
//     .each((play) => {
//       play?.gameName && gameNames.push(play.gameName);
//     });

//   const uniqueGameNames = [...new Set(gameNames)];
//   const sortedGames = sortGameNames(uniqueGameNames);

//   return sortedGames;
// };

const sortSelections = (selections: SelectionType[]) => {
  let sorted = selections.sort((a, b) => {
    let noArticleA = removeStartArticles(a.label.toLowerCase());
    let noArticleB = removeStartArticles(b.label.toLowerCase());

    if (noArticleA > noArticleB) return 1;
    if (noArticleA < noArticleB) return -1;
    return 0;
  });

  return sorted;
};

const removeStartArticles = (str: string) => {
  if (str.startsWith("the ")) {
    return str.slice(3).trim();
  } else if (str.startsWith("a ")) {
    return str.slice(1).trim();
  } else {
    return str;
  }
};
