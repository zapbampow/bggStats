import React, { useEffect, useMemo, useState, useRef } from "react";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  defaults,
} from "chart.js";
import { Pie, getDatasetAtEvent, getElementAtEvent } from "react-chartjs-2";
import type { InteractionItem } from "chart.js";
import { Card, CardTitle, CardSummary } from "./Card";
import { ChartColors } from "./ChartColors";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import type { Data } from "./types";

ChartJS.register(ArcElement, Tooltip, Legend, Filler);

const initialData: Data = {
  labels: [],
  datasets: [
    {
      label: "Locations",
      data: [],
      backgroundColor: Object.values(ChartColors),
    },
  ],
};

export default function LocationsCard() {
  const chartRef = useRef();
  const { state } = usePlayResultsContext();
  const { state: filterState, dispatch } = usePlayFilterContext();
  const [data, setData] = useState<Data | undefined>();

  React.useEffect(() => {
    // console.log("state", state);

    const initial = JSON.parse(JSON.stringify(initialData));

    const reducedData: Data = state.reduce(
      (previousValue: Data, currentValue: PlayDataModel) => {
        // console.log({
        //   previousValue,
        //   currentValue,
        //   initialData,
        // });
        if (!currentValue.location) return previousValue;

        const locationIndex = previousValue.labels.indexOf(
          currentValue.location
        );
        // let updated = { ...previousValue };

        // if it doesn't exist add it
        if (locationIndex === -1) {
          previousValue.labels.push(currentValue.location);
          previousValue.datasets[0].data.push(1);
          return previousValue;
        }

        // if it does exist, increase the count
        previousValue.datasets[0].data[locationIndex] =
          previousValue.datasets[0].data[locationIndex] + 1;

        // console.log("previousValue", previousValue);
        return previousValue;
      },
      initial
    );

    setData(reducedData);
  }, [state]);

  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data?.datasets[datasetIndex].label);
  };

  const getDataFromEvent = (e) => {
    if (!chartRef?.current) return;
    const el = getElementAtEvent(chartRef.current, e);

    if (!el.length) return;

    const { datasetIndex, index } = el[0];
    const dataFromEvent = data?.labels[index];

    return dataFromEvent;
  };

  const handleClick = (e) => {
    const location = getDataFromEvent(e);
    if (!location) return;

    const order = filterState.map((item) => item.order).length;

    dispatch({
      type: "upsert",
      filter: {
        order,
        filter: "location",
        label: "At",
        arg: location,
      },
    });
  };

  if (!data) return null;

  return (
    <Card>
      <CardTitle>Locations</CardTitle>
      <Pie
        ref={chartRef}
        updateMode="show"
        data={data}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        }}
        onClick={handleClick}
      />
      <CardSummary>Total: {data.labels.length}</CardSummary>
    </Card>
  );
}
