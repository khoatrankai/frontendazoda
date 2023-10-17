import React, { useEffect, useState } from 'react'

const modal = ({setTab,dataLoad, setDataLoad, typeTab,id}) => {
    const [dataSocial,setDataSocial] = useState(null)
    const [imgIcon,setImgIcon] = useState(null)
    useEffect(()=>{
        switch(typeTab){
            case 'add':
                setDataSocial({name: '',icon: '',link: ''})
                break
            case 'update':
                const data = dataLoad.socialMedia.filter((dt,index)=> {return index === id})
                setDataSocial(data[0])
                setImgIcon(data[0].icon)

        }
    },[typeTab])
    useEffect(()=>{
        console.log(dataSocial)
    },[dataSocial])
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
    const handleUpdateData = async(e)=>{
        switch(e.target.name){
          case 'name':
            setDataSocial({...dataSocial,name: e.target.value})
            break
          case 'icon':
            setDataSocial({...dataSocial,icon: e.target.files[0]})
            setImgIcon(handleImageUpload(e.target.files[0]))
            break
          case 'link':
            setDataSocial({...dataSocial,link: e.target.value})
            break
    
        }
        
      }
      const handleSubmit = (e)=>{
        switch(e.target.name){
            case 'add':
                setDataLoad({...dataLoad,socialMedia: [...dataLoad.socialMedia,dataSocial]})
                break;
            case 'update':
                const newDataUp = dataLoad.socialMedia.map((dt,index) => {
                    if(index === id){
                        return dataSocial
                    }
                    return dt
                })               
                setDataLoad({...dataLoad,socialMedia: newDataUp})
                break;


        }
        setTab(false)
      }
  return (
    <>
      <div className='bg-white h-5/6 w-3/5 overflow-y-scroll px-16 py-12 relative'>
      <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
      {typeTab === 'add'?
        <h1 className='font-bold text-xl mb-12'>Thông tin tạo mới</h1>:
        <h1 className='font-bold text-xl mb-12'>Thông tin ID: {dataSocial?dataSocial._id: ''} </h1>
      } 
      {
        dataSocial? 
        <ul>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Tên MXH</label>
          <input name='name' className='outline-none bg-slate-200 p-3' value={dataSocial.name} onChange={handleUpdateData} placeholder='Tên MXH' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Icon*</label>
          <input name='icon' className='outline-none bg-slate-200 p-3' onChange={handleUpdateData} type='file'/>
          {
            imgIcon &&
            <div>
              <img className='rounded-full w-16 h-16' src={checkLinkImg(imgIcon)?`${process.env.URL_API}${imgIcon}`:imgIcon}/>
            </div>
          }
          
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Link</label>
          <input name='link'  className='outline-none bg-slate-200 p-3'  value={dataSocial.link} onChange={handleUpdateData}  placeholder='Địa chỉ' type='text'/>
        </li>
     
      </ul> :''
      }
      {
        typeTab == 'add' ? <button name='add' onClick={handleSubmit} className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' type='submit'>Thêm</button> : typeTab == 'update' ? <button className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' onClick={handleSubmit} name='update' type='submit'>Cập nhật</button> : ''
      }
    
      </div>
    </>
  )
}

export default modal