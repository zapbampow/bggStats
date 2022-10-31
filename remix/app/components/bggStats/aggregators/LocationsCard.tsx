import React from "react";
import { Card, CardTitle, CardSummary } from "./Card";

export default function LocationsCard() {
  return (
    <Card>
      <CardTitle>Locations</CardTitle>
      <div>Chart goes here</div>
      <CardSummary>Total: 5</CardSummary>
    </Card>
  );
}
