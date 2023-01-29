import React from "react";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ExternalLink } from "../icons";
import { Container } from "../pages/layout";
import PaginationRow from "./PaginationRow";
import type { Table as TableType } from "@tanstack/table-core";
import type { FirstRecordRow } from "~/utils/conversion/getFirstPlayDateFromPlays";

const cellStyle = "py-2 px-4";

type Props = {
  table: TableType<PlayDataModel | FirstRecordRow>;
};
export default function TableWithPagination({ table }: Props) {
  return (
    <>
      <table
        className="w-full bg-white border border-separate rounded-tr-md rounded-tl-md"
        style={{ borderSpacing: 0 }}
      >
        <thead className="w-full border-b border-spacing-2">
          {
            // Loop over the header rows
            table.getHeaderGroups().map((headerGroup) => (
              // Apply the header row props
              <tr
                key={headerGroup.id}
                className="w-full text-left rounded"
                style={{ borderSpacing: "1 !important" }}
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((header) => (
                    // Apply the header cell props
                    <th
                      key={header.id}
                      className={`${cellStyle} border-b`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
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
                      // console.log("cell", cell);
                      // Apply the cell props
                      return (
                        <td
                          key={cell.id}
                          className={`${cellStyle} ${
                            cell?.column?.id === "date"
                              ? "w-32"
                              : cell?.column?.id === "playId"
                              ? "w-4 px-2"
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

      <PaginationRow table={table} />
    </>
  );
}
