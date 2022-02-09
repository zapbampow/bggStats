import { GameData } from "../models/gameData";
import { countWithOnlyGivenPlayers } from "../utils";

export default function onlyWithWholeFamily(gameData:GameData[]) {
    const family = ["Clayton Ingalls", 'Teresa', 'Autumn', "Asher"]
    return countWithOnlyGivenPlayers(gameData, family)
}