
import React, { useEffect, useState } from 'react'
import LayoutModal from './layout.modal.js'
import AlertconfirmModal from './alertconfirm.modal.js'
import axios from 'axios'

const modal = ({setCheckLoad,typeModal,dataTab,setTab}) => {
  const [dataLoad,setDataLoad] = useState(null)
  const [tabAlert,setTabAlert] = useState(false)
  const [alertName,setAlertName] = useState('')
  const [alertType,setAlertType] = useState('')
  const [resultAlert,setResultAlert] = useState(false)
  const [disabled,setDisabled] = useState(false)
  const [loadImg,setLoadImg] = useState(null)

  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setLoadImg(urls[0])
  };
  const checkLoadImg = (value) => {
    try{
      return value.includes("/uploads")
    }catch{
      return false
    }
  }
  useEffect(()=>{
    console.log(dataLoad)
  },[dataLoad])
  useEffect(()=>{
    const loaddata = () => {
      setDataLoad(dataTab)
      setLoadImg(dataTab.image)
    }
    const newloaddata = () => {
      setDataLoad({name:'',image: '',url:''})
    }
    switch(typeModal){
      case 'add':
        newloaddata()
        break
      case 'detail':
        loaddata()
        setDisabled(true)
        break
      default:
        loaddata()
    }
  },[])
  useEffect(()=>{
    if(resultAlert){
      const loaddata = async() =>{
        const formdata = new FormData()
        Object.keys(dataLoad).forEach(key => { 
            formdata.append(key,dataLoad[key])
        })
        switch(alertType){
          case 'create':
            const data = await axios.post(`${process.env.URL_API}/api/slideshow/create`,formdata)
            if(data.data.success){
              setTab(false)
            }
            break
          default:
            const dataUp = await axios.put(`${process.env.URL_API}/api/slideshow/update/${dataLoad._id}`,formdata)
            if(dataUp.data.success){
              setTab(false)
            }
            break
        }
      }
      loaddata()
      setTimeout(()=>{setCheckLoad(true)},100)
      
      
    }
  },[resultAlert])
  const handleUpdateAlert = (e,name) => {
    setResultAlert(false)
    setAlertType(e.target.name)
    setTabAlert(true)
    switch(e.target.name){
      case 'create':   
        break
      case 'update':
        setAlertName(name)
        break
    }
  }
  const handleUpdateData = async(e)=>{
    switch(e.target.name){
      case 'name':
        setDataLoad({...dataLoad,name: e.target.value})
        break
      case 'deleteImage':
        setDataLoad({...dataLoad,image: ''})
        setLoadImg(null)
        break
      case 'image':
        setDataLoad({...dataLoad,image: e.target.files[0]})
        break
      case 'url':
        setDataLoad({...dataLoad,url: e.target.value})
        break

    }
    
  }
  return (
    <>
      <div className='bg-white h-5/6 w-3/5 overflow-y-scroll px-16 py-12 relative'>
      <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
      {typeModal === 'add'?
        <h1 className='font-bold text-xl mb-12'>Thông tin tạo mới</h1>:
        <h1 className='font-bold text-xl mb-12'>Thông tin ID: {dataLoad?dataLoad._id: ''} </h1>
      } 
      {
        dataLoad?
        <ul>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Tên slide*</label>
          <input disabled={disabled} name='name' className='outline-none bg-slate-200 p-3' value={dataLoad.name} onChange={handleUpdateData} placeholder='Tên slide' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Image</label>
          <input disabled={disabled} name='image' className='outline-none bg-slate-200 p-3' onChange={
            (e)=>{
              handleImageUpload(e)
              handleUpdateData(e)
            }
            } type='file'/>
          {
            loadImg &&
            <div className='w-32 h-56 relative mr-4'>
                    <img className='w-full h-full' src={checkLoadImg(loadImg)?`${process.env.URL_API}${loadImg}` : loadImg}/>
                    {
                      typeModal !== 'detail' && dataLoad.image ?<button name='deleteImage' className='absolute top-2 right-2 w-8 h-8 font-bold bg-white rounded-full' onClick={(e)=>{handleUpdateData(e)}}>X</button>: ''
                    }
                    
            </div> 
          }
          
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Url</label>
          <input disabled={disabled} name='url'  className='outline-none bg-slate-200 p-3'  value={dataLoad.url} onChange={(e)=>{handleUpdateData(e)}} placeholder='URL' type='url'/>
        </li>
      </ul> :''
      }
      {
        typeModal == 'add' ? <button name='create' className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' onClick={(e)=>{
         handleUpdateAlert(e,dataLoad.name)
        }} type='submit'>Thêm</button> : typeModal == 'update' ? <button className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' name='update' onClick={(e)=>{
         handleUpdateAlert(e,dataLoad.name)
        }} type='submit'>Cập nhật</button> : ''
      }
    
      </div>
      {
        tabAlert ? <LayoutModal children={<AlertconfirmModal name={alertName} type={alertType} result={setResultAlert} setTab={setTabAlert}/>} /> : ''
      }
      
    </>
  )
}

export default modal