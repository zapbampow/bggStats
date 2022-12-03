import React, { useCallback, useEffect, useState } from "react";
import { Card, CardTitle } from "../Card";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import BackButton from "./BackButton";
import type { Screen } from "../types";
import YearChart from "./YearChart";
import type { DateGroup } from "../types";
import convertToDateData from "./utils/convertToDateData";

type Props = {
  userId: number;
};

export default function DatesCard({ userId }: Props) {
  const { state } = usePlayResultsContext();
  const [dateData, setDateData] = useState<DateGroup[]>([]);
  const [screen, setScreen] = useState<Screen>("year");

  useEffect(
    function getPlayDatesData() {
      const dateData = convertToDateData(state);
      // console.log("dateData", dateData);
      setDateData(dateData);
    },
    [state]
  );

  return (
    <Card>
      <BackButton screen={screen} setScreen={setScreen} />
      <CardTitle>Dates</CardTitle>

      {screen === "year" && <YearChart data={dateData} />}
      {screen === "months" && <YearChart data={dateData} />}
      {screen === "month" && <YearChart data={dateData} />}
    </Card>
  );
}
