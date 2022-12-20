import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import type { FilterType } from "~/services/queryService/types";
import { Backspace } from "~/components/bggStats/icons";

type Props = {
  filter: FilterType;
  onClick: () => void;
};

export default function ClearFilter({ filter, onClick }: Props) {
  const { dispatch } = usePlayFilterContext();

  const clearFilter = (filter: FilterType) => {
    dispatch({
      type: "clear filter",
      filter: filter,
    });
  };

  const handleClick = () => {
    clearFilter(filter);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 hover:cursor-pointer font-semibold border border-slate-500 rounded-sm py-1 w-28 hover:bg-slate-200`}
      onClick={handleClick}
    >
      <div>Clear</div>
      <Backspace width={20} />
    </div>
  );
}
