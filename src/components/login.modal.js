"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useApp } from '@/Context/AppProvider';
import { data } from 'jquery';
import jwt from 'jsonwebtoken';



const page = () => {
    const {login} = useApp()

    // const {user,login,setUser} = useAuth()
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const handlelogin = async() => {
        try{
            
            const res = await axios.post(`${process.env.URL_API}/api/refreshtoken/login-admin`,{username,password})
            if(res.data.success){
                Cookies.set('cookieRefreshToken', res.data.refreshToken, { expires: 30 });
                const decod = jwt.decode(res.data.accessToken)
                login({id: decod.id,username: decod.username})
               
            }
            
            
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <input onChange={(e)=> {setUsername(e.target.value)}} placeholder='Username'/>
        <input onChange={(e)=> {setPassword(e.target.value)}} placeholder='Password'/>
        <button onClick={()=> {handlelogin()}}>Đăng nhập</button>
    </div>
  )
}

export default page