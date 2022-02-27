import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useRef } from "react";
import "./App.css";
import { SomeComponent } from "./components/SomeComponent";
import { db } from "./data/db";
import {
  getInitialPlayData,
  getRemainingPlayData,
  getUserPlayData,
} from "./services/bggService";
import { bulkAddPlays } from "./services/dbService";

function App() {
  const usernameRef = useRef();

  const getPlayData = async () => {
    const username = usernameRef?.current?.value;
    console.log("username: ", username);
    // TODO: check if username exists first

    // Then do the following
    const initialData = await getInitialPlayData(username);
    console.log("initialData: ", initialData);
    const allData = await getRemainingPlayData(username, initialData.pages);
    await bulkAddPlays(allData);
  };

  const asherPlays = useLiveQuery(async () => {
    return await db.plays.where("name").equals("Asher").toArray();
  });

  return (
    <div className="App">
      <h3>Asher Play Dates</h3>

      <div>
        <input ref={usernameRef} type="text" placeholder="username" />
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
