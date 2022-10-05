import React from "react";
import { Container } from "~/components/bggStats/pages/layout";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { cellStyle } from "./tableStyles";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import PaginationRow from "./PaginationRow";

type Props = {
  data: PlayDataModel[];
};

export default function RecordedPlays({ data }: Props) {
  const columnHelper = createColumnHelper<PlayDataModel>();
  const columns = [
    columnHelper.accessor("playId", {
      cell: (data) => data.getValue(),
      header: () => "Play Id",
    }),
    columnHelper.accessor("date", {
      cell: (data) => data.getValue(),
      header: () => "Date",
    }),
    columnHelper.accessor("gameName", {
      cell: (data) => data.getValue(),
      header: () => "Game",
    }),
    columnHelper.accessor("location", {
      cell: (data) => data.getValue(),
      header: () => "Location",
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
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Container>
      <table
        className="w-full table-auto border-separate rounded-sm border shadow-lg"
        style={{ borderSpacing: 0 }}
      >
        <thead className="border-b border-spacing-2">
          {
            // Loop over the header rows
            table.getHeaderGroups().map((headerGroup) => (
              // Apply the header row props
              <tr
                key={headerGroup.id}
                className="text-left rounded"
                style={{ borderSpacing: "1 !important" }}
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((header) => (
                    // Apply the header cell props
                    <th key={header.id} className={`${cellStyle} border-b`}>
                      {
                        // Render the header
                        header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody className="border-separate">
          {
            // Loop over the table rows
            table.getRowModel().rows.map((row, i) => {
              return (
                // Apply the row props
                <tr
                  key={row.id}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
                >
                  {
                    // Loop over the rows cells
                    row.getVisibleCells().map((cell) => {
                      console.log("cell", cell);
                      // Apply the cell props
                      return (
                        <td
                          key={cell.id}
                          className={`${cellStyle} ${
                            cell?.column?.id === "date"
                              ? "w-32"
                              : cell?.column?.id === "playId"
                              ? "w-24"
                              : cell?.column?.id === "gameName"
                              ? "min-w-[9rem] max-w-max"
                              : "max-w-fit"
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className="h-4"></div>

      <PaginationRow table={table} />
    </Container>
  );
}
