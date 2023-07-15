import type { Table } from "@tanstack/react-table";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import type { FirstRecordRow } from "~/utils/conversion/getFirstPlayDateFromPlays";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "../icons";

type Props = {
  table: Table<PlayDataModel | FirstRecordRow>;
};

export default function PaginationRow({ table }: Props) {
  let pageCount = table.getPageCount();
  let currentPage = table.getState().pagination.pageIndex + 1;

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 rounded bg-white sm:rounded-tl-none sm:rounded-tr-none ">
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
      <div className="flex flex-auto items-center justify-center gap-8 py-4">
        <span className="flex flex-col items-center gap-1 xs:flex-row">
          <span className="hidden sm:inline">Go to page:</span>
          <input
            type="number"
            min={1}
            max={table.getPageCount()}
            value={currentPage}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border px-1 text-center sm:text-left"
          />
          <span>of {pageCount}</span>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="rounded border"
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
