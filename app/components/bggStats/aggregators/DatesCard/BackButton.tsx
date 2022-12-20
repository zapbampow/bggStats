import React from "react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { ChevronLeft } from "../../icons";
import { useDatesCardContext } from "./DatesCardContext";

export default function BackButton() {
  const {
    state: { screen, filterOrder, year },
    dispatch,
    setScreen,
    setYear,
    setMonth,
    setDays,
  } = useDatesCardContext();
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
    <button className="absolute -left-8 top-[2px]" onClick={handleClick}>
      <ChevronLeft />
    </button>
  );
}
