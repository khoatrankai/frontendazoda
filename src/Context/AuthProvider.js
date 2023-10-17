"use client"
import {createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';    
import jwt from 'jsonwebtoken';
import axios from 'axios';

export const AuthContext = createContext();
export default function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
    };
    useEffect(()=>{
        const cookieRefreshToken = Cookies.get('cookieRefreshToken')
        if(cookieRefreshToken){
            const loaddata = async()=>{
                const data = await axios.post(`${process.env.URL_API}/api/refreshtoken/admin`,{refreshToken: cookieRefreshToken})
                if(data.data.success){
                    const decode = jwt.decode(data.data.accessToken)
                    login({_id: decode._id,username: decode.username})
                }
            }
            loaddata()
        }
    },[])
    
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
  };
    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            user,
            login,
            logout
          }}>
            {children}
        </AuthContext.Provider>
    );
}
export function useAuth() {
    return useContext(AuthContext);
  }