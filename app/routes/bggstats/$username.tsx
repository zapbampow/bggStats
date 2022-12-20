import type { LoaderFunction, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import styles from "~/styles/bggStats/username.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

// Until other features are built, this route simply redirects to $username/plays
export const loader: LoaderFunction = async ({ params }) => {
  const { username } = params;
  return redirect(`/bggStats/${username}/plays`);
};
