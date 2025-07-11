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

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = () => useContext(AlertContext);
