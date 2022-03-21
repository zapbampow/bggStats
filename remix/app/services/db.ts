import Dexie, { Table } from "dexie";
import { PlayDataModel } from "../models/bgg/gameDataModels";

// Update if/when new stores are added. Used in idbService for IDBCollection method chaining stuff.
export type StoreName = 'plays';

export class BggStats extends Dexie {
  // 'plays' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  plays!: Table<PlayDataModel>;

  constructor() {
    super("BggStats");
    this.version(1).stores({
      // Primary key and indexed props
      plays: `playId, recordingUserId, gameId, gameName, date, quantity, location, length, incomplete, comments, noWinStats, players`,
    });
  }
}

export const db = new BggStats();


export const bulkAddPlays = async (data: PlayDataModel[]) => {
  try {
    await db.plays.bulkAdd(data);
  } catch (e) {
    console.error(e);
  }
};
