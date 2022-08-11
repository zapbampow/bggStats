import React from "react";
import SingleSelectFilter from "~/components/bggStats/filters/SingleSelectFilter";
import type { FilterButtonData } from "~/components/bggStats/types";

type Props = {
  filter: FilterButtonData;
};

export default function FilterToComponent({ filter }: Props) {
  switch (filter.value) {
    case "gameName":
      return <SingleSelectFilter key={filter.filterId} filter={filter} />;
    default:
      return <SingleSelectFilter key={filter.filterId} filter={filter} />;
  }
}
