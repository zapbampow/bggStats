import {
  getAllGames,
  getAllLocations,
  getAllPlayerNames,
} from "~/utils/analysis/accumulations";
import type { UserInfo } from "~/models/bgg/userInfo";
import type { FilterButtonData } from "../types";

type Args = {
  filter: FilterButtonData;
  user: UserInfo;
};

export default async function getOptions({ filter, user }: Args) {
  try {
    const { value } = filter;

    switch (value) {
      case "gameName":
        return await getAllGames(user?.userId || 0);
      case "gameNames":
        return await getAllGames(user?.userId || 0);
      case "location":
        return await getAllLocations(user?.userId || 0);
      case "whereSinglePlayerNameWon":
        return await getAllPlayerNames(user?.userId || 0);
      default:
        break;
    }
  } catch (err) {
    console.log(err);
  }
}
