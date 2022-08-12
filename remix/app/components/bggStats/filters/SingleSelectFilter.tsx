import { useState, Fragment, useEffect, useCallback } from "react";
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
import {
  getAllPlayerNames,
  getAllUserNames,
  getAllLocations,
  getAllGameNames,
  getAllGames,
} from "~/utils/analysis/accumulations";
import { useBggUser } from "~/hooks/bgg/useBggUser";

interface Props {
  filter: FilterButtonData;
}

export default function SingleSelect({ filter }: Props) {
  const user = useBggUser();
  const { state, dispatch } = usePlayFilterContext();
  const [options, setOptions] = useState<SelectionType[]>();

  const [selection, setSelection] = useState<SelectionType>();

  const handleChange = (selection: SelectionType) => {
    setSelection(selection);

    dispatch({
      type: "upsert",
      filter: {
        order: filter.filterId,
        filter: filter.value,
        arg: selection.label,
      },
    });
  };

  const getOptions = useCallback(
    async (filter: FilterButtonData) => {
      try {
        const { value } = filter;
        let options;

        switch (value) {
          case "gameName":
            options = await getAllGames(user?.userId || 0);
            break;
          default:
            break;
        }

        console.log("options", options);
        setOptions(options);
      } catch (err) {
        console.log(err);
      }
    },
    [user?.userId]
  );

  useEffect(() => {
    if (!filter) return;
    // get options based on filter.value
    // console.log("filter.value", filter.value);
    getOptions(filter);
  }, [filter, getOptions]);

  return (
    <div className="relative">
      <Listbox value={selection?.value} onChange={handleChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`${baseStyles} relative font-semibold transition duration-700  ${
                open ? openButtonStyles : "border-transparent"
              }  
                ${hoverStyles}
                `}
            >
              {selection ? `of ${selection.label}` : filter.label}
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
