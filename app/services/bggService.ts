// import convert from "xml-js";
import { convertXmlToJsObject } from "../utils/conversion/xmlToJson";
// import tenaciousFetch from "tenacious-fetch";
import fetchRetry from "fetch-retry";
import type {
  BGGData,
  BGGPlay,
  BGGPlayerData,
} from "~/models/bgg/incomingBggData";
import type { PlayDataModel, PlayerModel } from "~/models/bgg/gameDataModels";
import type { UserInfo } from "~/models/bgg/userInfo";

type FetchOptions = {
  username: string;
  page?: number;
  startdate?: string;
};

export async function fetchXmlPlayData(options: FetchOptions) {
  try {
    const pageQuery = options.page ? `&page=${options.page}` : "";
    const startdate = options.startdate ? `&mindate=${options.startdate}` : "";
    const query = `https://boardgamegeek.com/xmlapi2/plays?username=${options.username}${startdate}${pageQuery}`;
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
    const xmlData = await fetchXmlPlayData({ username });
    const data = convertXmlToJsObject(xmlData);

    const pages = Math.ceil(parseInt(data.plays._attributes.total, 10) / 100);

    console.log("pages: ", pages);

    return {
      pages,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export const getPlayDataWithExponentialBackingOff = async (options: {
  username: string;
  pages: number;
  startdate?: string;
  setPercentDone: (x: number) => void;
}) => {
  try {
    const { username, pages, startdate, setPercentDone } = options;

    // Create array from 1 to pages
    const pageArray = Array.from({ length: pages }, (_, i) => i + 1);

    // Create array of promises to get page data
    const allPages: any[] = pageArray
      ?.map((page) => {
        const xmlData = fetchXmlPlayData({ username, page, startdate });
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

    // Convert and flatten play data
    const convertedData = collectedXML?.map((page) => {
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
  const playIsArray = Array.isArray(data.plays.play);

  if (!playIsArray) {
    return [flattenSinglePlay(data.plays.play, userid)];
  }

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
  const underscoreText = data?.comments?._text;
  const comments = underscoreText
    ? underscoreText
    : data.comments && data.comments["#text"]
    ? data.comments["#text"]
    : "";

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
    const players: PlayerModel[] = data?.map(({ _attributes }) => {
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

export async function getUserInfo(username: string): UserInfo {
  if (username) {
    const query = `https://boardgamegeek.com/xmlapi2/user?name=${username}`;
    const originalFetch = window.fetch;
    const fetch = fetchRetry(originalFetch);
    const res = await fetch(query, {
      retries: 7,
      retryDelay: function (attempt, error, response) {
        return Math.pow(8, attempt) * 1000; // 1000, 2000, 4000
      },
    });
    const xmlData = await res.text();

    const { user } = convertXmlToJsObject(xmlData);

    return {
      userId: parseInt(user._attributes.id),
      username: user._attributes.name,
      name: `${user.firstname._attributes.value} ${user.lastname._attributes.value}`,
      yearRegistered: parseInt(user.yearregistered._attributes.value),
      stateOrProvince: `${user.stateorprovince._attributes.value}`,
      country: `${user.country._attributes.value}`,
      avatarLink: `${user.avatarlink._attributes.value}`,
    };
  }
}

export async function getLatestPlaysInfo(username: string, date: string) {
  try {
    const xmlData = await fetchXmlPlayData({ username, startdate: date });
    const data = convertXmlToJsObject(xmlData);

    const pages = Math.ceil(parseInt(data.plays._attributes.total, 10) / 100);

    return {
      pages,
    };

    // return plays;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
