import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={'/'}>
          <h1 className=" font-bold text-lg sm:text-2xl flex flex-wrap cursor-pointer">
            Real Estate
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="cursor-pointer" />
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline text-slate-700 hover:underline transition cursor-pointer">
              Home
            </li>
          </Link>
          <Link to={"/sign-in"}>
            <li className="hidden sm:inline text-slate-700 hover:underline transition cursor-pointer">
              Signin
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline text-slate-700 hover:underline transition cursor-pointer">
              About
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
