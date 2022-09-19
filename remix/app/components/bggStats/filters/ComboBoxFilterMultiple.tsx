import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import type { SelectionType } from "../types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import { Selector, Check } from "~/components/bggStats/icons";
import {
  hoverStyles,
  itemHoverStyles,
  openComboboxMenuStyles,
  comboActiveItem,
  baseSelectItem,
  comboContainerStyles,
  containerBase,
} from "~/components/bggStats/styles";
import getOptions from "./getOptions";
import type { FilterType } from "~/services/queryService/types";
import ClearFilter from "./ClearFilter";
import RemoveFilter from "./RemoveFilter";

type Props = {
  filter: FilterType;
};

export default function ComboBoxFilterMultiple({ filter }: Props) {
  const { dispatch } = usePlayFilterContext();
  const user = useBggUser();
  let inputRef = useRef<HTMLInputElement | null>(null);
  let btnRef = useRef<HTMLButtonElement>(null);

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
        order: filter.order,
        filter: filter.filter,
        label: filter.label,
        arg: selections.map((selection) => selection.label),
      },
    });
  };

  const getSetOptions = useCallback(async () => {
    if (!user || options.length > 0) return;

    try {
      const options = await getOptions({ filter, user });
      if (options) {
        setOptions(options);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user, filter, options]);

  useEffect(
    function SetupOptions() {
      if (!filter) return;
      getSetOptions();
    },
    [filter, getSetOptions]
  );

  const clickButton = () => {
    if (!btnRef?.current?.click) return;

    btnRef.current.click();
  };

  useEffect(() => {
    clickButton();
  }, []);

  const handleClear = () => {
    setSelections([{ value: "", label: "" }]);
  };

  return (
    <div
      className={`relative flex flex-col md:flex-row md:items-center  gap-4 ${comboContainerStyles} hover:cursor-pointer`}
      onClick={clickButton}
    >
      <div className="font-semibold">{filter.label}</div>
      <Combobox value={selections} onChange={handleChange} multiple={true}>
        {({ open }) => (
          <div className="flex flex-col md:flex-row">
            {selections.length > 0 && !open && (
              <Combobox.Button className="font-semibold text-left">
                {selections.map((selection) => selection.label).join(", ")}
              </Combobox.Button>
            )}
            <div>
              <div className={`${hoverStyles} relative md:static`}>
                <Combobox.Input
                  ref={inputRef}
                  onChange={(e: React.FormEvent<HTMLInputElement>) => {
                    setQuery(e.currentTarget.value);
                  }}
                  className={`bg-transparent font-semibold transition transition-all ease-in-out duration-500 focus:outline-0 border-b border-slate-500
                  `}
                />
                <Combobox.Button
                  ref={btnRef}
                  className="absolute inset-y-0 right-0 flex items-center"
                >
                  <Selector />
                </Combobox.Button>
              </div>
              <div
                className={`${containerBase} ${openComboboxMenuStyles} divide-y divide-slate-500`}
              >
                <Combobox.Options
                  className={` max-h-72 overflow-y-auto px-4 py-2 `}
                  hold={true}
                >
                  {filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.value}
                      value={option}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          className={`flex items-center gap-2 ${baseSelectItem} ${itemHoverStyles} ${
                            selected ? "font-bold" : ""
                          } ${active ? comboActiveItem : ""}
                        `}
                        >
                          {selected ? (
                            <Check width={16} className="text-green-500" />
                          ) : (
                            <div style={{ width: "16px" }} />
                          )}
                          <span className={`inline-block `}>
                            {option.label}
                          </span>
                        </li>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
                <div
                  className={`flex justify-between gap-auto p-2 ${
                    !open ? "hidden" : ""
                  }`}
                >
                  <ClearFilter filter={filter} onClick={handleClear} />
                  <RemoveFilter filter={filter} />
                </div>
              </div>
            </div>
          </div>
        )}
      </Combobox>
    </div>
  );
}
