import FilterBar from "../filters/FilterBar";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import usePlayData from "~/hooks/bgg/usePlayData";
import RecordedPlays from "../answers/RecordedPlays";
import useFilteredData from "~/contexts/bggStats/useFilteredData";
import AggregatorRow from "../aggregators/AggregatorRow";
import DownloadProgress from "../DownloadProgress";
import { useEffect } from "react";
import UsernameForm from "../forms/UsernameForm";
import { Container } from "./layout";
import { ExclamationCircle } from "../icons";

export default function PlaysDashboard() {
  const { user, error: userError } = useBggUser();
  // for Testing
  // useFilteredData();
  // const { percentDone, error, userFirstTime } = usePlayData();

  // For real
  const { handleFiltering } = useFilteredData();
  const { percentDone, error, userFirstTime } = usePlayData({
    handleFiltering,
  });

  if (!user) return null;

  if (userError) {
    return (
      <Container>
        <div className="absolute flex flex-col items-center justify-center gap-8 mt-8 -translate-x-1/2 -translate-y-1/3 top-1/3 left-1/2 w-fit sm:w-max">
          <div className="p-4 text-yellow-700 bg-yellow-100 rounded-md">
            <ExclamationCircle className="inline" />{" "}
            <span className="ml2">{userError}</span>
          </div>
          <UsernameForm />
        </div>
      </Container>
    );
  }

  return (
    <div className="pb-8">
      <DownloadProgress
        percentDone={percentDone}
        error={error}
        userFirstTime={userFirstTime}
      />
      <AggregatorRow userId={user.userId} />
      <FilterBar />
      <RecordedPlays />
    </div>
  );
}
