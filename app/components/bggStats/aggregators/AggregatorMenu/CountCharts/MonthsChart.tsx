import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import type { DateGroup } from "../../types";
import getMonthsChartDataByYear from "../../DatesCard/utils/getMonthsChartDataByYear";
import type { Screen } from "../../types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import monthNum from "../../DatesCard/utils/monthNum";
import dayjs from "dayjs";
import { useCalendarScreenContext } from "../../CalendarScreenContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  indexAxis: "y" as const,
  updateMode: "show",
  responsive: true,
  // maintainAspectRatio: false,
  aspectRatio: 0.8,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Months",
    },
  },
};

const getDataFromEvent = (e, chartRef, data) => {
  if (!chartRef?.current) return;
  const el = getElementAtEvent(chartRef.current, e);

  if (!el.length) return;
  const { datasetIndex, index } = el[0];
  const dataFromEvent = data?.labels[index];

  return dataFromEvent;
};

type Props = {
  data: DateGroup[];
};
export default function MonthsChart({ data }: Props) {
  const { state: filterState, dispatch } = usePlayFilterContext();

  const {
    state: { year },
    setMonth,
    setYear,
    setScreen,
  } = useCalendarScreenContext();
  const chartRef = useRef();

  // if (!year) {
  //   let item = filterState.find((item) => {
  //     return (
  //       item.filter === "betweenDates" ||
  //       item.filter === "onDate" ||
  //       item.filter === "afterDate" ||
  //       item.filter === "beforeDate"
  //     );
  //   });
  //   if (!item?.arg) return dayjs().year();

  //   let year = dayjs(item.arg[0]).year();
  //   setYear(year);
  // }
  const monthsData = getMonthsChartDataByYear(data, year);

  const handleClick = (e) => {
    const month = getDataFromEvent(e, chartRef, monthsData);
    if (!month) return;

    setMonth(month);
    setScreen("month");

    const dateFilterIndex = filterState.findIndex(
      (item) => item.filter === "betweenDates"
    );
    const order = dateFilterIndex !== -1 ? dateFilterIndex : filterState.length;

    const endOfMonth = dayjs(`${year}-${monthNum[month]}-01`)
      .endOf("month")
      .date();
    const startDate = `${year}-${monthNum[month]}-01`;
    const endDate = `${year}-${monthNum[month]}-${endOfMonth}`;

    dispatch({
      type: "upsert",
      filter: {
        order,
        filter: "betweenDates",
        label: "Between",
        arg: [startDate, endDate],
      },
    });

    // setScreen("months");
    // setMonth(month)
  };

  const handleMouseMove = (e) => {
    if (!chartRef?.current) return;
    const label = getDataFromEvent(e, chartRef, monthsData);

    if (!label) {
      chartRef.current.canvas.style.cursor = "default";
    } else {
      chartRef.current.canvas.style.cursor = "pointer";
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* months chart */}
      <Bar
        ref={chartRef}
        data={monthsData}
        options={options}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}
