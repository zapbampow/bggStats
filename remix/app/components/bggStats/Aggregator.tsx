import { useState, useEffect } from "react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import filterTree from "../../utils/filterTree";

import type { SelectionType } from "./types";
import SingleSelect from "./SingleSelect";

const options = [
  { value: "count", label: "How many" },
  { value: "listPlayerNames", label: "With whom did I play games" },
  { value: "listGameNames", label: "What games did I play" },
  { value: "listDates", label: "When did I play games" },
  { value: "listLocations", label: "Where did I play games" },
];

export default function Aggregator() {
  const [selectedValue, setSelectedValue] = useState<SelectionType>({
    label: "",
    value: "",
  });

  const [aggArg, setAggArg] = useState<SelectionType>({ label: "", value: "" });

  const { state, dispatch } = usePlayFilterContext();

  // useEffect(() => {
  //   console.log("state", state);
  // }, [state]);

  const handleChange = (selection: SelectionType) => {
    setSelectedValue(selection);

    // update how this is handling arg
    dispatch({
      type: "upsert",
      filter: { order: "aggregator", filter: selection.value, arg: null },
    });
  };

  const handleArgChange = (selection: SelectionType) => {
    setAggArg(selection);

    dispatch({
      type: "upsert",
      filter: {
        order: "aggregator",
        filter: selectedValue.value,
        arg: selection.value,
      },
    });
  };

  return (
    <>
      {/* Main Selector */}
      <SingleSelect
        options={options}
        selectedValue={selectedValue}
        onChange={handleChange}
        selectName="Begin your question"
      />

      {/* Options of the main selector, if there are any. Only needed for "how many" */}
      {selectedValue?.value &&
      filterTree[selectedValue.value].filters.length > 0 ? (
        <SingleSelect
          options={filterTree[selectedValue.value].filters}
          selectedValue={aggArg}
          onChange={handleArgChange}
          selectName="of what?"
        />
      ) : null}
    </>
  );
}
