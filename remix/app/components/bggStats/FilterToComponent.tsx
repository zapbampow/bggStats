import React from "react";
import type { FilterButtonData } from "~/components/bggStats/types";
import {
  ComboBoxFilter,
  SingleSelectFilter,
} from "~/components/bggStats/filters";

type Props = {
  filter: FilterButtonData;
};

export default function FilterToComponent({ filter }: Props) {
  switch (filter.value) {
    case "gameName":
      return <ComboBoxFilter key={filter.filterId} filter={filter} />;
    default:
      return <SingleSelectFilter key={filter.filterId} filter={filter} />;
  }
}
