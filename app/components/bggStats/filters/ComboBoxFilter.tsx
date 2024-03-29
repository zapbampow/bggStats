import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Combobox } from "@headlessui/react";
import {
  hoverStyles,
  itemHoverStyles,
  openComboboxMenuStyles,
  comboActiveItem,
  comboContainerStyles,
  baseSelectItem,
  containerBase,
} from "~/components/bggStats/styles";
import type { SelectionType } from "~/components/bggStats/types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import getOptions from "./getOptions";
import Measurer from "~/components/bggStats/Measurer";
import type { FilterType } from "~/services/queryService/types";
import RemoveFilter from "./RemoveFilter";
import ClearFilter from "./ClearFilter";
import { Check, Search, Trash } from "../icons";
import useDebounce from "~/hooks/useDebounce";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import { useIsMobile } from "~/hooks/useIsMobile";
import { useWindowSize } from "~/hooks/useWindowSize";

type Props = {
  filter: FilterType;
};
export default function ComboBoxFilter({ filter }: Props) {
  const { dispatch, removeFilter } = usePlayFilterContext();
  const { state } = usePlayResultsContext();
  const { user } = useBggUser();
  let comboboxId = `combobox-${filter.order}`;
  let inputRef = useRef<HTMLInputElement | null>(null);
  let btnRef = useRef<HTMLButtonElement>(null);
  let filterBtnRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [options, setOptions] = useState<SelectionType[]>([]);
  const [selection, setSelection] = useState<SelectionType>({});
  const [query, setQuery] = useState("");
  const [selectionText, setSelectionText] = useState("");

  const debouncedQuery = useDebounce(query, 350);

  const [visible, setVisible] = useState(false);

  const filteredOptions =
    debouncedQuery === ""
      ? options
      : options?.filter((option: SelectionType) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  let { width } = useWindowSize();

  const getSelectionText = (selection: SelectionType | undefined) => {
    if (!selection) return "";

    if (isMobile) {
      let ch = width / 11;

      if (selection.label.length < ch) {
        return selection.label;
      } else {
        return `${selection.label.slice(0, ch - 5)}...`;
      }
    }

    if (selection.label.length > 20) {
      return `${selection.label.slice(0, 20)}...`;
    }

    return selection.label;
  };

  const handleChange = (selection: SelectionType) => {
    setSelection(selection);
    setSelectionText(getSelectionText(selection));

    if (!selection) return;
    dispatch({
      type: "upsert",
      filter: {
        order: filter.order,
        filter: filter.filter,
        label: filter.label,
        arg: selection.label,
      },
    });
  };

  const setInitialSelection = useCallback(
    (options: SelectionType[], filter) => {
      if (!filter.arg || !options.length) return;

      let selectionObject = options.find(
        (option) => option.label === filter.arg
      );
      setSelection(selectionObject);
      setSelectionText(getSelectionText(selectionObject));
    },
    []
  );

  const getSetOptions = useCallback(() => {
    if (!user) return;

    try {
      const options = getOptions({ filteredPlays: state, filter, user });
      if (options) {
        setOptions(options);
        setInitialSelection(options, filter);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user, filter, setInitialSelection, state]);

  useEffect(
    function openOptionsOnFirstRender() {
      // don't open if there's a filter arg passed from the dashboard charts
      if (filter.arg) return;
      btnRef?.current?.click();
    },
    [filter.arg]
  );

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

  const handleClear = () => {
    setSelection({ value: "", label: "" });
    setSelectionText("");
  };

  return (
    <div
      className={`relative flex items-center ${comboContainerStyles} hover:cursor-pointer`}
    >
      {!isMobile && (
        <Measurer
          value={`${filter.label}: ${selectionText}`}
          visible={visible}
          setVisible={setVisible}
          impactedRef={filterBtnRef}
          addedWidth={selectionText ? 40 : 0}
        />
      )}

      <div
        ref={filterBtnRef}
        className="flex w-full items-center justify-between gap-4 overflow-hidden whitespace-nowrap text-left font-semibold transition-all sm:max-w-sm"
        onClick={clickButton}
      >
        <span>
          {filter.label}: {selectionText}
        </span>
        {selectionText ? (
          <button
            className="text-slate-400 hover:text-red-500"
            onClick={() => removeFilter(filter)}
          >
            <Trash width={16} />
          </button>
        ) : null}
      </div>
      <div className="grid auto-rows-min">
        <Combobox value={selection} onChange={handleChange} nullable={true}>
          {({ open }) => (
            <div className={`${!open ? "hidden" : ""}`}>
              <div
                className={`${containerBase} ${openComboboxMenuStyles} divide-y divide-slate-500`}
              >
                <div
                  className={`flex px-4 py-2  ${hoverStyles} relative md:static`}
                >
                  <Combobox.Input
                    ref={inputRef}
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setQuery(e.currentTarget.value)
                    }
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    autoFocus
                    placeholder="search"
                    className={`flex-1 bg-transparent px-2 font-semibold transition transition-all duration-500 ease-in-out ${hoverStyles} focus:outline-0`}
                  />
                  <Search className="cursor-default text-slate-500" />
                  <Combobox.Button
                    ref={btnRef}
                    className="display-none"
                  ></Combobox.Button>
                </div>
                <Combobox.Options
                  id={comboboxId}
                  className={`max-h-72 overflow-y-auto py-2`}
                  static={true}
                >
                  {filteredOptions?.map((option) => {
                    return (
                      <Combobox.Option
                        key={option.value}
                        value={option}
                        as={Fragment}
                      >
                        {({ active, selected }) => {
                          return (
                            <li
                              className={`flex items-center gap-1  ${baseSelectItem} ${itemHoverStyles} ${
                                selected ? "font-bold" : ""
                              } ${active ? comboActiveItem : ""}`}
                            >
                              {selected ? (
                                <div className="w-4">
                                  <Check
                                    width={16}
                                    strokeWidth={3}
                                    className="text-green-500"
                                  />
                                </div>
                              ) : (
                                <div className="w-4" />
                              )}
                              <span className={`flex-1`}>{option.label}</span>
                            </li>
                          );
                        }}
                      </Combobox.Option>
                    );
                  })}
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
          )}
        </Combobox>
      </div>
    </div>
  );
}
