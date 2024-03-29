import { redirect } from "@remix-run/node";
import type {
  ActionArgs,
  LoaderFunction,
  V2_MetaFunction,
  LinksFunction,
} from "@remix-run/node";
import styles from "~/styles/bggStats/username.css";
import { PlayFilterProvider } from "~/contexts/bggStats/playFilterContext";
import { PlayResultsProvider } from "~/contexts/bggStats/playResultsContext";
import datePickerStyles from "~/styles/bggStats/datePickerStyles.css";
import PlaysDashboard from "~/components/bggStats/pages/PlaysDashboard";
import invariant from "tiny-invariant";
import { addUsageData } from "~/services/prismaService/bggStats";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const username = body.get("username");

  return redirect(`/bggStats/${username}`);
}

export const loader: LoaderFunction = ({ params }) => {
  let username = params.username;
  invariant(username, "Expects a username");

  if (username) {
    addUsageData({ username: username as string, page: "dashboard" });
  }

  return username;
};

export const meta: V2_MetaFunction = ({ data }) => [
  {
    title: `BGG Stats for ${data}`,
  },
];

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
