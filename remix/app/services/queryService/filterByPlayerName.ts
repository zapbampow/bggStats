import type { Plays } from "./types";

export function withAllPlayerNames(names: string[]) {
  return (plays: Plays) =>
    plays.filter((play) => {
      const playerNames = play.players.map((player) => player.name);
      return names.every((name) => playerNames.includes(name));
    });
}

export function withOnlyPlayerNames(names: string[]) {
  return (plays: Plays) =>
    plays.filter((play) => {
      const orderedNames = names.slice().sort();
      const orderedPlayerNames = play.players
        .map((player) => player.name)
        .sort();
      return orderedNames.every((name, i) => name === orderedPlayerNames[i]);
    });
}

export function withAnyPlayerNames(names: string[]) {
  return (plays: Plays) =>
    plays.filter((play) => {
      let players = play.players.filter((player) => {
        return names.includes(player.name);
      });
      return players.length > 0;
    });
}

export function withPlayerName(name: string) {
  return (plays: Plays) =>
    plays.filter((play) => {
      let players = play.players.filter((player) => {
        return name === player.name;
      });
      return players.length > 0;
    });
}
