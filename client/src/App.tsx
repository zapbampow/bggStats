import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useRef } from "react";
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

function App() {
  const usernameRef = useRef();

  const getPlayData = async () => {
    const username = usernameRef?.current?.value;
    console.log("username: ", username);
    // TODO: check if username exists first

    const allData = await getAllPlayData(username);
    // console.log("allData: ", allData)
    // await bulkAddPlays(allData);
  };

  const asherPlays = useLiveQuery(async () => {
    return await db.plays.where("name").equals("Asher").toArray();
  });

  return (
    <div className="App">
      <h3>Asher Play Dates</h3>

      <div>
        <input ref={usernameRef} type="text" placeholder="username" />
        {/* TODO: Disable this button while waiting for data so it doesn't slam bgg multiple times */}
        <button onClick={getPlayData}>Get Play Data</button>
      </div>

      <div>
        {asherPlays?.map((play) => {
          return <div key={play.id}>{play.date}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
