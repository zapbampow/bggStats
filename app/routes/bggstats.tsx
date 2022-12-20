import { Outlet } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import styles from "~/styles/bggStats/username.css";

import Navbar from "~/components/bggStats/navbar";

export const meta: MetaFunction = () => {
  return { title: "BGG Play Data Stats" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
    },
  ];
};

export default function BggStats() {
  return (
    <div className="relative min-h-screen bg-slate-200 bgg-gradient">
      <Navbar />

      <Outlet />
    </div>
  );
}
