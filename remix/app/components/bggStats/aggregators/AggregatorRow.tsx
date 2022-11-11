import React from "react";
import { Container } from "../pages/layout";
import LocationsCard from "./LocationsCard";
import PlayersCard from "./PlayersCard";

export default function AggregatorRow() {
  return (
    <Container className="mb-8">
      <div className="flex gap-4">
        <LocationsCard />
        <PlayersCard />
        {/* <LocationsCard />
        <LocationsCard />
        <LocationsCard />
        <LocationsCard /> */}
      </div>
    </Container>
  );
}
