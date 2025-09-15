import { Link, useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext.jsx";
import { useContext } from "react";
import { logout } from "../data/auth.js";

import { useToast } from "../contexts/ToasterContext.jsx";
const NavBar = () => {
  const { user, setUser, isRefreshing, setIsRefreshing } = useContext(
    AuthContext
  );

  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      /* showToast(
        <div className="text-center text-xl">You have been logged out.</div>,
        "success"
      ); */
      setUser(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (isRefreshing) {
    return <div className="skeleton h-32 w-32"></div>;
  }
  return (
    <nav className="bg-red-950">
      <div>
        <p className="text-2xl sm:text-4xl flex justify-center font-bold py-2">
          Pokemon Battle Contest
        </p>
        <p></p>
        <ul className="text-xs sm:text-2xl">
          <div className="flex justify-center">
            <Link
              className=" m-4 hover:text-slate-500 transition duration-400"
              to="/"
            >
              Home
            </Link>
            <Link
              className=" m-4 hover:text-slate-500 transition duration-400"
              to="myroster"
            >
              My roster
            </Link>
            <Link
              className=" m-4 hover:text-slate-500 transition duration-400"
              to="battle"
            >
              Battle
            </Link>
            <Link
              className=" m-4 hover:text-slate-500 transition duration-400"
              to="leaderboard"
            >
              Leaderboard
            </Link>

            {!user ? (
              <>
                <Link
                  className=" m-4 hover:text-slate-500 transition duration-400"
                  to="signup"
                >
                  SignUp
                </Link>
                <Link
                  className=" m-4 hover:text-slate-500 transition duration-400"
                  to="login"
                >
                  Login
                </Link>
              </>
            ) : (
              <Link
                className=" m-4 hover:text-slate-500 transition duration-400"
                onClick={handleLogout}
              >
                Logout
              </Link>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
