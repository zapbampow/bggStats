import type { PlayDataModel } from "~/models/bgg/gameDataModels.js";
import { TrophyFilled, ExternalLink } from "../icons";
import dayjs from "dayjs";

export default function RecordCards({ rows }: { rows: Row[] }) {
  return (
    <div className="grid gap-4">
      {rows.map((row) => (
        <Card key={row.id} data={row.original} />
      ))}
    </div>
  );
}

function Card({ data }: { data: PlayDataModel }) {
  return (
    <div className="grid gap-2 rounded border bg-white p-2">
      <div>
        <div className="flex justify-between">
          <div className="font-medium">{data.gameName}</div>
          <a
            className="mt-[3px]"
            href={`https://www.boardgamegeek.com/play/details/${data.playId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink width={16} />
          </a>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600">
          <div>{dayjs(data.date).format("MMM DD, YYYY")}</div>
          <div>{data.location}</div>
        </div>
      </div>

      {data.players.length > 0 && (
        <div className="flex flex-wrap items-center text-sm">
          {/* <img
            src="/images/icons/users.svg"
            alt="Players"
            className="mr-1 inline h-4 w-4"
          /> */}
          <Names players={data.players} />
        </div>
      )}
    </div>
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
