import dayjs from "dayjs";
import { Popover } from "@headlessui/react";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  arrow,
} from "@floating-ui/react";
import { useRef } from "react";

type Props = {
  date: Date;
  view: string;
  dates: { day: string; count: number }[];
};

export default function DayInfo({ date, view, dates }: Props) {
  const arrowRef = useRef(null);
  const { x, y, strategy, refs } = useFloating({
    placement: "top",
    middleware: [offset(5), flip(), shift(), arrow({ element: arrowRef })],
    // whileElementsMounted: autoUpdate,
  });

  if (view !== "month") return null;

  let d = dayjs(date);
  let day = d.format("YYYY-MM-DD");
  let dateData = dates.find((d) => d.day === day);

  if (!dateData) return null;

  const style = {
    position: strategy,
    top: y ?? 0,
    left: x ?? 0,
    width: "max-content",
  };

  const arrowStyle = {
    left: x !== null ? Math.abs(x) + 13 : 0,
    // top: y !== null ? y : 0,
  };

  console.log("style", style);

  return (
    <Popover>
      {/* Keeps the calendar date and just overlays a button on top of it */}
      <Popover.Button
        ref={refs.setReference}
        className="absolute top-0 bottom-0 left-0 right-0"
      />

      <Popover.Panel
        ref={refs.setFloating}
        style={style}
        className="relative z-10 p-4 font-normal text-white rounded-md bg-slate-800"
      >
        <div>
          {dateData.count} game{dateData.count > 1 ? "s" : ""} recorded
        </div>
        <div
          ref={arrowRef}
          id="arrow"
          className="absolute w-[1.25rem] h-[1.25rem] rotate-45 bg-slate-800 z-0"
          style={arrowStyle}
        />
      </Popover.Panel>
    </Popover>
  );
}
