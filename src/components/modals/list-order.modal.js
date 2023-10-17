
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Detailorder from '@/components/modals/detailorder.modal.js'

const modal = ({setTab}) => {
  const [dataLoad,setDataLoad] = useState(null)
  const [dataEnumStatus,setDataEnumStatus] = useState(null)
  const [tabModalDetailOrder,setTabModalDetailOrder] = useState(false)
  const [idTabOrder,setIdTabOrder] = useState('');

  useEffect(()=>{
    const loaddata = async() => {
        const dataO = await axios.get(`${process.env.URL_API}/api/order/list`)
        if(dataO){
            setDataLoad(dataO.data.data)
        }
        const dataE = await axios.get(`${process.env.URL_API}/api/order/enumstatus`)
        if(dataE){
            setDataEnumStatus(dataE.data.data)
        }
    }
        loaddata()
   
},[])
  
  return (
    <>
        <div className='bg-white h-5/6 w-3/5 overflow-y-scroll px-16 py-12 relative'>
        <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
            <div>
                <h1 className='font-sans font-bold text-2xl ml-4 my-4 text'>Các đơn hàng</h1>
            </div>
            <div>
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
                        {  dataLoad && dataEnumStatus?
                            dataLoad.map((dt,index) => {
                                return(
                                    <tr key={dt._id}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td className='text-center'>{dt.orderCode}</td>
                                        <td className='text-center'>{dt.productList.length}</td>
                                        <td className='text-center'>{dt.status}</td>
                                        <td className='text-center'>{(new Date(dt.createdAt)).toISOString().slice(0, 19).replace("T", " ")}</td>
                                        <td className='text-center'>
                                           <button onClick={()=>{
                                                setTabModalDetailOrder(true)
                                                setIdTabOrder(dt._id)
                                                }} className='p-4 bg-black rounded-xl text-white font-bold my-2'>Xem chi tiết</button>
                                                               
                                           
                                            
                                        </td>
                                    </tr>
                                    
                                )
                            }) : ''
                        }
                        
                </tbody>
                        
                </table>
             </div>
            
            
        </div>
        {
            tabModalDetailOrder? <Detailorder _id={idTabOrder} mode={setTabModalDetailOrder}/> : ''
        }
        
    </>
  )
}

export default modal