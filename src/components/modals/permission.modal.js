
import React, { useEffect, useState } from 'react'
import LayoutModal from './layout.modal.js'
import AlertconfirmModal from './alertconfirm.modal.js'
import axios from 'axios'
import ListPageModal from './list-page-admin.modal.js'

const modal = ({setCheckLoad,typeModal,dataTab,setTab}) => {
  const [dataLoad,setDataLoad] = useState(null)
  const [tabAlert,setTabAlert] = useState(false)
  const [alertName,setAlertName] = useState('')
  const [alertType,setAlertType] = useState('')
  const [resultAlert,setResultAlert] = useState(false)
  const [disabled,setDisabled] = useState(false)
  const [hidePass,setHidePass] = useState(true)
  const [tabListPage,setTabListPage] = useState(false)

  useEffect(()=>{
    console.log(dataLoad)
  },[dataLoad])
  useEffect(()=>{
    const loaddata = () => {
      setDataLoad(dataTab)
    }
    const newloaddata = () => {
      setDataLoad({name:'',username: '',password: '',avatar: '',pageList: []})
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
        switch(alertType){
          case 'create':
            const data = await axios.post(`${process.env.URL_API}/api/admin/create`,dataLoad)
            if(data.data.success){
              setTab(false)
            }
            break
          default:
            const dataUp = await axios.put(`${process.env.URL_API}/api/admin/update/${dataLoad._id}`,dataLoad)
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
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(new Error("Could not convert the file to Base64."));
      };
    });
  }
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
  const handleUpdatePage = (e,datas)=>{
    console.log(datas)
    switch(e.target.name){
      case 'addPage':
        setDataLoad({...dataLoad,pageList: datas})
        break
      case 'deletePage':
        setDataLoad({...dataLoad,pageList: dataLoad.pageList.filter(dt => {return dt.pageId._id !== datas})})
        break

    }
  }
  useEffect(()=>{
    console.log(dataLoad)
  },[dataLoad])
  const handleUpdateData = async(e)=>{
    switch(e.target.name){
      case 'name':
        setDataLoad({...dataLoad,name: e.target.value})
        break
      case 'deleteAvatar':
        setDataLoad({...dataLoad,avatar: ''})
        break
      case 'avatar':
        setDataLoad({...dataLoad,avatar: await convertToBase64(e.target.files[0])})
        break
      case 'username':
        setDataLoad({...dataLoad,username: e.target.value})
        break
      case 'password':
        setDataLoad({...dataLoad,password: e.target.value})
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
          <label className='font-semibold'>Tên nhân viên*</label>
          <input disabled={disabled} name='name' className='outline-none bg-slate-200 p-3' value={dataLoad.name} onChange={handleUpdateData} placeholder='Tên nhân viên' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Avatar*</label>
          <input disabled={disabled} name='avatar' className='outline-none bg-slate-200 p-3' onChange={handleUpdateData} type='file'/>
          <div className='w-32 h-56 relative mr-4'>
                    <img className='w-full h-full' src={dataLoad.avatar}/>
                    {
                      typeModal === 'update' ?<button name='deleteAvatar' className='absolute top-2 right-2 w-8 h-8 font-bold bg-white rounded-full' onClick={(e)=>{handleUpdateData(e)}}>X</button>: ''
                    }
                    
          </div> 
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Username</label>
          <input disabled={disabled} name='username'  className='outline-none bg-slate-200 p-3'  value={dataLoad.username} onChange={(e)=>{handleUpdateData(e)}} placeholder='Username' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Password</label>
          <div className='w-full flex items-center bg-slate-200 pr-4'>
            <input disabled={disabled} name='password'  className=' bg-slate-200 flex-1 outline-none p-3'  value={dataLoad.password} onChange={(e)=>{handleUpdateData(e)}} placeholder='Password' type={hidePass?'password':'text'}/>
            <input disabled={disabled}  className='outline-none h-6 w-6  p-3 text-xl'  value={hidePass} onChange={(e)=>{setHidePass(!hidePass)}} type='checkbox'/>
          </div>
        </li>
        {
          typeModal !== 'add' ?  <li className='flex flex-col mb-9'>
          <label className='font-semibold'>List Page</label>
          <div className='bg-slate-200 pl-4 pb-4'>
            <div className='text-end'>
              <button disabled={disabled} onClick={()=>{setTabListPage(true)}} className=' bg-black p-2 rounded-bl-xl font-bold text-white hover:text-gray-300'>Chỉnh sửa</button>
            </div>
            <table className='w-full'>
              <tbody>
                <tr className='text-center'>
                  <th className='w-1/3'>Tên trang</th>
                  <th className='w-1/3'>URL</th>
                  <th className='w-1/3'></th>
                </tr>
                {
                  dataLoad.pageList.map(dt => {
                    return (
                      <tr className='text-center hover:bg-black hover:text-white' key={dt.pageId._id}>
                        <td>{dt.pageId.name}</td>
                        <td>{dt.pageId.url}</td>
                        <td> 
                          <button  disabled={disabled} name='deletePage' className='font-bold text-red-500 text-2xl' onClick={(e)=>{handleUpdatePage(e,dt.pageId._id)}}>X</button>
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
        tabListPage? <LayoutModal children={<ListPageModal dataPage={dataLoad.pageList} setDataLoadPage={handleUpdatePage} setTab={setTabListPage}/>}/> : ''
      }
    </>
  )
}

export default modal    