import { useState, useEffect } from 'react';
import AuthContext from "./AuthContext";

import axios from "axios";
import { API_URL } from "../config";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [resignation, setResignation] = useState(null);

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const response = await axios.get(`${API_URL}/user/me`);
                return response.data;
            } catch (err) {
                console.log(err);
                return null; 
            }
        }
        fetchCurrentUser().then(data => {
            setUser(data); 
        });
    }, []);
    
    const login = (data) => {
        setUser(data); 
    };

    const logout = () => {
        setUser(null);
        setResignation(null); 
    };

    const updateResignationStatus = (data) => {
        setResignation(data);
    };

    const getUser =  { user, resignation };

    return (    
        <AuthContext.Provider value={{getUser, login, logout, updateResignationStatus}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
 