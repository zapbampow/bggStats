import React from "react";
import type { FirstRecordRow } from "~/utils/conversion/getFirstPlayDateFromPlays";

type Props = {
  plays: FirstRecordRow[];
  setFilteredPlays: (plays: FirstRecordRow[]) => void;
};

export default function FirstPlayDateRangeFilter({
  plays,
  setFilteredPlays,
}: Props) {
  return <div>FirstPlayDateRangeFilter</div>;
}