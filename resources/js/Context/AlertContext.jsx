import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        message: "",
        type: "success", // success | error | warning | info
        visible: false,
    });

    const showAlert = (message, type = "success", duration = 3000) => {
        setAlert({ message, type, visible: true });
        setTimeout(() => {
            setAlert((prev) => ({ ...prev, visible: false }));
        }, duration);
    };

    const hideAlert = () => {
        setAlert((prev) => ({ ...prev, visible: false }));
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
