import * as React from "react";
import type { FilterType } from "~/services/queryService/types";

type PlayFilterProviderProps = { children: React.ReactNode };
type Action = {
  type:
    | "add"
    | "remove"
    | "update"
    | "upsert"
    | "updateAccumulatorArg"
    | "clear filter";
  filter: FilterType;
};
type Dispatch = (action: Action) => void;

const filterReducer = (state: FilterType[], action: Action) => {
  switch (action.type) {
    case "add":
      return [...state, action.filter];
    case "remove":
      return state.filter((f) => f.order !== action.filter.order);
    case "update":
      const newState = state.map((filter: FilterType) => {
        if (filter.order === action.filter.order) {
          return action.filter;
        }
        return filter;
      });
      return newState;
    case "clear filter":
      const updated = state.map((filter: FilterType) => {
        if (filter.order === action.filter.order) {
          return { ...action.filter, arg: null };
        }
        return filter;
      });
      return updated;
    case "upsert":
      const needToUpdate = state.find((f) => f.order === action.filter.order);

      if (needToUpdate) {
        const newState = state.map((filter: FilterType) => {
          if (filter.order === action.filter.order) {
            return action.filter;
          }
          return filter;
        });
        return newState;
      } else {
        return [...state, action.filter];
      }
    default:
      throw new Error("Unknown action type of " + action.type);
  }
};

const PlayFilterContext = React.createContext<
  | {
      state: FilterType[];
      dispatch: Dispatch;
      removeFilter: (filter: FilterType) => void;
    }
  | undefined
>(undefined);

function PlayFilterProvider({ children }: PlayFilterProviderProps) {
  const [state, dispatch] = React.useReducer<
    React.Reducer<FilterType[], Action>
  >(filterReducer, []);

  const removeFilter = (filter: FilterType) => {
    dispatch({
      type: "remove",
      filter: filter,
    });
  };

  const value = { state, dispatch, removeFilter };

  return (
    <PlayFilterContext.Provider value={value}>
      {children}
    </PlayFilterContext.Provider>
  );
}

function usePlayFilterContext() {
  const context = React.useContext(PlayFilterContext);
  if (context === undefined) {
    throw new Error(
      `usePlayFilterContext must be used within a PlayFilterProvider`
    );
  }
  return context;
}

export { PlayFilterProvider, usePlayFilterContext };
