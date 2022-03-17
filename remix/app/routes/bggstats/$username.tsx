import { LoaderFunction, redirect } from 'remix'

// Until other features are built, this route simply redirects to $username/plays
export const loader: LoaderFunction = async ({params}) => {
    const { username } = params;
    return redirect(`/bggStats/${username}/plays`)
  };
