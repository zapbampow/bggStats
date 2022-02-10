import { useState } from 'react';
import { db } from '../data/db';
import data from '../data/sampleData';
import { useLiveQuery } from 'dexie-react-hooks'

export function SomeComponent() {
    const [thing, setThing] = useState<any>();
    console.log("thing: ", thing)

    const gottenData = useLiveQuery(() => db.plays.toArray())

    const addData = async () => {
        try {
            const newPlay = await db.plays.add(data[1]);  
            console.log("newPlay: ", newPlay)
        } catch (e) {
            console.log("ERROR: ", e);
        }
    }

    const getData = async () => {
        try {
            const moreThan4 = await db.plays
                .where('date')
                .equals('2022-02-06')
            setThing(moreThan4)

        } catch (e) {
            console.log("ERROR: ", e)
        }
    }

    return (
        <div>
            <div><button onClick={addData}>Add a Play</button></div>
            <div><button onClick={getData}>Get data</button></div>
            <ul>
                {gottenData?.map(item => {

                    return (
                        <li key={item.playId}>{item.playId} | {item.date} | {item.gameName} | {item.players.length}</li>
                    )
                })}
            </ul>
            <div>
                
            </div>
        </div>
    )
}