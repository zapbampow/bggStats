import React, { useEffect } from "react";
import dayjs from "dayjs";
// import DatePicker from "react-date-picker/dist/entry.nostyle";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "../icons";
import type { FilterButtonData } from "../types";

const dateFormat = "YYYY-MM-DD";

interface Props {
  filter: FilterButtonData;
}
export default function DatePickerComponent({ filter }: Props) {
  const user = useBggUser();
  const { state, dispatch } = usePlayFilterContext();
  console.log("filter", filter);

  const [value, setValue] = React.useState([new Date(), new Date()]);

  useEffect(() => {
    console.log("value", value);
  }, [value]);

  const handleChange = (value: any) => {
    setValue(value);

    let sortedDates = [...value].sort((date1, date2) => {
      let d1 = dayjs(date1).format(dateFormat);
      let d2 = dayjs(date2).format(dateFormat);

      if (d1 > d2) return 1;
      if (d1 < d2) return -1;
      return 0;
    });

    dispatch({
      type: "upsert",
      filter: {
        order: filter.filterId,
        filter: filter.value,
        arg: sortedDates,
      },
    });
  };

  //   useEffect(
  //     function setDefaultDate() {
  //       let today = dayjs().format("YYYY-MM-DD");
  //       dispatch({
  //         type: "upsert",
  //         filter: {
  //           order: filter.filterId,
  //           filter: filter.value,
  //           arg: [today, today],
  //         },
  //       });
  //     },
  //     [dispatch, filter]
  //   );

  return (
    <div className="text-slate-700 flex items-center gap-4">
      <div className="font-semibold pl-4">{filter.label}</div>
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
        autoFocus={true}
        openCalendarOnFocus={true}
        isOpen={true}
        rangeDivider="and"
      />
    </div>
  );
}
