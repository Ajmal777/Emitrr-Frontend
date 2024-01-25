import { createContext, useState } from "react";
import getListOfLanguages from "../Functions/getListOfLanguages";

const StoreContext = createContext();

export { StoreContext };

export default function StoreContextProvider({ children }) {
    const [languages, setLanguages] = useState();
    const [token, setToken] = useState();
    const [URL, setUrl] = useState();
    const [loading, setLoading] = useState(false);

    function initializeStore() {
        getListOfLanguages().then((res) => {
            setLanguages(res);
        });

        const token = localStorage.getItem("token");
        setToken(token);

        const URL = import.meta.env.VITE_BACKEND_URL;
        setUrl(URL);
    }

    return (
        <StoreContext.Provider
            value={{
                languages,
                setLanguages,
                token,
                setToken,
                URL,
                setUrl,
                initializeStore,
                loading, setLoading
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}
