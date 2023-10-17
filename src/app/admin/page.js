"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Detailorder from '@/components/modals/detailorder.modal.js'
import { useCheckApp } from '@/Context/CheckPage'
import ListAllOrder from '@/components/modals/list-order.modal'
import LayoutModal from '@/components/modals/layout.modal'

const page = () => {
    const {funcAll,handleUpdatePath} = useCheckApp()
    
    const [dataOrder,setDataOrder] = useState(null)
    const [dataProduct,setDataProduct] = useState(null)
    const [dataCustomer,setDataCustomer] = useState(null)
    const [dataNewOrder,setDataNewOrder] = useState(null)
    const [dataEnumStatus,setDataEnumStatus] = useState(null)
    const [tabModalDetailOrder,setTabModalDetailOrder] = useState(false)
    const [tabAllOrder,setTabAllOrder] = useState(false)
    const [idTabOrder,setIdTabOrder] = useState('');
    useEffect(()=>{
        handleUpdatePath()
        const loaddata = async() => {
            const dataO = await axios.get(`${process.env.URL_API}/api/order/list`)
            if(dataO){
                setDataOrder(dataO.data.data)
            }
            const dataP = await axios.get(`${process.env.URL_API}/api/product/list`)
            if(dataP){
                setDataProduct(dataP.data.data)
            }
            const dataC = await axios.get(`${process.env.URL_API}/api/customer/list`)
            if(dataC){
                setDataCustomer(dataC.data.data)
            }
            const dataN = await axios.get(`${process.env.URL_API}/api/order/newlist`)
            if(dataN){
                setDataNewOrder(dataN.data.data)
            }
            const dataE = await axios.get(`${process.env.URL_API}/api/order/enumstatus`)
            if(dataE){
                setDataEnumStatus(dataE.data.data)
            }
        }
        if(funcAll.read && funcAll.pathname === document.location.pathname)
        {
            loaddata()
        }
    },[funcAll])

    const updateStatus = async(id,type) => {
        switch(type){
            case 'accept':
                await axios.patch(`${process.env.URL_API}/api/order/update-status/${id}`,{status: dataEnumStatus[1]})
                break;
            case 'deny':
                await axios.patch(`${process.env.URL_API}/api/order/update-status/${id}`,{status: dataEnumStatus[4]})
                break;
        }
        const dataN = await axios.get(`${process.env.URL_API}/api/order/newlist`)
            if(dataN){
                setDataNewOrder(dataN.data.data)
            }
    }
  return (
    <>
        
            <div className='flex flex-col justify-between h-full'>
        <ul className='text-white font-semibold flex justify-around mb-6'>
            <li className='flex items-center w-1/4 py-2 px-4 justify-around bg-black rounded-2xl'>
                <div className='logoChart w-20 h-20 rounded-full p-4 bg-gray-500 flex'>
                    <img src='https://azoda.vn/wp-content/uploads/2020/12/logo-head23.png'/>
                </div>
                <div className='orderChart'>
                    <h2 className='text-3xl'>{dataOrder === null ? 0 : dataOrder.length}</h2>
                    <h2>Đơn hàng</h2>
                </div>
            </li>
            <li className='flex items-center w-1/4 py-2 px-4 justify-around bg-black rounded-2xl'>
                <div className='logoChart w-20 h-20 rounded-full p-4 bg-gray-500 flex'>
                    <img src='https://azoda.vn/wp-content/uploads/2020/12/logo-head23.png'/>
                </div>
                <div className='orderChart'>
                    <h2 className='text-3xl'>{dataProduct === null ? 0 : dataProduct.length}</h2>
                    <h2>Sản phẩm</h2>
                </div>
            </li>
            <li className='flex items-center w-1/4 py-2 px-4 justify-around bg-black rounded-2xl'>
                <div className='logoChart w-20 h-20 rounded-full p-4 bg-gray-500 flex'>
                    <img src='https://azoda.vn/wp-content/uploads/2020/12/logo-head23.png'/>
                </div>
                <div className='orderChart'>
                    <h2 className='text-3xl'>{dataCustomer === null ? 0 : dataCustomer.length}</h2>
                    <h2>Khách hàng</h2>
                </div>
            </li>
        </ul>
        <div className='h-5/6 w-full shadow-sm bg-white relative rounded overflow-hidden'>
            <div>
                <h1 className='font-sans font-bold text-2xl ml-4 my-4 text'>Đơn hàng mới</h1>
            </div>
            <div className='table px-8 py-4 w-full' >
                <table className='w-full'>
                <tbody>
                <tr className='h-12'>
                            <th className='w-1/12'>STT</th>
                            <th className='w-1/6'>Mã đơn hàng</th>
                            <th className='w-1/6'>Số lượng sản phẩm</th>
                            <th className='w-1/6'>Trạng thái</th>
                            <th className='w-1/4'>Thời gian</th>
                            <th className='w-1/6'></th>
                        </tr>
                        {  dataNewOrder && dataEnumStatus?
                            dataNewOrder.map((dt,index) => {
                                return(
                                    <tr key={dt._id}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td className='text-center'>{dt.orderCode}</td>
                                        <td className='text-center'>{dt.productList.length}</td>
                                        <td className='text-center'>{dt.status}</td>
                                        <td className='text-center'>{(new Date(dt.createdAt)).toISOString().slice(0, 19).replace("T", " ")}</td>
                                        <td className='flex justify-around'>
                                            {dt.status === dataEnumStatus[0] && funcAll.update ?  <>
                                            <button name='accept' className='py-4 px-5 bg-green-500 text-white font-bold rounded-lg my-2' onClick={(e)=>{updateStatus(dt._id,e.target.name)}}>ACCEPT</button>
                                            <button name='deny' className='py-4 px-5 bg-red-500 text-white font-bold rounded-lg my-2' onClick={(e)=>{updateStatus(dt._id,e.target.name)}}>DENY</button>
                                            </> : <button onClick={()=>{
                                                setTabModalDetailOrder(true)
                                                setIdTabOrder(dt._id)
                                                }} className='p-4 bg-black rounded-xl text-white font-bold my-2'>Xem chi tiết</button>
                                            }                      
                                           
                                            
                                        </td>
                                    </tr>
                                    
                                )
                            }) : ''
                        }
                        
                </tbody>
                        
                </table>
             </div>
            <button className='absolute right-2 bottom-1 font-bold text-red-500' onClick={()=>{setTabAllOrder(true)}}>Xem tất cả ...</button>
            
            
        </div>
        {
            tabModalDetailOrder? <Detailorder _id={idTabOrder} mode={setTabModalDetailOrder}/> : ''
        }
        {
            tabAllOrder && <LayoutModal children={<ListAllOrder setTab={setTabAllOrder}/>}/>
        }
    </div> 
    </>
    
   
  )
}

export default page