import React from "react";
import { Container } from "../pages/layout";
import LocationsCard from "./LocationsCard";
import PlayersCard from "./PlayersCard";
import RecordedPlaysCard from "./RecordedPlaysCard";
import DatesCard from "./DatesCard";
import { useLocalStorage } from "~/hooks/useLocalStorage";
import AggregatorMenu from "./AggregatorMenu/AggregatorMenu";

type Props = {
  userId: number;
};

export default function AggregatorRow({ userId }: Props) {
  const [settings, setSettings] = useLocalStorage("aggregators", [
    "daysPlayed",
    "players",
    "locations",
    "recordedPlays",
  ]);

  return (
    <Container className="relative mb-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {getAggregators(settings, userId)}
        <div className="absolute left-2 -bottom-7">
          <AggregatorMenu settings={settings} setSettings={setSettings} />
        </div>
      </div>
    </Container>
  );
}

const getAggregators = (settings: string[], userId: number) => {
  console.log({ settings });

  return settings.map((setting: string) => {
    switch (setting) {
      case "daysPlayed":
        return <DatesCard key={setting} userId={userId} />;
      case "players":
        return <PlayersCard key={setting} />;
      case "locations":
        return <LocationsCard key={setting} />;
      case "recordedPlays":
        return <RecordedPlaysCard key={setting} userId={userId} />;
      default:
        return null;
    }
  });
};
