import { useState, Fragment, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import {
  baseStyles,
  openMenuStyles,
  openButtonStyles,
  hoverStyles,
  itemHoverStyles,
} from "~/components/bggStats/styles";
import type {
  SelectionType,
  FilterButtonData,
} from "~/components/bggStats/types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";

interface Props {
  filterType: FilterButtonData;
}

export default function SingleSelect({ filterType }: Props) {
  const { state, dispatch } = usePlayFilterContext();
  const [options, setOptions] = useState<SelectionType[]>();

  const [selectedValue, setSelectedValue] = useState<SelectionType>({
    label: "",
    value: "",
  });

  const handleChange = (selection: SelectionType) => {
    setSelectedValue(selection);

    // update how this is handling arg
    dispatch({
      type: "upsert",
      filter: {
        order: filterType.filterId,
        filter: filterType.value,
        arg: selection.value,
      },
    });
  };

  useEffect(() => {
    // get options based on filterType.value
  }, []);

  return (
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
              {options?.map((option) => {
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
  );
}
