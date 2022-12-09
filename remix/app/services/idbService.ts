import { db, StoreName } from "./db";
import { Table, IndexableType, Collection } from "dexie";

export const getLatestPlayData = async (userId: number) => {
  const latestPlay = await db.plays
    .where("recordingUserId")
    .equals(userId)
    .last();

  return {
    latestPlayDate: latestPlay?.date,
    latestPlayId: latestPlay?.playId,
  };
};

// export const getPlaysFromDate = async (userId: number, date: string) => {
//     const plays = await db.plays
//         .where("recordingUserid")
//         .equals(userId)
//         .and((play) => play.date >= date)
//         .toArray()

//     return plays;
// }

export const testQuery = async (userId: number, date: string) => {
  const plays = await db.plays
    .filter((item) => item.recordingUserId === userId)
    .filter((item) => item.date > date)
    .toArray();

  return plays;
};

class IDBCollection {
  collection: Collection;
  filtered: Collection;

  constructor(storeName: StoreName, userId: number) {
    this.collection = db[storeName].filter(
      (item) => item.recordingUserId === userId
    );
    this.filtered = this.collection;
  }

  data() {
    return this.filtered.toArray();
  }

  count() {
    return this.filtered.count();
  }

  gameName(gameName: string) {
    this.filtered = this.collection.filter(
      (item) => item.gameName === gameName
    );
    return this.filtered;
  }

  gameNames(gameNames: string[]) {
    this.filtered = this.collection.filter((item) =>
      gameNames.includes(item.gameName)
    );
    return this.filtered;
  }

  location(location: string) {
    this.filtered = this.collection.filter(
      (item) => item.location === location
    );
    return this.filtered;
  }

  locations(locations: string[]) {
    this.filtered = this.collection.filter((item) =>
      locations.includes(item.location)
    );
    return this.filtered;
  }

  withPlayer(player: string) {
    // this.filtered = this.collection.filter(item => item.player === player);
    // return this.filtered;
  }

  where(keyName: string, operator: OperatorType, value: any) {
    // Initial test assumes a single value, not array
    if (operator === "equals") {
      this.filtered = this.collection.filter((item) => item[keyName] === value);
      return this.filtered;
    }
  }

  // andWhere(keyName:string) {

  // }
}

export const store = (storeName: StoreName, userId: number) =>
  new IDBCollection(storeName, userId);

type OperatorType = "equals" | "isAbove" | "equalsOrAbove";

function handleOperator(operator: OperatorType) {
  switch (operator) {
    case "equals":
      return "===";
    case "isAbove":
      return ">";
    case "equalsOrAbove":
      return ">=";
  }
}
