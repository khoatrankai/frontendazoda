"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const page = () => {
  const [listBrand,setListBrand] = useState([]);
  const [listSlider,setListSlider] = useState([]);
  const [activeBrand,setActiveBrand] = useState(0);
  useEffect(()=>{
    const loaddata = async()=>{
      const dataBrand = await axios.get(`${process.env.URL_API}/api/brand/list`);
      const dataSlider = await axios.get(`${process.env.URL_API}/api/slideshow/list`)
      if(dataBrand.data.success){
        setListBrand(dataBrand.data.data)
      }
      if(dataSlider.data.success){
        setListSlider(dataSlider.data.data)
      }

    }
    loaddata()
  },[])
  useEffect(()=>{
    console.log(listBrand)
  },[listBrand])
  return (
    <div>
        <>
          <div>
            <h1>Tạo slider</h1>
          </div>
        </>
        <ul  className='flex relative'>

        </ul>
    </div>
  )
}

export default page