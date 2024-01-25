import { notification } from "antd";
import { createContext } from "react";

const NotificationContext = createContext();

export { NotificationContext };

const NotificationContextProvider = ({ children }) => {
    const [api, notificationHolder] = notification.useNotification();

    const createNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            duration: 3
        });
    };

    const onSuccess = (message, desc) => {
        createNotification("success", message, desc);
    }

    const onError = (message, desc) => {
        createNotification("error", message, desc);
    };

    return (
        <NotificationContext.Provider value={{ onSuccess, onError }}>
            {notificationHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
