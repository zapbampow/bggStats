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
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import useFilteredData from "~/contexts/bggStats/useFilteredData";
import AggregatorRow from "../aggregators/AggregatorRow";

export default function PlaysDashboard() {
  const user = useBggUser();
  // TODO: Uncomment this before deploying because it keeps the data up to date
  // usePlayData();
  useFilteredData();

  if (!user) {
    return null;
  }

  return (
    <div className="pb-8">
      <AggregatorRow userId={user.userId} />
      <FilterBar />
      <RecordedPlays />
    </div>
  );
}
