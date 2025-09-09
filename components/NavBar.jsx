import { Link } from "react-router";

const NavBar = () => {
  return (
    <nav className="w-full bg-red-950">
      <div>
        <p className="text-4xl flex justify-center">Test Project Page</p>
        <p></p>
        <ul>
          <li className="flex justify-center">
            <Link
              className="text-2xl m-4 hover:text-slate-500 transition duration-400"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-2xl m-4 hover:text-slate-500 transition duration-400"
              to="myroster"
            >
              My roster
            </Link>
            <Link
              className="text-2xl m-4 hover:text-slate-500 transition duration-400"
              to="battle"
            >
              Battle
            </Link>
            <Link
              className="text-2xl m-4 hover:text-slate-500 transition duration-400"
              to="leaderboard"
            >
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
