import { createContext, useContext, useEffect, useState } from "react";

import { me } from "../data/auth.js";

import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

 

  useEffect(() => {
    const refresh = async () => {
      try {
        const data = await me();

        // console.log("user data", data.data);

        setUser(data.data);
      } catch {
        setUser(null); // User null, aber nicht direkt navigieren
      } finally {
        setIsRefreshing(false); // <- immer false setzen
      }
    };
    refresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isRefreshing,
        setIsRefreshing
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
