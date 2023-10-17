import React, { useEffect, useState } from 'react'
import axios from 'axios'

const modal = ({dataProductDiscount,setDataLoad,setTab}) => {
    const [dataProductDis,setDataProductDis] = useState(dataProductDiscount)
    const [dataListProduct,setDataListProduct] = useState([])
    useEffect(()=>{
        const loaddata = async()=>{
            const dataList = await axios.get(`${process.env.URL_API}/api/product/list`)
            if(dataList.data.success){
                setDataListProduct(dataList.data.data)
            }
        }
        loaddata()
    },[])
    const handleCheck = (id) => {
        const dataCheck = dataProductDis.filter(dt => {return dt.product._id === id})
        if(dataCheck.length > 0){
            return true
        }
        return false
        
    }
    const handleCheckAll = ()=> {
        if(dataProductDis.length === dataListProduct.length){
            return true
        }
        return false
    }
    const handleUpdateAll = (e)=>{
        if(e.target.checked){
            const dataNew = dataListProduct.map(dt => {
                return {product: dt}
            })
            setDataProductDis(dataNew)
        }else{
            setDataProductDis([])
        }
    }
    const handleUploadData = (e) => {
        setDataLoad(e,dataProductDis)
        setTab(false)
    }
    const handleUploadList = (data,checked) => {
   
        if(checked){
            setDataProductDis([...dataProductDis,{product: {...data}}])
            
        }else
        {
           setDataProductDis(dataProductDis.filter(dt => {return dt.product._id !== data._id}))
        }
    }
    useEffect(()=>{
        console.log(dataProductDis,dataListProduct)
    },[dataProductDis])
  return (
    <>
      <div className='bg-white h-5/6 w-3/4 px-8 py-12 relative'>
        <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
            <div>
                <h1 className='font-semibold text-2xl'>Danh sách sản phẩm của danh mục</h1>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'> <input checked={handleCheckAll()} onChange={handleUpdateAll} type='checkbox'/> </th>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/3'>Hình ảnh</th>
                                <th className='w-1/4'>Tên sản phẩm</th>
                                <th className='w-1/4'>Mã sản phẩm</th>
                            </tr>                     
                    </tbody>
                    </table>                   
            </div>
            <div className='pl-8 pr-4 w-full h-96 overflow-y-scroll' >
                    <table className='w-full'>
                    <tbody>
                    <tr>
                                <th className='w-1/12'></th>
                                <th className='w-1/12'></th>
                                <th className='w-1/3'></th>
                                <th className='w-1/4'></th>
                                <th className='w-1/4'></th>

                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataListProduct.length>0 ?
                                dataListProduct.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className='hover:bg-black hover:text-white text-center font-medium'>
                                            <td> <input checked={handleCheck(dt._id)} onChange={(e)=>{handleUploadList(dt,e.target.checked)}} type='checkbox'/> </td>
                                            <td>{index + 1}</td>
                                            <td className='flex justify-center items-center h-full'> <img className='w-28 h-20' src={dt.avatar}/> </td>
                                            <td>{dt.name}</td>
                                            <td>{dt.code}</td>                            
                                        </tr>
                                        
                                    )
                                }) : <tr><td className='w-full text-red-500 font-bold text-3xl text-center'>NOT FOUND</td></tr>
                            }                           
                    </tbody>       
                    </table>
                    
            </div>
            <button className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' name='addAddress' onClick={(e)=>{handleUploadData(e)}}>OK</button>
        
    </div>
    </>
  )
}

export default modal