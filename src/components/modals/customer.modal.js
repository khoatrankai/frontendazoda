
import React, { useEffect, useState } from 'react'
import LayoutModal from './layout.modal.js'
import AlertconfirmModal from './alertconfirm.modal.js'
import AddressModal from './address.modal.js'
import axios from 'axios'

const modal = ({setCheckLoad,typeModal,dataTab,setTab}) => {
  const [dataLoad,setDataLoad] = useState(null)
  const [tabAlert,setTabAlert] = useState(false)
  const [alertName,setAlertName] = useState('')
  const [alertType,setAlertType] = useState('')
  const [resultAlert,setResultAlert] = useState(false)
  const [disabled,setDisabled] = useState(false)
  const [hidePassword,setHidePassword] = useState(true)
  const [iAddress,setIAddress] = useState('')
  const [typeTabAddress,setTypeTabAddress] = useState('')
  const [TabAddress,setTabAddress] = useState(false)
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
      setLoadImg(dataTab.avatar)
    }
    const newloaddata = () => {
      setDataLoad({name:'',email: '',password:'',phoneNumber:'',gender: false,avatar: '',addressList:[]})
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
          if(key === "addressList")
          {
          
              formdata.append(key,JSON.stringify(dataLoad[key]))

          }else{
            formdata.append(key,dataLoad[key])

          }
        })
        switch(alertType){
          case 'create':
            const data = await axios.post(`${process.env.URL_API}/api/customer/create`,formdata)
            if(data.data.success){
              setTab(false)
            }
            break
          default:
            const dataUp = await axios.put(`${process.env.URL_API}/api/customer/update/${dataLoad._id}`,formdata)
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
      case 'email':
        setDataLoad({...dataLoad,email: e.target.value})
        break
      case 'password':
        setDataLoad({...dataLoad,password: e.target.value})
        break
      case 'phoneNumber':
        setDataLoad({...dataLoad,phoneNumber: e.target.value})
        break
      case 'gender':
          setDataLoad({...dataLoad,gender: e.target.value})
        break
      case 'avatar':
        setDataLoad({...dataLoad,avatar: e.target.files[0]})
        break
      case 'deleteAvatar':
        setDataLoad({...dataLoad,avatar: ''})
        setLoadImg(null)
        break
      

    }
  }
  const handleUpdateTabAddress = (e,i) => {
    
    switch(e.target.name){
      case 'update':
        setTypeTabAddress(e.target.name)
        setTabAddress(true)
        setIAddress(i)
        break;
      case 'add':
        setTypeTabAddress(e.target.name)
        setTabAddress(true)
        break
      case 'delete':
        setDataLoad({...dataLoad,addressList:dataLoad.addressList.filter((dt,index)=> {return index !== i})})
        break;
    }
  }
  const handleUpAddressDefault = (i) => {
    setDataLoad({...dataLoad,addressList: dataLoad.addressList.map((dt,index) => {
      if(index === i)
      {
        return {...dt,addressDefault: true}
      }
      return {...dt,addressDefault: false}

    })})
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
          <label className='font-semibold'>Tên*</label>
          <input disabled={disabled} name='name' className='outline-none bg-slate-200 p-3' value={dataLoad.name} onChange={handleUpdateData} placeholder='Tên danh mục' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Avatar*</label>
          <input disabled={disabled} name='avatar' className='outline-none bg-slate-200 p-3' onChange={
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
                      typeModal !== 'detail' ?<button name='deleteAvatar' className='absolute top-2 right-2 w-8 h-8 font-bold bg-white rounded-full' onClick={(e)=>{handleUpdateData(e)}}>X</button>: ''
                    }
                    
            </div> 
               
          }
          
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Email</label>
          <input disabled={disabled} name='email'  className='outline-none bg-slate-200 p-3'  value={dataLoad.email} onChange={(e)=>{handleUpdateData(e)}} placeholder='Email' type='email'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Số điện thoại</label>
          <input disabled={disabled} name='phoneNumber'  className='outline-none bg-slate-200 p-3'  value={dataLoad.phoneNumber} onChange={(e)=>{handleUpdateData(e)}} placeholder='Email' type='email'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Password</label>
          <div className='w-full flex items-center bg-slate-200 pr-4'>
            <input disabled={disabled} name='password'  className=' bg-slate-200 flex-1 outline-none p-3'  value={dataLoad.password} onChange={(e)=>{handleUpdateData(e)}} placeholder='Password' type={hidePassword?'password':'text'}/>
            <input disabled={disabled}  className='outline-none h-6 w-6  p-3 text-xl'  value={hidePassword} onChange={(e)=>{setHidePassword(!hidePassword)}} type='checkbox'/>
          </div>      
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Giới tính</label>
          <select className='outline-none bg-slate-200 p-3' value={dataLoad.gender} name='gender' onChange={handleUpdateData}>
            <option value={true}>Nữ</option>
            <option value={false}>Nam</option>
          </select>
        </li>
          <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Địa chỉ</label>
          <div className='bg-slate-200 pb-4'>
            <div className='text-end'>
              <button disabled={disabled} name='add' onClick={(e)=>{handleUpdateTabAddress(e,'')}} className=' bg-black p-2 rounded-bl-xl font-bold text-white shadow-lg hover:text-gray-300'>Thêm</button>
            </div>
            <table className='w-full'>
              <tbody>
                <tr className='text-center'>
                  <th className='w-1/4'>Tên người nhận</th>
                  <th className='w-1/4'>Số điện thoại</th>
                  <th className='w-1/4'>Địa chỉ</th>
                  <th className='w-1/4'></th>
                </tr>
                {
                  dataLoad.addressList.map((dt,index) => {
                    return (
                      <tr className={`text-center ${dt.addressDefault?'border-2 border-red-500':''}`} key={index}>
                        <td> {dt.name}</td>
                        <td>{dt.phoneNumber}</td>
                        <td>{dt.address}</td>
                        <td> 
                          <button  disabled={disabled} name='delete' className='py-2 px-3 bg-red-500 mr-4 text-white text-sm font-bold rounded-lg my-2 hover:bg-red-600' onClick={(e)=>{handleUpdateTabAddress(e,index)}}>X</button>
                          <button  disabled={disabled} name='update' className='py-2 px-3 bg-green-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={(e)=>{handleUpdateTabAddress(e,index)}}>Chỉnh sửa</button>
                          {
                            dt.addressDefault?'':
                          <button  disabled={disabled} className='py-2 px-3 bg-red-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-red-600' onClick={()=>{handleUpAddressDefault(index)}}>Thiết lập mặc định</button>

                          }
                        </td>
                      </tr>
                    )
                  })
                }
                
              </tbody>
            </table>
          </div>
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
      {
        TabAddress ? <LayoutModal children={<AddressModal setTab={setTabAddress} dataLoad={dataLoad} setDataLoad={setDataLoad} typeTabAddress={typeTabAddress} iAddress={iAddress}/>} /> : ''
      }
    </>
  )
}

export default modal