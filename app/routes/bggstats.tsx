import { Outlet } from "@remix-run/react";
import type {
  LinksFunction,
  V2_MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import styles from "~/styles/bggStats/username.css";

import Navbar from "~/components/bggStats/navbar";
import { Suspense } from "react";

export const meta: V2_MetaFunction = (args) => {
  return [{ title: "BGG Play Data Stats" }];
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
    {
      rel: "icon",
      type: "image/x-con",
      href: "/images/favicon.ico",
    },
  ];
};

export default function BggStats() {
  // Disable console.log in production
  if (process.env.NODE_ENV === "production") {
    console.log("BGG Stats App - Production mode");
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  } else if (process.env.NODE_ENV === "development") {
    console.log("BGG Stats App - Development mode");
  }

  return (
    <Suspense fallback={<Fallback />}>
      <div className="bgg-gradient relative min-h-screen bg-slate-200">
        <Navbar />
        <Outlet />
      </div>
    </Suspense>
  );
}

const Fallback = () => <div />;
