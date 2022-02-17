import { useEffect } from "react";
import "./App.css";
import { SomeComponent } from "./components/SomeComponent";
import { getUserPlayData } from "./services/bggService";

function App() {
  const data = async () => {
    const playData = await getUserPlayData("jpseasia");
    console.log("playData: ", playData);
  };
  useEffect(() => {
    data();
  }, []);

  return (
    <div className="App">
      <SomeComponent />
    </div>
  );
}

export default App;
