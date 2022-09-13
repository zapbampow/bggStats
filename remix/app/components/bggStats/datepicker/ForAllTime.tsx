import React, { useEffect } from "react";
import { Menu } from "@headlessui/react";
import Times from "../icons/Times";
import {
  baseStyles,
  comboContainerStyles,
  itemHoverStyles,
  openComboboxMenuStyles,
  openMenuStyles,
} from "../styles";
import type { FilterButtonData } from "../types";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import type { FilterType } from "~/services/queryService/types";

interface Props {
  filter: FilterType;
  // removeButtonById: (id: number) => void;
}

export default function ForAllTime({ filter }: Props) {
  const { state, dispatch } = usePlayFilterContext();

  useEffect(() => {
    console.log("filter", filter);
  }, [filter]);

  const removeFilter = () => {
    dispatch({
      type: "remove",
      filter,
    });
  };

  return (
    <div className="relative">
      <Menu>
        <Menu.Button className={`${baseStyles} font-semibold`}>
          {filter.label}
        </Menu.Button>
        <Menu.Items
          className={`mt-1 ${baseStyles} ${comboContainerStyles} w-full`}
        >
          <Menu.Item>
            <div
              className={`flex justify-center items-center gap-2 hover:cursor-pointer hover:font-semibold`}
              onClick={() => {
                removeFilter();
                // removeButtonById(filter.filterId);
              }}
            >
              <div>Clear</div>
              <Times width={20} strokeWidth={3} className="text-red-500" />
            </div>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
