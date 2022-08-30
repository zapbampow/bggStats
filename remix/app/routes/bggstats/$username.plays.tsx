import type { LinksFunction } from "remix";
import styles from "~/styles/bggStats/username.css";
import { PlayFilterProvider } from "~/contexts/bggStats/playFilterContext";
import UsernamePlays from "~/components/bggStats/pages/UsernamePlays";
import datePickerStyles from "~/styles/bggStats/datePickerStyles.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: datePickerStyles },
    {
      rel: "stylesheet",
      href: "'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@100..900&display=swap'",
    },
  ];
};

function Plays() {
  return (
    <PlayFilterProvider>
      <UsernamePlays />
    </PlayFilterProvider>
  );
}

export default Plays;
