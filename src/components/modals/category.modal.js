
import React, { useEffect, useState } from 'react'
import LayoutModal from './layout.modal.js'
import AlertconfirmModal from './alertconfirm.modal.js'
import axios from 'axios'
import ListTopModal from './list-product-category.modal.js'

const modal = ({setCheckLoad,typeModal,dataTab,setTab}) => {
  const [dataLoad,setDataLoad] = useState(null)
  const [tabAlert,setTabAlert] = useState(false)
  const [alertName,setAlertName] = useState('')
  const [alertType,setAlertType] = useState('')
  const [resultAlert,setResultAlert] = useState(false)
  const [disabled,setDisabled] = useState(false)
  const [tabTopList,setTabTopList] = useState(false)
  const [loadIcon,setLoadIcon] = useState(null)

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
      setLoadIcon(dataTab.icon)
    }
    const newloaddata = () => {
      setDataLoad({name:'',icon: '',slug:'',topList: []})
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

          if(key === "topList")
          {
          
              formdata.append(key,JSON.stringify(dataLoad[key]))

          }else{
            formdata.append(key,dataLoad[key])

          }
        })
        switch(alertType){
          case 'create':
            const data = await axios.post(`${process.env.URL_API}/api/category/create`,formdata)
            console.log(formdata)
            if(data.data.success){
              setTab(false)
            }
            break
          default:
            const dataUp = await axios.put(`${process.env.URL_API}/api/category/update/${dataLoad._id}`,formdata)
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
  const handleUpdateDataTop = (dataTopNew)=>{
    setDataLoad({...dataLoad,topList: dataTopNew})
  }
  const handleImageUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const urls = selectedFiles.map((file) => URL.createObjectURL(file));
    setLoadIcon(urls[0])
  };
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
      case 'deleteIcon':
        setDataLoad({...dataLoad,icon: ''})
        setLoadIcon(null)
        break
      case 'icon':
        setDataLoad({...dataLoad,icon: e.target.files[0]})
        break
      case 'slug':
        setDataLoad({...dataLoad,slug: e.target.value})
        break

    }
    
  }
  const handleUpdateTopList = (type,id) => {
    switch(type){
      case 'add':
        setDataLoad({...dataLoad,topList: dataLoad.topList.push({product: id})})
        break
      default:
        setDataLoad({...dataLoad,topList: dataLoad.topList.filter(dt => {return dt.product._id !== id})})
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
          <label className='font-semibold'>Tên danh mục*</label>
          <input disabled={disabled} name='name' className='outline-none bg-slate-200 p-3' value={dataLoad.name} onChange={handleUpdateData} placeholder='Tên danh mục' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Icon*</label>
          <input disabled={disabled} name='icon' className='outline-none bg-slate-200 p-3' onChange={
            (e)=>{
              handleImageUpload(e)
              handleUpdateData(e)

            }
            } type='file'/>
          {
            loadIcon &&
            <div className='w-32 h-56 relative mr-4'>
                    <img className='w-full h-full' src={checkLoadImg(loadIcon)?`${process.env.URL_API}${loadIcon}` : loadIcon}/>
                    {
                      typeModal === 'update' ?<button name='deleteIcon' className='absolute top-2 right-2 w-8 h-8 font-bold bg-white rounded-full' onClick={(e)=>{
                        handleUpdateData(e)
                        
                        }}>X</button>: ''
                    }
                    
            </div> 
          }
          
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Slug</label>
          <input disabled={disabled} name='slug'  className='outline-none bg-slate-200 p-3'  value={dataLoad.slug} onChange={(e)=>{handleUpdateData(e)}} placeholder='Slug' type='url'/>
        </li>
        {
          typeModal !== 'add' ?  <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Top Product</label>
          <div className='bg-slate-200 pl-4 pb-4'>
            <div className='text-end'>
              <button disabled={disabled} onClick={()=>{setTabTopList(true)}} className=' bg-black p-2 rounded-bl-xl font-bold text-white hover:text-gray-300'>Chỉnh sửa</button>
            </div>
            <table className='w-full'>
              <tbody>
                <tr className='text-center'>
                  <th className='w-1/4'>Hình ảnh</th>
                  <th className='w-1/4'>Tên sản phẩm</th>
                  <th className='w-1/4'>Mã sản phẩm</th>
                  <th className='w-1/12'></th>
                </tr>
                {
                  dataLoad.topList.map(dt => {
                    return (
                      <tr className='text-center' key={dt.product._id}>
                        <td className='flex justify-center'> <img className='h-24 w-44' src={`${process.env.URL_API}${dt.product.avatar}`}/> </td>
                        <td>{dt.product.name}</td>
                        <td>{dt.product.code}</td>
                        <td> 
                        <button  disabled={disabled} className='font-bold text-red-500 text-2xl' onClick={()=>{handleUpdateTopList('delete',dt.product._id)}}>X</button>
                        </td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          </div>
        </li> : ''
        }
       
        
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
      {
        tabTopList? <LayoutModal children={<ListTopModal dataListProduct={dataLoad.listProduct} dataTopList={dataLoad.topList} setDataTopList={handleUpdateDataTop} setTab={setTabTopList}/>}/> : ''
      }
    </>
  )
}

export default modal