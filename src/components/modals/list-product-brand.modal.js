import React, { useEffect, useState } from 'react'

const modal = ({dataTopList,dataListProduct,setDataTopList,setTab}) => {
    const [dataTop,setDataTop] = useState(dataTopList)
    const handleCheck = (id) => {
        const dataCheck = dataTop.filter(dt => {return dt.product._id === id})
        if(dataCheck.length > 0){
            return true
        }
        return false
        
    }
    const handleCheckAll = ()=> {
        if(dataTop.length === dataListProduct.length){
            return true
        }
        return false
    }
    const handleUpdateAll = (e)=>{
        if(e.target.checked){
            const topListNew = dataListProduct.map(dt => {
                return {product: dt}
            })
            setDataTop(topListNew)
        }else{
            setDataTop([])
        }
    }
    const handleSetDataTop = () => {
        setDataTopList(dataTop)
        setTab(false)
    }
    const handleUpdateTop = (data,checked) => {
   
        if(checked){
            setDataTop([...dataTop,{product: {...data}}])
            
        }else
        {
           setDataTop(dataTop.filter(dt => {return dt.product._id !== data._id}))
        }
    }
    useEffect(()=>{
        console.log(dataTop,dataListProduct)
    },[dataTop])
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
                                            <td> <input checked={handleCheck(dt._id)} onChange={(e)=>{handleUpdateTop(dt,e.target.checked)}} type='checkbox'/> </td>
                                            <td>{index + 1}</td>
                                            <td>{dt.avatar}</td>
                                            <td>{dt.name}</td>
                                            <td>{dt.code}</td>                            
                                        </tr>
                                        
                                    )
                                }) : <tr><td className='w-full text-red-500 font-bold text-3xl text-center'>NOT FOUND</td></tr>
                            }                           
                    </tbody>       
                    </table>
                    
            </div>
            <button className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' onClick={()=>{handleSetDataTop()}}>OK</button>
        
    </div>
    </>
  )
}

export default modal