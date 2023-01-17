import React from "react";
import type { DateGroup } from "../types";
import getPlayDatesFromMonthData from "../DatesCard/utils/getPlayDatesFromMonthData";
import Calendar from "react-calendar/dist/cjs";
import dayjs from "dayjs";
import { usePlayCountCardContext } from "./PlayCountCardContext";
import monthNum from "../DatesCard/utils/monthNum";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useCalendarScreenContext } from "../CalendarScreenContext";
import DayInfo from "./DayInfo";

type Props = {
  data: DateGroup[];
};

export default function MonthCalendar({ data }: Props) {
  const { state: filterState } = usePlayFilterContext();
  const {
    state: { year, month },
    setMonth,
  } = useCalendarScreenContext();
  const dates = getPlayDatesFromMonthData({ data: data[0], year, month });
  // console.log("data", data);
  const value = new Date(year, parseInt(monthNum[month]) - 1);

  if (!year && !month) return null;

  return (
    <div className="w-full">
      <Calendar
        className="dashboard_month_calendar"
        value={new Date(year, parseInt(monthNum[month]) - 1)}
        tileClassName={({ date, view }) => {
          let dateStr = dayjs(date).format("YYYY-MM-DD");
          if (dates?.some((d) => d.day === dateStr)) {
            return "recorded-play-date";
          }
        }}
        showNavigation={false}
        formatShortWeekday={(locale, date) =>
          dayjs(date).format("dd").slice(0, 1)
        }
        calendarType="US"
        onClickDay={(value, e) => {
          let day = dayjs(value).format("YYYY-MM-DD");
          console.log(day);
          let dateCount = dates.find((d) => d.day === day);
          console.log("dateCount", dateCount);
          console.log("e", e.target);
        }}
        tileContent={({ date, view }) => (
          <DayInfo date={date} view={view} dates={dates} />
        )}
      />
    </div>
  );
}
