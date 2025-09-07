import { useState } from 'react';
import AuthContext from "./AuthContext";

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [resignation, setResignation] = useState(null);

    const login = (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        setResignation(null);
        localStorage.removeItem("user");
    };

    const updateResignationStatus = (data) => {
        setResignation(data);
    };

    const getUser =  { user: user || JSON.parse(localStorage.getItem("user")), resignation };

    return (    
        <AuthContext.Provider value={{getUser, login, logout, updateResignationStatus}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
 