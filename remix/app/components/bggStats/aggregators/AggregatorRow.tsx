import React from "react";
import { Container } from "../pages/layout";
import LocationsCard from "./LocationsCard";
import PlayersCard from "./PlayersCard";
import RecordedPlaysCard from "./RecordedPlaysCard";
import DatesCard from "./DatesCard";

type Props = {
  userId: number;
};

export default function AggregatorRow({ userId }: Props) {
  return (
    <Container className="mb-8">
      <div className="flex gap-4">
        <RecordedPlaysCard userId={userId} />
        <LocationsCard />
        <PlayersCard />
        <DatesCard userId={userId} />
      </div>
    </Container>
  );
}
