import React, { useEffect, useState } from "react";
import { useParams } from "@remix-run/react";
import {
  getAllFirstGamePlaysFromPlays,
  getFirstRecordPerGameForUsername,
} from "~/utils/conversion/getFirstPlayDateFromPlays";
import type {
  RowData,
  FirstRecordRow,
} from "~/utils/conversion/getFirstPlayDateFromPlays";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import TableWithPagination from "~/components/bggStats/table/TableWithPagination";
import InfoButton from "~/components/bggStats/InfoButton";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ExternalLink } from "~/components/bggStats/icons";
import useFirstPlaysTable from "~/hooks/bgg/useFirstPlaysTable";
import {
  FirstPlayGameNameFilter,
  FirstPlayDateRangeFilter,
} from "~/components/bggStats/firstPlays";

// TODO: Refactor so use a different first play stategy as explained in the getAllFirstGamePlaysFromPlays file
export default function FirstPlays() {
  const { username } = useParams();
  const [plays, setPlays] = useState<FirstRecordRow[]>([]);
  const [filteredPlays, setFilteredPlays] = useState<FirstRecordRow[]>([]);

  useEffect(() => {
    if (!username) return;

    getFirstRecordPerGameForUsername(username).then((res: FirstRecordRow[]) => {
      console.log("res", res);
      setPlays(res);
      setFilteredPlays(res);
    });
  }, [username]);

  const table = useFirstPlaysTable(filteredPlays);

  // TODO: Add filter by game name component

  return (
    <div>
      <h1 className="text-5xl font-semibold text-white">
        First Recorded Played Finder
      </h1>
      <p className="mt-2 text-white">
        Find the first time you recorded a play of a given game or all the games
        you played for the first time in a time period.{" "}
      </p>
      {/* <Explanation className="ml-1" /> */}

      <div className="flex gap-4 mt-8 mb-4">
        <FirstPlayGameNameFilter
          plays={plays.sort((a, b) => {
            return a.gameName.localeCompare(b.gameName);
          })}
          setFilteredPlays={setFilteredPlays}
        />
        <FirstPlayDateRangeFilter
          plays={plays}
          setFilteredPlays={setFilteredPlays}
        />
      </div>

      <TableWithPagination table={table} />
    </div>
  );
}

// const Explanation = ({ className }: { className: string }) => {
//   return (
//     <span style={{ position: "relative" }} className={className}>
//       <InfoButton>
//         <p className="text-white">
//           This tool ignores whether you marked a game as "New" or "First Time
//           Played" when you recorded it.
//         </p>

//         <p className="text-white">
//           It also ignores the players of a game. So if you recorded a game play
//           of other people that you weren't involved it, it may show up here too.
//         </p>
//       </InfoButton>
//     </span>
//   );
// };
