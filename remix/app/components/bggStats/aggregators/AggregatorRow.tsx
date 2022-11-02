import React from "react";
import { Container } from "../pages/layout";
import LocationsCard from "./LocationsCard";

export default function AggregatorRow() {
  return (
    <Container className="mb-8">
      <div className="flex gap-4">
        <LocationsCard />
        {/* <LocationsCard />
        <LocationsCard />
        <LocationsCard />
        <LocationsCard /> */}
      </div>
    </Container>
  );
}
