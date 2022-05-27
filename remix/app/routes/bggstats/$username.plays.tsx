import { useEffect, useState } from "react";
import type { LinksFunction } from "remix";
import styles from "~/styles/bggStats/username.css";

import usePlayData from "../../hooks/bgg/usePlayData";
import {
  getAllPlayerNames,
  getAllUserNames,
  getAllLocations,
} from "../../utils/analysis/accumulations";
import { useBggUser } from "../../hooks/bgg/useBggUser";
import { testQuery, store } from "../../services/idbService";

import filter from "../../services/queryService";

import Aggregator from "../../components/bggStats/Aggregator";

import { PlayFilterProvider } from "~/contexts/bggStats/playFilterContext";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

type AccDataType = {
  numPlayers: number;
  numUsernames: number;
  numLocations: number;
};

function Plays() {
  const user = useBggUser();
  const [accData, setAccData] = useState<AccDataType>();
  const [locations, setLocations] = useState<string[]>([]);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const { manuallyUpdate, percentDone, error } = usePlayData();

  const getAccumulatedData = async (recordingUserId: number) => {
    const playerNames = await getAllPlayerNames(recordingUserId);
    const usernames = await getAllUserNames(recordingUserId);
    const locations = await getAllLocations(recordingUserId);

    // console.log('playerNames', playerNames)
    // console.log('locations', locations)

    setAccData({
      numPlayers: playerNames.length,
      numUsernames: usernames.length,
      numLocations: locations.length,
    });
    setLocations(locations);
    setPlayerNames(playerNames);
  };

  const getTestQuery = async (userId: number, date: string) => {
    const test = await testQuery(userId, date);
    console.log("test plays", test);
  };

  const test2 = async (userId: number) => {
    const plays = store("plays", userId);
    let filtered = plays.gameName("The Settlers of Catan");
    return false;
    //  let saturday = await plays.where('date', 'equals', '2022-03-19')
    //  console.log('saturday', await saturday?.toArray())
    //  return await saturday?.toArray();
  };

  // const testPipeWithArgs = async () => {
  //   const plays = await getInitialPlayData(user.userId);
  //   // console.log('plays', plays)
  //   const pipe = pipeWithArgs(plays, {
  //     gameName: "Puerto Rico",
  //   });
  //   // console.log('pipe', pipe);
  // };

  const testP2 = async () => {
    const filters = [
      // {
      //   order: 1,
      //   filter: "withAllPlayerNames",
      //   arg: ["Clayton Ingalls", "Teresa", "Autumn"],
      // },
      // {
      //   order: 1000,
      //   filter: "listPlayerNames",
      // },
      {
        order: 1,
        filter: "gameName",
        arg: "Sonar",
      },
      {
        order: 1000,
        filter: "count",
        arg: "days",
      },
    ];

    const pipe = await filter(user.userId, filters);

    console.log("pipe", pipe);
  };

  useEffect(() => {
    if (user) {
      getAccumulatedData(user.userId);
      // getTestQuery(user.userId, '2022-03-01')
      // test2(user.userId)
      // testPipeWithArgs();
      testP2();
    }
  }, [user]);

  return (
    <PlayFilterProvider>
      <div className="min-h-screen p-4 bgGradient">
        <h1 className="text-4xl text-lime-500 mb-4">
          Query {user?.username}'s PlayData
        </h1>
        <div>
          Updating: {percentDone === 100 ? "Complete" : `${percentDone}%`}
        </div>
        <div>Number of playerNames: {accData?.numPlayers}</div>
        <div>Number of usernames: {accData?.numUsernames}</div>
        <div>Number of locations: {accData?.numLocations}</div>

        <div className="grid-cols-3">
          <select name="playerNames">
            {playerNames.map((name, index) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <select name="locations">
            {locations.map((name, inded) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-20">
          <Aggregator />
        </div>
      </div>
    </PlayFilterProvider>
  );
}

export default Plays;
