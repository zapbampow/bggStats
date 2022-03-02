// import convert from "xml-js";
import { superFlattenPlays } from "../utils/conversion/superFlattenPlays";
import { xmlToJson, convertXmlToJsObject } from "../utils/conversion/xmlToJson";

// TODO: Refactor to get all data once the first query lets the app know how many plays there actually are
// Possibly add a custom hook that includes returning the progress for getting data

export async function fetchXmlPlayData(username: string, page?: number) {
  try {
    const pageQuery = page ? `&page=${page}` : "";
    const query = `https://boardgamegeek.com/xmlapi2/plays?username=${username}${pageQuery}`;
    const res = await fetch(query);
    const xmlData = await res.text();
    return xmlData;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getUserPlayData(username: string) {
  try {
    const xmlData = await fetchXmlPlayData(username);
    const data = convertXmlToJsObject(xmlData);

    // console.log("data: ", data);

    const plays = superFlattenPlays(data);
    return plays;

    // return plays;
  } catch (err) {
    console.log(err);
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

export async function getRemainingPlayData(username: string, pages: number) {
  try {
    const pageArray = Array.from({ length: pages }, (_, i) => i + 1);

    const allPages: any[] = pageArray
      .map((page) => {
        const xmlData = fetchXmlPlayData(username, page);
        return xmlData;
      })
      .filter((x) => x);

    const chunkSize = 20;
    const numberOfChunks = Math.ceil(pages / chunkSize);
    const numberOfChunksArray = Array.from(
      { length: numberOfChunks },
      (_, i) => i
    );
    const chunkedPages = numberOfChunksArray.map((chunk, i) =>
      allPages.slice(i * chunkSize, (i + 1) * chunkSize)
    );

    console.log("chunkedPages: ", chunkedPages);

    let playXMLData = new Promise((resolve, reject) => {
      let xmldata = [];

      for (let i = 0; i < chunkedPages.length; i++) {
        setTimeout(async () => {
          const settled = await Promise.allSettled(chunkedPages[i]);
          const data = settled.map((value) => value);
          console.log("data: ", data);

          // set up a hook for seeing this day
          console.log("percent done: ", ((i + 1) / chunkedPages.length) * 100);
          xmldata = [...xmldata, ...data];

          if (i === chunkedPages.length - 1) {
            resolve(xmldata);
          }
        }, i * 5000);
      }
    });

    const someData = await playXMLData;
    console.log("someData: ", someData);

    // const data = convertXmlToJsObject(remaining);
    // console.log("data: ", data);
    // const playsArray = superFlattenPlays(data);
    // console.log("playsArray: ", playsArray);

    // const values = remaining
    //   .map((item) => {
    //     const data = convertXmlToJsObject(item.value);
    //     const playsArray = superFlattenPlays(data);
    //     return playsArray;
    //   })
    //   .flat();
    // return values;
  } catch (err) {
    throw new Error(err);
  }
}

export const getAllPlayData = async (username: string) => {
  const initialData = await getInitialPlayData(username);
  const allData = await getRemainingPlayData(username, initialData.pages);
  return allData;
};
