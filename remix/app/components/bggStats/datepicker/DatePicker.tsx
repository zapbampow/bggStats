import React from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import CheckIcon from "../icons/Check";

export default function DatePickerComponent() {
  const [value, onChange] = React.useState(new Date());

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      calendarIcon={null}
      clearIcon={null}
      showLeadingZeros={true}
      locale="en-US"
      next2Label={<CheckIcon />}
    />
  );
}
