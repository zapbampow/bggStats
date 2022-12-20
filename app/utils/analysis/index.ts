import { db } from "../../services/db";
import dayjs from "dayjs";

export async function countByPlayerName(playername: string) {
  let result = await db.plays
    .filter((play) => {
      const includesName = play.players.find(
        (el) => el.name.toLowerCase() === playername.toLowerCase()
      );
      if (includesName) {
        return play;
      }
    })
    .count();
  console.log("result: ", result);
  return result;
}

export async function countWinsByPlayer(playername: string) {
  let result = await db.plays
    .filter((play) => {
      return play.players.find(
        (el) => el.name.toLowerCase() === playername.toLowerCase() && el.win
      );
    })
    .filter((play) => {
      return dayjs(play.date).isAfter("2021-10-01");
    })
    .toArray();
  // .count();
  // console.log("count wins: ", result);
  return result;
}
