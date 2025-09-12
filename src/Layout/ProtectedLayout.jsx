import{ useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


const ProtectedLayout = () => {
    const {user, isRefreshing} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (isRefreshing) return; // Warte, bis der Refresh-Vorgang abgeschlossen ist
        if (!user) 
            navigate('/login');
        }, [user, navigate, isRefreshing]);


    if (!user) return null;
    
    return <Outlet />;
};

export default ProtectedLayout;