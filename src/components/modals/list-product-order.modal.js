import React, { useEffect, useState } from 'react'

const modal = ({data,orderCode,setTab}) => { 
    const [dataLoad,setDataLoad] = useState(data);


  return (
    <>
        <div className='bg-white h-5/6 w-3/4 px-8 py-12 relative'>
    <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
            <div>
                <h1 className='font-semibold text-2xl'>Đơn hàng : {orderCode}</h1>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/6'>Tên sản phẩm</th>
                                <th className='w-1/6'>Số lượng</th>
                                <th className='w-1/6'>Giá</th>
                                <th className='w-1/6'>Mã sản phẩm</th>
                                <th className='w-1/4'>Mã code</th>
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
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/4'></th>

                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataLoad.length>0 ?
                                dataLoad.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black h-12 hover:text-white text-center font-medium'>
                                            <td>{index + 1}</td>
                                            <td> {dt.product?.name ?? ''} </td>
                                            <td> {dt.quantity} </td>
                                            <td>{dt.price}</td>
                                            <td>{dt.product?.code ?? ''}</td>
                                            <td>{dt.productCode}</td>                                   
                                        </tr>
                                        
                                    )
                                }) : <tr><td className='w-full text-red-500 font-bold text-3xl text-center'>NOT FOUND</td></tr>
                            }                           
                    </tbody>       
                    </table>
                    
            </div>
    </div>
   
    </>
    
  )
}

export default modal