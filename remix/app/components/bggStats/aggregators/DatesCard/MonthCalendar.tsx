import React from "react";
import type { DateGroup } from "../types";
import getPlayDatesFromMonthData from "./utils/getPlayDatesFromMonthData";
import Calendar from "react-calendar/dist/cjs";
import dayjs from "dayjs";
import { useDatesCardContext } from "./DatesCardContext";
import monthNum from "./utils/monthNum";

type Props = {
  data: DateGroup[];
};

export default function MonthCalendar({ data }: Props) {
  const {
    state: { year, month },
    setScreen,
    setMonth,
  } = useDatesCardContext();
  const dates = getPlayDatesFromMonthData({ data: data[0], year, month });

  return (
    <div className="w-full">
      <Calendar
        className="dashboard_month_calendar"
        value={new Date(year, parseInt(monthNum[month]) - 1)}
        tileClassName={({ date, view }) => {
          let dateStr = dayjs(date).format("YYYY-MM-DD");
          if (dates?.includes(dateStr)) {
            return "recorded-play-date";
          }
        }}
        showNavigation={false}
        formatShortWeekday={(locale, date) =>
          dayjs(date).format("dd").slice(0, 1)
        }
        calendarType="US"
        onClickDay={(value) => console.log(value)}
      />
    </div>
  );
}
