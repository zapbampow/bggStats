import { Container } from "~/components/bggStats/pages/layout";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { cellStyle } from "./tableStyles";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
} from "@tanstack/react-table";
import PaginationRow from "./PaginationRow";
import { ExternalLink } from "../icons";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";

export default function RecordedPlays() {
  const { state: data } = usePlayResultsContext();

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
    <>
      <Container className="overflow-x-scroll sm:overflow-hidden">
        <table
          className="w-full border-separate rounded-sm border shadow-lg"
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
                                ? "w-4 px-2 pl-4"
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
      </Container>
      <div className="h-4"></div>
      <Container>
        <PaginationRow table={table} />
      </Container>
    </>
  );
}
