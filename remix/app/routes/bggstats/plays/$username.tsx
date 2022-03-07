import React, { useEffect } from "react";
import { useParams } from "remix";
import { countByPlayerName, countWinsByPlayer } from "~/utils/analysis";
import usePlayData from "../../../hooks/usePlayData";
import { db, bulkAddPlays } from "../../../services/db";
import {
  getAllPlayerNames,
  getAllUserNames,
  getAllLocations,
} from "../../../utils/analysis/accumulations";

function Plays() {
  const { username } = useParams();
  // const { playData, percentDone, error } = usePlayData(username);

  const getAccumulatedData = async (recordingUserId: number) => {
    const playerNames = await getAllPlayerNames(recordingUserId);
    const usernames = await getAllUserNames(recordingUserId);
    const locations = await getAllLocations(recordingUserId);

    console.log("playerNames: ", playerNames);
    console.log("usernames: ", usernames);
    console.log("locations: ", locations);
  };

  useEffect(() => {
    getAccumulatedData(130233);

    const data = undefined;
    if (data) {
      console.log(data);
      // const data = await getUpdatedPlayData();
      // get latest play by play id
      // get data from latest date
      // filter out plays with playId <= latest playId
      // parse local storage json and add retrieved plays
      // return all plays as json
      // set to local storage, overwriting old data
    } else {
      // const data = await getAlldata()
      // set to local storage
    }
  }, [username]);

  // useEffect(() => {
  //   console.log("playData: ", playData);
  //   bulkAddPlays(playData);
  // }, [playData]);

  return (
    <div>
      <h1>Query {username}'s PlayData</h1>
    </div>
  );
}

export default Plays;
