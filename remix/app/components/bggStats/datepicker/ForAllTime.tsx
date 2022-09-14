import { Menu } from "@headlessui/react";
import { baseStyles, comboContainerStyles } from "../styles";

import type { FilterType } from "~/services/queryService/types";
import { RemoveFilter } from "~/components/bggStats/filters";

interface Props {
  filter: FilterType;
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
            <RemoveFilter filter={filter} />
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
