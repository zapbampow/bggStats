import React, { useEffect, useState } from "react";
import {
  getInitialPlayData,
  getRemainingPlayData,
} from "../services/bggService";

function usePlayData(username: string) {
  const [playData, setPlayData] = useState([]);
  const [percentDone, setPercentDone] = useState(0);

  const handleFetching = async () => {
    const initialData = await getInitialPlayData(username);
    const allData = await getRemainingPlayData(
      username,
      initialData.pages,
      setPercentDone
    );
    setPlayData(allData);
  };

  useEffect(() => {
    if (username) {
      handleFetching();
    }
  }, [username]);

  return {
    playData,
    percentDone,
  };
}

export default usePlayData;
