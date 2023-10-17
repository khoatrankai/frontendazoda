"use client"
import {createContext, useContext, useEffect, useState } from 'react';
import { useApp } from './AppProvider';


export const CheckContext = createContext();
export default function CheckProvider({ children }) {
    const {authAdmin,handleLoadCheckAuth,pathname} = useApp()
    const [funcAll,setFunc] = useState({
        create: false,delete: false,update: false,read: false,pathname: ''
    })
    const handleUpdatePath = ()=>{
        handleLoadCheckAuth(document.location.pathname)
    }
    useEffect(()=>{
        // setFunc({read: true,pathname: pathname,create: true,delete: true,update: true})
        const newFunc = authAdmin.filter(dt => {return dt.url === document.location.pathname})
        if(newFunc.length> 0){
            if(newFunc[0].func !== undefined)
            {
                switch(newFunc[0].func){
                    case 0:
                        setFunc({read: true,pathname: document.location.pathname,create: true,delete: true,update: true})
                        break;
                    case 1:
                        setFunc({read: true,pathname: document.location.pathname,create: false,delete: false,update: false})
                        break;
                    case 2: 
                        setFunc({read: true,pathname: document.location.pathname,create: true,delete: false,update: false})
                        break;
                    case 3:
                        setFunc({read: true,pathname: document.location.pathname,create: false,delete: true,update: false})
                        break
                    case 4:
                        setFunc({read: true,pathname: document.location.pathname,create: false,delete: false,update: true})
                        break
                    case 5:
                        setFunc({read: true,pathname: document.location.pathname,create: false,delete: true,update: true})
                        break;
                    case 6:
                        setFunc({read: true,pathname: document.location.pathname,create: true,delete: false,update: true})
                        break;
                    case 7:
                        setFunc({read: true,pathname: document.location.pathname,create: true,delete: true,update: false})
                        break;
                }
            }
            
        }else{
            setFunc({create: false,delete: false,pathname: document.location.pathname,read: false,update: false})
        }
    },[authAdmin])
    return (
        <CheckContext.Provider value={{
            funcAll,
            handleUpdatePath
        }}>
        {children}
            
        </CheckContext.Provider>
    );
}
export function useCheckApp() {
    return useContext(CheckContext);
  }