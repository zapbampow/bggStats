import { useEffect, useState } from "react";

import usePlayData from "../../hooks/bgg/usePlayData";
import {
  getAllPlayerNames,
  getAllUserNames,
  getAllLocations,
} from "../../utils/analysis/accumulations";
import { useBggUser } from "../../hooks/bgg/useBggUser";
import { testQuery, store } from "../../services/idbService"

import { getInitialPlayData,  pipeWithArgs, ArgsType } from "../../services/queryService";


type AccDataType = {
  numPlayers: number;
  numUsernames: number;
  numLocations: number;
}

function Plays() {
  const user = useBggUser()
  const [accData, setAccData] = useState<AccDataType>()
  const [locations, setLocations] = useState<string[]>([])
  const [playerNames, setPlayerNames] = useState<string[]>([])

  const { manuallyUpdate, percentDone, error } = usePlayData();

  const getAccumulatedData = async (recordingUserId: number) => {
    const playerNames = await getAllPlayerNames(recordingUserId);
    const usernames = await getAllUserNames(recordingUserId);
    const locations = await getAllLocations(recordingUserId);

    // console.log('playerNames', playerNames)
    // console.log('locations', locations)

    setAccData({
      numPlayers: playerNames.length,
      numUsernames: usernames.length,
      numLocations: locations.length
    })
    setLocations(locations)
    setPlayerNames(playerNames)
  };

 const getTestQuery = async (userId: number, date: string) => {
   const test = await testQuery(userId, date)
   console.log('test plays', test);
 }

 const test2 = async (userId:number) => {
   const plays = store('plays', userId);
   let filtered = plays.gameName("The Settlers of Catan")
  return false
  //  let saturday = await plays.where('date', 'equals', '2022-03-19')
  //  console.log('saturday', await saturday?.toArray())
  //  return await saturday?.toArray();
 }

 const testPipeWithArgs = async () => { 
  const plays = await getInitialPlayData(user.userId);
  // console.log('plays', plays)
  const pipe = pipeWithArgs(plays, {
    gameName: 'Puerto Rico',
  })
  // console.log('pipe', pipe);
 }


  useEffect(() => {
    if(user) { 
      getAccumulatedData(user.userId);
      // getTestQuery(user.userId, '2022-03-01')
      // test2(user.userId)
      testPipeWithArgs()
    }
  }, [user]);


  return (
    <div className="p-4">
      <h1 className="text-4xl text-lime-500 mb-4">Query {user?.username}'s PlayData</h1>
      <div>Updating: {percentDone === 100 ? "Complete" : `${percentDone}%`}</div>
      <div>Number of playerNames: {accData?.numPlayers}</div>
      <div>Number of usernames: {accData?.numUsernames}</div>
      <div>Number of locations: {accData?.numLocations}</div>

      <div className="grid-cols-3">
        <select name="playerNames">
          {playerNames.map((name, index) => <option key={name} value={name}>{name}</option>)}
        </select>
        <select name="locations">
          {locations.map((name, inded) => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
    </div>
  );
}

export default Plays;
