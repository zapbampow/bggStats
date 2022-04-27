import type { Plays } from "./types";

export function location(location: string) {
  return (plays: Plays) => plays.filter((item) => item.location === location);
}

export function locations(locations: string[]) {
  return (plays: Plays) =>
    plays.filter((item) => item?.location && locations.includes(item.location));
}
