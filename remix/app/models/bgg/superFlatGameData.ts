/**
 * IndexDB can't index properties with boolean values.
 * So on values that should be boolean I'm just using 0 | 1
 * */

export interface GameData {
  recorderUserId: number;
  playId: number;
  gameId: number;
  gameName: string;
  date: string;
  quantity: number;
  location: string;
  length: number;
  incomplete: 0 | 1;
  comments: string;
  noWinStats: 0 | 1;
}

export interface Player {
  username: string;
  userId: number;
  name: string;
  score: number;
  win: 0 | 1;
  new: 0 | 1;
  startposition: number;
  color: string;
  rating: number;
}

export interface SuperFlatGameData extends GameData, Player {
  id: string; // playid + name + playeruserid ;
}

// {
//   recorderUserId: number;
//   playId: number;
//   gameId: number;
//   gameName: string;
//   date: string;
//   quantity: number;
//   location: string;
//   length: number;
//   incomplete: 0 | 1;
//   comments: string;
//   noWinStats: 0 | 1; ... 9 more ...;
//   id: string;
// }
