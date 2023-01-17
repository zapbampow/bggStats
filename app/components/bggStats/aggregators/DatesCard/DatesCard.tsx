import { useEffect, useRef, useState } from "react";
import { Card, CardTitle } from "../Card";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import BackButton from "./BackButton";
import type { DateGroup } from "../types";
import convertToDateData from "./utils/convertToDateData";

import YearChart from "../AggregatorMenu/CountCharts/YearChart";
import MonthsChart from "../AggregatorMenu/CountCharts/MonthsChart";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import MonthCalendar from "./MonthCalendar";
import { useCalendarScreenContext } from "../CalendarScreenContext";
import dayjs from "dayjs";

type Props = {
  userId: number;
};

export default function DatesCard({ userId }: Props) {
  const needToUpdate = useRef(true);
  const { state } = usePlayResultsContext();
  const { state: filterState, dispatch } = usePlayFilterContext();

  const {
    state: dateCardState,
    setYear,
    setMonth,
    setFilterOrder,
    setScreen,
  } = useCalendarScreenContext();
  const [dateData, setDateData] = useState<DateGroup[]>([]);

  const { year, month, screen } = dateCardState;

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
        console.log("typeof setScreen", typeof setScreen);
        setScreen("year");
      }
    },
    [filterState, setScreen, screen]
  );

  const shortYear = (year) => {
    return `'${year.toString().slice(2)}`;
  };

  const title =
    screen === "year"
      ? "# Days Played"
      : screen === "months"
      ? `# Days ${year}`
      : `# Days ${month} ${year}`;

  return (
    <Card>
      <div>
        <BackButton />
        <CardTitle>{title}</CardTitle>
      </div>

      {screen === "year" && (
        <YearChart
          data={dateData}
          setYear={setYear}
          setFilterOrder={setFilterOrder}
        />
      )}
      {screen === "months" && (
        <MonthsChart data={dateData} setMonth={setMonth} />
      )}
      {screen === "month" && <MonthCalendar data={dateData} />}
    </Card>
  );
}
