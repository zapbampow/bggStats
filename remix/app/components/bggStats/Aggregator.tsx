import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";

const options = [
  { value: "count", label: "How many" },
  { value: "listPlayerNames", label: "Who" },
  { value: "listGameNames", label: "What" },
  { value: "listDates", label: "When" },
  { value: "listLocations", label: "Where" },
];
const baseStyles = "px-6 py-2 rounded-lg text-slate-700";
const openStyles = "bg-slate-500/25 shadow-lg shadow-slate-500/10 bg-blur-md";

export default function Aggregator() {
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  } | null>();

  const { setFilters } = usePlayFilterContext();

  return (
    <Listbox value={selectedValue} onChange={setSelectedValue}>
      {({ open }) => (
        <>
          <Listbox.Button
            className={`${baseStyles} font-semibold hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700  ${
              open ? openStyles : "border-transparent"
            }  hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700`}
          >
            {selectedValue?.label || "Select a question"}
          </Listbox.Button>

          <Listbox.Options
            className={`mt-1 max-w-max shadow-lg hover:shadow-slate-500/10 ${baseStyles} ${openStyles}`}
          >
            {options.map((option) => {
              return (
                <Listbox.Option key={option.value} value={option}>
                  {({ active, selected }) => (
                    <li
                      className={`${
                        selected ? "font-bold" : ""
                      } hover:cursor-pointer`}
                    >
                      {option.label}
                    </li>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
}
