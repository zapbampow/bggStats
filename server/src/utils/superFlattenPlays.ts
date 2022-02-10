import { BGGData, BGGPlay, BGGPlayerData } from "../models/bggData";
import { SuperFlatGameData, GameData, Player } from "../models/superFlatGameData";

// Converts the data that has come in from BGG into a format that will be a lot easier to work with
export default function flattenBGGPlayData(data:BGGData) {
    const userid = parseInt(data.plays._attributes.userid);
    const flattenedPlays:SuperFlatGameData[] = data.plays.play.map(item => superFlattenSinglePlay(item, userid))
    console.log("flattenedPlays: ", JSON.stringify(flattenedPlays))
    return flattenedPlays;
}

// Converts a single play into an easier formot
function superFlattenSinglePlay(data:BGGPlay, userid: number):SuperFlatGameData {
    const { id, date, quantity, length, incomplete, nowinstats, location } = data._attributes;
    const { name, objectid } = data.item._attributes;
    const comments = data?.comments?._text || "";

    const players:Player[] = convertPlayers(data?.players?.player);

    const play:GameData = {
        playId: parseInt(id),
        gameId: parseInt(objectid),
        recorderUserId: userid,
        gameName: name,
        date: date,
        quantity: parseInt(quantity) || 1,
        location: location || null,
        length: parseInt(length) || null,
        incomplete: parseInt(incomplete, 10) > 0 ? 1 : 0,
        comments: comments || null,
        noWinStats: parseInt(nowinstats, 10) > 0 ? 1 : 0,
    }

    const playerPlays:SuperFlatGameData = players.map(player => {
        return {
            id: `${play.playId}${player.name.replace(/\s+/g, '')}${player.userId ?? ""}`,
            ...player,
            ...play
        }
    })


    return playerPlays;
}


function convertPlayers(data:BGGPlayerData[] | BGGPlayerData = []):Player[] {
    const dataIsArray = Array.isArray(data);
    
    if(dataIsArray) {
        const players:Player[] = data.map(({ _attributes }) => {
            
            return {
                username: _attributes.username || null,
                userId: parseInt(_attributes.userid) || null,
                name: _attributes.name || "",
                score: parseInt(_attributes.username) || null,
                win: parseInt(_attributes?.win) > 0 ? 1 : 0,
                new: parseInt(_attributes.new) > 0 ? 1 : 0,
                startposition: parseInt(_attributes.startposition) || null,
                color: _attributes.color || null,
                rating: parseInt(_attributes.rating) || null,
            }
        })
        
        return players;
    } else {
        return [
            {
                username: data._attributes.username || null,
                userId: parseInt(data._attributes.userid) || null,
                name: data._attributes.name || "",
                score: parseInt(data._attributes.username) || null,
                win: parseInt(data._attributes.win) > 0 ? 1 : 0,
                new: parseInt(data._attributes.new) > 0 ? 1 : 0,
                startposition: parseInt(data._attributes.startposition) || null,
                color: data._attributes.color || null,
                rating: parseInt(data._attributes.rating) || null,
            }
        ]
    }
}