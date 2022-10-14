import type { LinksFunction } from "remix";
import styles from "~/styles/bggStats/username.css";
import { PlayFilterProvider } from "~/contexts/bggStats/playFilterContext";
import UsernamePlays from "~/components/bggStats/pages/UsernamePlays";
import datePickerStyles from "~/styles/bggStats/datePickerStyles.css";
import PlaysDashboard from "~/components/bggStats/pages/PlaysDashboard";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: datePickerStyles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
    },
  ];
};

function Plays() {
  return (
    <PlayFilterProvider>
      {/* <UsernamePlays /> */}
      <PlaysDashboard />
    </PlayFilterProvider>
  );
}

export default Plays;
