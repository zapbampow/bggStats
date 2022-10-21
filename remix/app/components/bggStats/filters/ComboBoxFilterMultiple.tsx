import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import type { SelectionType } from "../types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import { Selector, Check, Search, Trash } from "~/components/bggStats/icons";
import {
  hoverStyles,
  itemHoverStyles,
  comboActiveItem,
  baseSelectItem,
  comboContainerStyles,
  containerBase,
  openMultiComboboxMenuStyles,
} from "~/components/bggStats/styles";
import getOptions from "./getOptions";
import type { FilterType } from "~/services/queryService/types";
import ClearFilter from "./ClearFilter";
import RemoveFilter from "./RemoveFilter";
import Measurer from "~/components/bggStats/Measurer";

type Props = {
  filter: FilterType;
};

export default function ComboBoxFilterMultiple({ filter }: Props) {
  const { dispatch, removeFilter } = usePlayFilterContext();
  const user = useBggUser();
  let inputRef = useRef<HTMLInputElement | null>(null);
  let btnRef = useRef<HTMLButtonElement>(null);
  let filterBtnRef = useRef<HTMLDivElement>(null);

  const [selections, setSelections] = useState<SelectionType[]>([]);
  const [options, setOptions] = useState<SelectionType[]>([]);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectionText, setSelectionText] = useState("");

  useEffect(
    function updateSelectionText() {
      const text = getSelectionText(selections);
      setSelectionText(text);
    },
    [selections]
  );

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
    function setupOptions() {
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
    <div className={`relative ${comboContainerStyles} hover:cursor-pointer`}>
      <Measurer
        value={`${filter.label} ${selectionText}`}
        visible={visible}
        setVisible={setVisible}
        impactedRef={filterBtnRef}
        addedWidth={selectionText ? 40 : 2}
      />
      <div
        ref={filterBtnRef}
        className="flex items-center gap-4 whitespace-nowrap transition-all font-semibold overflow-hidden w-full text-left sm:max-w-sm"
        onClick={clickButton}
      >
        {filter.label} {selectionText}
        {selectionText ? (
          <button
            className="text-slate-400 hover:text-red-500"
            onClick={() => removeFilter(filter)}
          >
            <Trash />
          </button>
        ) : null}
      </div>
      <Combobox value={selections} onChange={handleChange} multiple={true}>
        {({ open }) => (
          <div className={`${!open ? "hidden" : ""} flex flex-col md:flex-row`}>
            <div>
              <div
                className={`${containerBase} ${openMultiComboboxMenuStyles} divide-y divide-slate-500`}
              >
                <div
                  className={`flex px-4 py-2  ${hoverStyles} relative md:static`}
                >
                  <Combobox.Input
                    ref={inputRef}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setQuery(e.currentTarget.value);
                    }}
                    className={`flex-1 bg-transparent font-semibold transition transition-all ease-in-out duration-500 focus:outline-0 placeholder:font-normal`}
                    placeholder="search"
                  />
                  <Combobox.Button ref={btnRef} className="display-none">
                    <Search />
                  </Combobox.Button>
                </div>
                <Combobox.Options
                  className={`max-h-72 overflow-y-auto px-4 py-2 `}
                  hold={true}
                  static={true}
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
                  className={`flex justify-between gap-4 p-2 ${
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

const getSelectionText = (selections: SelectionType[]) => {
  const selectionString = selections.map((item) => item.label).join(", ");

  if (selectionString.length > 20) {
    return `${selectionString.slice(0, 20)}...`;
  }

  return selectionString;
};
