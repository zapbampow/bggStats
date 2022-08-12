import type { Plays } from "./types";

export function gameName(gameName: string) {
  console.log("gameName", gameName);
  return (plays: Plays) => {
    return plays.filter((item) => item.gameName === gameName);
  };
}

export function gameNames(gameNames: string[]) {
  return (plays: Plays) => {
    return plays.filter((item) => gameNames.includes(item.gameName));
  };
}
