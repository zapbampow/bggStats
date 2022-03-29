import { useEffect, useState } from "react";
import { PlayDataModel } from "~/models/bgg/gameDataModels";
import { UserInfo } from "~/models/bgg/userInfo";
import { bulkAddPlays } from "~/services/db";
import { getLatestPlayData } from "~/services/idbService";
import {
  getInitialPlayData,
  getPlayDataWithExponentialBackingOff,
  getLatestPlaysInfo
} from "../../services/bggService";
import { useBggUser } from './useBggUser'

/**
 * This is a hook to encapsulate the getting and storing of data into indexedDB.
 * 
 * Whatit  should do?
 * 1. Check for existing data in IndexedDB
 * 2. Check whether there is new data to add from BGG.
 * 3. Add new data to the db
 * 4. Return percentRetrieved, function to manually update, errors
 * 
 * What it isn't going to do?
 * 1. Return all the data
 */

function usePlayData() {
  const user = useBggUser();
  const [percentDone, setPercentDone] = useState(0);
  const [error, setError] = useState(null);

  const handleFetching = async (user:UserInfo) => {
    try {
      if(!user) {
        throw Error("We cannot fetch user play data unless a user is set.")
      }

      const {latestPlayDate, latestPlayId } = await getLatestPlayData(user.userId);

      if(latestPlayDate && latestPlayId) {
        const latestPlaysInfo = await getLatestPlaysInfo(user.username, latestPlayDate);
        const latestPlays = await getPlayDataWithExponentialBackingOff({
          username: user.username,
          pages: latestPlaysInfo.pages,
          startdate: latestPlayDate,
          setPercentDone
        })
        const unrecordedPlays = latestPlays.filter(play => play.playId > latestPlayId)
        bulkAddPlays(unrecordedPlays)
        setError(null)

      } else {
        const initialData = await getInitialPlayData(user.username);
        const allPlayData = await getPlayDataWithExponentialBackingOff({
          username: user.username,
          pages: initialData.pages,
          setPercentDone
        });
        bulkAddPlays(allPlayData);
        setError(null);
      }
    } catch (err) {
      setPercentDone(0);
      setError(err.message);
      throw Error(err);
    }
  };

  const handleNoUsername = () => {
    setPercentDone(0);
    setError(null);
  };

  useEffect(() => {
    if (user) {
      handleFetching(user);
    }
  }, [user]);

  return {
    percentDone,
    manuallyUpdate: () => handleFetching(user),
    error,
  };
}

export default usePlayData;
