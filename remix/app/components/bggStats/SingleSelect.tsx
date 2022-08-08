import { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import {
  baseStyles,
  openMenuStyles,
  openButtonStyles,
  hoverStyles,
  itemHoverStyles,
} from "./styles";
import type { SelectionType } from "./types";

interface Props {
  selectedValue: SelectionType;
  onChange: (selection: SelectionType) => void;
  options: SelectionType[];
}

export default function SingleSelect({
  selectedValue,
  onChange,
  options,
}: Props) {
  return (
    <div className="relative">
      <Listbox value={selectedValue} onChange={onChange}>
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
  );
}
