import { useState, Fragment, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import filterTree from "../../utils/filterTree";
import { baseStyles, openStyles } from "./styles";

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
 * - a single date picker component for most date filters
 * - a multi date picker component for filtering between dates
 * You also need to handle the 'all time' option for the date filters by not adding it to context state
 */

type Props = {
  addFilterButton: () => void;
};

export default function AddFilterButton({ addFilterButton }: Props) {
  const { state, dispatch } = usePlayFilterContext();

  const [selectedValue, setSelectedValue] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });

  const [options, setOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const handleChange = () => {
    console.log("selection", selectedValue);
  };

  useEffect(() => {
    const aggregator = state.find((f) => f.order === "aggregator");
    console.log("aggregator", aggregator?.filter);
    if (aggregator?.filter) {
      const tree = filterTree[aggregator.filter];
      console.log("tree", tree);
      const { filters, ...filterOptions } = tree;
      console.log("filterOptions", filterOptions);
      // const tree = filterTree[aggregator.filter];
    }
  }, [state]);

  return (
    <div>
      <Listbox value={selectedValue} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`${baseStyles} font-semibold hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700  ${
                open ? openStyles : "border-transparent"
              }  hover:bg-slate-500/25 hover:shadow-lg hover:shadow-slate-500/10 transition duration-700`}
            >
              +
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
  );
}
