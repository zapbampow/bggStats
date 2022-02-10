import fetch from "node-fetch";
import { xml2js } from 'xml-js'
import flattenBGGPlayData from "./utils/flattenBGGPlayData";
import superFlattenPlays from './utils/superFlattenPlays'

// import { totalPlayed, withTeresaOnly, onlyWithWholeFamily } from "./stats";
// import csvtojson from 'csvtojson';

// const filePath = './games-played.csv';
// const filePath = './playedGames.csv';

// csvtojson()
//     .fromFile(filePath)
//     .then((played:any) => {
//         // const converted = convertToGoodObject(played);

//         const totalCount = totalPlayed(played)
//         const coupleWithTeresa = withTeresaOnly(played)
//         const countOnlyWholeFamily = onlyWithWholeFamily(played);

//         // console.log("played: ", played[1])
//         // console.log("totalCount: ", totalCount)
//         // console.log("coupleWithTeresa: ", coupleWithTeresa)
//         // console.log("countOnlyWholeFamily: ", countOnlyWholeFamily)
//     })

const getBGGData = async (username:string) => {
    try {

        const res = await fetch('https://boardgamegeek.com/xmlapi2/plays?username=jpseasia');
        const xmlData = await res.text()
        const json = xml2js(xmlData, {ignoreComment: true, alwaysChildren: true, compact: true});
        
        superFlattenPlays(json)
        
    } catch(err) {
        console.log(err)
        throw new Error(err);
    }
}

getBGGData('jpseasia');
