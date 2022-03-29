import { useEffect, useState } from "react";

import usePlayData from "../../hooks/bgg/usePlayData";
import {
  getAllPlayerNames,
  getAllUserNames,
  getAllLocations,
} from "../../utils/analysis/accumulations";
import { useBggUser } from "../../hooks/bgg/useBggUser";
import { testQuery, store } from "../../services/idbService"

function Plays() {
  const user = useBggUser()
  const [accData, setAccData] = useState()


  const { manuallyUpdate, percentDone, error } = usePlayData();

  const getAccumulatedData = async (recordingUserId: number) => {
    const playerNames = await getAllPlayerNames(recordingUserId);
    const usernames = await getAllUserNames(recordingUserId);
    const locations = await getAllLocations(recordingUserId);

    setAccData({
      numPlayers: playerNames.length,
      numUsernames: usernames.length,
      numLocations: locations.length
    })
  };

 const getTestQuery = async (userId: number, date: string) => {
   const test = await testQuery(userId, date)
  //  console.log('test plays', test);
 }

 const test2 = async (userId:number) => {
   const plays = store('plays', userId);
   let saturday = await plays.where('date', 'equals', '2022-03-19')
  //  console.log('saturday', await saturday?.toArray())
   return await saturday?.toArray();
 }


  useEffect(() => {
    if(user) { 
      getAccumulatedData(user.userId);
      getTestQuery(user.userId, '2022-03-01')
      test2(user.userId)
    }
  }, [user]);


  return (
    <div>
      <h1>Query {user?.username}'s PlayData</h1>
      <div>Updating: {percentDone === 100 ? "Complete" : `${percentDone}%`}</div>
      <div>Number of playerNames: {accData?.numPlayers}</div>
      <div>Number of usernames: {accData?.numUsernames}</div>
      <div>Number of locations: {accData?.numLocations}</div>
      <button onClick={manuallyUpdate}>Manually Update</button>
    </div>
  );
}

export default Plays;
