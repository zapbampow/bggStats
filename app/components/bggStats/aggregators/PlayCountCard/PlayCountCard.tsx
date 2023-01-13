import React from "react";
import { Card, CardTitle } from "../Card";
import { usePlayResultsContext } from "~/contexts/bggStats/playResultsContext";
import BackButton from "./BackButton";

type Props = {
  userId: number;
};
export default function PlayCountCard({ userId }: Props) {
  return <div>PlayCountCard</div>;
}
