import React from "react";
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

interface Props {
  filter: FilterButtonData;
}

export default function ForAllTime({ filter }: Props) {
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
            >
              <div>Clear</div>
              <Times width={20} className="text-red-500" />
            </div>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
