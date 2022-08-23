import type { Plays } from "./types";

export function onDate(date: string) {
  return (plays: Plays) => plays.filter((play) => play.date === date);
}

export function beforeDate(date: string) {
  return (plays: Plays) => {
    return plays.filter((play) => {
      return play.date < date;
    });
  };
}

export function afterDate(date: string) {
  return (plays: Plays) => {
    return plays.filter((play) => {
      return play.date > date;
    });
  };
}

export function betweenDates(dates: string[]) {
  let [startDate, endDate] = dates;
  return (plays: Plays) => {
    return plays.filter((play) => {
      return play.date >= startDate && play.date <= endDate;
    });
  };
}
