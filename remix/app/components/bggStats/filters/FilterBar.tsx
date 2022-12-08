import { useCallback, useEffect, useState } from "react";

import type { SetStateAction, Dispatch } from "react";
import type { FilterType } from "~/services/queryService/types";
import type { SelectionType } from "../types";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";

import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import filter from "~/services/queryService";

import AddFilterButton from "../AddFilterButton";
import FilterToComponent from "../FilterToComponent";
import { Container } from "../pages/layout";

export default function FilterBar() {
  const { state, dispatch } = usePlayFilterContext();
  const [filterCount, setFilterCount] = useState(1);

  const addFilterButton = (selection: SelectionType) => {
    let filter: FilterType = {
      order: state.length + 1,
      filter: selection.value,
      label: selection.label,
      arg: "",
    };

    // setFilterButtons((filters) => [...filters, filter]);
    dispatch({
      type: "upsert",
      filter,
    });
    // setFilterCount((count) => count + 1);
  };

  return (
    <Container>
      <div className="flex flex-wrap gap-2 mb-8 filters">
        {/* Filter components */}
        {state.slice(1).map((filter: FilterType) => {
          return <FilterToComponent key={filter.order} filter={filter} />;
        })}
        <AddFilterButton addFilterButton={addFilterButton} display={true} />
      </div>
    </Container>
  );
}
