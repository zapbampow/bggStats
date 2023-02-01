import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import {
  GithubIcon,
  Info,
  Meeple,
  Menu as MenuIcon,
  Settings,
  Send,
  SignRight,
} from "../icons";
import { Link } from "@remix-run/react";
import { useParams } from "react-router-dom";

const allLinks = (username: string | undefined) => {
  const linkOptions = [
    {
      href: "/bggstats/about",
      label: "About",
      icon: <Info width={16} />,
    },
    {
      href: "/bggstats/how-to-use",
      label: "How to Use",
      icon: <SignRight width={16} />,
    },
    {
      href: `/bggstats/${username}/tools/first-plays`,
      label: "First Recorded Plays Tool",
      icon: <Meeple width={16} />,
      onlyWithUsername: true,
    },
    {
      href: "/bggstats/settings",
      label: "Manage your data",
      icon: <Settings width={16} />,
    },
    {
      href: "/bggstats/feedback",
      label: "Feedback",
      icon: <Send width={16} />,
    },
    {
      href: "https://github.com/zapbampow/bggStats",
      label: "See the code",
      external: true,
      icon: <GithubIcon />,
    },
  ];

  return linkOptions.filter((link) => {
    if (!username) return !link?.onlyWithUsername;
    return true;
  });
};

export default function NavMenu() {
  const { username } = useParams();

  const links = allLinks(username);

  return (
    <Menu>
      <Menu.Button className="text-slate-100">
        <MenuIcon />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 flex flex-col gap-4 p-4 text-white rounded-md top-8 bg-slate-900 w-max">
        {links?.map((link) => (
          <Menu.Item key={link.href} as={Fragment}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1"
              >
                <div className="flex items-center gap-2">
                  {link.icon} {link.label}
                </div>
              </a>
            ) : (
              <Link to={link.href}>
                <div className="flex items-center gap-2">
                  {link.icon} {link.label}
                </div>
              </Link>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
