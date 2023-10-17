import React, { useEffect, useState } from 'react'

const modal = ({setTab,dataLoad, setDataLoad, typeTabAddress,iAddress}) => {
    const [dataAddress,setDataAddress] = useState('')

    useEffect(()=>{
        // console.log(typeTabAddress,idAddress,dataLoad)
        switch(typeTabAddress){
            case 'add':
                setDataAddress({name: '',phoneNumber: '',address: '',addressDefault:false})
                break
            case 'update':
                const data = dataLoad.addressList.filter((dt,index)=> {return index === iAddress})
                setDataAddress(data[0])

        }
    },[typeTabAddress])
    useEffect(()=>{
        console.log(dataAddress)
    },[dataAddress])
    const handleUpdateData = async(e)=>{
        switch(e.target.name){
          case 'name':
            setDataAddress({...dataAddress,name: e.target.value})
            break
          case 'phoneNumber':
            setDataAddress({...dataAddress,phoneNumber: e.target.value})
            break
          case 'address':
            setDataAddress({...dataAddress,address: e.target.value})
            break
    
        }
        
      }
      const handleSubmit = (e)=>{
        switch(e.target.name){
            case 'add':
                const newData = dataLoad.addressList.push(dataAddress)
                console.log(newData)
                setDataLoad({...dataLoad,addressList: newData})
            case 'update':
                const newDataUp = dataLoad.addressList.map((dt,index) => {
                    if(index === iAddress){
                        return dataAddress
                    }
                    return dt
                })
                setDataLoad({...dataLoad,addressList: newDataUp})

        }
        setTab(false)
      }
  return (
    <>
      <div className='bg-white h-5/6 w-3/5 overflow-y-scroll px-16 py-12 relative'>
      <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
      {typeTabAddress === 'add'?
        <h1 className='font-bold text-xl mb-12'>Thông tin tạo mới</h1>:
        <h1 className='font-bold text-xl mb-12'>Thông tin ID: {dataAddress?dataAddress._id: ''} </h1>
      } 
      {
        dataAddress?
        <ul>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Tên người nhận*</label>
          <input name='name' className='outline-none bg-slate-200 p-3' value={dataAddress.name} onChange={handleUpdateData} placeholder='Tên danh mục' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Số điện thoại*</label>
          <input name='phoneNumber' className='outline-none bg-slate-200 p-3' value={dataAddress.phoneNumber} onChange={handleUpdateData} type='tel'/>
          
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Địa chỉ</label>
          <input name='address'  className='outline-none bg-slate-200 p-3'  value={dataAddress.address} onChange={handleUpdateData}  placeholder='Địa chỉ' type='text'/>
        </li>
     
      </ul> :''
      }
      {
        typeTabAddress == 'add' ? <button name='add' onClick={handleSubmit} className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' type='submit'>Thêm</button> : typeTabAddress == 'update' ? <button className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' onClick={handleSubmit} name='update' type='submit'>Cập nhật</button> : ''
      }
    
      </div>
    </>
  )
}

export default modal