import React from "react";
import type { FilterButtonData } from "~/components/bggStats/types";
import {
  ComboBoxFilter,
  SingleSelectFilter,
} from "~/components/bggStats/filters";
import ComboBoxFilterMultiple from "./filters/ComboBoxFilterMultiple";

type Props = {
  filter: FilterButtonData;
};

export default function FilterToComponent({ filter }: Props) {
  console.log("filter", filter);
  switch (filter.value) {
    case "gameName":
      return <ComboBoxFilter key={filter.filterId} filter={filter} />;
    case "location":
      return <ComboBoxFilter key={filter.filterId} filter={filter} />;
    case "whereSinglePlayerNameWon":
      return <ComboBoxFilter key={filter.filterId} filter={filter} />;
    case "gameNames":
      return <ComboBoxFilterMultiple key={filter.filterId} filter={filter} />;
    case "withAllPlayerNames":
      return <ComboBoxFilterMultiple key={filter.filterId} filter={filter} />;
    case "withOnlyPlayerNames":
      return <ComboBoxFilterMultiple key={filter.filterId} filter={filter} />;
    case "withAnyPlayerNames":
      return <ComboBoxFilterMultiple key={filter.filterId} filter={filter} />;
    case "wherePlayerNamesWon":
      return <ComboBoxFilterMultiple key={filter.filterId} filter={filter} />;

    default:
      console.log("hitting default");
      return <SingleSelectFilter key={filter.filterId} filter={filter} />;
  }
}
