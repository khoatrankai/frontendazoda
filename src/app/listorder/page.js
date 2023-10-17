"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { data } from 'autoprefixer';

const page = () => {
    const [dataOrder,setDataOrder] = useState([]);
    useEffect(()=>{
        const loaddata = async() => {
            try {
                const useId = Cookies.get('cookieUserId');
                const res = await axios.get(`${process.env.URL_API}/api/order/orderid/${useId}`);
                // console.log(useId,useId.length,res)
                if(res.data.success)
                    {
                        // console.log(res.data.data)
                        const listorder = res.data.data.productList;
                        setDataOrder(listorder)
                    }
            }catch(err){
    
            }
        }
        loaddata();
    },[])
    useEffect(()=>{
        // console.log(dataOrder)
    },[dataOrder])
  return (
    <div>Home
    {dataOrder.map((item,index) => (
      <p key={index}>{item.product.name}</p>
    ))}
    </div>
  )
}

export default page