import React from "react";
// import type { FilterType } from "~/components/bggStats/types";
import type { FilterType } from "~/services/queryService/types";
import {
  ComboBoxFilter,
  SingleSelectFilter,
} from "~/components/bggStats/filters";
import ComboBoxFilterMultiple from "./filters/ComboBoxFilterMultiple";
import Datepicker, { MultiDatePicker, ForAllTime } from "./datepicker";

type Props = {
  filter: FilterType;
  // removeButtonById: (id: number) => void;
};

export default function FilterToComponent({ filter }: Props) {
  console.log("filter", filter);
  switch (filter.filter) {
    case "gameName":
      return <ComboBoxFilter key={filter.order} filter={filter} />;
    case "location":
      return <ComboBoxFilter key={filter.order} filter={filter} />;
    case "whereSinglePlayerNameWon":
      return <ComboBoxFilter key={filter.order} filter={filter} />;
    case "gameNames":
      return <ComboBoxFilterMultiple key={filter.order} filter={filter} />;
    case "withAllPlayerNames":
      return <ComboBoxFilterMultiple key={filter.order} filter={filter} />;
    case "withOnlyPlayerNames":
      return <ComboBoxFilterMultiple key={filter.order} filter={filter} />;
    case "withAnyPlayerNames":
      return <ComboBoxFilterMultiple key={filter.order} filter={filter} />;
    case "wherePlayerNamesWon":
      return <ComboBoxFilterMultiple key={filter.order} filter={filter} />;
    case "onDate":
      return <Datepicker key={filter.order} filter={filter} />;
    case "afterDate":
      return <Datepicker key={filter.order} filter={filter} />;
    case "beforeDate":
      return <Datepicker key={filter.order} filter={filter} />;
    case "betweenDates":
      return <MultiDatePicker key={filter.order} filter={filter} />;
    case "all": // for all time
      return (
        <ForAllTime
          key={filter.order}
          filter={filter}
          // removeButtonById={removeButtonById}
        />
      );

    default:
      console.log("hitting default");
      return <SingleSelectFilter key={filter.order} filter={filter} />;
  }
}
