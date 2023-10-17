"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const detailorder = ({_id,mode}) => {
  const [tabDetail,setTabDetail] = useState(true);
  const [dataDetail,setDataDetail] = useState([]);
  const [keySearch,setKeySearch] = useState(null);
  const [dataRender,setDataRender] = useState([])
  const [typeFilter,setTypeFilter] = useState(0)
  const optionFilter = ["Mã sản phẩm","Tên sản phẩm","Mã code SP"]
  useEffect(()=>{
    const loaddata = async() => {
      const data = await axios.get(`${process.env.URL_API}/api/order/list/${_id}`)
      if(data.data.success){
        setDataDetail(data.data.data.productList)
        setDataRender(data.data.data.productList)
      }
    }
    loaddata()
  },[])
  const updateKey = (e)=> {
    setKeySearch(e.target.value)
  }
  const updateTypeFilter = (e) =>{
    setTypeFilter(Number(e.target.value))
  }
  useEffect(()=>{
    if(dataDetail.length > 0){
        switch(typeFilter){
          case 0:
            setDataRender(dataDetail.filter(dt => {
              return dt.product.code.search(keySearch) > -1
            }))
            break;
          case 1:
            setDataRender(dataDetail.filter(dt => {
              return dt.product.name.search(keySearch) > -1
            }))
            break;
          case 2:
            setDataRender(dataDetail.filter(dt => {
              return dt.productCode.search(keySearch) > -1
            }))
            break;
        }
        
    }
  },[keySearch])
  useEffect(()=>{
    if(!tabDetail)
      mode(false)
  },[tabDetail])
  return (
    <div className='modal-order fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center'>
      <div className='detail-product bg-white w-2/3 h-2/3 p-4 rounded-md relative'>
        <div className='header mb-6'>
          <h1 className='title font-bold text-red-500 mb-2'>Đơn hàng: {_id}</h1>
          <div className='ip-search flex justify-between'>
          <h1 className='font-bold text-xl'>DANH SÁCH</h1>
          <div className='w-1/2'>
            <select className='outline-none' onChange={updateTypeFilter}>
              {optionFilter.map((dt,index) => {
                return (
                  <option key={index} value={index}>{dt}</option>
                )
              })}
            </select>
            <input className='w-2/3 focus:border-b-2 outline-none' type='search' placeholder='Tìm kiếm' onChange={updateKey}/> 
          </div>
             
          </div>
        </div>
        <div className='table w-full'>
          <table className='w-full'>
            <tbody>
              <tr>
                <th className='w-1/12'>STT</th>
                <th className='w-1/6'>Mã sản phẩm</th>
                <th className='w-3/12'>Tên sản phẩm</th>
                <th className='w-1/6'>Số lượng</th>
                <th className='w-1/6'>Giá sản phẩm</th>
                <th className='w-1/6'>Mã code SP</th>
              </tr>
              {
                dataDetail === [] ? '': (
                  dataRender.map((dt,index) => {
                      return(
                        <tr className='text-center' key={dt.productCode}>
                          <td>{index+1}</td>
                          <td>{dt.product?.code ?? ''}</td>
                          <td>{dt.product?.name ?? ''}</td>
                          <td>{dt.quantity}</td>
                          <td>{dt.product?.price ?? ''}</td>
                          <td>{dt.productCode}</td>
                        </tr>
                      )
                  })
                )
              }
            </tbody>
          </table>
        </div>
        <button className='absolute right-2 top-1 text-xl' onClick={()=>{setTabDetail(false)}}>X</button>

      </div>
    </div>
  )
}

export default detailorder