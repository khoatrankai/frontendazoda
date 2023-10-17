"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';


const page = () => {
    const [email,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const login = async() => {
        try{
            const res = await axios.post(`${process.env.URL_API}/api/refreshtoken/login-customer`,{email,password})
            if(res.data.success){
                Cookies.set('cookieRefreshToken', res.data.refreshToken, { expires: 30 });
                window.location.href ="http://localhost:3000/";
            }
            
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <input onChange={(e)=> {setUsername(e.target.value)}} placeholder='Username'/>
        <input onChange={(e)=> {setPassword(e.target.value)}} placeholder='Password'/>
        <button onClick={()=> {login()}}>Đăng nhập</button>
    </div>
  )
}

export default page