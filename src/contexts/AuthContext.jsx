import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(true);

    const navigate = useNavigate();

    const signup = async (formState) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),    
                credentials: "include"
            });

            if (!res.ok) throw new Error("Signup failed");
            const data = await res.json();
            
            setUser(data.data);

            alert(`Signup successful, ${data.data.username}! Please log in.`);
            
            navigate('/login');
            console.log("Signup successful");
            
        } catch (error) {
            console.log(error);
        };
            
    };

    const login = async (formState) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formState),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Login failed");
            const data = await res.json();
            //console.log(data);
            
            setUser(data.data);

            alert(`Login successful, ${data.data.username}. Role: ${data.data.role}`);
            console.log(`Login successful, ${data.data.username}`);

            navigate('/');
        }
        catch (error) {
            console.log(error);
        }
    };
    
    const logout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
                method: "DELETE",
                credentials: "include",
            }); 

            const {msg} = await res.json();
            
            if (!res.ok) throw new Error("Logout failed");
            setUser(null);

            navigate('/');

            alert(msg);
            //alert("Logout successful");
            console.log("Logout successful");
        } catch (error) {
            alert("Logout failed");
            console.log(error);
        }
    };

    useEffect(() => {
        const refresh = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
                method: "GET",
                credentials: "include",
            });

            const {data} = await res.json();

            setUser(data.data);
            setIsRefreshing(false);
        };

        refresh();
                
    }, []);


  return (
    <AuthContext.Provider value={{user, setUser, signup, login, logout, isRefreshing}}>
        {children}
    </AuthContext.Provider>
  );
};

export {AuthContextProvider, AuthContext};