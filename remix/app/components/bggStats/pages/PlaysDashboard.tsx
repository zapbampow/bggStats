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
  useFilteredData();

  return (
    <div className="min-h-screen pb-8">
      <AggregatorRow />
      <FilterBar />
      <RecordedPlays />
    </div>
  );
}
