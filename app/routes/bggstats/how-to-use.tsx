import type { LinksFunction } from "@remix-run/node";
import React from "react";
import { Container } from "~/components/bggStats/pages/layout";
// import Markdown from "~/content/bggStats/how-to-use.mdx";
import styles from "~/styles/bggStats/markdownStyles.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function about() {
  return (
    <div className="w-full lg:w-[764px] px-2 mx-auto pb-8">
      <div className="p-8 mb-16 rounded-md markdown bg-slate-100">
        {/* <Markdown /> */}
        <h1>How to Use BGG Play Stats</h1>
        <p>
          At it's heart this tool is designed to allow you to drill down to get
          the information you want. There are 2 ways to drill down.
        </p>
        <p>
          First, you can use the charts by clicking on the items in them. When
          you click on a bar or pie piece, then it adds a filter and updates the
          information.
        </p>
        <p>
          Second, you can manually add filters through the dropdowns. There are
          more filter options than the charts give you.
        </p>
        <p>
          Whenever you take either of those actions all the data shown should
          update.
        </p>
        <h2>Syncing with BGG Data</h2>
        <p>
          The first time you enter your username the app will get your entire
          play data history. On subsequent visits, it will get all the newest
          play data automatically.
        </p>
        <p>
          <em>Note:</em> The app does NOT sync any changes you make to records
          that have already been downloaded.
        </p>
        <p>
          <strong>Example</strong>
        </p>
        <p>
          On Sunday you play a game and record it. On Monday you come to BGG
          Play Stats and see you didn't record the location of the game you
          played yesterday. You click the link to the BGG record and update the
          location. When you come back to BGG Plays Stats. The location will not
          be updated.
        </p>
        <p>
          In order to see that change you will need to delete all data that is
          stored for your user and reload the page to trigger it to download
          your entire history again.
        </p>
        <h2>What to do when the download process stalls</h2>
        <p>
          BoardGameGeek is amazingly generous to make so much of their data
          available for tools like this. In order to prevent abuse of their
          generosity, they limit the number of requests that can be made from
          apps like this. If you have tons of play records, like 8,000+, you may
          be temporarily blocked from downloading all your records and it will
          appear to stall. The first thing to do is nothing. Just wait a minute.
          BGG doesn't block forever, so when there is an issue, this app slows
          down how frequently it tries to retrieve data. If a full minute passes
          without any change, then you can refresh or just wait a couple of more
          minutes before refreshing again.
        </p>
        <p>
          If you try to look at a bunch of users in quick succession, then your
          computer will be temporarily blocked and the download process will
          appear to be stalled. Wait a few minutes and try again.
        </p>

        <h2>My data doesn't look right</h2>
        <p>There are a variety of reasons your data may not look right.</p>
        <p>
          <strong>Name issues: </strong>Whatever name you enter into the name
          field at the time you recorded a game is what is recorded for that
          game, even if you later change your name in your profile. My profile
          used to just have my first name. Then I added my last name. That's
          just messy data. I had to go update my name on about 70 records to
          have the data the way I wanted it.
        </p>
        <p>
          <strong>Recent updates: </strong>If you update some records, for
          example because of a name related issue from above, then you need to
          clear you data in the app and start over to download the new updates.
          Sometimes BGG seems to serve data from a cache and it may take a bit
          before the correct updated data will download. There isn't anything I
          can do about that other than to tell you to wait and try again later
          if that is happening.
        </p>
      </div>
    </div>
  );
}
