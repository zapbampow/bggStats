// import convert from "xml-js";
import { superFlattenPlays } from "../utils/conversion/superFlattenPlays";
import { xmlToJson, convertXmlToJsObject } from "../utils/conversion/xmlToJson";
import tenaciousFetch from "tenacious-fetch";

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
    const res = await tenaciousFetch(query, fetchConfig);
    const xmlData = await res.text();
    return xmlData;
  } catch (err) {
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
      const converted = convertXmlToJsObject(page);
      const flattened = superFlattenPlays(converted);
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
