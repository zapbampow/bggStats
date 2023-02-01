import type { SelectionType } from "~/components/bggStats/types";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import { PlayDataModel } from "~/models/bgg/gameDataModels";

export function getAllGames(
  filteredPlays: PlayDataModel[],
  recordingUserId: number
) {
  if (!recordingUserId) return [];

  const games: SelectionType[] = [];
  filteredPlays
    .filter((play) => play.recordingUserId === recordingUserId)
    .forEach((play) => {
      const game: SelectionType = {
        value: play?.gameId.toString(),
        label: play?.gameName,
      };
      game?.value && game?.label && games.push(game);
    });

  return getUniqueSortedSelections(games);
}

export const getAllPlayerNames = (
  filteredPlays: PlayDataModel[],
  recordingUserId: number
) => {
  const names: SelectionType[] = [];
  filteredPlays
    .filter((play) => play.recordingUserId === recordingUserId)
    .forEach((play) => {
      play.players.forEach((player) => {
        let playerSelection = {
          value: player.name,
          label: player.name,
        };
        names.push(playerSelection);
      });
    });

  return getUniqueSortedSelections(names);
};

export const getAllUserNames = (
  filteredPlays: PlayDataModel[],
  recordingUserId: number
) => {
  const usernames: string[] = [];
  filteredPlays
    .filter((play) => play.recordingUserId === recordingUserId)
    .forEach((play) => {
      play.players.forEach(
        (player) => player?.username && usernames.push(player.username)
      );
    });

  const uniqueUsernames = [...new Set(usernames)];

  return uniqueUsernames;
};

export const getAllPlayedColors = (
  filteredPlays: PlayDataModel[],
  recordingUserId: number
) => {
  const colors: string[] = [];
  filteredPlays
    .filter((play) => play.recordingUserId === recordingUserId)
    .forEach((play) => {
      play.players.forEach(
        (player) => player?.color && colors.push(player.color)
      );
    });

  const uniqueColors = [...new Set(colors)];

  return uniqueColors;
};

export const getAllLocations = (
  filteredPlays: PlayDataModel[],
  recordingUserId: number
) => {
  if (!recordingUserId) return [];

  const locations: SelectionType[] = [];
  filteredPlays
    .filter((play) => play.recordingUserId === recordingUserId)
    .forEach((play) => {
      const location = {
        value: play.location?.replace(/\s+/g, ""),
        label: play.location,
      };
      play?.location && locations.push(location);
    });

  return getUniqueSortedSelections(locations);
};

const getUniqueSortedSelections = (selections: SelectionType[] = []) => {
  if (selections.length === 0) return [];

  const uniqueSelections = [
    ...new Map(
      selections.map((selection) => [selection["value"], selection])
    ).values(),
  ];

  const sortedSelections = sortSelections(uniqueSelections);

  return sortedSelections;
};

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
