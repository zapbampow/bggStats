import React, { useEffect } from "react";
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

interface Props {
  filter: FilterButtonData;
}
export default function DatePickerComponent({ filter }: Props) {
  const user = useBggUser();
  const { state, dispatch } = usePlayFilterContext();

  const [value, setValue] = React.useState(new Date());

  const handleChange = (value: any) => {
    setValue(value);

    dispatch({
      type: "upsert",
      filter: {
        order: filter.filterId,
        filter: filter.value,
        arg: dayjs(value).format("YYYY-MM-DD"),
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: "upsert",
      filter: {
        order: filter.filterId,
        filter: filter.value,
        arg: dayjs().format("YYYY-MM-DD"),
      },
    });
  }, [dispatch, filter]);

  return (
    <div className="flex items-center gap-4">
      <div className="font-semibold pl-4">{filter.label}</div>
      <DatePicker
        value={value}
        onChange={handleChange}
        calendarIcon={null}
        clearIcon={null}
        showLeadingZeros={true}
        locale="en-US"
        nextLabel={<ChevronRight width={16} />}
        prevLabel={<ChevronLeft width={16} />}
        format="yyyy-MM-dd"
        autoFocus={true}
        openCalendarOnFocus={true}
        isOpen={true}
      />
    </div>
  );
}
