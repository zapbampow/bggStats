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
import useDebounce from "~/hooks/useDebounce";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import { useIsMobile } from "~/hooks/useIsMobile";
import { useWindowSize } from "~/hooks/useWindowSize";

type Props = {
  filter: FilterType;
};

export default function ComboBoxFilterMultiple({ filter }: Props) {
  const { dispatch, removeFilter } = usePlayFilterContext();
  const { state } = usePlayResultsContext();
  const { user } = useBggUser();
  let inputRef = useRef<HTMLInputElement | null>(null);
  let btnRef = useRef<HTMLButtonElement>(null);
  let filterBtnRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [selections, setSelections] = useState<SelectionType[]>([]); // selected options
  const [allOptions, setAllOptions] = useState<SelectionType[]>([]);

  const [options, setOptions] = useState<SelectionType[]>([]); // list of options
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectionText, setSelectionText] = useState("");

  const labelSelectionText = `${filter.label}: ${selectionText}`;

  const getButtonText = () => {
    if (isMobile) {
      let { width } = useWindowSize();
      let ch = width / 10;

      if (labelSelectionText.length < ch) {
        return labelSelectionText;
      } else {
        return `${labelSelectionText.slice(0, ch - 5)}...`;
      }
    }

    return labelSelectionText.length > 40
      ? `${labelSelectionText.slice(0, 40)}...`
      : labelSelectionText;
  };

  const buttonText = getButtonText();

  const debouncedQuery = useDebounce(query, 350);

  useEffect(
    function updateSelectionText() {
      const text = getSelectionText(selections);
      setSelectionText(text);
    },
    [selections]
  );

  const filteredOptions =
    debouncedQuery === ""
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
    // console.log("handleChange", selections);
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

  const getInitialOptions = useCallback(() => {
    if (!user || allOptions.length) return;

    try {
      const options = getOptions({ filteredPlays: state, filter, user });
      if (options) {
        setAllOptions(options);
        setOptions(options);
      }
    } catch (err) {
      console.log(err);
    }
  }, [user, filter, allOptions, state]);

  useEffect(
    function setupOptions() {
      if (!filter) return;
      getInitialOptions();
    },
    [filter, getInitialOptions]
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

  const onClose = (open: boolean) => {
    if (open) return;

    if (!selections.length) {
      setOptions(allOptions);
      return;
    }
    const sorted = allOptions.sort((a, b) => {
      let aSelected = selections.some((item) => a.value === item.value);
      let bSelected = selections.some((item) => b.value === item.value);

      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });

    setOptions(sorted);
  };

  return (
    <div className={`relative ${comboContainerStyles} hover:cursor-pointer`}>
      {!isMobile && (
        <Measurer
          value={buttonText}
          visible={visible}
          setVisible={setVisible}
          impactedRef={filterBtnRef}
          addedWidth={selectionText ? 40 : 2}
        />
      )}
      <div
        ref={filterBtnRef}
        className="flex w-full items-center justify-between gap-4 overflow-hidden whitespace-nowrap text-left font-semibold transition-all sm:max-w-sm"
        onClick={clickButton}
      >
        {buttonText}
        {selectionText ? (
          <button
            className="text-slate-400 hover:text-red-500"
            onClick={() => removeFilter(filter)}
          >
            <Trash width={16} />
          </button>
        ) : null}
      </div>
      <Combobox value={selections} onChange={handleChange} multiple={true}>
        {({ open }) => (
          <div className={`${!open ? "hidden" : ""} flex flex-col md:flex-row`}>
            <ReorderOnClose open={open} onClose={() => onClose(open)} />
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
                    className={`flex-1 bg-transparent font-semibold transition transition-all duration-500 ease-in-out placeholder:font-normal focus:outline-0`}
                    placeholder="search"
                  />
                  <Combobox.Button ref={btnRef} className="display-none">
                    <Search />
                  </Combobox.Button>
                </div>
                <Combobox.Options
                  className={`max-h-72 overflow-y-auto py-2 `}
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
                          className={`flex items-center gap-1 ${baseSelectItem} ${itemHoverStyles} ${
                            selected ? "font-semibold" : ""
                          } ${active ? comboActiveItem : ""}
                        `}
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

  // if (selectionString.length > 20) {
  //   return `${selectionString.slice(0, 20)}...`;
  // }

  return selectionString;
};

type OnCloseProps = {
  open: boolean;
  onClose: () => void;
};
const ReorderOnClose = ({ open, onClose }: OnCloseProps) => {
  useEffect(() => {
    if (open) return;
    onClose();
  }, [open, onClose]);

  return <></>;
};
