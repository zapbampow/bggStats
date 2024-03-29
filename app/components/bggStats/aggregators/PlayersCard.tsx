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
      label: "Players",
      data: [],
      backgroundColor: Object.values(ChartColors),
    },
  ],
};

export default function PlayersCard() {
  const chartRef = useRef();
  const { state } = usePlayResultsContext();
  const { state: filterState, dispatch } = usePlayFilterContext();
  const [data, setData] = useState<Data | undefined>();
  const [playerCount, setPlayerCount] = useState(0);

  React.useEffect(() => {
    const initial: Data = JSON.parse(JSON.stringify(initialData));

    const countData = state.reduce((acc, cur) => {
      if (!cur.players.length) return acc;

      cur.players.map((player) => {
        const { name, username } = player;

        // no identifying name recorded at all
        if (!name) return acc;

        // name recorded
        if (!acc[name]) {
          acc[name] = 1;
        } else {
          acc[name] += 1;
        }
      });
      return acc;
    }, {});

    const playerCount = Object.keys(countData).length;
    setPlayerCount(playerCount);

    const totalGameCount = Object.values(countData).reduce(
      (acc: number, cur: number) => {
        const count = acc + cur;
        return count;
      },
      0
    );

    const groupSmallerPlayersAsOther = Object.entries(countData).reduce(
      (acc, cur) => {
        const [name, count] = cur;
        const percent = (count / totalGameCount) * 100;
        if (percent < 0.5) {
          if (!acc["Other"]) {
            acc["Other"] = count;
          } else {
            acc["Other"] += count;
          }
          return acc;
        }
        acc[name] = count;
        return acc;
      },
      {}
    );

    const displayData = JSON.parse(JSON.stringify(initialData));
    displayData.labels = Object.keys(groupSmallerPlayersAsOther);
    displayData.datasets[0].data = Object.values(groupSmallerPlayersAsOther);

    setData(displayData);
  }, [state]);

  // useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  const getDataFromEvent = (e) => {
    if (!chartRef?.current) return;
    const el = getElementAtEvent(chartRef.current, e);

    if (!el.length) return;
    const { datasetIndex, index } = el[0];
    const dataFromEvent = data?.labels[index];

    return dataFromEvent;
  };

  const handleClick = (e) => {
    const name = getDataFromEvent(e);

    if (!name) return;
    if (name === "Other") return;

    const order = filterState.map((item) => item.order).length;

    dispatch({
      type: "upsert",
      filter: {
        order,
        filter: "withPlayerName",
        label: "With player",
        arg: name,
      },
    });
  };

  if (!data) return null;

  return (
    <Card>
      <CardTitle>Players</CardTitle>
      <Pie
        ref={chartRef}
        id="players"
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
        onMouseMove={(e) => {
          if (!chartRef?.current) return;

          const name = getDataFromEvent(e);

          if (name == "Other") {
            chartRef.current.canvas.style.cursor = "default";
            return;
          } else {
            chartRef.current.canvas.style.cursor = "pointer";
            return;
          }
        }}
        onClick={handleClick}
      />
      <CardSummary>Total: {playerCount}</CardSummary>
    </Card>
  );
}
