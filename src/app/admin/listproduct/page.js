"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductModal from '@/components/modals/product.modal'
import LayoutModal from '@/components/modals/layout.modal.js'
import AlertconfirmModal from '@/components/modals/alertconfirm.modal'
import { useCheckApp } from '@/Context/CheckPage'

const page = () => {
    
    const {funcAll,handleUpdatePath} = useCheckApp()
    const optionFilter = ["Mã sản phẩm","Tên sản phẩm"]
    const [dataProducts,setDataProducts] = useState([]);
    const [typeProduct,setTypeProduct] = useState(0)
    const [dataFilterProducts,setDataFilterProducts] = useState([])
    const [typeFilter,setTypeFilter] = useState(0)
    const [keySearch,setKeyFilter] = useState('')
    const [tabProduct,setTabProduct] = useState(false)
    const [idProduct,setIdProduct] = useState(null);
    const [checkLoadData,setCheckLoadData] = useState(true)
    const [alertResult,setAlertResult] = useState(false)
    const updateFilter = (e) => {
        setTypeFilter(e.target.value)
    }
    const updateKey = (e) => {
        setKeyFilter(e.target.value)
    }
    useEffect(()=>{
        if(alertResult){
            const loaddata = async()=>{
                await axios.delete(`${process.env.URL_API}/api/product/delete/${idProduct}`)
                setCheckLoadData(true)
            }
            loaddata()
            setAlertResult(false)
        }
    },[alertResult])
    useEffect(()=> {
        if(dataProducts.length> 0){
            switch(typeFilter){
                case 0:
                    setDataFilterProducts(dataProducts.filter(dt => {
                        return dt.code.search(keySearch) > -1
                    }))
                    break
                default:
                    setDataFilterProducts(dataProducts.filter(dt => {
                        return dt.name.search(keySearch) > -1
                    }))
                    break
            }
        }
    },[keySearch])

    useEffect(()=>{
        handleUpdatePath()
        if(checkLoadData && funcAll.read && funcAll.pathname === document.location.pathname)
        {
            const loaddata = async() => {
                const data = await axios.get(`${process.env.URL_API}/api/product/list`);
                if(data.data.data.length > 0){
                    setDataProducts(data.data.data)
                    setDataFilterProducts(data.data.data)
                }
            }
            loaddata()    
            setCheckLoadData(false)     
        }
    },[checkLoadData,funcAll])
    useEffect(()=>{
        console.log(dataProducts)
    },[dataProducts])
    const updateType1 = (dt) => {
            setTabProduct(true)
            setTypeProduct(1)
            setIdProduct(dt._id)   
    }
  return (
    <>
     
        {funcAll.create && <div className='text-end'>
            <button className='p-4 bg-yellow-500 rounded-xl  mt-4 mb-5 font-bold' onClick={()=>{
                setTabProduct(true)
                setTypeProduct(0)
                setIdProduct(null)
                }
                }>Thêm sản phẩm</button>
        </div>}
        
        <div className='bg-white p-4 h-5/6 rounded-md'>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-2xl'>Tất cả sản phẩm </h1>
                <div className='w-1/3'>
                    <select className='outline-none w-1/3' onChange={updateFilter}>
                        {optionFilter.map((dt,index) => {
                            return (
                                <option key={index} value={index}>{dt}</option>
                            )
                        })}
                    </select>
                    <input onChange={updateKey} className='outline-none w-2/3 focus:border-b-2' placeholder='Tìm kiếm' type='search'/>
                </div>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/6'>Tên sản phẩm</th>
                                <th className='w-1/6'>Avatar</th>
                                <th className='w-1/12'>Số lượng</th>
                                <th className='w-1/12'>Giá sản phẩm</th>
                                <th className='w-1/12'>Sản phẩm đã bán</th>
                                <th className='w-1/6'>Mã sản phẩm</th>
                                <th className='w-1/6'></th>
                            </tr>                     
                    </tbody>
                    </table>                   
            </div>
            <div className='pl-8 pr-4 w-full h-96 overflow-y-scroll' >
                    <table className='w-full'>
                    <tbody>
                    <tr>
                                <th className='w-1/12'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/12'></th>
                                <th className='w-1/12'></th>
                                <th className='w-1/12'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>
                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataFilterProducts.length>0?
                                dataFilterProducts.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black hover:text-white text-center font-medium'>
                                            <td onClick={()=>{updateType1(dt)}}>{index + 1}</td>
                                            <td onClick={()=>{updateType1(dt)}}>{dt.name}</td>
                                            <td className='flex justify-center items-center h-full' onClick={()=>{updateType1(dt)}}> <img className='w-28 h-20' src={`${process.env.URL_API}${dt.avatar}`}/> </td>
                                            <td onClick={()=>{updateType1(dt)}}>{dt.quantity}</td>
                                            <td onClick={()=>{updateType1(dt)}}>{dt.price}</td>
                                            <td onClick={()=>{updateType1(dt)}}>{dt.successfulPurchase}</td>
                                            <td onClick={()=>{updateType1(dt)}}>{dt.code}</td>
                                            <td>
                                                {funcAll.update && <button className='py-2 px-3 bg-green-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={()=>{
                                                    setTabProduct(true)
                                                    setTypeProduct(2)
                                                    setIdProduct(dt._id)
                                                }}>UPDATE</button>}
                                                

                                            </td>
                                        </tr>
                                        
                                    )
                                }) : <tr><td className='w-full text-red-500 font-bold text-3xl text-center'>NOT FOUND</td></tr>
                            }                           
                    </tbody>       
                    </table>
                    
            </div>
        </div>
        {
            tabProduct ? <LayoutModal children={<ProductModal idProduct={idProduct} typeProduct={typeProduct} setTabProduct={setTabProduct} setCheckLoadData={setCheckLoadData}/>}/> : ''
        } 
       
    </>
    
  )
}

export default page