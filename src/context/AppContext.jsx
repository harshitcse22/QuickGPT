import { createContext, useContext } from "react";


const AppContext = createContext()

export const AppContextProvider = ({children}) =>{
       
     return (
        <AppContext.Provider value={value}>
             {children}
        </AppContext.Provider>
     )
}

export const useAppContext = () => useContext(AppContext)