"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CategoryModal from '@/components/modals/category.modal'
import LayoutModal from '@/components/modals/layout.modal'
import { useCheckApp } from '@/Context/CheckPage'


const page = () => {
    const {funcAll,handleUpdatePath} = useCheckApp()

    const [dataCategory,setDataCategory] = useState([])
    const [dataTab,setDataTab] = useState('')
    const [typeModal,setTypeModal] = useState(0)
    const [tabModal,setTabModal] = useState(false)
    const [checkLoad,setCheckLoad] = useState(true)
    useEffect(()=>{
        handleUpdatePath()
        if(checkLoad && funcAll.read && funcAll.pathname === document.location.pathname)
        {
            const loaddata = async()=>{
                const data = await axios.get(`${process.env.URL_API}/api/category/list`)
                if(data.data.success){
                    setDataCategory(data.data.data)
                }
            }
            loaddata()
            setCheckLoad(false)
        }
        
    },[checkLoad,funcAll])
    useEffect(()=>{console.log(dataCategory)},[dataCategory])
    const handleSetModal = (data,type) => {
        setTypeModal(type)
        setTabModal(true)
        switch(type){
            case 'add':
                break;
            default:
                setDataTab(data)

                
        }
    }
    useEffect(()=>{console.log(dataCategory)},[dataCategory])
  return (
    <>
        {
            funcAll.create && 
            <div className='text-end'>
            <button name='add' className='p-4 bg-yellow-500 rounded-xl  mt-4 mb-5 font-bold' onClick={(e)=>{
                    handleSetModal('',e.target.name)
                }
                }>Thêm danh mục</button>
            </div>
        }
        
        <div className='bg-white p-4 h-5/6 rounded-md'>
            <div className='flex justify-between'>
                <h1 className='font-semibold text-2xl'>Tất cả danh mục</h1>
                <div className='w-1/3'>
                    {/* <select className='outline-none w-1/3' onChange={updateFilter}>
                        {optionFilter.map((dt,index) => {
                            return (
                                <option key={index} value={index}>{dt}</option>
                            )
                        })}
                    </select> */}
                    <input className='outline-none w-2/3 focus:border-b-2' placeholder='Tìm kiếm' type='search'/>
                </div>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/6'>Tên danh mục</th>
                                <th className='w-1/12'>Icon</th>
                                <th className='w-1/6'>Slug</th>
                                <th className='w-1/12'>Số lượng sản phẩm</th>
                                <th className='w-1/6'>Số thương hiệu</th>
                                <th className='w-1/12'>Top Product</th>
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
                                <th className='w-1/12'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/12'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/12'></th>
                                <th className='w-1/6'></th>
                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataCategory.length>0?
                                dataCategory.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black hover:text-white text-center font-medium'>
                                            <td>{index + 1}</td>
                                            <td>{dt.name}</td>
                                            <td className='flex justify-center items-center h-full'> <img className='w-full h-20' src={`${process.env.URL_API}${dt.icon}`}/> </td>
                                            <td>{dt.slug}</td>
                                            <td>{dt.listProduct.length}</td>    
                                            <td>{dt.listBrand.length}</td>
                                            <td>{dt.topList.length}</td>
                                            <td>
                                                {
                                                    funcAll.update &&
                                                    <button name='update' className='py-2 px-3 bg-green-500 mr-4 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={(e)=>{
                                                    handleSetModal(dt,e.target.name)
                                                }}>UPDATE</button>
                                                }
                                                
                                                 <button name='detail' className='py-2 px-3 bg-red-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-red-600' onClick={(e)=>{
                                                    handleSetModal(dt,e.target.name)
   
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
        {
            tabModal?
            <LayoutModal children={<CategoryModal setCheckLoad={setCheckLoad} dataTab={dataTab} setTab={setTabModal} typeModal={typeModal}/>}/> : ''
        }
    </>
  )
}

export default page