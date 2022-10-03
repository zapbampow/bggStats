import React from "react";
import { Container } from "~/components/bggStats/pages/layout";
import type { PlayDataModel } from "~/models/bgg/gameDataModels";
import type { FilterType } from "~/services/queryService/types";
import RecordedPlays from "~/components/bggStats/answers/RecordedPlays";

type Props = {
  answer: string[] | PlayDataModel[];
  aggregator: FilterType;
};

export default function Answer({ answer, aggregator }: Props) {
  if (!answer || !aggregator) return null;

  console.log("aggregator", aggregator);
  // Recorded play data
  if (aggregator.filter === "listRecordedPlays") {
    return (
      <Container>
        <RecordedPlays data={answer} />
      </Container>
    );
  }

  // List of other data
  const orderedProps = answer.sort();

  return (
    <Container>
      <ul className="border p-4 w-max mx-auto">
        {orderedProps.map((value: string) => {
          return <li key={value}>{value}</li>;
        })}
      </ul>
    </Container>
  );
}
