import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextProvider from "./Context/User.jsx";
import NotificationContextProvider from "./Context/Notification.jsx";
import StoreContextProvider from "./Context/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StoreContextProvider>
            <UserContextProvider>
                <NotificationContextProvider>
                    <App />
                </NotificationContextProvider>
            </UserContextProvider>
        </StoreContextProvider>
    </React.StrictMode>
);
