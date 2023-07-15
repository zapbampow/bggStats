import React from "react";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import { Container } from "../pages/layout";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { ColumnHelper } from "@tanstack/react-table";
import { ExternalLink } from "../icons";

import TableWithPagination from "../table/TableWithPagination";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { TrophyFilled } from "../icons";
import IconLegend from "./IconLegend";
import { useWindowSize } from "~/hooks/useWindowSize";
import RecordCards from "../table/RecordCards";

export default function RecordedPlays() {
  const { state: data } = usePlayResultsContext();
  const { width } = useWindowSize();
  const isMobile = width < 640;
  // React.useEffect(() => {
  //   console.log("data", data);
  // }, [data]);

  const columnHelper = createColumnHelper<PlayDataModel>();
  const columns = [
    columnHelper.accessor("playId", {
      cell: (data) => {
        const playId = data.getValue();
        return (
          <a
            href={`https://www.boardgamegeek.com/play/details/${playId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink width={16} />
          </a>
        );
      },
      header: () => "",
      enableSorting: false,
    }),
    columnHelper.accessor("date", {
      cell: (data) => data.getValue(),
      header: () => "Date",
      sortingFn: sortingFns.datetime,
    }),
    columnHelper.accessor("gameName", {
      cell: (data) => data.getValue(),
      header: () => "Game",
      sortingFn: sortingFns.basic,
    }),
    columnHelper.accessor("location", {
      cell: (data) => data.getValue(),
      header: () => "Location",
      sortingFn: sortingFns.basic,
    }),
    columnHelper.accessor("players", {
      cell: (data) => {
        // console.log("players data", data.getValue());
        // const sortedData = data.getValue().sort((a, b) => {
        //   if (a.win && !b.win) {
        //     return -1;
        //   }
        //   if (!a.win && b.win) {
        //     return 1;
        //   }
        //   return 0;
        // });

        let names = data.getValue().map((pdata, i, arr) => {
          let length = arr.length;
          let { userId, name, win, new: firstPlay } = pdata;
          return (
            <span className="inline-flex items-center" key={`${name}${userId}`}>
              {win ? (
                <TrophyFilled width={14} className="inline text-yellow-500" />
              ) : (
                ""
              )}
              {name}
              {/* {firstPlay ? <NewBadge width={16} strokeWidth={1} /> : ""} */}
              {i === length - 1 ? "" : ",\u00A0"}
            </span>
          );
        });
        return names;
      },
      header: () => "Players",
      enableSorting: false,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Container>
      {isMobile ? (
        <RecordCards table={table} />
      ) : (
        <TableWithPagination table={table} />
      )}
      <IconLegend />
    </Container>
  );
}
