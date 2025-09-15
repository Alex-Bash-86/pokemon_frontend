import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const me = async () => {
  const response = await fetch("http://localhost:3000/users/auth/me", {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    console.log("Auth check failed:", response.status, response.statusText);
    // throw new Error("Auth check failed");
    return;
  }
  const data = await response.json();

  return data;
};

export const signup = async formState => {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formState),
    credentials: "include"
  });

  if (!res.ok) throw new Error("Signup failed");

  console.log("res", res);
  const data = await res.json();

  return data;

  // setUser(data.data);

  // console.log("Signup successful", data, data);

  // navigate("/login");
};

export const login = async formState => {
  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formState),
    credentials: "include"
  });

  if (!res.ok) {
    // throw new Error("Login failed");

    // navigate("/login");
    toast.error("Login failed. Please check your credentials and try again.");

    return;
  }
  const data = await res.json();

  return data;

  // setUser(data.data);

  // console.log(`Login successful, ${data.data.username}`);

  // navigate("/leaderboard");
};

export const logout = async () => {
  const res = await fetch("http://localhost:3000/users/logout", {
    method: "DELETE",
    credentials: "include"
  });

  if (!res.ok) {
    // throw new Error("Logout failed");
    return;
  }

  // const { message } = await res.json();

  // setUser(null);

  // navigate("/");

  // console.log("Logout successful");
};
