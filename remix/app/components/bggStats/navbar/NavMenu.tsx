import React, { Fragment } from "react";
import { Menu } from "@headlessui/react";
import { GithubIcon, Meeple, Menu as MenuIcon, Trash } from "../icons";
import { Link } from "@remix-run/react";

const links = [
  { href: "/bggstats/about", label: "About", icon: <Meeple width={16} /> },
  {
    href: "https://github.com/zapbampow/bggStats",
    label: "GitHub",
    external: true,
    icon: <GithubIcon />,
  },
];

export default function NavMenu() {
  return (
    <Menu>
      <Menu.Button>
        <MenuIcon />
      </Menu.Button>
      <Menu.Items className="absolute right-0 flex flex-col gap-4 p-4 text-white rounded-md top-8 bg-slate-900 w-max">
        {links.map((link) => (
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

        <Menu.Item as={"button"} className="flex items-center gap-2 basis-full">
          <Trash width={16} />
          Delete data saved in your browser
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
