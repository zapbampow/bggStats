import type { LinksFunction } from "@remix-run/node";
import React from "react";
import { Container } from "~/components/bggStats/pages/layout";
// import Markdown from "~/content/bggStats/about.mdx";
import styles from "~/styles/bggStats/markdownStyles.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function about() {
  // console.log("markdown", Markdown);
  return (
    <div className="w-full lg:w-[764px] px-2 mx-auto pb-8">
      <div className="p-8 mb-16 rounded-md markdown bg-slate-100">
        {/* <Markdown /> */}
        <h1>About BGG Play Stats</h1>
        <h2>Inspiration</h2>
        <p>
          At the end of every year lots of board gamers think back over the year
          and ask all sorts of questions. I'm no different. Questions like, "How
          many games did I play? Which games did I play the most?"
        </p>
        <p>
          I've been recording the games I play since 2009. I started just
          recording the date and the game. Over time I added other information
          like the people I played with, the location, and the winner. With more
          data I asked more complex questions, like "How many games did I play
          with just my family and how many did each person win?"
        </p>
        <p>
          For a couple of years I downloaded my play data from{" "}
          <a href="http://www.sheltonsonline.net/bggtools/getplays">
            a tool I found on BGG
          </a>
          . I would download a csv file, open it in Excel, and build formulas to
          calculate what I wanted to know. But every year I had to relearn how
          to do that in Excel.
        </p>
        <p>
          Then I thought, "Clayton, you're a developer. Why don't you build
          something to get all that data and answer your questions with the
          tools you ARE familiar with?"
        </p>
        <p>
          The first idea was to create a system where the user could build a
          question using a set of selectors that created an question sentence.
          "How many games did I play between Jan 1, 2021 and Dec 31, 2021? Who
          did I play 7 Wonders with in Atlanta, GA? How many games did I win
          playing with only these 3 people?" I largely built it out, but it was
          pretty ugly and I couldn't come up with a design that looked even
          remotely good on mobile.
        </p>
        <p>
          Then I had a series of conversations with my wife that made me realize
          I could get all the same questions answered more easily, and it would
          look a lot better, if I took a dashboard style approach. The filtering
          code didn't change at all. It was just a matter of creating some chart
          components that allowed drilling down into the data by interacting
          with them. So I started down the path of redesigning and am pretty
          happy with the result.
        </p>
        <p>
          I created this primarily for myself. I wanted to get answers to my
          particular questions. I was interested in the technical challenges
          coding it would entail. I happened to have a little extra time in my
          life this year to work on something like this more regularly.
        </p>
        <p>
          But I'm making it available to the broader community to use too. You
          may hate it or love it. It may not answer the particular questions you
          want answered or in the way you want them. But I hope that some folks
          find it helpful.
        </p>
        <h2>Other BGG Data Tools</h2>
        <p>
          There is other data that you can track in BGG that this app doesn't
          currently look at. Things like color played and scores. If you want
          more than this has to offer, then there are awesome people out there
          who have{" "}
          <a href="https://boardgamegeek.com/guild/1229">their own projects</a>{" "}
          to let you see your play data in other ways. Some of the tools I've
          used in the past or know others love include the following.
        </p>
        <p>
          <strong>
            <a href="http://www.sheltonsonline.net/bggtools/getplays">
              Christian Shelton's Plays Download Tool
            </a>
          </strong>
        </p>
        <p>
          Get raw play data. Download as an excel document. This is where I used
          to download all my data.
        </p>
        <p>
          <strong>
            <a href="http://www.boredgamertools.com/">Board Gamer Tools</a>
          </strong>
        </p>
        <p>
          It has some nice pie charts based on your play data along with a bunch
          of other stuff. It also has some features around your collection,
          including a recommendation tool for games you may like.
        </p>
        <p>
          <strong>
            <a href="https://www.bgstatsapp.com/">Board Game Stats App</a>
          </strong>
        </p>
        <p>
          This mobile app is definitely the most popular app for game related
          stats. People who use it love it (I've never used it). It probably
          even answers some of the same questions BGG Play Stats does, and it
          certainly does a lot more. The husband and wife who built it also
          built the official BGG app. So they clearly knows what they're doing.
        </p>
      </div>
    </div>
  );
}
