import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import { Combobox } from "@headlessui/react";
import {
  baseStyles,
  openMenuStyles,
  openButtonStyles,
  hoverStyles,
  itemHoverStyles,
  openComboboxMenuStyles,
  comboActiveItem,
  comboContainerStyles,
  baseSelectItem,
} from "~/components/bggStats/styles";
import type {
  SelectionType,
  FilterButtonData,
} from "~/components/bggStats/types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import getOptions from "./getOptions";
import Measurer from "~/components/bggStats/Measurer";
import type { FilterType } from "~/services/queryService/types";

type Props = {
  filter: FilterType;
};
export default function ComboBoxFilter({ filter }: Props) {
  const { state, dispatch } = usePlayFilterContext();
  const user = useBggUser();
  let comboboxId = `combobox-${filter.order}`;
  let inputRef = useRef<HTMLInputElement | null>(null);
  let btnRef = useRef<HTMLButtonElement>(null);

  const [options, setOptions] = useState<SelectionType[]>([]);
  const [selection, setSelection] = useState<SelectionType>();
  const [query, setQuery] = useState("");

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

  return (
    <div
      className={`relative flex items-center gap-4 ${comboContainerStyles} hover:cursor-pointer`}
      onClick={clickButton}
    >
      <Measurer
        value={selection?.label || ""}
        visible={visible}
        setVisible={setVisible}
        impactedRef={inputRef}
      />
      <div className="font-semibold">{filter.label}</div>
      <div className="grid auto-rows-min	">
        <Combobox value={selection} onChange={handleChange}>
          <Combobox.Button ref={btnRef}></Combobox.Button>
          <Combobox.Input
            ref={inputRef}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setQuery(e.currentTarget.value)
            }
            displayValue={(option: SelectionType) => {
              return option?.label;
            }}
            autoFocus
            // placeholder={filter.label}
            className={`px-2 bg-transparent font-semibold transition transition-all ease-in-out duration-500 ${hoverStyles} focus:outline-0`}
          />
          <Combobox.Options
            id={comboboxId}
            className={`${baseStyles} ${openComboboxMenuStyles}`}
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
                      <span className={`inline-block `}>{option.label}</span>
                    </li>
                  )}
                </Combobox.Option>
              );
            })}
          </Combobox.Options>
        </Combobox>
      </div>
    </div>
  );
}
