import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-red-950">
      <div>
        <p className="text-2xl sm:text-4xl flex justify-center font-bold py-2 text-white">
          Pokemon Battle Contest
        </p>
        <ul className="text-xs sm:text-2xl text-white">
          <li className="flex justify-center">
            <Link
              className="m-4 hover:text-slate-500 transition duration-400"
              to="/"
            >
              Home
            </Link>
            <Link
              className="m-4 hover:text-slate-500 transition duration-400"
              to="/myroster"
            >
              My roster
            </Link>
            <Link
              className="m-4 hover:text-slate-500 transition duration-400"
              to="/battle"
            >
              Battle
            </Link>

            {/* Leaderboard nur sichtbar, wenn user eingeloggt */}
            {user && (
              <Link
                className="m-4 hover:text-slate-500 transition duration-400"
                to="/leaderboard"
              >
                Leaderboard
              </Link>
            )}

            <Link
              className="m-4 hover:text-slate-500 transition duration-400"
              to="/signup"
            >
              Sign Up
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="m-4 hover:text-slate-500 transition duration-400"
              >
                Logout
              </button>
            ) : (
              <Link
                className="m-4 hover:text-slate-500 transition duration-400"
                to="/login"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
