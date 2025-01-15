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
    cart:any;
    setcart:React.Dispatch<React.SetStateAction<any>>;
    isFavouriteOpen:boolean;  
    setisFavouriteOpen:React.Dispatch<React.SetStateAction<boolean>>;
    favourites:any;
    setFavourites:React.Dispatch<React.SetStateAction<any>>;
    user:{},
    setUser:React.Dispatch<React.SetStateAction<any>>;
  }
  
  // Set default values for the context
  const defaultContext: HeaderContextType = {
    isUserOpen: false,
    setisUserOpen: () => {},
    iscartOpen: false,
    setiscartOpen: () => {},
    isAuthenticated: false,
    setisAuthenticated: () => {},
    cart:[],
    setcart:() => {},
    isFavouriteOpen:false,
    setisFavouriteOpen:()=>{},
    favourites:[],
    setFavourites:()=>{},
    user:{},
    setUser:()=>{},
  };
export const HeaderContext = createContext<HeaderContextType>(defaultContext);

const HeaderProvider = ({ children }:any) =>{ 
    const [isUserOpen,setisUserOpen] = useState<any>(false);
    const [iscartOpen,setiscartOpen] = useState<any>(false);
    const [isAuthenticated,setisAuthenticated] = useState<any>(false);
    const [isFavouriteOpen,setisFavouriteOpen] = useState<any>(false);
    const [favourites,setFavourites] = useState<any>([]);
    const [cart,setcart] = useState<any>([]);
    const [user,setUser] = useState<any>({});
    return(
    <HeaderContext.Provider
     value={{isUserOpen,setisUserOpen,iscartOpen,setiscartOpen,isAuthenticated,
      setisAuthenticated,cart,setcart,isFavouriteOpen
      ,setisFavouriteOpen,favourites,setFavourites,user,setUser
    }}>{children}</HeaderContext.Provider>
    )
}
export default HeaderProvider;