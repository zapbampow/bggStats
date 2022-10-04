import React from "react";
import { Container } from "~/components/bggStats/pages/layout";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import { useFlexLayout, useTable } from "react-table";
import { cellStyle } from "./tableStyles";

type Props = {
  data: PlayDataModel[];
};

export default function RecordedPlays({ data }: Props) {
  // const playData = React.useMemo(
  //   () =>
  //     data.map((x) => {
  //       const { players, ...rest } = x;
  //       return { ...rest };
  //     }),
  //   [data]
  // );

  const columns = React.useMemo(
    () => [
      {
        Header: "Play Id",
        accessor: "playId",
        width: 115,
      },
      {
        Header: "Date",
        accessor: "date",
        width: 125,
      },
      {
        Header: "Game",
        accessor: "gameName",
        minWidth: 125,
        width: 150,
        maxWidth: 300,
      },
      {
        Header: "Location",
        accessor: "location",
      },
      // {
      //   Header: "Quantity",
      //   accessor: "quantity",
      // },
      // {
      //   Header: "length",
      //   accessor: "length",
      // },
      // {
      //   Header: "Incomplete",
      //   accessor: "incomplete",
      // },
      {
        Header: "Players",
        accessor: "players",
        Cell: (row: any) => {
          let names = row?.cell?.value?.map((pdata) => pdata.name).join(", ");
          return names;
        },
        maxWidth: 300,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <Container>
      <table
        {...getTableProps()}
        className="w-full table-auto border-separate rounded-sm border shadow-lg"
        style={{ borderSpacing: 0 }}
      >
        <thead className="border-b border-spacing-2">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr
                key="1"
                {...headerGroup.getHeaderGroupProps()}
                className="text-left rounded"
                style={{ borderSpacing: "1 !important" }}
              >
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, i) => (
                    // Apply the header cell props
                    <th
                      key={i}
                      {...column.getHeaderProps()}
                      className={`${cellStyle} border-b`}
                    >
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()} className="border-separate">
          {
            // Loop over the table rows
            rows.map((row, i) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr
                  key={i}
                  {...row.getRowProps()}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-slate-100"}`}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, i) => {
                      // console.log("cell", cell);
                      // Apply the cell props
                      return (
                        <td
                          key={i}
                          {...cell.getCellProps()}
                          className={`${cellStyle} ${
                            cell?.column?.Header === "Date"
                              ? "w-32"
                              : cell?.column?.Header === "Game"
                              ? "min-w-[9rem] max-w-max"
                              : "max-w-fit"
                          }`}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
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
  );
}
