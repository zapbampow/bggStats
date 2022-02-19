import { db } from "../../data/db";
import { SuperFlatGameData } from "../../models/superFlatGameData";

export const bulkAddPlays = async (data: SuperFlatGameData[]) => {
  try {
    await db.plays.bulkAdd(data);
  } catch (e) {
    console.error(e);
  }
};
