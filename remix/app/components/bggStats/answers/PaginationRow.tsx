import React from "react";
import type { Table } from "@tanstack/react-table";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "../icons";

type Props = {
  table: Table<PlayDataModel>;
};

export default function PaginationRow({ table }: Props) {
  let pageCount = table.getPageCount();
  let currentPage = table.getState().pagination.pageIndex + 1;

  if (pageCount === currentPage) return null;

  return (
    <div className="flex justify-between items-start gap-2">
      {/* Previous page buttons */}
      <div>
        <button
          className={`p-1 disabled:opacity-25`}
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </button>
        <button
          className="p-1 disabled:opacity-25"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </button>
      </div>

      {/* Pagination settings */}
      <div className="flex flex-col items-center">
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {currentPage} of {pageCount}
          </strong>
        </span>
        <div className="flex justify-center gap-4 flex-auto">
          <span className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              min={1}
              max={table.getPageCount()}
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Next page buttons */}
      <div>
        <button
          className="p-1 disabled:opacity-25"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </button>
        <button
          className="p-1 disabled:opacity-25"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}
