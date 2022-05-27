import * as React from "react";
import type { FilterType } from "../../services/queryService/types";

type PlayFilterProviderProps = { children: React.ReactNode };

const PlayFilterContext = React.createContext<
  | { filters: FilterType[]; setFilters: (filters: FilterType[]) => void }
  | undefined
>(undefined);

function PlayFilterProvider({ children }: PlayFilterProviderProps) {
  const [filters, setFilters] = React.useState([]);
  const value = { filters, setFilters };

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
