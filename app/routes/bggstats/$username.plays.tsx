import type {
  LinksFunction,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import styles from "~/styles/bggStats/username.css";
import { PlayFilterProvider } from "~/contexts/bggStats/playFilterContext";
import { PlayResultsProvider } from "~/contexts/bggStats/playResultsContext";
import datePickerStyles from "~/styles/bggStats/datePickerStyles.css";
import PlaysDashboard from "~/components/bggStats/pages/PlaysDashboard";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = ({ params }) => {
  let username = params.username;
  invariant(username, "Expects a username");
  return username;
};

export const meta: MetaFunction = ({ data }) => ({
  title: `BGG Stats for ${data}`,
});

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
      <PlayResultsProvider>
        <PlaysDashboard />
      </PlayResultsProvider>
    </PlayFilterProvider>
  );
}

export default Plays;
