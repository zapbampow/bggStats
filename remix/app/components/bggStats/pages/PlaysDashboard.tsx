import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./layout";
import FilterBar from "../filters/FilterBar";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import type { FilterType } from "~/services/queryService/types";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import usePlayData from "~/hooks/bgg/usePlayData";
import RecordedPlays from "../answers/RecordedPlays";
import filter from "~/services/queryService";

export default function PlaysDashboard() {
  const user = useBggUser();
  // const { manuallyUpdate, percentDone, error } = usePlayData();
  const { state, dispatch } = usePlayFilterContext();
  const [filteredResults, setFilteredResults] = useState<PlayDataModel[]>([]);

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  const handleFiltering = useCallback(async () => {
    if (!user?.userId) return;
    let filters = JSON.parse(JSON.stringify(state));
    // Update aggregator order value
    let index = filters.findIndex(
      (filter: FilterType) => filter.order === "aggregator"
    );
    filters[index].order = 1000;

    filters.sort((a: FilterType, b: FilterType) => {
      if (a.order > b.order) return 1;
      if (a.order < b.order) return -1;
      return 0;
    });

    const filtersWithArgs = filters.filter(
      (item: FilterType) =>
        item.filter === "listRecordedPlays" || item.arg !== ""
    );

    const pipe = await filter(user.userId, filtersWithArgs);
    // console.log("pipe", pipe);
    setFilteredResults(pipe);
  }, [state, user?.userId]);

  useEffect(
    function setInitialFilter() {
      dispatch({
        type: "upsert",
        filter: {
          order: "aggregator",
          filter: "listRecordedPlays",
          label: "",
          arg: "",
        },
      });
    },
    [dispatch]
  );

  useEffect(
    function setInitialData() {
      handleFiltering();
    },
    [handleFiltering]
  );

  return (
    <div className="min-h-screen">
      <FilterBar setFilteredResults={setFilteredResults} />
      <RecordedPlays data={filteredResults} />
    </div>
  );
}
