import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import { SomeComponent } from "./components/SomeComponent";
import { db } from "./data/db";
import { bulkAddPlays } from "./services/dbService";
import usePlayData from "./hooks/usePlayData";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [username, setUsername] = useState(null);
  const { playData, percentDone, error } = usePlayData(username);
  const [data, setData] = useLocalStorage("data", "[]");
  const usernameRef = useRef();

  useEffect(() => {
    if (playData != [] && playData !== null && playData !== undefined) {
      console.log("playData: ", playData);
      const json = JSON.stringify(playData);
      setData(json);
    }
  }, [playData]);

  useEffect(() => {
    console.log("error: ", error);
  }, [error]);

  const asherPlays = useLiveQuery(async () => {
    return await db.plays.where("name").equals("Asher").toArray();
  });

  return (
    <div className="App">
      <h3>Get Play Data</h3>

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
