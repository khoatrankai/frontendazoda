
import React, { useEffect, useState } from 'react'
import LayoutModal from './layout.modal.js'
import AlertconfirmModal from './alertconfirm.modal.js'
import axios from 'axios'
import ListDiscountModal from './list-product-discount.modal.js'

const modal = ({setCheckLoad,typeModal,dataTab,setTab}) => {
  const [dataLoad,setDataLoad] = useState(null)
  const [tabAlert,setTabAlert] = useState(false)
  const [alertName,setAlertName] = useState('')
  const [alertType,setAlertType] = useState('')
  const [resultAlert,setResultAlert] = useState(false)
  const [disabled,setDisabled] = useState(false)
  const [tabListDiscount,setTabListDiscount] = useState(false)

  useEffect(()=>{
    console.log(dataLoad)
  },[dataLoad])
  useEffect(()=>{
    const loaddata = () => {
      setDataLoad(dataTab)
    }
    const newloaddata = () => {
      setDataLoad({price: 0,minPrice: 0,typeDis: false,description:'',startAt: Date.now(),endAt : Date.now(),productList:[]})
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
            const data = await axios.post(`${process.env.URL_API}/api/discount/create`,dataLoad)
            if(data.data.success){
              setTab(false)
            }
            break
          default:
            const dataUp = await axios.put(`${process.env.URL_API}/api/discount/update/${dataLoad._id}`,dataLoad)
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
      case 'price':
        setDataLoad({...dataLoad,price: e.target.value})
        break
      case 'minPrice':
        setDataLoad({...dataLoad,minPrice: e.target.value})
        break
      case 'typeDis':
        setDataLoad({...dataLoad,typeDis: e.target.value})
        break
      case 'description':
        setDataLoad({...dataLoad,description: e.target.value})
        break
      case 'startAt':
        setDataLoad({...dataLoad,startAt: e.target.value})
        break
      case 'endAt':
        setDataLoad({...dataLoad,endAt: e.target.value})
        break

    }
    
  }
  const handleUpdateProductDiscount = (e,data) => {

    switch(e.target.name){
      case 'deleteAddress':
        setDataLoad({...dataLoad,productList: dataLoad.productList.filter(dt => {
          return dt._id !== data._id
        })})
        break
      case 'addAddress':
        setDataLoad({...dataLoad,productList: data})
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
          <label className='font-semibold'>Giá giảm*</label>
          <input disabled={disabled} name='price' className='outline-none bg-slate-200 p-3' value={dataLoad.price} onChange={handleUpdateData} placeholder='Giá giảm' type='number'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Giá tối thiểu*</label>
          <input disabled={disabled} name='minPrice' className='outline-none bg-slate-200 p-3' value={dataLoad.minPrice} onChange={handleUpdateData} type='number'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Kiểu giảm</label>
          <select name='typeDis' value={dataLoad.typeDis} onChange={handleUpdateData}>
            <option value={false}>%</option>
            <option value={true}>VNĐ</option>
          </select>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Mô tả</label>
          <input disabled={disabled} name='description'  className='outline-none bg-slate-200 p-3'  value={dataLoad.description} onChange={(e)=>{handleUpdateData(e)}} placeholder='Mô tả' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Ngày bắt đầu</label>
          <input disabled={disabled} name='startAt'  className='outline-none bg-slate-200 p-3'  value={dataLoad.startAt} onChange={(e)=>{handleUpdateData(e)}} type='datetime-local'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Ngày kết thúc</label>
          <input disabled={disabled} name='endAt'  className='outline-none bg-slate-200 p-3'  value={dataLoad.endAt} onChange={(e)=>{handleUpdateData(e)}} type='datetime-local'/>
        </li>
        
          <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Sản phẩm áp dụng</label>
          <div className='bg-slate-200 pl-4 pb-4'>
            <div className='text-end'>
              <button disabled={disabled} onClick={()=>{setTabListDiscount(true)}} className=' bg-black p-2 rounded-bl-xl font-bold text-white hover:text-gray-300'>Chỉnh sửa</button>
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
                  dataLoad.productList.map(dt => {
                    return (
                      <tr className='text-center' key={dt.product._id}>
                        <td className='flex justify-center'> <img className='h-24 w-44' src={dt.product.avatar}/> </td>
                        <td>{dt.product.name}</td>
                        <td>{dt.product.code}</td>
                        <td> 
                          <button name='deleteAddress' disabled={disabled} className='font-bold text-red-500 text-2xl' onClick={(e)=>{handleUpdateProductDiscount(e,dt)}}>X</button>
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
        tabListDiscount? <LayoutModal children={<ListDiscountModal dataProductDiscount={dataLoad.productList} setDataLoad={handleUpdateProductDiscount} setTab={setTabListDiscount}/>}/> : ''
      }
    </>
  )
}

export default modal