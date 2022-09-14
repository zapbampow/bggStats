import React, { useEffect } from "react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import type { FilterType } from "~/services/queryService/types";
import { Times } from "~/components/bggStats/icons";

type Props = {
  filter: FilterType;
};

export default function RemoveFilter({ filter }: Props) {
  const { state, dispatch } = usePlayFilterContext();

  //   useEffect(() => {
  //     console.log("filter", filter);
  //   }, [filter]);

  const removeFilter = (filter: FilterType) => {
    dispatch({
      type: "remove",
      filter: filter,
    });
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 hover:cursor-pointer hover:font-semibold`}
      onClick={() => {
        removeFilter(filter);
      }}
    >
      <div>Clear</div>
      <Times width={20} strokeWidth={3} className="text-red-500" />
    </div>
  );
}
