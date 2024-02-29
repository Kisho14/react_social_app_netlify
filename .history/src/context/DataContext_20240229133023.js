import { createContext, useState, useEffect, Children } from "react";

const DataContext = createContext({})

//DataProvider function desides which components that we need to share the data
export const DataProvider = ({children}) => {
    return(
        <DataContext.Provider value={{
            
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext