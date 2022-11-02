import React from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Card({ children }: Props) {
  return (
    <div className="flex flex-col items-center flex-1 w-1/6 max-w-[20%] p-4 shadow-lg shadow-slate-500 rounded-md border border-slate-500 bg-slate-100">
      {children}
    </div>
  );
}

export const CardTitle = ({ children }: Props) => {
  return <h3 className="text-xl font-semibold">{children}</h3>;
};

export const CardSummary = ({ children }: Props) => {
  return <div className="text-lg">{children}</div>;
};
