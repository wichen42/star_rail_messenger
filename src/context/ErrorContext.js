import { createContext, useState} from "react";

export const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = (error) => {
        setError(error);
    };

    const clearError = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{error, handleError, clearError}}>
            {children}
        </ErrorContext.Provider>
    );
};