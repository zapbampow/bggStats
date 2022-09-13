import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "../icons";
import type { FilterButtonData } from "../types";
import { baseStyles, hoverStyles } from "~/components/bggStats/styles";
import { FilterType } from "~/services/queryService/types";

interface Props {
  filter: FilterType;
}
export default function DatePickerComponent({ filter }: Props) {
  const user = useBggUser();
  const { state, dispatch } = usePlayFilterContext();

  const [value, setValue] = React.useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: any) => {
    setValue(value);

    dispatch({
      type: "upsert",
      filter: {
        order: filter.order,
        filter: filter.filter,
        label: filter.label,
        arg: dayjs(value).format("YYYY-MM-DD"),
      },
    });
  };

  useEffect(
    function setDefaultDate() {
      dispatch({
        type: "upsert",
        filter: {
          order: filter.order,
          filter: filter.filter,
          label: filter.label,
          arg: dayjs().format("YYYY-MM-DD"),
        },
      });
    },
    [dispatch, filter]
  );

  return (
    <div
      className={`relative text-slate-700 flex items-center gap-4 ${baseStyles} hover:cursor-pointer`}
      onClick={() => {
        setIsOpen(true);
      }}
    >
      <div className="font-semibold">{filter.label}</div>
      <DatePicker
        value={value}
        onChange={handleChange}
        onCalendarClose={() => setIsOpen(false)}
        calendarIcon={null}
        clearIcon={null}
        showLeadingZeros={true}
        locale="en-US"
        nextLabel={<ChevronRight width={16} />}
        prevLabel={<ChevronLeft width={16} />}
        format="yyyy-MM-dd"
        autoFocus={true}
        openCalendarOnFocus={true}
        isOpen={isOpen}
      />
    </div>
  );
}
