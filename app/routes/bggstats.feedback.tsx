import type { LinksFunction } from "@remix-run/node";
import React from "react";
import { Container } from "~/components/bggStats/pages/layout";
// import Markdown from "~/content/bggStats/how-to-use.mdx";
import styles from "~/styles/bggStats/markdownStyles.css";
import { BggLogo, GithubIcon } from "~/components/bggStats/icons";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function contact() {
  return (
    <div className="w-full lg:w-[764px] px-2 mx-auto pb-8">
      <div className="p-8 mb-16 rounded-md markdown bg-slate-100">
        <h1>Feedback</h1>

        <h2>BGG</h2>
        <ul>
          <li>
            <a
              href="https://boardgamegeek.com/geekmail/compose?touser=jpseasia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <BggLogo width={12} />
              Geekmail
            </a>
          </li>
          <li className="flex items-center gap-2">
            <a
              href="https://boardgamegeek.com/thread/2999851/bgg-play-stats-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <BggLogo width={12} />
              BGG Play Stats Dashboard forum thread
            </a>
          </li>
        </ul>

        <h2>Github</h2>
        <p>
          If you're a programmer and are comfortable with Github, you can submit
          an issue in this app's repository or even submit a pull request if
          your so inclined.
        </p>
        <p>
          <a
            href="https://github.com/zapbampow/bggStats"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <GithubIcon className="text-black" />
            The Repo
          </a>
        </p>
      </div>
    </div>
  );
}
