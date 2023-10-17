"use client"
import axios from 'axios'
import React from 'react'

const page = () => {
  const postFile = async(files)=>{
    const formdata = new FormData()
    formdata.append("file",files)
    try{
      const re = await axios.post(`${process.env.URL_API}/api/product/create`,formdata)
      console.log(re)
    }catch(err){
      console.log(err)
    }
  }
  const mutiplePostFile = async(files) => {
    const formdata = new FormData()
    try{
      for(let i = 0;i<files.length;i++){
        formdata.append("fileee",files[i])
      }
      console.log(formdata.get('fileee'))
      const re = await axios.post(`${process.env.URL_API}/api/product/create`,formdata)
      console.log(re)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div>
      <input type='file' required multiple onChange={(e) => {mutiplePostFile(e.target.files)}}/>
    </div>
  )
}

export default page