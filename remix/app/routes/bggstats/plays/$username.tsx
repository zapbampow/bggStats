import React, { useEffect, useState } from "react";
import { LoaderFunction, useLoaderData, useParams } from "remix";
import { getUserInfo } from "~/services/bggService";
import { countByPlayerName, countWinsByPlayer } from "~/utils/analysis";
import usePlayData from "../../../hooks/usePlayData";
import { db, bulkAddPlays } from "../../../services/db";
import {
  getAllPlayerNames,
  getAllUserNames,
  getAllLocations,
} from "../../../utils/analysis/accumulations";
import { getLatestPlayDate } from '../../../services/idbService';
import { useBggUser } from "~/hooks/useBggUser";

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


  useEffect(() => {
    if(user) { 
      getAccumulatedData(130233);
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
