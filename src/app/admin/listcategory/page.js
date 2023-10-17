"use client"
import React, {useState, useEffect } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import ListProductModal from '@/components/modals/list-product.modal'
import LayoutModal from '@/components/modals/layout.modal'
import { useCheckApp } from '@/Context/CheckPage'


const page = () => {
    const {funcAll,handleUpdatePath} = useCheckApp()
    const [dataBrand,setDataBrand] = useState([])
    const [dataCategory,setDataCategory] = useState([])
    const [checkType,setCheckType] = useState(true)
    const [tabListProduct,setTabListProduct] = useState(false)
    const [dataTab,setDataTab] = useState([])
    const [idDataTab,setIdDataTab] = useState('')
    const [checkLoadData,setCheckLoadData] = useState(true)
    useEffect(()=>{
        handleUpdatePath()
        if(checkLoadData && funcAll.read && funcAll.pathname === document.location.pathname){
            
            const loaddata = async() =>{
                const data = await axios.get(`${process.env.URL_API}/api/brand/list`);
                const data2 = await axios.get(`${process.env.URL_API}/api/category/list`);
                if(data.data.success && data2.data.success){
                    setDataBrand(data.data.data)
                    setDataCategory(data2.data.data)
                    toast.success("Đã lấy dữ liệu")
                }else{
                    toast.error("ko Đã lấy dữ liệu")
                }
            }
            loaddata()
            setCheckLoadData(false)
        }
    },[checkLoadData,funcAll])

    useEffect(()=>{
        if(checkType){
            setDataTab(dataBrand.filter(dt => {return dt._id === idDataTab})[0])
        }else
        {
            setDataTab(dataCategory.filter(dt => {return dt._id === idDataTab})[0])
            
        }
    },[dataBrand,dataCategory])
    const handleOpenDetail = (data) => {
            setDataTab(data)
            setIdDataTab(data._id)
            setTabListProduct(true)
    }
    const updateType = (value) => {
        switch(value){
            case 'brand':
                setCheckType(true)
                break;
            case 'category':
                setCheckType(false)
                break;
        }
    }
    useEffect(()=>{console.log(dataBrand)},[dataBrand])
  return (
    <>
        <div className='text-end'>
            <select defaultValue={'brand'} className='p-4 bg-yellow-500 mt-4 mb-5 rounded-t-xl font-bold outline-none cursor-pointer' onChange={(e)=>{updateType(e.target.value)}}>
                <option className='font-bold bg-white' value={'brand'}>Thương hiệu</option>
                <option className='font-bold bg-white' value={'category'}>Danh mục</option>
            </select>
        </div>
        {
            checkType ? 
            <div className='bg-white p-4 h-5/6 rounded-md'>
            <div>
                <h1 className='font-semibold text-2xl'>Phân loại sản phẩm theo thương hiệu</h1>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/4'>Logo</th>
                                <th className='w-1/4'>Thương hiệu</th>
                                <th className='w-1/6'>Số lượng sản phẩm</th>
                                <th className='w-1/4'></th>
                            </tr>                     
                    </tbody>
                    </table>                   
            </div>
            <div className='pl-8 pr-4 w-full h-96 overflow-y-scroll' >
                    <table className='w-full'>
                    <tbody>
                    <tr>
                                <th className='w-1/12'></th>
                                <th className='w-1/4'></th>
                                <th className='w-1/4'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/4'></th>

                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataBrand.length>0?
                                dataBrand.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black hover:text-white text-center font-medium '>
                                            <td>{index + 1}</td>
                                            <td className='flex justify-center'> <img className='w-40 h-28' src={`${process.env.URL_API}${dt.logo}`}/> </td>
                                            <td>{dt.name}</td>
                                            <td>{dt.listProduct.length}</td>
                                            <td>
                                                
                                                <button className='py-2 px-3 bg-green-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={()=>{
                                                    handleOpenDetail(dt)
                                                }}>DETAIL</button>

                                            </td>
                                        </tr>
                                        
                                    )
                                }) : <tr><td className='w-full text-red-500 font-bold text-3xl text-center'>NOT FOUND</td></tr>
                            }                           
                    </tbody>       
                    </table>
                    
            </div>
        </div> : 
        <div className='bg-white p-4 h-5/6 rounded-md'>
            <div>
                <h1 className='font-semibold text-2xl'>Phân loại sản phẩm theo danh mục</h1>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/4'>Icon</th>
                                <th className='w-1/6'>Danh mục</th>
                                <th className='w-1/6'>Số lượng thương hiệu</th>
                                <th className='w-1/6'>Số lượng sản phẩm</th>
                                <th className='w-1/6'></th>
                            </tr>                     
                    </tbody>
                    </table>                   
            </div>
            <div className='px-8 w-full h-96 overflow-y-scroll' >
                    <table className='w-full'>
                    <tbody>
                    <tr>
                                <th className='w-1/12'></th>
                                <th className='w-1/4'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>

                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataCategory.length>0?
                                dataCategory.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black hover:text-white text-center font-medium'>
                                            <td>{index + 1}</td>
                                            <td className='flex justify-center'> <img className='w-40 h-28' src={`${process.env.URL_API}${dt.icon}`}/> </td>
                                            <td>{dt.name}</td>
                                            <td>{dt.listBrand.length}</td>
                                            <td>{dt.listProduct.length}</td>
                                            <td>
                                                
                                                <button className='py-2 px-3 bg-green-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={()=>{
                                                    handleOpenDetail(dt)
                                                }}>DETAIL</button>

                                            </td>
                                        </tr>
                                        
                                    )
                                }) : <tr><td className='w-full text-red-500 font-bold text-3xl text-center'>NOT FOUND</td></tr>
                            }                           
                    </tbody>       
                    </table>
                    
            </div>
        </div>
        }
        {
          tabListProduct?  <LayoutModal children={<ListProductModal setCheckLoad={setCheckLoadData} type={checkType} data={dataTab} setTab={setTabListProduct}/>}/>:''
        }
        
        
    </>
  )
}

export default page