import React, { useEffect, useReducer } from "react";
import { useParams } from "@remix-run/react";
import { getFirstRecordPerGameForUsername } from "~/utils/conversion/getFirstPlayDateFromPlays";
import type { FirstRecordRow } from "~/utils/conversion/getFirstPlayDateFromPlays";
import TableWithPagination from "~/components/bggStats/table/TableWithPagination";

import useFirstPlaysTable from "~/hooks/bgg/useFirstPlaysTable";
import {
  FirstPlayGameNameFilter,
  FirstPlayDateRangeFilter,
} from "~/components/bggStats/firstPlays";
import type { LinksFunction } from "@remix-run/node";
import datePickerStyles from "~/styles/bggStats/datePickerStyles.css";
import dayjs from "dayjs";

type State = {
  selectedGameName: string;
  dateRange: Date[] | undefined[];
  plays: FirstRecordRow[];
  filteredPlays: FirstRecordRow[];
  showDateSelector: boolean;
};

type Action = {
  type:
    | "setInitialData"
    | "setPlays"
    | "setFilteredPlays"
    | "setGameName"
    | "setDateRange"
    | "showDateSelector";
  payload: any;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setInitialData":
      return {
        ...state,
        plays: action.payload.plays,
        filteredPlays: action.payload.filteredPlays,
      };
    case "setPlays":
      return { ...state, plays: action.payload };
    case "setFilteredPlays":
      return { ...state, filteredPlays: action.payload };
    case "setGameName":
      return {
        ...state,
        selectedGameName: action.payload,
        dateRange: [undefined, undefined],
        filteredPlays: getPlaysByGameName(state.plays, action.payload),
        showDateSelector: false,
      };
    case "setDateRange":
      return {
        ...state,
        dateRange: action.payload,
        selectedGameName: "",
        filteredPlays: getPlaysByDateRange(state.plays, action.payload),
      };
    case "showDateSelector":
      return { ...state, showDateSelector: action.payload };
    default:
      return state;
  }
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: datePickerStyles }];
};

export default function FirstPlays() {
  const { username } = useParams();

  const [
    { plays, filteredPlays, dateRange, selectedGameName, showDateSelector },
    dispatch,
  ] = useReducer(reducer, {
    selectedGameName: "",
    dateRange: [undefined, undefined],
    plays: [],
    filteredPlays: [],
    showDateSelector: false,
  });

  useEffect(() => {
    if (!username) return;

    getFirstRecordPerGameForUsername(username).then((res: FirstRecordRow[]) => {
      // console.log("res", res);
      dispatch({
        type: "setInitialData",
        payload: { plays: res, filteredPlays: res },
      });
    });
  }, [username]);

  const table = useFirstPlaysTable(filteredPlays);

  return (
    <div>
      <h1 className="text-5xl font-semibold text-white">
        First Recorded Played Finder
      </h1>
      <p className="mt-2 text-white">
        Find the first time you recorded a play of a given game or all the games
        you played for the first time in a time period.{" "}
      </p>

      <div className="flex flex-wrap gap-4 mt-8 mb-4">
        <FirstPlayGameNameFilter
          plays={plays.sort((a, b) => {
            return a.gameName.localeCompare(b.gameName);
          })}
          selection={selectedGameName}
          setSelection={(gameName) =>
            dispatch({ type: "setGameName", payload: gameName })
          }
        />
        <FirstPlayDateRangeFilter
          setDateRange={(dateRange) =>
            dispatch({ type: "setDateRange", payload: dateRange })
          }
          dateRange={dateRange}
          showDateSelector={showDateSelector}
          setShowDateSelector={() =>
            dispatch({ type: "showDateSelector", payload: true })
          }
        />
      </div>

      <TableWithPagination table={table} />
    </div>
  );
}

const getPlaysByGameName = (plays: FirstRecordRow[], game: string) => {
  if (!game) return plays;

  return plays?.filter((play: FirstRecordRow) => {
    return play.gameName.toLowerCase().includes(game.toLowerCase());
  });
};

const getPlaysByDateRange = (
  plays: FirstRecordRow[],
  dateRange: Date[] | undefined[]
) => {
  const [startDate, endDate] = dateRange;
  if (!startDate && !endDate) return plays;
  console.log("hit");

  const filteredPlays = plays.filter((play) => {
    const playDate = dayjs(play.date).format("YYYYMMMDD");
    const start = dayjs(startDate).format("YYYYMMMDD");
    const end = dayjs(endDate).format("YYYYMMMDD");

    const isBetweenOrOn = playDate >= start && playDate <= end;
    return isBetweenOrOn;
  });
  return filteredPlays;
};
