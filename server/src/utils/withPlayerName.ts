import { GameData } from "../models/gameData";

export default function withPlayerName(playData: GameData, name: string) {
    const entries = Object.entries(playData);
    
    // look at object keys for player names and return an array of player names
    const playerNames = entries.filter(item => {
        const keyNameArr = item[0].split(" ");
        return keyNameArr[0] === "player" && keyNameArr[2] === "name";
    }).map(item => item[1])

    // return boolean of whether specified player is in the list
    return playerNames.includes(name);

}