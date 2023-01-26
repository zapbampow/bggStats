import React, { useState, Fragment, useEffect } from "react";
import type { FirstRecordRow } from "~/utils/conversion/getFirstPlayDateFromPlays";
import {
  comboContainerStyles,
  containerBase,
  hoverStyles,
  itemHoverStyles,
  openComboboxMenuStyles,
  baseSelectItem,
  comboActiveItem,
} from "../styles";
import Measurer from "../Measurer";
import { Combobox } from "@headlessui/react";
import type { SelectionType } from "../types";
import { Search, Check, Trash, Times } from "../icons";
import useDebounce from "~/hooks/useDebounce";

type Props = {
  plays: FirstRecordRow[];
  setFilteredPlays: (plays: FirstRecordRow[]) => void;
};

export default function FirstPlayGameNameFilter({
  plays,
  setFilteredPlays,
}: Props) {
  const [selection, setSelection] = useState<string>("");
  const [query, setQuery] = useState("");
  const [selectionText, setSelectionText] = useState("");
  const [visible, setVisible] = useState(false);
  const filterBtnRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const debouncedQuery = useDebounce(query, 350);

  useEffect(() => {
    console.log("selection", selection);
  }, [selection]);

  const handleChange = (gameName: string) => {
    setSelection(gameName);
    setSelectionText(getSelectionText(gameName));

    if (!selection) return;
  };

  const filteredPlays =
    debouncedQuery === ""
      ? plays
      : plays?.filter((play: FirstRecordRow) => {
          return play.gameName.toLowerCase().includes(query.toLowerCase());
        });

  const clickButton = () => {
    if (!btnRef?.current?.click) return;
    btnRef.current.click();
  };

  const clearSelection = () => {
    setSelection("");
    setSelectionText("");
  };

  // TODO: don't remove filter. we aren't using filters
  // TODO: handle button click
  // TODO: handle change

  return (
    <div
      className={`relative flex items-center ${comboContainerStyles} hover:cursor-pointer`}
    >
      <Measurer
        value={`Game: ${selectionText}`}
        visible={visible}
        setVisible={setVisible}
        impactedRef={filterBtnRef}
        addedWidth={selection ? 30 : 2}
      />
      <div
        ref={filterBtnRef}
        className="flex items-center w-full gap-4 overflow-hidden font-semibold text-left transition-all whitespace-nowrap sm:max-w-sm"
        onClick={clickButton}
      >
        Game: {selectionText}
        {selection ? (
          <button
            className="text-slate-400 hover:text-red-500"
            onClick={clearSelection}
          >
            <Times width={16} />
          </button>
        ) : null}
      </div>
      <div className="grid auto-rows-min">
        <Combobox value={selection} onChange={handleChange} nullable>
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
                    value={query}
                    autoFocus
                    placeholder="search"
                    className={`flex-1 px-2 bg-transparent font-semibold transition transition-all ease-in-out duration-500 ${hoverStyles} focus:outline-0`}
                  />
                  <Search className="cursor-default text-slate-500" />
                  <Combobox.Button
                    ref={btnRef}
                    className="display-none"
                  ></Combobox.Button>
                </div>
                <Combobox.Options
                  id="game-combobox-options"
                  className={`max-h-72 overflow-y-auto py-2`}
                  static={true}
                >
                  {filteredPlays?.map((play) => {
                    return (
                      <Combobox.Option
                        key={play.gameId}
                        value={play.gameName}
                        as={Fragment}
                      >
                        {({ active, selected }) => {
                          return (
                            <li
                              onClick={() => {
                                setQuery("");
                              }}
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
                              <span className={`flex-1`}>{play.gameName}</span>
                            </li>
                          );
                        }}
                      </Combobox.Option>
                    );
                  })}
                </Combobox.Options>
                {/* <div
                  className={`flex justify-between gap-4 p-2 ${
                    !open ? "hidden" : ""
                  }`}
                >
                  <ClearFilter filter={filter} onClick={handleClear} />
                  <RemoveFilter filter={filter} />
                </div> */}
              </div>
            </div>
          )}
        </Combobox>
      </div>
    </div>
  );
}

const getSelectionText = (gameName: string | undefined) => {
  if (!gameName) return "";

  if (gameName.length > 20) {
    return `${gameName.slice(0, 20)}...`;
  }

  return gameName;
};
