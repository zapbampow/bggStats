import { useState, Fragment, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import filterTree from "../../utils/filterTree";
import { baseStyles, openStyles } from "./styles";

const options = [
  { value: "count", label: "How many" },
  { value: "listPlayerNames", label: "Who" },
  { value: "listGameNames", label: "What" },
  { value: "listDates", label: "When" },
  { value: "listLocations", label: "Where" },
];

export default function Aggregator() {
  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });

  const [aggArg, setAggArg] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });

  const { state, dispatch } = usePlayFilterContext();

  const handleChange = (selection: { label: string; value: string }) => {
    setSelectedValue(selection);

    // update how this is handling arg
    dispatch({
      type: "upsert",
      filter: { order: "aggregator", filter: selection.value, arg: null },
    });
  };

  const handleArgChange = (selection: { label: string; value: string }) => {
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
      <div>
        <Listbox value={selectedValue} onChange={handleChange}>
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
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      as={Fragment}
                    >
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
      </div>

      {selectedValue?.value ? (
        <div>
          <Listbox value={aggArg} onChange={handleArgChange}>
            {({ open }) => (
              <>
                <Listbox.Button
                  className={`${baseStyles} font-semibold hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700  ${
                    open ? openStyles : "border-transparent"
                  }  hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700`}
                >
                  {aggArg?.label || "of what?"}
                </Listbox.Button>
                <Listbox.Options
                  className={`mt-1 max-w-max shadow-lg hover:shadow-slate-500/10 ${baseStyles} ${openStyles}`}
                >
                  {filterTree[selectedValue.value].filters.map((option) => {
                    return (
                      <Listbox.Option
                        key={option.value}
                        value={option}
                        as={Fragment}
                      >
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
        </div>
      ) : null}
    </>
  );
}
