import {
  getAllGames,
  getAllLocations,
  getAllPlayerNames,
} from "~/utils/analysis/accumulations";
import type { UserInfo } from "~/models/bgg/userInfo";
import type { FilterType } from "~/services/queryService/types";

type Args = {
  filter: FilterType;
  user: UserInfo;
};

export default async function getOptions({ filter, user }: Args) {
  if (!filter || !user) return [];

  try {
    const { filter: filterVal } = filter;

    switch (filterVal) {
      case "gameName":
        return await getAllGames(user?.userId || 0);
      case "gameNames":
        return await getAllGames(user?.userId || 0);
      case "location":
        return await getAllLocations(user?.userId || 0);
      case "withPlayerName":
        return await getAllPlayerNames(user?.userId || 0);
      case "whereSinglePlayerNameWon":
        return await getAllPlayerNames(user?.userId || 0);
      case "withAllPlayerNames":
        return await getAllPlayerNames(user?.userId || 0);
      case "withOnlyPlayerNames":
        return await getAllPlayerNames(user?.userId || 0);
      case "withAnyPlayerNames":
        return await getAllPlayerNames(user?.userId || 0);
      case "wherePlayerNamesWon":
        return await getAllPlayerNames(user?.userId || 0);
      case "newForPlayerName":
        return await getAllPlayerNames(user?.userId || 0);

      default:
        return [];
    }
  } catch (err) {
    console.log(err);
  }
}
