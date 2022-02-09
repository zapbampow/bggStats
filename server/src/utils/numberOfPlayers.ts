import type { GameData } from '../models/gameData'

export default function numberOfPlayers(playData: GameData):number {
    const entries = Object.entries(playData);

    const playerCount = entries.reduce((acc, cur) => {
        const keyNameArr = cur[0].split(" ");
        
        if (keyNameArr[0] === "player" && keyNameArr[2] === "name" && cur[1] !== "") {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0)

    return playerCount;
}