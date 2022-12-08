import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardTitle } from "../Card";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import BackButton from "./BackButton";
import type { Screen } from "../types";
import type { DateGroup } from "../types";
import convertToDateData from "./utils/convertToDateData";
import { DatesCardProvider, useDatesCardContext } from "./DatesCardContext";

import YearChart from "./YearChart";
import MonthsChart from "./MonthsChart";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import MonthCalendar from "./MonthCalendar";

type Props = {
  userId: number;
};

export default function DatesCard({ userId }: Props) {
  const needToUpdate = useRef(true);
  const { state } = usePlayResultsContext();
  const { state: filterState, dispatch } = usePlayFilterContext();

  const { state: dateCardState, setScreen } = useDatesCardContext();
  const [dateData, setDateData] = useState<DateGroup[]>([]);

  const { screen, year, month } = dateCardState;

  useEffect(
    function getPlayDatesData() {
      const dateData = convertToDateData(state);
      // console.log("dateData", dateData);
      setDateData(dateData);
    },
    [state]
  );

  useEffect(
    function returnToYearScreenWhenDateFiltersAreRemoved() {
      if (screen === "year") return;

      const hasDateFilter = filterState.some(
        (filter) =>
          filter.filter === "onDate" ||
          filter.filter === "beforeDate" ||
          filter.filter === "afterDate" ||
          filter.filter === "betweenDates"
      );
      if (!hasDateFilter) {
        setScreen("year");
      }
    },
    [filterState, setScreen, screen]
  );

  const title =
    screen === "year"
      ? "# Days Played"
      : screen === "months"
      ? `# Days in ${year}`
      : `${month} ${year}`;

  return (
    <Card>
      <div className="relative">
        <BackButton />
        <CardTitle>{title}</CardTitle>
      </div>

      {screen === "year" && <YearChart data={dateData} />}
      {screen === "months" && <MonthsChart data={dateData} />}
      {screen === "month" && <MonthCalendar data={dateData} />}
    </Card>
  );
}
