import { GameData } from "../models/gameData"
import { withPlayerName, numberOfPlayers } from "."

export default function countWithOnlyGivenPlayers(games:GameData[], names:string[]):number {
    const count:number = games.reduce((acc:number, cur:GameData) => {
        // Return acc if there aren't the same number of players as names given
        const num = numberOfPlayers(cur);
        if(num !== names.length) {
            return acc;
        }

        const allNamesInCurGame = names.reduce((accBool, curName) => {
            const withCur = withPlayerName(cur, curName);
            if(!withCur) {
                return false
            }
            return accBool;
        }, true)

        
        if(allNamesInCurGame) {
            return acc + 1
        }
        
        return acc;
    }, 0)

    return count;
}