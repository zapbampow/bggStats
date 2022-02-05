import { GameData } from "../models/gameData"
import { withPlayerName, numberOfPlayers } from "../utils"

export default function withTeresaOnly(games: GameData[]):number {
    const count:number = games.reduce((acc:number, cur:GameData) => {
        const teresa = withPlayerName(cur, 'Teresa');
        const clayton = withPlayerName(cur, 'Clayton Ingalls');
        const num = numberOfPlayers(cur);

        if(teresa && clayton && num === 2) {
            return acc + 1;
        } 
        
        return acc;
    }, 0)

    return count;
}