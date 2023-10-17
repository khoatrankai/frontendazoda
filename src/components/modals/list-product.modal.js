import React, { useEffect, useState } from 'react'
import LayoutModal from '@/components/modals/layout.modal'
import ProductModal from '@/components/modals/product.modal'

const modal = ({type,setTab,data,setCheckLoad}) => { 
    const [dataLoad,setDataLoad] = useState([]);
    const [tabDetailProduct,setTabDetailProduct] = useState(false)
    const [idProduct,setIdProduct] = useState('')

    const handleUpdateID = (id)=>{
        setIdProduct(id)
        setTabDetailProduct(true)
    }
    useEffect(()=>{
            if(data){
                setDataLoad(data.listProduct)
            }    
    },[data])
  return (
    <>
        <div className='bg-white h-5/6 w-3/4 px-8 py-12 relative'>
    <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
            <div>
                <h1 className='font-semibold text-2xl'>Danh sách sản phẩm của {type ?' thương hiệu ' : ' danh mục '} {type ? data.name:data.name}</h1>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/6'>Tên sản phẩm</th>
                                <th className='w-1/6'>Mã sản phẩm</th>
                                <th className='w-1/6'>Giá gốc</th>
                                <th className='w-1/6'>Giá sale</th>
                                <th className='w-1/12'>Sản phẩm đã bán</th>
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
                                <th className='w-1/6'></th>
                                <th className='w-1/6'></th>
                                <th className='w-1/12'></th>
                                <th className='w-1/6'></th>

                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataLoad.length>0 ?
                                dataLoad.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black hover:text-white text-center font-medium'>
                                            <td>{index + 1}</td>
                                            <td> {dt.name} </td>
                                            <td>{dt.code}</td>
                                            <td>{dt.price}</td>
                                            <td>{dt.sale}</td>
                                            <td>{dt.successfulPurchase}</td>
                                            <td>
                                                
                                                <button className='py-2 px-3 bg-green-500 text-white text-sm font-bold rounded-lg my-2 hover:bg-green-600' onClick={()=>{
                                                    handleUpdateID(dt._id)
                                                }}>Chỉnh sửa</button>

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
        tabDetailProduct? <LayoutModal children={<ProductModal setCheckLoadData={setCheckLoad} typeProduct={2} setTabProduct={setTabDetailProduct} idProduct={idProduct}/>}/> : ''
    }
    </>
    
  )
}

export default modal