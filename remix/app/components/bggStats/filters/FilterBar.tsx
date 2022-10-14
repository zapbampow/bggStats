import { useCallback, useEffect, useState } from "react";

import type { SetStateAction, Dispatch } from "react";
import type { FilterType } from "~/services/queryService/types";
import type { SelectionType } from "../types";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";

import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import filter from "~/services/queryService";

import AddFilterButton from "../AddFilterButton";
import FilterToComponent from "../FilterToComponent";

type Props = {
  setFilteredResults: Dispatch<SetStateAction<PlayDataModel[]>>;
};

export default function FilterBar({ setFilteredResults }: Props) {
  const user = useBggUser();
  const { state, dispatch } = usePlayFilterContext();
  const [filterCount, setFilterCount] = useState(1);

  const addFilterButton = (selection: SelectionType) => {
    console.log("selection", selection);
    let filter: FilterType = {
      order: filterCount,
      filter: selection.value,
      label: selection.label,
      arg: "",
    };

    // setFilterButtons((filters) => [...filters, filter]);
    dispatch({
      type: "upsert",
      filter,
    });
    setFilterCount((count) => count + 1);
  };

  const handleFilter = useCallback(async () => {
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

    const pipe = await filter(user.userId, filters);
    // console.log("pipe", pipe);
    setFilteredResults(pipe);

    console.log("answer", pipe);
  }, [setFilteredResults, state, user?.userId]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <div className="mt-20 max-w-xl border border-slate-500 mx-auto">
      <div className="filters flex flex-col justify-center md:flex-row flex-wrap gap-2 mb-8">
        {/* Filter components */}
        {state.slice(1).map((filter: FilterType) => {
          return <FilterToComponent key={filter.order} filter={filter} />;
        })}
      </div>
      <div className="flex flex-col items-center gap-4">
        <AddFilterButton addFilterButton={addFilterButton} display={true} />
        {/* <BigButton onClick={handleAsk}>Submit</BigButton> */}
      </div>
    </div>
  );
}
