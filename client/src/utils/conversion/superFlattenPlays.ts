import { BGGData, BGGPlay, BGGPlayerData } from "../../models/incomingBggData";
import {
  SuperFlatGameData,
  GameData,
  Player,
} from "../../models/superFlatGameData";

// Converts the data that has come in from BGG into a format that will be a lot easier to work with
export function superFlattenPlays(data: BGGData) {
  const userid = parseInt(data.plays._attributes.userid);
  const flattenedPlays: SuperFlatGameData[] = data.plays.play
    .map((item) => superFlattenSinglePlay(item, userid))
    .reduce((cur, acc) => [...cur, ...acc], []);
  return flattenedPlays;
}

// Converts a single play into an easier formot
function superFlattenSinglePlay(
  data: BGGPlay,
  userid: number
): SuperFlatGameData {
  const { id, date, quantity, length, incomplete, nowinstats, location } =
    data._attributes;
  const { name, objectid } = data.item._attributes;
  const comments = data?.comments?._text || "";

  const players: Player[] = convertPlayers(data?.players?.player);

  const play: GameData = {
    playId: parseInt(id, 10),
    gameId: parseInt(objectid, 10),
    recorderUserId: userid,
    gameName: name,
    date: date,
    quantity: parseInt(quantity, 10) || 1,
    location: location || null,
    length: parseInt(length, 10) || null,
    incomplete: parseInt(incomplete, 10) > 0 ? 1 : 0,
    comments: comments || null,
    noWinStats: parseInt(nowinstats, 10) > 0 ? 1 : 0,
  };

  const playerPlays: SuperFlatGameData[] = players.map((player) => {
    return {
      id: `${play.playId}${player.name.replace(/\s+/g, "")}${
        player.userId ?? ""
      }`,
      ...player,
      ...play,
    };
  });

  return playerPlays;
}

function convertPlayers(data: BGGPlayerData[] | BGGPlayerData = []): Player[] {
  const dataIsArray = Array.isArray(data);

  if (dataIsArray) {
    const players: Player[] = data.map(({ _attributes }) => {
      return {
        username: _attributes.username || 0,
        userId: parseInt(_attributes.userid, 10) || 0,
        name: _attributes.name || "",
        score: parseInt(_attributes.username, 10) || 0,
        win: parseInt(_attributes?.win, 10) > 0 ? 1 : 0,
        new: parseInt(_attributes.new, 10) > 0 ? 1 : 0,
        startposition: parseInt(_attributes.startposition, 10) || 0,
        color: _attributes.color || "",
        rating: parseInt(_attributes.rating, 10) || 0,
      };
    });

    return players;
  } else {
    return [
      {
        username: data._attributes.username || "",
        userId: parseInt(data._attributes.userid, 10) || 0,
        name: data._attributes.name || "",
        score: parseInt(data._attributes.username, 10) || 0,
        win: parseInt(data._attributes.win, 10) > 0 ? 1 : 0,
        new: parseInt(data._attributes.new, 10) > 0 ? 1 : 0,
        startposition: parseInt(data._attributes.startposition, 10) || 0,
        color: data._attributes.color || "",
        rating: parseInt(data._attributes.rating, 10) || 0,
      },
    ];
  }
}
