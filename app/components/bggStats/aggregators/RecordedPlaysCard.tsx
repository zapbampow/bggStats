import React, { useCallback, useEffect, useState } from "react";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import {
  getRecentPlays,
  getInitialPlayData,
} from "~/services/queryService/queryService";
import { Card, CardSummary, CardTitle } from "./Card";

type Props = {
  userId: number;
};

export default function RecordedPlaysCard({ userId }: Props) {
  const { state } = usePlayResultsContext();
  const [count, setCount] = useState(0);

  const getCount = useCallback(async () => {
    try {
      const countFromRes = state.reduce((acc, cur) => {
        if (!cur.quantity) return acc + 1;
        return acc + cur.quantity;
      }, 0);
      setCount(countFromRes);
    } catch (err) {
      console.error(err);
    }
  }, [state]);

  useEffect(() => {
    // get most recent plays
    getCount();
    // set state
  }, [getCount]);

  return (
    <Card>
      <CardTitle>Total Plays</CardTitle>

      <div className="grow flex justify-center items-center text-4xl font-semibold">
        {count.toLocaleString("en-US")}
      </div>
    </Card>
  );
}
