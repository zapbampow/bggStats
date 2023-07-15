import type { PlayDataModel } from "~/models/bgg/gameDataModels.js";
import { TrophyFilled, ExternalLink } from "../icons";
import dayjs from "dayjs";
import PaginationRow from "./PaginationRow.js";
import type { Table as TableType } from "@tanstack/table-core";
import type { FirstRecordRow } from "~/utils/conversion/getFirstPlayDateFromPlays";

type Props = {
  table: TableType<PlayDataModel | FirstRecordRow>;
};
export default function RecordCards({ table }: Props) {
  return (
    <div className="grid gap-8">
      <div className="grid gap-4">
        {table.getRowModel().rows.map((row) => (
          <Card key={row.id} data={row.original} />
        ))}
      </div>
      <PaginationRow table={table} />
    </div>
  );
}

function Card({ data }: { data: PlayDataModel }) {
  return (
    <a
      className="mt-[3px] text-slate-600"
      href={`https://www.boardgamegeek.com/play/details/${data.playId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="grid gap-6 rounded border bg-white p-2">
        <div className="grid">
          <div className="text-2xl font-semibold">{data.gameName}</div>
          {data.players.length > 0 && (
            <div className="flex flex-wrap items-center">
              <Names players={data.players} />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-slate-500">
          <div>{dayjs(data.date).format("MMM DD, YYYY")}</div>
          <div>{data.location}</div>
        </div>
      </div>
    </a>
  );
}

const Names = ({ players }: { players: PlayDataModel["players"] }) => {
  let names = players.map((pdata, i, arr) => {
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
  return <>{names}</>;
};

type Row = {
  id: string;
  index: number;
  original: PlayDataModel;
};
