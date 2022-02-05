import { GameData, GameDataModel, InitialData } from "../models/updatingGameDataModels"
import getGameData from "./getGameData";
import getPlayerData from "./getPlayerData"

export default function convertPlayRecord(data:InitialData): GameDataModel {
    const playerData = getPlayerData(data);
    const gameData = getGameData(data);
    
    return {
      ...gameData, 
      players: playerData
    }
  }