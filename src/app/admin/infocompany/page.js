"use client"
import React, { useEffect, useState } from 'react'
import SocialModal from '@/components/modals/social.modal'
import TextEditor from '@/components/TextEditor'
import LayoutModal from '@/components/modals/layout.modal'
import axios from 'axios'

const page = () => {
    const [disabled,setDisabled] = useState(false)
    const [dataLoad,setDataLoad] = useState({logo: '',email: '',phoneNumber: '',address: '',sourceCodeCertificate: '',sourceCodeintroduct: '',sourceCodeMap: '',socialMedia: []})
    const [checkFirts,setCheckFirts] = useState(false)
    const [tabModal,setTabModal] = useState(false)
    const [idSocial,setIdSocial] = useState('')
    const [typeTab,setTypeTab] = useState('add')
    const [imgLogo,setImgLogo] = useState(null)
    const [listSocial,setListSocial] = useState(null)
    const [onClickChange,setOnClickChange] = useState(true)
    const handleUpdateData = (name,value) => {
        if(checkFirts){
            setOnClickChange(false)
            switch(name){
                case 'logo':
                    setDataLoad({...dataLoad,logo: value})
                    break;
                case 'email':
                    setDataLoad({...dataLoad,email: value})
                    break;
                case 'phoneNumber':
                    setDataLoad({...dataLoad,phoneNumber: value})
                    break;
                case 'address':
                    setDataLoad({...dataLoad,address: value})
                    break;
                case 'sourceCodeintroduct':
                    setDataLoad({...dataLoad,sourceCodeintroduct: value})
                    break;
            
                case 'sourceCodeMap':
                    setDataLoad({...dataLoad,sourceCodeMap: value})
                    break;
                case 'socialMedia':
                    setDataLoad({...dataLoad,socialMedia: value})
                    break;
                case 'deleteSocialMedia':
                    setDataLoad({...dataLoad,socialMedia: dataLoad.socialMedia.filter((dt,index) => {return index !== value})})
                    break;
                default:
                    setDataLoad({...dataLoad,sourceCodeCertificate: value})
                    break;
            }
            }else{
                setCheckFirts(true)
            }
        
    }
    const checkLinkImg = (value) => {
        try{
          return value.includes("/uploads")
        }catch(err){
          return false
        }
      }
      const handleImageUpload = (value) => {
        const selectedFiles = Array.from(Array.of(value));
        const urls = selectedFiles.map((file) => URL.createObjectURL(file));
        return urls[0]
      };
    useEffect(()=>{
        const loaddata = async()=>{
            const data = await axios.get(`${process.env.URL_API}/api/company/getinfo`)
            if(data.data.success && data.data.data){
                setDataLoad(data.data.data)
            }
        }
        loaddata()
    },[])
    const handleSetTab = (name,i) => {
        setOnClickChange(false)
        setTypeTab(name)
        setIdSocial(i)
        setTabModal(true)
    }
    useEffect(()=>{
        console.log(dataLoad)
    },[dataLoad])
    const handleUpdateInfo = async() => {
        
        const formdata = new FormData()
        Object.keys(dataLoad).forEach(key => { 
            if(key === "socialMedia")
            {
                formdata.append(key,JSON.stringify(dataLoad[key]))
                for(let i = 0; i<dataLoad[key].length;i++){
                    formdata.append("sourceImg",dataLoad[key][i].icon)
                }
            }
            else{
                formdata.append(key,dataLoad[key])

            }
        })
        const dataUp = await axios.put(`${process.env.URL_API}/api/company/update`,formdata)
        if(dataUp.data.success){
            setOnClickChange(true)
        }
    }
    useEffect(()=>{
        setListSocial(dataLoad.socialMedia.map(dt => {
            if(typeof(dt.icon) === 'string'){
                return dt
            }
            return {...dt,icon: handleImageUpload(dt.icon)}
        }))
    },[dataLoad.socialMedia])
    useEffect(()=>{
        
        if(typeof(dataLoad.logo) === 'string'){
            setImgLogo(dataLoad.logo)
        }else{
            setImgLogo(handleImageUpload(dataLoad.logo))

        }
    },[dataLoad.logo])
  return (
    <>
        <div className='bg-white py-8 px-16 h-full rounded-md overflow-y-scroll'>
                <div>
                <div className='inline-flex flex-col mb-16 w-5/12 mr-16'>          
                        <label className='font-semibold'>Logo</label>
                        <input disabled={disabled} name='logo' className='outline-none bg-slate-200 p-3' onChange={(e)=>{
                            handleUpdateData(e.target.name,e.target.files[0])
                        }} type='file'/>
                        <div>
                            <img className='w-full h-48' src={checkLinkImg(imgLogo)?`${process.env.URL_API}${imgLogo}`:imgLogo}/>
                        </div>
                    </div>
                    <div className='inline-flex flex-col mb-16 w-5/12 mr-16'>
                        <label className='font-semibold'>Email</label>
                        <input disabled={disabled} name='email' value={dataLoad.email} className='outline-none bg-slate-200 p-3' onChange={
                            (e)=>{
                            handleUpdateData(e.target.name,e.target.value)
                        }
                        } placeholder='Email' type='email'/>
                    </div>
                    <div className='inline-flex flex-col mb-16 w-5/12 mr-16'>
                        <label className='font-semibold'>Số điện thoại</label>
                        <input disabled={disabled} name='phoneNumber' value={dataLoad.phoneNumber} className='outline-none bg-slate-200 p-3' onChange={(e)=>{
                            handleUpdateData(e.target.name,e.target.value)
                        }} placeholder='Số điện thoại' type='text'/>
                    </div>
                    <div className='inline-flex flex-col mb-16 w-5/12 mr-16'>
                        <label className='font-semibold'>Địa chỉ</label>
                        <input disabled={disabled} name='address' value={dataLoad.address} className='outline-none bg-slate-200 p-3' onChange={(e)=>{
                            handleUpdateData(e.target.name,e.target.value)
                        }} placeholder='Địa chỉ' type='text'/>
                    </div>
                    <div className='inline-flex flex-col mb-16 w-11/12'>
                        <label className='font-semibold'>Mạng xã hội</label>
                        <div className='bg-slate-200 pt-8 pb-4 relative'>
                            <div className='text-end absolute top-0 right-0'>
                            <button disabled={disabled} name='add' onClick={(e)=>{handleSetTab(e.target.name,'')}} className=' bg-black p-2 rounded-bl-xl font-bold text-white shadow-lg hover:text-gray-300'>Thêm</button>
                            </div>
                            <table className='w-full'>
                            <tbody>
                                <tr className='text-center'>
                                <th className='w-1/4'>Icon</th>
                                <th className='w-1/4'>Tên MXH</th>
                                <th className='w-1/4'>Link</th>
                                <th className='w-1/4'>Chức năng</th>
                                </tr>
                                {
                                listSocial?.map((dt,index) => {
                                    return (
                                    <tr className='text-center' key={index}>
                                        <td className='flex justify-center'><img className='rounded-full w-16 h-16' src={checkLinkImg(dt.icon)?`${process.env.URL_API}${dt.icon}`:dt.icon}/></td>
                                        <td>{dt.name}</td>
                                        <td>{dt.link}</td>
                                        <td> 
                                            <button  disabled={disabled} className='py-2 px-3 bg-red-500 mr-4 text-white text-sm font-bold rounded-lg my-2 hover:bg-red-600' name='deleteSocialMedia' onClick={(e)=>{handleUpdateData(e.target.name,index)}}>X</button>
                                            <button  disabled={disabled} name='update' className='py-2 px-3 bg-green-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={(e)=>{handleSetTab(e.target.name,index)}}>Chỉnh sửa</button>
                                    
                                        </td>
                                    </tr>
                                    )
                                }) ?? ''
                                }
                                
                            </tbody>
                            </table>
                        </div>
                    </div> 
                    <div className='inline-flex flex-col mb-16 w-11/12'>
                        <label className='font-semibold'>Giới thiệu</label>
                        <TextEditor disabled={disabled} value={dataLoad.sourceCodeintroduct}  name={'sourceCodeintroduct'} setDataChange={handleUpdateData}/>
                    </div>
                    <div className='inline-flex flex-col mb-16 w-11/12'>
                        <label className='font-semibold'>Chứng chỉ</label>
                        <TextEditor disabled={disabled} value={dataLoad.sourceCodeCertificate} name={'sourceCodeCertificate'} setDataChange={handleUpdateData}/>
                        
                    </div>
                   
                  
                    <div className='inline-flex flex-col mb-16 w-5/12 mr-16'>
                        <label className='font-semibold'>Bản đồ</label>
                        <textarea  defaultValue={dataLoad.sourceCodeMap} className='border-2 border-black h-40'/>
                    </div>
                </div>
                <button disabled={onClickChange || disabled} onClick={handleUpdateInfo} className={`p-4 bg-black text-white font-bold absolute bottom-4 right-12 rounded-t-md rounded-tr-md ${onClickChange?'bg-gray-500 cursor-not-allowed' : 'hover:bg-red-500'} `}>Cập nhật</button>
                {
                    tabModal && 
                    <LayoutModal children={<SocialModal dataLoad={dataLoad} setDataLoad={setDataLoad} id={idSocial} setTab={setTabModal} typeTab={typeTab}/>}/>
                    
                }
        </div>
        
        
    </>
    
  )
}

export default page