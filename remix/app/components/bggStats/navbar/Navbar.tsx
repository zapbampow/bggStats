import Menu from "../icons/Menu";
import { HomeMeeple } from "../icons";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-8 py-4">
      <a href="/bggstats" className="flex">
        <HomeMeeple width={24} />
      </a>
      <a href="#menu">
        <Menu />
      </a>
    </nav>
  );
}
