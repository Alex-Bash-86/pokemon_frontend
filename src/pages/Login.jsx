import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import { login } from "../data/auth.js";
import { useNavigate } from "react-router";

const Login = () => {
  const { user, setUser, isRefreshing, setIsRefreshing } = useContext(
    AuthContext
  );

  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });

  // const [isOpen, setIsOpen] = useState(true);

  const handleInput = e =>
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formState.username || !formState.password) {
      // toast.error("All fields are required");
      /*  throw new Error("All fields are required"); */
      return;
    }

    try {
      const data = await login(formState);

      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
      navigate("/battle");
      // setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // if (!isOpen) return null;

  return (
    <div className=" inset-0 flex items-center justify-center h-full ">
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 w-full max-w-xl p-8 rounded-2xl shadow-2xl "
      >
        {/* Close Button */}
        {/*      <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-xl font-bold text-gray-700 hover:text-black"
        >
          &times;
        </button>
 */}
        <fieldset className=" flex flex-col gap-6">
          <legend className="text-2xl font-bold text-center text-white mb-4 ">
            Login
          </legend>

          {/* Username */}
          <label className="fieldset-label text-lg" htmlFor="username">
            Username
          </label>
          <input
            className="input input-lg w-full" // volle Breite
            type="text"
            required
            placeholder="your_username"
            name="username"
            onChange={handleInput}
            value={formState.username}
            id="username"
          />

          {/* Password */}
          <label className="fieldset-label text-lg" htmlFor="password-login">
            Password
          </label>
          <input
            type="password"
            className="input input-lg w-full" // volle Breite
            required
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={formState.password}
            id="password-login"
          />

          {/* Button */}
          <button
            disabled={!formState.username || !formState.password}
            className="btn btn-neutral btn-lg mt-4 w-full"
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
