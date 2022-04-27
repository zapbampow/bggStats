import type { Plays } from "./types";

export function listGameNames() {
  return (plays: Plays) => {
    const everyGameName = plays.map((play) => play.gameName);
    return Array.from(new Set(everyGameName));
  };
}

export function listLocations() {
  return (plays: Plays) => {
    const everyLocation = plays
      .filter((play) => play?.location && play.location.length > 0)
      .map((play) => play.location);
    return Array.from(new Set(everyLocation));
  };
}

export function listPlayerNames() {
  return (plays: Plays) => {
    const everyPlayerName = plays
      .map((play) => {
        const playerNames = play.players.map((player) => player.name);
        return playerNames;
      })
      .flat();
    return Array.from(new Set(everyPlayerName));
  };
}

export function listDates() {
  return (plays: Plays) => {
    const everyDate = plays.map((play) => play.date);
    return Array.from(new Set(everyDate));
  };
}
