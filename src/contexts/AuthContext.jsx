import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(true);

    const navigate = useNavigate();

    const signup = async (formState) => {
        try {
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),    
                credentials: "include",
            });

            if (!res.ok) throw new Error("Signup failed");
            const data = await res.json();
            
            setUser(data.data);

            alert("Signup successful! Please log in.");
            
            navigate('/login');
            console.log("Signup successful", data);
            
        } catch (error) {
            console.log(error);
        };
            
    };

    const login = async (formState) => {
        try {
            const res = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Login failed");
            const data = await res.json();
            
            setUser(data.data);

            alert(`Login successful, ${data.data.firstName}`);
            console.log(`Login successful, ${data.data.firstName}`);

            navigate('/leaderboard');
        }
        catch (error) {
            console.log(error);
        }
    };
    
    const logout = async () => {
        try {
            const res = await fetch("http://localhost:3000/users/logout", {
                method: "DELETE",
                credentials: "include",
            }); 

            const {msg} = await res.json();
            
            if (!res.ok) throw new Error("Logout failed");
            setUser(null);

            navigate('/');

            alert(msg);
            alert("Logout successful");
            console.log("Logout successful");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await fetch("http://localhost:3000/users/me", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Please log in again");
      const { data } = await res.json();
      setUser(data);
    } catch {
      setUser(null);   // User null, aber nicht direkt navigieren
    } finally {
      setIsRefreshing(false); // <- immer false setzen
    }
  };
  refresh();
    }, [navigate]);


  return (
    <AuthContext.Provider value={{user, setUser, signup, login, logout, isRefreshing}}>
        {children}
    </AuthContext.Provider>
  );
};

export {AuthContextProvider, AuthContext};