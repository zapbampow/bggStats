import { useState, Fragment, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import filterTree from "../../utils/filterTree";
import {
  baseStyles,
  openButtonStyles,
  openMenuStyles,
  hoverStyles,
} from "./styles";
import type { SelectionType } from "./types";

/**
 * Look at the aggregator in context
 * Get the filter tree for that aggregator
 * Get the options for that filter tree
 * Make them options in the listbox
 * On selection, add a button to context or pass a prop in here from username.plays.tsx that adds it there
 *
 * NOTES: You just refactored filterTree so that you can get the options for the filter tree
 * You need to probably create some components to handle some of the options
 * - a generic single select component
 * - a generic multi select component
 * - a generic combobox
 * - a generic multi select combobox
 * - a single date picker component for most date filters
 * - a multi date picker component for filtering between dates
 * You also need to handle the 'all time' option for the date filters by not adding it to context state
 *
 * Additionally, you probably need to create an object that connects individual filters to the selection components they are associated with
 */

type Props = {
  addFilterButton: () => void;
  display: boolean;
};

export default function AddFilterButton({ addFilterButton, display }: Props) {
  const { state, dispatch } = usePlayFilterContext();

  const [selectedValue, setSelectedValue] = useState<SelectionType>({
    label: "",
    value: "",
  });

  const [options, setOptions] = useState<SelectionType[]>([]);

  const handleChange = (selection: SelectionType) => {
    setSelectedValue(selection);

    addFilterButton(selection);
    // connect selection to filterTree
    // add component based on filter
    // use component to add filter to context
  };

  useEffect(() => {
    const aggregator = state.find((f) => f.order === "aggregator");
    // console.log("aggregator", aggregator?.filter);
    if (aggregator?.filter) {
      const tree = filterTree[aggregator.filter];
      const { filters, ...filterOptions } = tree;
      // console.log("filters", filters);
      const filtersArray = convertFiltersToArray(filterOptions);

      setOptions(filtersArray);
    }
  }, [state]);

  // useEffect(() => {
  //   console.log(options);
  // }, [options]);

  return (
    <div className={`${display ? "" : "hidden"}`}>
      <Listbox value={selectedValue} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`${baseStyles} font-semibold hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700  ${
                open ? openButtonStyles : "border-transparent"
              }  hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700`}
            >
              +
            </Listbox.Button>
            <Listbox.Options
              className={`mt-1 max-w-max shadow-lg hover:shadow-slate-500/10 ${baseStyles} ${openMenuStyles}`}
            >
              {options.map((option, i) => {
                if (option.value === "heading") {
                  return (
                    <div
                      key={`option.label-${i}`}
                      className={`uppercase text-slate-500 text-xs font-semibold ${
                        i !== 0 ? "mt-2" : ""
                      }`}
                    >
                      {option.label}
                    </div>
                  );
                } else {
                  return (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          className={`px-2 ${
                            selected ? "font-bold" : ""
                          } hover:cursor-pointer`}
                        >
                          {option.label}
                        </li>
                      )}
                    </Listbox.Option>
                  );
                }
              })}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
}

const convertFiltersToArray = (filters: any) => {
  // console.log("filters", filters);
  return Object.entries(filters)
    .map((filterGroup) => {
      const heading = { value: "heading", label: filterGroup[0] };
      const options = [...filterGroup[1]];
      // console.log("filterGroup[1]", filterGroup[1]);
      return [heading, ...options];
    })
    .reduce((acc, cur) => {
      return [...acc, ...cur];
    }, []);
};
