import Dexie, { Table } from "dexie";
import { SuperFlatGameData } from "../models/superFlatGameData";

export class BggStats extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  plays!: Table<SuperFlatGameData>;

  constructor() {
    super("BggStats");
    this.version(2).stores({
      // Primary key and indexed props
      plays: `id, recorderUserId, playId, gameId, gameName, date, quantity, location, length, incomplete, comments, noWinStats, username, userId, name, score, win, new, startposition, color, rating`,
    });
  }
}

export const db = new BggStats();
