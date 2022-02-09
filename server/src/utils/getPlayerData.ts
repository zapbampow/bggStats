import { PlayerModel, InitialData } from "../models/updatingGameDataModels";
import getKeyName from "./getKeyName";

export default function getPlayerData(data:InitialData) {
    
    const playerData:[keyof InitialData, string][] = Object.entries(data)
        .filter(item => item[0].includes('player') && item[1] !== '');
    
    const convertedData:PlayerModel[] = [];
    playerData.forEach((info:[keyof InitialData, string]) => {
      const keyArr = info[0].split(" ");
      const index:number = Number.parseInt(keyArr[1]) - 1;
      const key:string = getKeyName(keyArr[2]);
      const value:string = info[1]
      
      if(!convertedData[index]) {
        convertedData[index] = {
          name: ''
        }
      }
      convertedData[index][key] = value;
    })
    
    return convertedData
  }