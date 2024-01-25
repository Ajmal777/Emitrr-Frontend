import axios from "axios";
import React, { useState } from "react";

const UserContext = React.createContext();

export { UserContext };

const UserContextProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [localUserData, setLocalUserData] = useState();

    function setUserData() {
        const URL = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem('token');
        axios.get(`${URL}/profile`, { headers: {token}})
        .then(res => {
            setLocalUserData(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    } 

    function logoutUser(){
        localStorage.removeItem('token');
        setLocalUserData(null);
        setLogin(false);
    }

    return (
        <UserContext.Provider value={{ login, setLogin, localUserData, setLocalUserData, setUserData, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
