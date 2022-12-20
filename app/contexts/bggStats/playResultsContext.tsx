import * as React from "react";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";

type PlayResultsProviderProps = { children: React.ReactNode };
type Action = {
  type: "setFilteredResults";
  payload: PlayDataModel[];
};
type Dispatch = (action: Action) => void;

const reducer = (state: PlayDataModel[], action: Action) => {
  switch (action.type) {
    case "setFilteredResults":
      return action.payload;
    default:
      return [];
  }
};

const PlayResultsContext = React.createContext<
  | {
      state: PlayDataModel[];
      dispatch: Dispatch;
      setFilteredResults: (results: PlayDataModel[]) => void;
    }
  | undefined
>(undefined);

function PlayResultsProvider({ children }: PlayResultsProviderProps) {
  const [state, dispatch] = React.useReducer<
    React.Reducer<PlayDataModel[], Action>
  >(reducer, []);

  const setFilteredResults = (results: PlayDataModel[]) => {
    dispatch({
      type: "setFilteredResults",
      payload: results,
    });
  };

  const value = { state, dispatch, setFilteredResults };

  return (
    <PlayResultsContext.Provider value={value}>
      {children}
    </PlayResultsContext.Provider>
  );
}

function usePlayResultsContext() {
  const context = React.useContext(PlayResultsContext);
  if (context === undefined) {
    throw new Error(
      `usePlayResultsContext must be used within a PlayFilterProvider`
    );
  }
  return context;
}

export { PlayResultsProvider, usePlayResultsContext };
