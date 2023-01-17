import React from "react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { ChevronLeft } from "../../icons";
import { useCalendarScreenContext } from "../CalendarScreenContext";

export default function BackButton() {
  const {
    state: { filterOrder, year, screen },
    setYear,
    setMonth,
    setDays,
    setScreen,
  } = useCalendarScreenContext();

  const {
    state: filterState,
    dispatch: filterDispatch,
    removeFilter,
  } = usePlayFilterContext();

  const handleClick = () => {
    const filter = filterOrder && filterState[filterOrder];
    if (!filter) return;

    switch (screen) {
      case "months":
        setScreen("year");
        setYear(null);
        removeFilter(filter);
        break;
      case "month":
        setScreen("months");
        setMonth(null);
        setDays([]);

        const startDate = `${year}-01-01`;
        const endDate = `${year}-12-31`;

        filterDispatch({
          type: "upsert",
          filter: { ...filter, arg: [startDate, endDate] },
        });
        break;
      default:
        setScreen("year");
    }
  };

  if (screen === "year") return null;

  return (
    <button className="absolute left-0 top-[1.15rem]" onClick={handleClick}>
      <ChevronLeft />
    </button>
  );
}
