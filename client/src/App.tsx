import { useLiveQuery } from "dexie-react-hooks";
import { useEffect } from "react";
import "./App.css";
import { SomeComponent } from "./components/SomeComponent";
import { db } from "./data/db";
import { getUserPlayData } from "./services/bggService";
import { bulkAddPlays } from "./services/dbService";

function App() {
  const data = async () => {
    const playData = await getUserPlayData("jpseasia");
    const addedPlays = await bulkAddPlays(playData);
  };

  useEffect(() => {
    data();
  }, []);

  const asherPlays = useLiveQuery(async () => {
    return await db.plays.where("name").equals("Asher").toArray();
  });

  return (
    <div className="App">
      <h3>Asher Play Dates</h3>
      <div>
        {asherPlays?.map((play) => {
          return <div key={play.id}>{play.date}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
