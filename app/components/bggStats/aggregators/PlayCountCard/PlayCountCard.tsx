import React, { useEffect, useState } from "react";
import { Card, CardTitle } from "../Card";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import type { DateGroup } from "../types";
import convertToCountData from "./utils/convertToCountData";
import YearChart from "../AggregatorMenu/CountCharts/YearChart";
import MonthsChart from "../AggregatorMenu/CountCharts/MonthsChart";
import MonthCalendar from "./MonthCalendar";
import BackButton from "./BackButton";
import { useCalendarScreenContext } from "../CalendarScreenContext";

type Props = {
  userId: number;
};
export default function PlayCountCard({ userId }: Props) {
  const { state } = usePlayResultsContext();
  const { state: filterState } = usePlayFilterContext();
  const {
    state: playCountCardState,
    setYear,
    setFilterOrder,
    setScreen,
  } = useCalendarScreenContext();

  const [countData, setCountData] = useState<DateGroup[]>([]);

  const { year, month, screen } = playCountCardState;

  useEffect(
    function getPlayCountData() {
      const countData = convertToCountData(state);
      setCountData(countData);
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
      ? "# of Plays"
      : screen === "months"
      ? `# Plays ${year}`
      : `# Plays ${month} ${year}`;

  return (
    <Card>
      <div>
        <BackButton />
        <CardTitle>{title}</CardTitle>
      </div>

      {screen === "year" && (
        <YearChart
          data={countData}
          setYear={setYear}
          setFilterOrder={setFilterOrder}
        />
      )}
      {screen === "months" && <MonthsChart data={countData} />}
      {screen === "month" && <MonthCalendar data={countData} />}
    </Card>
  );
}
