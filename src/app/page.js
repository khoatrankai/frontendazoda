"use client";
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import './globals.css'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
  const [userId,setUserId] = useState(null);
  const [avatar,setAvatar] = useState(null);
  const getCookie = () => {
    const cookieValue = Cookies.get('cookieRefreshToken');
    return cookieValue
  }
  useEffect(()=> {
    const loaddata = async()=>{
      try{
        const refreshToken = getCookie();
        const res = await axios.post(`${process.env.URL_API}/api/refreshtoken`,{refreshToken})
        if(res){
          setUserId(res.data.tokenDetails.id)
          Cookies.set('cookieUserId',res.data.tokenDetails.id,{ expires: 30 })

        }
        
      }catch(err){
        console.log(err)

      }
    }
    loaddata();
  },[])
  return (
    <>
      <ToastContainer/>
      <div>
        {
          userId
        }
      </div>
      
    </>
  )
}
