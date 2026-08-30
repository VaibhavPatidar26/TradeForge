import React, { createContext } from "react";
import { useContext } from "react";

const AppContext = createContext(null);

const AppProvider = ({ children }) => {

    const ContextValue = {

    }

    return (
        <AppContext.Provider value={ContextValue}>
            {children}
        </AppContext.Provider>
    )

}

export default AppProvider