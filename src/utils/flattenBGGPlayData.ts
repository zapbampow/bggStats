import { GameDataModel,  PlayerModel } from "../models/updatingGameDataModels";
import { BGGData, BGGPlay, BGGPlayerData } from "../models/bggData";

// Converts the data that has come in from BGG into a format that will be a lot easier to work with
export default function flattenBGGPlayData(data:BGGData) {
    const userid = parseInt(data.plays._attributes.userid);
    const flattenedPlays:GameDataModel[] = data.plays.play.map(item => flattenSinglePlay(item, userid))
    return flattenedPlays;
}

// Converts a single play into an easier formot
function flattenSinglePlay(data:BGGPlay, userid: number):GameDataModel {
    const { id, date, quantity, length, incomplete, nowinstats, location } = data._attributes;
    const { name, objectid } = data.item._attributes;
    const comments = data?.comments?._text || "";

    const players = convertPlayers(data?.players?.player);

    const play:GameDataModel = {
        playId: parseInt(id),
        gameId: parseInt(objectid),
        userId: userid,
        gameName: name,
        date: date,
        quantity: parseInt(quantity) || 0,
        location: location || null,
        length: parseInt(length) || null,
        incomplete: incomplete === "1",
        comments: comments || null,
        noWinStats: nowinstats === "1",
        players: players,
    }

    return play;
}


function convertPlayers(data:BGGPlayerData[] | BGGPlayerData = []):PlayerModel[] {
    const dataIsArray = Array.isArray(data);
    
    if(dataIsArray) {
        const players:PlayerModel[] = data.map(({ _attributes }) => {
            
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
                win: data._attributes.win === "1",
                new: data._attributes.username === "1",
                startposition: parseInt(data._attributes.startposition) || null,
                color: data._attributes.color || null,
                rating: parseInt(data._attributes.rating) || null,
            }
        ]
    }
}