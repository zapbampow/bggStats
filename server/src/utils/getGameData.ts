import { GameData, InitialData } from "../models/updatingGameDataModels";
import getKeyName from "./getKeyName";

export default function getGameData(data: InitialData):any {
    const converted = Object.entries(data).reduce((acc, cur) => {
      const key = getKeyName(cur[0]);
      const value = cur[1];
      
      // Don't include player data
      if(key.includes('player')) {
        return acc;
      }
      
      // Add converted keyname and value to the object
      acc[key] = value;
      return acc;
    }, {})
    
    return converted;
  }