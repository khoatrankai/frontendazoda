"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ListProductModal from '@/components/modals/list-product-order.modal'
import LayoutModal from '@/components/modals/layout.modal'
import { useCheckApp } from '@/Context/CheckPage'


const page = () => {
    const {funcAll,handleUpdatePath} = useCheckApp()
    const [enumStatus,setEnumStatus] = useState([])
    const [dataOrder,setDataOrder] = useState([])
    const [dataListProduct,setDataListProduct] = useState([])
    const [idCodeOrder,setIdCodeOrder] = useState('')
    const [tabListProduct,setTabListProduct] = useState(false)
    const [checkLoad,setCheckLoad] = useState(true)

    const handleUpdate = (data,codeOrder)=>{
        setDataListProduct(data)
        setIdCodeOrder(codeOrder)
        setTabListProduct(true)
    }
    const handleUpdateStatus = async(id,value)=>{
        if(funcAll.update && funcAll.pathname === document.location.pathname){
            const upData= await axios.patch(`${process.env.URL_API}/api/order/update-status/${id}`,{status: value})
            if(upData.data.success){
                setCheckLoad(true)
            }
        }   
    }
    const handleUpdateSuccess = async(id)=>{
        const upData= await axios.patch(`${process.env.URL_API}/api/order/update-status/${id}`,{status: enumStatus[3]})
        if(upData.data.success){
            setCheckLoad(true)
        }
    }
    useEffect(()=>{
        handleUpdatePath()
        if(checkLoad && funcAll.read && funcAll.pathname === document.location.pathname)
        {
            const loaddata = async()=>{
                const dataLoadEnum = await axios.get(`${process.env.URL_API}/api/order/enumstatus`);
                const dataLoadOrder = await axios.get(`${process.env.URL_API}/api/order/list`)
                if(dataLoadEnum.data.success && dataLoadOrder.data.success){
                    setEnumStatus(dataLoadEnum.data.data)
                    setDataOrder(dataLoadOrder.data.data)
                }
               
            }
            loaddata()
            setCheckLoad(false)
        }   
    },[checkLoad,funcAll])
  return (
    <>
        <div className='bg-white p-4 h-5/6 rounded-md'>
            <div>
                <h1 className='font-semibold text-2xl'>Danh sách đơn hàng</h1>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/6'>Mã đơn hàng</th>
                                <th className='w-1/6'>Số lượng sản phẩm</th>
                                <th className='w-1/4'>Thời gian</th>
                                <th className='w-1/6'>Trạng thái</th>
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
                                <th className='w-1/4'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>

                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataOrder.length>0?
                                dataOrder.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black group h-12 hover:text-white text-center font-medium '>
                                            <td>{index + 1}</td>
                                            <td>{dt.orderCode} </td>
                                            <td>{dt.productList.length}</td>
                                            <td>{dt.createdAt}</td>
                                            <td>        
                                                <select className='group-hover:bg-black outline-none' defaultValue={dt.status} onChange={(e)=>handleUpdateStatus(dt._id,e.target.value)}>
                                                    {enumStatus.length>0 ? enumStatus.map((status,i) => {
                                                        if(dt.status === enumStatus[3] || dt.status === enumStatus[4]){
                                                            if(status === dt.status){
                                                            return(
                                                            <option key={i} value={status}>
                                                                {status}
                                                            </option>)
                                                        }
                                                        }else{
                                                            
                                                            if(dt.status === enumStatus[0]){
                                                                if(i >= 0){
                                                                    return(
                                                                    <option key={i} value={status}>
                                                                        {status}
                                                                    </option>)
                                                                }
                                                            }
                                                            if(dt.status === enumStatus[1]){
                                                                if(i >= 1){
                                                                    return(
                                                                    <option key={i} value={status}>
                                                                        {status}
                                                                    </option>)
                                                                }
                                                            }
                                                            if(dt.status === enumStatus[2]){
                                                                if(i >= 2){
                                                                    return(
                                                                    <option key={i} value={status}>
                                                                        {status}
                                                                    </option>)
                                                                }
                                                            }
                                                            
                                                        }
                                                        
                                                
                                                        
                                                    }):''}
                                                </select>
                                            </td>
                                            <td className='flex justify-around'>
                                                <button className='py-2 px-3 bg-green-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={()=>{
                                                    handleUpdate(dt.productList,dt.orderCode)
                                                }}>DETAIL</button>
                                                {
                                                    (dt.status === enumStatus[3] || dt.status === enumStatus[4]) && funcAll.update === false ? '':<button className='py-2 px-3 bg-red-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-red-600' onClick={()=>{
                                                    handleUpdateSuccess(dt._id)
                                                }}>Đã giao</button> 
                                                }
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
            tabListProduct? <LayoutModal children={<ListProductModal data={dataListProduct} orderCode={idCodeOrder} setTab={setTabListProduct}/>}/> :''
        }
    </>
  )
}

export default page