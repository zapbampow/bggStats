import React from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Card({ children }: Props) {
  return (
    <div className="relative flex flex-col items-center flex-1 gap-4 px-2 py-4 border rounded-md shadow-lg basis-52 border-slate-500 bg-slate-100">
      {children}
    </div>
  );
}

export const CardTitle = ({ children }: Props) => {
  return <h3 className="relative text-xl font-semibold">{children}</h3>;
};

export const CardSummary = ({ children }: Props) => {
  return <div className="text-lg">{children}</div>;
};
