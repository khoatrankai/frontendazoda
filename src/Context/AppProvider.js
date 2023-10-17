"use client"
import {createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';
import { redirect } from 'next/navigation';
import LoginModal from '@/components/login.modal'
import axios from 'axios';
// import { Redirect } from 'react-dom'


export const AppContext = createContext();
export default function AppProvider({ children }) {
    const [userInfo,setUserInfo] = useState(null) 
    // const [listPage,setListPage] = useState([]) 
    const [authAdmin,setAuthAdmin] = useState([])
    const [checkLoadAuth,setCheckLoadAuth] = useState(true)
    const [pathname,setPathname] = useState('')
    useEffect(()=>{
      if(userInfo){
        const pageListAdmin = userInfo.pageList.map(dt => {
          return {url: dt.pageId.url,func: dt.func}
        })
        setAuthAdmin(pageListAdmin)
      }
    },[userInfo])
    
    const handleLoadCheckAuth = (path)=>{
      if(pathname !== path){
        setCheckLoadAuth(true)
        setPathname(path)
      }
    }
    const {isLoggedIn,
      user,
      login,
      logout} = useAuth()
    useEffect(()=>{
      if(isLoggedIn && checkLoadAuth){
        const loaddata = async() => {
          const data = await axios.get(`${process.env.URL_API}/api/admin/list/${user._id}`)
          console.log(data,user.id)
          if(data != null && data.data != null && data.data.data != null){
            const newData = data.data.data
            delete newData.password
            setUserInfo(newData)
            
          }
        }
        loaddata()
        setCheckLoadAuth(false)
      }
    },[user,checkLoadAuth])

    return (
        <AppContext.Provider value={{
            login,
            logout,
            authAdmin,
            pathname,
            handleLoadCheckAuth
        }}>
        {
          isLoggedIn? children: <LoginModal/>
        }
            
        </AppContext.Provider>
    );
}
export function useApp() {
    return useContext(AppContext);
  }