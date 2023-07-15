import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import DatePicker from "react-date-picker";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { ChevronLeft, ChevronRight, Trash } from "../icons";
import { baseStyles } from "~/components/bggStats/styles";
import type { FilterType } from "~/services/queryService/types";

const dateFormat = "YYYY-MM-DD";

interface Props {
  filter: FilterType;
}
export default function MultiDatePickerComponent({ filter }: Props) {
  const { state, dispatch } = usePlayFilterContext();
  const [isOpen, setIsOpen] = useState(false);

  const getInitialValues = (dates: string[]) => {
    // I understand that an error gets throw because of how this date gets formatted, but this is the only way I was able to pass in a date that ignored time zone in the input
    const initDates = dates.map((date) => {
      let year = dayjs(date).year();
      let month = dayjs(date).month();
      let day = dayjs(date).date();

      return new Date(year, month, day);
    });
    return initDates;
  };

  const [value, setValue] = useState(
    typeof filter.arg !== "string" && filter?.arg
      ? getInitialValues(filter.arg)
      : [new Date(), new Date()]
  );

  const handleChange = (value: any) => {
    console.log("typeof value", typeof value);
    setValue(value);

    let sortedDates = [...value].sort((date1, date2) => {
      let d1 = dayjs(date1).format(dateFormat);
      let d2 = dayjs(date2).format(dateFormat);

      if (d1 > d2) return 1;
      if (d1 < d2) return -1;
      return 0;
    });
    console.log("sortedDates", sortedDates);

    dispatch({
      type: "upsert",
      filter: {
        order: filter.order,
        filter: filter.filter,
        label: filter.label,
        arg: sortedDates,
      },
    });
  };

  const removeFilter = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({
      type: "remove",
      filter: filter,
    });
  };

  useEffect(() => {
    const newValue =
      typeof filter.arg !== "string" && filter?.arg
        ? getInitialValues(filter.arg)
        : [new Date(), new Date()];

    setValue(newValue);
  }, [filter]);

  return (
    <div
      onClick={() => setIsOpen(true)}
      className={`relative flex items-center gap-4 text-slate-700 ${baseStyles} hover:cursor-pointer`}
    >
      <div className="font-semibold">{filter.label}:</div>
      <DateRangePicker
        value={value}
        onChange={handleChange}
        calendarIcon={null}
        clearIcon={null}
        showLeadingZeros={true}
        locale="en-US"
        nextLabel={<ChevronRight width={16} />}
        prevLabel={<ChevronLeft width={16} />}
        format="yyyy-MM-dd"
        autoFocus={false}
        openCalendarOnFocus={true}
        isOpen={isOpen}
        onCalendarClose={() => setIsOpen(false)}
        rangeDivider="and"
      />
      <div onClick={removeFilter} className="ml-auto hover:text-red-500">
        <Trash width={16} />
      </div>
    </div>
  );
}
