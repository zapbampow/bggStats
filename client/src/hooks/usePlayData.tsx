import { useEffect, useState } from "react";
import {
  getInitialPlayData,
  getPlayDataWithExponentialBackingOff,
} from "../services/bggService";

function usePlayData(username: string) {
  const [playData, setPlayData] = useState([]);
  const [percentDone, setPercentDone] = useState(0);
  const [error, setError] = useState(null);

  const handleFetching = async () => {
    try {
      const initialData = await getInitialPlayData(username);
      const allPlayData = await getPlayDataWithExponentialBackingOff(
        username,
        initialData.pages,
        setPercentDone
      );
      setPlayData(allPlayData);
      setError(null);
    } catch (err) {
      setPlayData([]);
      setPercentDone(0);
      setError(err.message);
      throw Error(err);
    }
  };

  const handleNoUsername = () => {
    setPlayData([]);
    setPercentDone(0);
    setError(null);
  };

  useEffect(() => {
    if (username) {
      handleFetching();
    }
  }, [username]);

  return {
    playData,
    percentDone,
    error,
  };
}

export default usePlayData;
