import { useCallback, useEffect } from "react";

import type { FilterType } from "~/services/queryService/types";

import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import filter from "~/services/queryService";

export default function useFilteredData() {
  const { user } = useBggUser();
  const { state, dispatch } = usePlayFilterContext();
  const { dispatch: resultsDispatch } = usePlayResultsContext();

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
        item.filter === "listRecordedPlays" || item?.arg?.length
    );

    // console.log("filtersWithArgs", filtersWithArgs);

    const pipe = await filter(user.userId, filtersWithArgs);
    // console.log("pipe", pipe);
    // setFilteredResults(pipe);
    resultsDispatch({
      type: "setFilteredResults",
      payload: pipe,
    });
  }, [state, user?.userId, resultsDispatch]);

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
  return { handleFiltering };
}
