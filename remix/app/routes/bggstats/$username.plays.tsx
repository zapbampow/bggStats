import type { LinksFunction } from "remix";
import styles from "~/styles/bggStats/username.css";
import { PlayFilterProvider } from "~/contexts/bggStats/playFilterContext";
import UsernamePlays from "~/components/bggStats/pages/UsernamePlays";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

function Plays() {
  return (
    <PlayFilterProvider>
      <UsernamePlays />
    </PlayFilterProvider>
  );
}

export default Plays;
