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
import { Search, Trash } from "../icons";

type Props = {
  filter: FilterType;
};
export default function ComboBoxFilter({ filter }: Props) {
  const { dispatch, removeFilter } = usePlayFilterContext();
  const user = useBggUser();
  let comboboxId = `combobox-${filter.order}`;
  let inputRef = useRef<HTMLInputElement | null>(null);
  let btnRef = useRef<HTMLButtonElement>(null);
  let filterBtnRef = useRef<HTMLDivElement>(null);

  const [options, setOptions] = useState<SelectionType[]>([]);
  const [selection, setSelection] = useState<SelectionType | undefined>();
  const [query, setQuery] = useState("");
  const [selectionText, setSelectionText] = useState("");

  useEffect(() => {
    setSelectionText(getSelectionText(selection));
  }, [selection]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    btnRef?.current?.click();
  }, []);

  const filteredOptions =
    query === ""
      ? options
      : options?.filter((option: SelectionType) => {
          return option.label.toLowerCase().includes(query.toLowerCase());
        });

  const handleChange = (selection: string) => {
    let selectionObject = options.find((option) => option.value === selection);
    setSelection(selectionObject);

    if (!selectionObject) return;
    dispatch({
      type: "upsert",
      filter: {
        order: filter.order,
        filter: filter.filter,
        label: filter.label,
        arg: selectionObject.label,
      },
    });
  };

  const getSetOptions = useCallback(async () => {
    if (!user) return;

    try {
      const options = await getOptions({ filter, user });
      if (options) {
        setOptions(options);
      }
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
    if (!btnRef?.current?.click) return;

    btnRef.current.click();
  };

  const handleClear = () => {
    setSelection({ value: "", label: "" });
  };

  return (
    <div
      className={`relative flex items-center ${comboContainerStyles} hover:cursor-pointer`}
      onClick={clickButton}
    >
      <Measurer
        value={`${filter.label} ${selectionText}`}
        visible={visible}
        setVisible={setVisible}
        impactedRef={filterBtnRef}
        addedWidth={selectionText ? 40 : 0}
      />
      <div
        ref={filterBtnRef}
        className="flex items-center gap-4 whitespace-nowrap transition-all font-semibold overflow-hidden w-full text-left sm:max-w-sm"
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
                      console.log("click");
                    }}
                    autoFocus
                    placeholder="search"
                    className={`flex-1 px-2 bg-transparent font-semibold transition transition-all ease-in-out duration-500 ${hoverStyles} focus:outline-0`}
                  />
                  <Search className="text-slate-500 cursor-default" />
                  <Combobox.Button
                    ref={btnRef}
                    className="display-none"
                  ></Combobox.Button>
                </div>
                <Combobox.Options
                  id={comboboxId}
                  className={`max-h-72 overflow-y-auto px-4 py-2 `}
                  static={true}
                >
                  {filteredOptions?.map((option) => {
                    return (
                      <Combobox.Option
                        key={option.value}
                        value={option.value}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`${baseSelectItem} ${itemHoverStyles} ${
                              selected ? "font-bold" : ""
                            } ${active ? comboActiveItem : ""}
            
                      `}
                          >
                            <span className={`inline-block `}>
                              {option.label}
                            </span>
                          </li>
                        )}
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

const getSelectionText = (selection: SelectionType | undefined) => {
  if (!selection) return "";

  if (selection.label.length > 20) {
    return `${selection.label.slice(0, 20)}...`;
  }

  return selection.label;
};
