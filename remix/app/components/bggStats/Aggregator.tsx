import { useState, Fragment, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import filterTree from "../../utils/filterTree";
import {
  baseStyles,
  openMenuStyles,
  openButtonStyles,
  hoverStyles,
  itemHoverStyles,
} from "./styles";
import type { SelectionType } from "./types";

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

  useEffect(() => {
    console.log("state", state);
  }, [state]);

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
      <div className="relative">
        <Listbox value={selectedValue} onChange={handleChange}>
          {({ open }) => (
            <>
              <Listbox.Button
                className={`${baseStyles} relative font-semibold transition duration-700  ${
                  open ? openButtonStyles : "border-transparent"
                }  
                ${hoverStyles}
                `}
              >
                {selectedValue?.label || "Select a question"}
              </Listbox.Button>
              <Listbox.Options
                className={`mt-1 max-w-max ${baseStyles} ${openMenuStyles}`}
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
                          } hover:cursor-pointer ${itemHoverStyles}`}
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

      {selectedValue?.value &&
      filterTree[selectedValue.value].filters.length > 0 ? (
        <div>
          <Listbox value={aggArg} onChange={handleArgChange}>
            {({ open }) => (
              <div>
                <Listbox.Button
                  className={`${baseStyles} relative font-semibold transition duration-700  ${
                    open ? openButtonStyles : "border-transparent"
                  }  
                ${hoverStyles}
                `}
                >
                  {aggArg?.label || "of what?"}
                </Listbox.Button>
                <Listbox.Options
                  className={`mt-1 max-w-max ${baseStyles} ${openMenuStyles}`}
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
                            className={`
                              hover:cursor-pointer ${itemHoverStyles} 
                              ${selected ? "font-bold" : ""} 
                            `}
                          >
                            {option.label}
                          </li>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </div>
            )}
          </Listbox>
        </div>
      ) : null}
    </>
  );
}
