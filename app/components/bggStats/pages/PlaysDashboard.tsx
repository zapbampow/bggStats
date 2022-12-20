import FilterBar from "../filters/FilterBar";
import { useBggUser } from "~/hooks/bgg/useBggUser";
import usePlayData from "~/hooks/bgg/usePlayData";
import RecordedPlays from "../answers/RecordedPlays";
import useFilteredData from "~/contexts/bggStats/useFilteredData";
import AggregatorRow from "../aggregators/AggregatorRow";
import DownloadProgress from "../DownloadProgress";

export default function PlaysDashboard() {
  const user = useBggUser();
  // for Testing
  // useFilteredData();
  // const { percentDone, error, userFirstTime } = usePlayData();

  // For real
  const { handleFiltering } = useFilteredData();
  const { percentDone, error, userFirstTime } = usePlayData({
    handleFiltering,
  });

  if (!user) {
    return null;
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
