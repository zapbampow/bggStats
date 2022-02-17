// import convert from "xml-js";
import { superFlattenPlays } from "../utils/conversion/superFlattenPlays";
import { xmlToJson } from "../utils/conversion/xmlToJson";
// TODO: Refactor to get all data once the first query lets the app know how many plays there actually are
// Possibly add a custom hook that includes returning the progress for getting data

export async function getUserPlayData(username: string) {
  try {
    const res = await fetch(
      "https://boardgamegeek.com/xmlapi2/plays?username=jpseasia"
    );
    const xmlData = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlData, "application/xml");

    const json = xmlToJson(doc);

    const plays = superFlattenPlays(json);
    return plays;

    // return plays;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
