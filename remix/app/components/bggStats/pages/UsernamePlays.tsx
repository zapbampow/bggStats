import { useEffect, useState } from "react";
import type { LinksFunction } from "@remix-run/node";
import styles from "~/styles/bggStats/username.css";

import usePlayData from "~/hooks/bgg/usePlayData";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import { usePlayFilterContext } from "~/contexts/bggStats/playFilterContext";

import filter from "~/services/queryService";

import Aggregator from "~/components/bggStats/Aggregator";
import FilterToComponent from "~/components/bggStats/FilterToComponent";

import AddFilterButton from "~/components/bggStats/AddFilterButton";
import type {
  SelectionType,
  FilterButtonData,
} from "~/components/bggStats/types";
import { BigButton } from "~/components/bggStats/Button";
import type { FilterType } from "~/services/queryService/types";
import Answer from "~/components/bggStats/Answer";
import { Container } from "./layout";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// type AccDataType = {
//   numPlayers: number;
//   numUsernames: number;
//   numLocations: number;
// };

export default function UsernamePlays() {
  const user = useBggUser();
  // const [accData, setAccData] = useState<AccDataType>();
  // const [locations, setLocations] = useState<string[]>([]);
  // const [playerNames, setPlayerNames] = useState<string[]>([]);
  // const [filterButtons, setFilterButtons] = useState<FilterType[]>([]);
  const [filterCount, setFilterCount] = useState(1);
  const [answer, setAnswer] = useState();
  const { state, dispatch } = usePlayFilterContext();

  useEffect(() => {
    console.log("state", state);
  }, [state]);

  // useEffect(() => {
  //   console.log("filterButtons", filterButtons);
  // }, [filterButtons]);

  const { manuallyUpdate, percentDone, error } = usePlayData();

  const addFilterButton = (selection: SelectionType) => {
    console.log("selection", selection);
    let filter: FilterType = {
      order: filterCount,
      filter: selection.value,
      label: selection.label,
      arg: "",
    };

    // setFilterButtons((filters) => [...filters, filter]);
    dispatch({
      type: "upsert",
      filter,
    });
    setFilterCount((count) => count + 1);
  };

  const shouldShowAddFilterButton = () => {
    if (!state.length || state?.length === 0) {
      return false;
    }

    if (state?.length === 1 && state[0].filter === "count" && !state[0]?.arg) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!user) return;
  }, [user]);

  const handleAsk = async () => {
    if (!user?.userId) return;
    let filters = JSON.parse(JSON.stringify(state));
    // Update aggregator order value
    let index = filters.findIndex(
      (filter: FilterType) => filter.order === "aggregator"
    );
    filters[index].order = 1000;

    filters.sort((a: FilterType, b: FilterType) => {
      if (a.order > b.order) return 1;
      if (a.order < b.order) return -1;
      return 0;
    });

    const pipe = await filter(user.userId, filters);
    // console.log("pipe", pipe);
    setAnswer(pipe);

    console.log("answer", pipe);
  };

  // const removeButtonById = (id: number) => {
  //   const newButtonList = filterButtons.filter((btn) => btn.order !== id);
  //   setFilterButtons(newButtonList);
  // };

  return (
    <div className="min-h-screen worksans font-normal">
      <div className="bg-slate-200">
        <Container>
          <h1 className="text-6xl text-slate-700 font-extrabold mb-4  text-center">
            Explore{" "}
            <span className="italic font-extralight">{user?.username}'s</span>{" "}
            Play Data
          </h1>
          <div className="text-center">
            Updating: {percentDone === 100 ? "Complete" : `${percentDone}%`}
          </div>
          <div className="mt-20 max-w-xl border border-slate-500 mx-auto">
            <div className="filters flex flex-col justify-center md:flex-row flex-wrap gap-2 mb-8">
              <Aggregator />
              {/* Filter components */}
              {state.slice(1).map((filter: FilterType) => {
                return <FilterToComponent key={filter.order} filter={filter} />;
              })}
            </div>
            <div className="flex flex-col items-center gap-4">
              <AddFilterButton
                addFilterButton={addFilterButton}
                display={shouldShowAddFilterButton()}
              />
              <BigButton onClick={handleAsk}>Submit</BigButton>
            </div>
          </div>
        </Container>
      </div>

      <div>
        <Answer answer={answer} aggregator={state[0]} />
      </div>
    </div>
  );
}
