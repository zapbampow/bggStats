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

export default function RecordedPlays() {
  const { state: data } = usePlayResultsContext();
  React.useEffect(() => {
    console.log("data", data);
  }, [data]);

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
        let names = data
          .getValue()
          .map((pdata) => pdata.name)
          .join(", ");
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
      <TableWithPagination table={table} />
    </Container>
  );
}
