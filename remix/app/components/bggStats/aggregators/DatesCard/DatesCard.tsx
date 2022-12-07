import React, { useCallback, useEffect, useState } from "react";
import { Card, CardTitle } from "../Card";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import BackButton from "./BackButton";
import type { Screen } from "../types";
import type { DateGroup } from "../types";
import convertToDateData from "./utils/convertToDateData";
import { DatesCardProvider, useDatesCardContext } from "./DatesCardContext";

import YearChart from "./YearChart";
import MonthsChart from "./MonthsChart";

type Props = {
  userId: number;
};

export default function DatesCard({ userId }: Props) {
  const { state } = usePlayResultsContext();
  const {
    state: { screen },
  } = useDatesCardContext();
  const [dateData, setDateData] = useState<DateGroup[]>([]);

  useEffect(
    function getPlayDatesData() {
      const dateData = convertToDateData(state);
      // console.log("dateData", dateData);
      setDateData(dateData);
    },
    [state]
  );

  return (
    <DatesCardProvider>
      <Card>
        <div className="relative">
          <BackButton screen={screen} />
          <CardTitle>Days Played</CardTitle>
        </div>

        {screen === "year" && <YearChart data={dateData} />}
        {screen === "months" && <MonthsChart data={dateData} />}
        {screen === "month" && <YearChart data={dateData} />}
      </Card>
    </DatesCardProvider>
  );
}
