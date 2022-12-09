import Menu from "../icons/Menu";
import { HomeMeeple } from "../icons";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-2 py-4 lg:px-8">
      <a href="/bggstats" className="flex text-slate-100">
        <HomeMeeple width={24} />
      </a>
      <a href="#menu">
        <Menu />
      </a>
    </nav>
  );
}
