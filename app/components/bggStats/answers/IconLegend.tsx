import React from "react";
import { TrophyFilled } from "../icons";

export default function IconLegend() {
  return (
    <div className="inline-block px-4 py-2 mt-4 bg-white rounded-md">
      <ul className="inline-flex flex-wrap gap-8 text-gray-700">
        <li className="flex items-center">
          <TrophyFilled width={14} className="inline text-yellow-500" /> :
          Winner
        </li>
      </ul>
    </div>
  );
}
