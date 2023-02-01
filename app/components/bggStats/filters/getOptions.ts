import {
  getAllGames,
  getAllLocations,
  getAllPlayerNames,
} from "~/utils/analysis/accumulations";
import type { UserInfo } from "~/models/bgg/userInfo";
import type { FilterType } from "~/services/queryService/types";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";

type Args = {
  filter: FilterType;
  user: UserInfo;
  filteredPlays: PlayDataModel[];
};

export default function getOptions({ filteredPlays, filter, user }: Args) {
  if (!filter || !user) return [];

  try {
    const { filter: filterVal } = filter;

    switch (filterVal) {
      case "gameName":
        return getAllGames(filteredPlays, user?.userId || 0);
      case "gameNames":
        return getAllGames(filteredPlays, user?.userId || 0);
      case "location":
        return getAllLocations(filteredPlays, user?.userId || 0);
      case "withPlayerName":
        return getAllPlayerNames(filteredPlays, user?.userId || 0);
      case "whereSinglePlayerNameWon":
        return getAllPlayerNames(filteredPlays, user?.userId || 0);
      case "withAllPlayerNames":
        return getAllPlayerNames(filteredPlays, user?.userId || 0);
      case "withOnlyPlayerNames":
        return getAllPlayerNames(filteredPlays, user?.userId || 0);
      case "withAnyPlayerNames":
        return getAllPlayerNames(filteredPlays, user?.userId || 0);
      case "wherePlayerNamesWon":
        return getAllPlayerNames(filteredPlays, user?.userId || 0);
      case "newForPlayerName":
        return getAllPlayerNames(filteredPlays, user?.userId || 0);

      default:
        return [];
    }
  } catch (err) {
    console.log(err);
  }
}
