import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { SomeComponent } from "./components/SomeComponent";
import { db } from "./data/db";
import {
  getInitialPlayData,
  getRemainingPlayData,
  getUserPlayData,
  getAllPlayData,
} from "./services/bggService";
import { bulkAddPlays } from "./services/dbService";
import usePlayData from "./hooks/usePlayData";

function App() {
  const [username, setUsername] = useState(null);
  const { playData, percentDone, error } = usePlayData(username);
  const usernameRef = useRef();

  useEffect(() => {
    console.log("playData: ", playData);
  }, [playData]);

  useEffect(() => {
    console.log("error: ", error);
  }, [error]);

  const asherPlays = useLiveQuery(async () => {
    return await db.plays.where("name").equals("Asher").toArray();
  });

  return (
    <div className="App">
      <h3>Asher Play Dates</h3>

      <div>
        <input ref={usernameRef} type="text" placeholder="username" />
        {/* TODO: Disable this button while waiting for data so it doesn't slam bgg multiple times */}
        <button onClick={() => setUsername(usernameRef?.current?.value)}>
          Get Play Data
        </button>

        {error && <div className="text-red-500">{error}</div>}
      </div>

      <div>
        <h4>Percent Done: {percentDone}</h4>
      </div>
    </div>
  );
}

export default App;
