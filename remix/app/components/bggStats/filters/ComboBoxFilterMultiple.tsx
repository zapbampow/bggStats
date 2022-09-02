import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import CheckIcon from "../icons/Check";
import { FilterButtonData, SelectionType } from "../types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import SelectorIcon from "~/components/bggStats/icons/Selector";
import {
  baseStyles,
  openMenuStyles,
  openButtonStyles,
  hoverStyles,
  itemHoverStyles,
  openComboboxMenuStyles,
  comboActiveItem,
  baseSelectItem,
  comboContainerStyles,
} from "~/components/bggStats/styles";
import getOptions from "./getOptions";

// const options: SelectionType[] = [
//   { value: "1", label: "Durward Reynolds" },
//   { value: "2", label: "Kenton Towne" },
//   { value: "3", label: "Therese Wunsch" },
//   { value: "4", label: "Benedict Kessler" },
//   { value: "5", label: "Katelyn Rohan" },
// ];

type Props = {
  filter: FilterButtonData;
};

export default function ComboBoxFilterMultiple({ filter }: Props) {
  const { state, dispatch } = usePlayFilterContext();
  const user = useBggUser();
  let comboboxId = `combobox-${filter.filterId}`;
  let inputRef = useRef();
  let btnRef = useRef();

  const [selections, setSelections] = useState<SelectionType[]>([]);
  const [options, setOptions] = useState<SelectionType[]>([]);
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options?.filter((option: SelectionType) => {
          let matchesQuery = option.label
            .toLowerCase()
            .includes(query.toLowerCase());
          let isSelected = selections.find(
            (selection) => selection.value === option.value
          );

          return matchesQuery || isSelected;
        });

  const handleChange = (selections: SelectionType[]) => {
    setSelections(selections);

    dispatch({
      type: "upsert",
      filter: {
        order: filter.filterId,
        filter: filter.value,
        arg: selections.map((selection) => selection.label),
      },
    });
  };

  const getSetOptions = useCallback(async () => {
    if (!user) return;

    try {
      const options = await getOptions({ filter, user });
      setOptions(options);
    } catch (err) {
      console.log(err);
    }
  }, [user, filter]);

  useEffect(
    function SetupOptions() {
      if (!filter) return;
      getSetOptions();
    },
    [filter, getSetOptions]
  );

  const clickButton = () => {
    if (!btnRef?.current.click) return;

    btnRef.current.click();
  };

  return (
    <div
      className={`flex items-center gap-4 ${comboContainerStyles} hover:cursor-pointer`}
      onClick={clickButton}
    >
      <div className="font-semibold">{filter.label}</div>
      <Combobox value={selections} onChange={handleChange} multiple>
        {({ open }) => (
          <>
            {!open && selections.length > 0 ? (
              <Combobox.Button className="font-semibold">
                {selections.map((selection) => selection.label).join(", ")}
              </Combobox.Button>
            ) : (
              <div className="relative">
                <div
                  className={`transition transition-all ease-in-out duration-500 ${hoverStyles}`}
                >
                  <Combobox.Input
                    ref={inputRef}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setQuery(e.currentTarget.value);
                    }}
                    className={`px-2 py-2 bg-transparent font-semibold transition transition-all ease-in-out duration-500 ${hoverStyles} focus:outline-0`}
                  />
                  <Combobox.Button
                    ref={btnRef}
                    className="absolute inset-y-0 right-0 flex items-center"
                  >
                    <SelectorIcon />
                  </Combobox.Button>
                </div>
                <Combobox.Options
                  id={comboboxId}
                  className={`${baseStyles} ${openComboboxMenuStyles} `}
                >
                  {filteredOptions.map((options) => (
                    <Combobox.Option
                      key={options.value}
                      value={options}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          className={`${baseSelectItem} ${itemHoverStyles} ${
                            selected ? "font-bold" : ""
                          } ${active ? comboActiveItem : ""}
                      `}
                        >
                          {selected && <CheckIcon className="text-green-500" />}
                          <span className={`inline-block `}>
                            {options.label}
                          </span>
                        </li>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </div>
            )}
          </>
        )}
      </Combobox>
    </div>
  );
}
