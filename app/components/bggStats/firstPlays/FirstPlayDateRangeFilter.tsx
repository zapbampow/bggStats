import React, { useState } from "react";
import { baseStyles } from "~/components/bggStats/styles";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { ChevronLeft, ChevronRight, Trash } from "../icons";

const dateFormat = "YYYY-MM-DD";

type Props = {
  dateRange: Date[] | undefined[];
  setDateRange: (dateRange: Date[] | undefined[]) => void;
  showDateSelector: boolean;
  setShowDateSelector: () => void;
};

export default function FirstPlayDateRangeFilter({
  dateRange,
  setDateRange,
  showDateSelector,
  setShowDateSelector,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value: any) => {
    console.log("typeof value", typeof value);
    setDateRange(value);
  };

  const removeFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange([undefined, undefined]);
  };

  return (
    <div
      onClick={() => {
        setIsOpen(true);
        setShowDateSelector();
      }}
      className={`relative flex items-center gap-4 ${baseStyles} hover:cursor-pointer`}
    >
      <div className="font-semibold">Date{showDateSelector && ":"}</div>
      {showDateSelector ? (
        <>
          <DateRangePicker
            value={dateRange}
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
          <div onClick={removeFilter} className=" hover:text-red-500">
            <Trash width={16} />
          </div>
        </>
      ) : null}
    </div>
  );
}
