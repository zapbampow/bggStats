import type { PlayDataModel } from "~/models/bgg/gameDataModels";

type Plays = PlayDataModel[];

type CountArgsType = "plays" | "locations" | "games" | "people" | "days";

export function count(arg: CountArgsType) {
  return (plays: Plays) => {
    // PLAYS
    if (arg === "plays") {
      return plays.reduce((acc, cur) => {
        const curQuantity = cur.quantity ?? 1;
        return acc + curQuantity;
      }, 0);
    }

    // LOCATIONS
    if (arg === "locations") {
      let locations = plays
        .map((play) => play?.location || null)
        .filter((location) => location !== null);
      let differentLocations = Array.from(new Set(locations));
      return differentLocations.length;
    }

    // GAME NAMES
    if (arg === "games") {
      const allGameNames = plays
        .filter((play) => play.gameName)
        .map((play) => play.gameName);
      const differentGames = Array.from(new Set(allGameNames));
      return differentGames.length;
    }

    if (arg === "people") {
      const nameOfUser = getNameOfUser(plays[0]);
      const allPlayerNames = plays
        .map((play) =>
          play.players
            .map((player) => player.name)
            .filter((name) => name !== nameOfUser)
        )
        .flat();
      const differentPlayers = Array.from(new Set(allPlayerNames));
      return differentPlayers.length;
    }

    if (arg === "days") {
      const allDates = plays.map((play) => play.date);
      const differentDates = Array.from(new Set(allDates));
      return differentDates.length;
    }

    return 0;
  };
}

const getNameOfUser = (play: PlayDataModel) => {
  const userId = play.recordingUserId;
  const nameOfUser = play.players.find(
    (player) => player.userId === userId
  )?.name;
  return nameOfUser;
};
