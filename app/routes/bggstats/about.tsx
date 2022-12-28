import type { LinksFunction } from "@remix-run/node";
import React from "react";
import { Container } from "~/components/bggStats/pages/layout";
import Markdown from "~/content/bggStats/about.mdx";
import styles from "~/styles/bggStats/markdownStyles.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function about() {
  console.log("markdown", Markdown);
  return (
    <div className="w-full lg:w-[764px] px-2 mx-auto pb-8">
      <div className="p-8 mb-16 rounded-md markdown bg-slate-100">
        <Markdown />
      </div>
    </div>
  );
}
