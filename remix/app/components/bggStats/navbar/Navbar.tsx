import React from "react";
import Meeple from "../icons/Meeple";
import Home from "../icons/Home";
import Menu from "../icons/Menu";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-8 py-4">
      <a href="/bggstats" className="flex">
        <Home />
        <Meeple width={24} />
      </a>
      <a href="#menu">
        <Menu />
      </a>
    </nav>
  );
}
