import NavMenu from "./NavMenu";
import { HomeMeeple } from "../icons";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = ({ params }) => {
  let username = params.username;

  return username;
};

export default function Navbar() {
  const username = useLoaderData();

  return (
    <nav className="flex items-center justify-between px-2 py-4 lg:px-8">
      <a href="/bggstats" className="flex text-slate-100">
        <HomeMeeple width={24} />
      </a>
      <div className="flex items-center text-xl font-medium text-slate-100">
        {username && `Play data for ${username}`}
      </div>

      <div className="relative">
        <NavMenu />
      </div>
    </nav>
  );
}
