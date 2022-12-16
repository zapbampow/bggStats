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

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 bg-white rounded-br-md rounded-bl-md ">
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
      <div className="flex justify-center flex-auto gap-8 py-4">
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
            className="w-16 px-1 border rounded "
          />
          of {pageCount}
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="border rounded"
        >
          {[10, 25, 50, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
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
