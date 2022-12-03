import React from "react";
import { ChevronLeft } from "../../icons";
import type { Screen } from "./DatesCard";

type Props = {
  screen: string;
  setScreen: (screen: Screen) => void;
};

export default function BackButton({ screen, setScreen }: Props) {
  const handleClick = () => {
    if (screen === "month") {
      setScreen("year");
    } else if (screen === "day") {
      setScreen("month");
    }
  };

  if (screen === "year") return null;

  return (
    <div onClick={handleClick}>
      <ChevronLeft />
    </div>
  );
}
