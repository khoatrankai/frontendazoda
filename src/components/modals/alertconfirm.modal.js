import React, { useEffect, useState } from 'react'

const alertconfirm = ({type,name,result,setTab}) => {
  const [InfoAlert,setInfoAlert] = useState('Bạn có chắc muốn tạo mới?')
  useEffect(()=>{
    switch(type){
      case 'create':
        setInfoAlert('Bạn có chắc muốn tạo mới?')
        break;
      case 'update':
        setInfoAlert(`Bạn có chắc muốn sửa thông tin ${name}?`)
        break;
      case 'delete':
        setInfoAlert(`Bạn có chắc muốn xoá thông tin ${name}?`)
        break;
      default:

    }
  },[])
  const handleOK = () => {
    setTab(false)
    result(true)
  }
  const handleCancel = () => {
    setTab(false)
  }
  return (
    <div className='bg-white h-52 w-96 px-16 py-12 relative flex flex-col justify-between rounded-sm'>
        <h1 className='font-bold text-center text-gray-600'>{InfoAlert}</h1>
        <div className='flex justify-around'>
          <button className='font-bold hover:text-red-500' onClick={handleOK}>OK</button>
          <button className='font-bold hover:text-red-500' onClick={handleCancel}>Cancel</button>
        </div>
    </div>
  )
}

export default alertconfirm