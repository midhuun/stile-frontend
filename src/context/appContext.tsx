'use client';
import { ReactNode, useState } from "react";
import { createContext } from "react"
interface HeaderContextType {
    isUserOpen: boolean;
    setisUserOpen: React.Dispatch<React.SetStateAction<boolean>>;
    iscartOpen: boolean;
    setiscartOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean;
    setisAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  // Set default values for the context
  const defaultContext: HeaderContextType = {
    isUserOpen: false,
    setisUserOpen: () => {},
    iscartOpen: false,
    setiscartOpen: () => {},
    isAuthenticated: false,
    setisAuthenticated: () => {},
  };
export const HeaderContext = createContext<HeaderContextType>(defaultContext);

const HeaderProvider = ({ children }:{children:ReactNode}) =>{ 
    const [isUserOpen,setisUserOpen] = useState(false);
    const [iscartOpen,setiscartOpen] = useState(false);
    const [isAuthenticated,setisAuthenticated] = useState(false);
    return(
    <HeaderContext.Provider value={{isUserOpen,setisUserOpen,iscartOpen,setiscartOpen,isAuthenticated,setisAuthenticated}}>{children}</HeaderContext.Provider>
    )
}
export default HeaderProvider;