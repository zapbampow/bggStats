import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";
import type { FilterType } from "~/services/queryService/types";
import { Trash } from "~/components/bggStats/icons";

type Props = {
  filter: FilterType;
};

export default function RemoveFilter({ filter }: Props) {
  const { state, dispatch } = usePlayFilterContext();

  //   useEffect(() => {
  //     console.log("filter", filter);
  //   }, [filter]);

  const removeFilter = (filter: FilterType) => {
    dispatch({
      type: "remove",
      filter: filter,
    });
  };

  return (
    <div
      className={`flex justify-center items-center gap-2 hover:cursor-pointer font-semibold border border-slate-500 bg-red-100 rounded-sm py-1 w-36 hover:bg-red-200`}
      onClick={() => {
        removeFilter(filter);
      }}
    >
      <div>Remove</div>
      <Trash width={20} className="text-red-500" />
    </div>
  );
}
