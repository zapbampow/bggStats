import React from "react";
import { Card } from "~/components/bggStats/aggregators/Card";
import { Link } from "@remix-run/react";
import { useParams } from "@remix-run/react";

export default function Tools() {
  const params = useParams();

  return (
    <div className="text-white">
      <h1 className="mb-2 text-5xl font-semibold">Play Stats Tools</h1>
      <p>
        These tools don't quite fit into the main dashboard, but may help you
        find other information about your game plays that you are looking for.
      </p>

      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
        <Link to={`first-plays`}>
          <Card>
            <h3 className="text-xl font-semibold text-black">
              First Time Played Finder
            </h3>
            <p className="px-4 text-gray-800">
              Find the first time you played a game, even if you didn't mark it
              as "First time played" or "New".
            </p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
