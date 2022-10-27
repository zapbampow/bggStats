import { Outlet } from "@remix-run/react";
import type { MetaFunction } from "remix";
import Navbar from "~/components/bggStats/navbar";

export const meta: MetaFunction = () => {
  return { title: "BGG Stats" };
};

export default function BggStats() {
  return (
    <div className="flex flex-col relative bg-slate-200 bgg-gradient">
      <Navbar />

      <Outlet />
    </div>
  );
}
