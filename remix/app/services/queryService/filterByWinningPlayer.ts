import type { Plays } from "./types";

export function whereSinglePlayerNameWon(name: string) {
  return (plays: Plays) =>
    plays.filter((play) => {
      const namePlayedAndWon = play.players.some(
        (player) => player.name === name && player.win
      );
      const onlyOneWinner =
        play.players.reduce((acc, cur) => {
          return acc + (cur.win ? 1 : 0);
        }, 0) === 1;

      return namePlayedAndWon && onlyOneWinner;
    });
}

export function wherePlayerNamesWon(names: string[]) {
  return (plays: Plays) =>
    plays.filter((play) => {
      const everyNameWon = names.every((name) => {
        return play.players.some(
          (player) => player.win && player.name === name
        );
      });
      return everyNameWon;
    });
}
