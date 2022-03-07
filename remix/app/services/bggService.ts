// import convert from "xml-js";
import { superFlattenPlays } from "../utils/conversion/superFlattenPlays";
import { xmlToJson, convertXmlToJsObject } from "../utils/conversion/xmlToJson";
// import tenaciousFetch from "tenacious-fetch";
import fetchRetry from "fetch-retry";
import { BGGData, BGGPlay, BGGPlayerData } from "~/models/bgg/incomingBggData";
import { PlayDataModel, PlayerModel } from "~/models/bgg/gameDataModels";

// TODO: Refactor to get all data once the first query lets the app know how many plays there actually are
// Possibly add a custom hook that includes returning the progress for getting data
const fetchConfig = {
  retries: 6,
  retryStatus: [429],
  // retryDelay: 1000,
  factor: 8,
  timeout: 35000,
  onRetry: ({ retriesLeft, retryDelay, response }) =>
    console.log({ retriesLeft, retryDelay, response }),
};

export async function fetchXmlPlayData(username: string, page?: number) {
  try {
    const pageQuery = page ? `&page=${page}` : "";
    const query = `https://boardgamegeek.com/xmlapi2/plays?username=${username}${pageQuery}`;
    // const res = await tenaciousFetch(query, fetchConfig);
    const originalFetch = window.fetch;
    const fetch = fetchRetry(originalFetch);
    const res = await fetch(query, {
      retries: 7,
      retryDelay: function (attempt, error, response) {
        return Math.pow(8, attempt) * 1000; // 1000, 2000, 4000
      },
    });
    const xmlData = await res.text();
    return xmlData;
  } catch (err) {
    console.log("err: ", JSON.stringify(err));
    throw new Error(err);
  }
}

export async function getInitialPlayData(username: string) {
  try {
    const xmlData = await fetchXmlPlayData(username);
    const data = convertXmlToJsObject(xmlData);

    const plays = superFlattenPlays(data);
    const pages = Math.ceil(parseInt(data.plays._attributes.total, 10) / 100);

    console.log("pages: ", pages);

    return {
      plays,
      pages,
    };

    // return plays;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export const getPlayDataWithExponentialBackingOff = async (
  username: string,
  pages: number,
  setPercentDone: (x: number) => void
) => {
  try {
    // Create array from 1 to pages
    const pageArray = Array.from({ length: pages }, (_, i) => i + 1);

    // Create array of promises to get page data
    const allPages: any[] = pageArray
      .map((page) => {
        const xmlData = fetchXmlPlayData(username, page);
        return xmlData;
      })
      .filter((x) => x);

    // Get play data
    const start = performance.now();
    const collectedXML = [];
    for await (let [i, data] of allPages.entries()) {
      const xml = await data;
      collectedXML.push(xml);
      const percentDone = ((i + 1) / allPages.length) * 100;
      setPercentDone(percentDone);
    }
    const end = performance.now();
    console.log("time to get data: ", (end - start) / 1000 + "seconds");
    // console.log("collectedXML: ", collectedXML);

    // Convert and flatten play data
    const convertedData = collectedXML?.map((page) => {
      // TODO: update play data model in
      const converted = convertXmlToJsObject(page);
      const flattened = flattenBGGPlayData(converted);
      return flattened;
    });
    const reduced = convertedData.reduce((acc, cur) => {
      return [...acc, ...cur];
    }, []);
    return reduced;
  } catch (err) {
    throw Error(err);
  }
};

// Converts the data that has come in from BGG into a format that will be a lot easier to work with
export default function flattenBGGPlayData(data: BGGData) {
  const userid = parseInt(data.plays._attributes.userid);
  const flattenedPlays: PlayDataModel[] = data.plays.play.map((item) =>
    flattenSinglePlay(item, userid)
  );
  return flattenedPlays;
}

// Converts a single play into an easier formot
function flattenSinglePlay(data: BGGPlay, userid: number): PlayDataModel {
  const { id, date, quantity, length, incomplete, nowinstats, location } =
    data._attributes;
  const { name, objectid } = data.item._attributes;
  const comments = data?.comments?._text || "";

  const players = convertPlayers(data?.players?.player);

  const play: PlayDataModel = {
    playId: parseInt(id),
    gameId: parseInt(objectid),
    recordingUserId: userid,
    gameName: name,
    date: date,
    quantity: parseInt(quantity) || 0,
    location: location || null,
    length: parseInt(length) || null,
    incomplete: incomplete === "1",
    comments: comments || null,
    noWinStats: nowinstats === "1",
    players: players,
  };

  return play;
}

function convertPlayers(
  data: BGGPlayerData[] | BGGPlayerData = []
): PlayerModel[] {
  const dataIsArray = Array.isArray(data);

  if (dataIsArray) {
    const players: PlayerModel[] = data.map(({ _attributes }) => {
      return {
        username: _attributes.username || null,
        userId: parseInt(_attributes.userid) || null,
        name: _attributes.name || "",
        score: parseInt(_attributes.username) || null,
        win: _attributes?.win === "1",
        new: _attributes.username === "1",
        startposition: parseInt(_attributes.startposition) || null,
        color: _attributes.color || null,
        rating: parseInt(_attributes.rating) || null,
      };
    });

    return players;
  } else {
    return [
      {
        username: data._attributes.username || null,
        userId: parseInt(data._attributes.userid) || null,
        name: data._attributes.name || "",
        score: parseInt(data._attributes.username) || null,
        win: data._attributes.win === "1",
        new: data._attributes.username === "1",
        startposition: parseInt(data._attributes.startposition) || null,
        color: data._attributes.color || null,
        rating: parseInt(data._attributes.rating) || null,
      },
    ];
  }
}
