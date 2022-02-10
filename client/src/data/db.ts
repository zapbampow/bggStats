import Dexie, { Table } from "dexie";
import { PlayDataModel } from "../models/gameDataModels";

export class BGGDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  plays!: Table<PlayDataModel>;

  constructor() {
    super("myDatabase");
    this.version(1).stores({
      plays: "playId, gameId, userId, gameName, date, quantity, location, length, incomplete, comments, noWinStats, players", // Primary key and indexed props
    });
  }
}

export const db = new BGGDexie();
