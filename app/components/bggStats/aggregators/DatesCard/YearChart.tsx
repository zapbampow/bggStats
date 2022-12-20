import React, { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction, Event } from "react";
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
import type { DateGroup } from "../types";
import getYearChartData from "./utils/getYearChartData";
import type { Screen } from "../types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useDatesCardContext } from "./DatesCardContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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
      text: "Years",
    },
  },
};

const getDataFromEvent = (e: Event, chartRef, data) => {
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
export default function YearChart({ data }: Props) {
  const { state: filterState, dispatch } = usePlayFilterContext();
  const {
    state: datesCardState,
    dispatch: datesCardDispatch,
    setScreen,
    setYear,
    setFilterOrder,
  } = useDatesCardContext();
  const chartRef = useRef();
  const yearData = getYearChartData(data);
  // console.log("yearData", yearData);

  const handleClick = (e: Event) => {
    const year = getDataFromEvent(e, chartRef, yearData);
    if (!year) return;

    const dateFilterIndex = filterState.findIndex(
      (item) => item.filter === "betweenDates"
    );
    const order = dateFilterIndex !== -1 ? dateFilterIndex : filterState.length;
    setFilterOrder(order);

    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;

    setScreen("months");
    setYear(year);

    dispatch({
      type: "upsert",
      filter: {
        order,
        filter: "betweenDates",
        label: "Between",
        arg: [startDate, endDate],
      },
    });
  };

  const handleMouseMove = (e: Event) => {
    if (!chartRef?.current) return;
    const label = getDataFromEvent(e, chartRef, yearData);

    if (!label) {
      chartRef.current.canvas.style.cursor = "default";
    } else {
      chartRef.current.canvas.style.cursor = "pointer";
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Bar
        ref={chartRef}
        data={yearData}
        options={options}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
}
