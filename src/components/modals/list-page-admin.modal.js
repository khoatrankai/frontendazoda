import React, { useEffect, useState } from 'react'
import axios from 'axios'

const modal = ({dataPage,setDataLoadPage,setTab}) => {
    const [dataPageAdmin,setDataPageAdmin] = useState(dataPage)
    const [dataListPage,setDataListPage] = useState([])
    useEffect(()=>{
        const loaddata = async()=>{
            const dataList = await axios.get(`${process.env.URL_API}/api/page/list`)
            if(dataList.data.success){
                setDataListPage(dataList.data.data)
            }
        }
        loaddata()
    },[])
    useEffect(()=>{
        console.log(dataPageAdmin,dataListPage)
    },[dataPageAdmin])
    const handleCheck = (id) => {
        const dataCheck = dataPageAdmin.filter(dt => {return dt.pageId._id === id})
        if(dataCheck.length > 0){
            return true
        }
        return false
        
    }
    const handleCheckAll = ()=> {
        if(dataListPage.length === dataPageAdmin.length){
            return true
        }
        return false
    }
    const handleCheckFuncUpdate = (id) => {
        const data = dataPageAdmin.filter(dt=> {
            return dt.pageId._id === id
        })
        if(data.length >0)
        {
            if(data[0].func !== undefined){
                console.log(data[0].func)
                switch(data[0].func){
                    case 0: case 4: case 5: case 6:
                        return true;
                        break
                    default:
                        return false
                        break
                }
            }
        }
        console.log("check",data)
    }
    const handleCheckFuncDelete = (id) => {
        const data = dataPageAdmin.filter(dt=> {
            return dt.pageId._id === id
        })
        if(data.length >0)
        {
            if(data[0].func !== undefined){
                switch(data[0].func){
                    case 0: case 3: case 5: case 7:
                        return true;
                        break
                    default:
                        return false
                        break
                }
            }
        }
    }
    const handleCheckFuncCreate = (id) => {
        const data = dataPageAdmin.filter(dt=> {
            return dt.pageId._id === id
        })
        if(data.length >0)
        {
            if(data[0].func !== undefined){
                switch(data[0].func){
                    case 0: case 2: case 6: case 7:
                        return true;
                        break;
                    default:
                        return false
                        break
                }
            }
        }
    }
    const handleFuncCreate = (id) =>{
        const data = dataPageAdmin.filter(dt=> {
            return dt.pageId._id === id
        })
        if(data.length >0)
        {
            if(data[0].func !== undefined){
                switch(data[0].func){
                    case 0: 
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 5}
                            }
                            return dt
                        }))
                        break
                    case 1:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 2}
                            }
                            return dt
                        }))
                        break
                    case 2:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 1}
                            }
                            return dt
                        }))
                        break
                    case 3:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 7}
                            }
                            return dt
                        }))
                        break
                    case 4:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 6}
                            }
                            return dt
                        }))
                        break
                    case 5:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 0}
                            }
                            return dt
                        }))
                        break
                    case 6:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 4}
                            }
                            return dt
                        }))
                        break
                    case 7:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 3}
                            }
                            return dt
                        }))
                        break
                }
            }
        }
        
    }
    const handleFuncUpdate = (id) =>{
        const data = dataPageAdmin.filter(dt=> {
            return dt.pageId._id === id
        })
        if(data.length >0)
        {
            if(data[0].func !== undefined){
                switch(data[0].func){
                    case 0: 
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 7}
                            }
                            return dt
                        }))
                        break
                    case 1:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 4}
                            }
                            return dt
                        }))
                        break
                    case 2:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 6}
                            }
                            return dt
                        }))
                        break
                    case 3:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 5}
                            }
                            return dt
                        }))
                        break
                    case 4:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 1}
                            }
                            return dt
                        }))
                        break
                    case 5:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 3}
                            }
                            return dt
                        }))
                        break
                    case 6:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 2}
                            }
                            return dt
                        }))
                        break
                    case 7:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 0}
                            }
                            return dt
                        }))
                        break
                }
            }
        }
        
    }
    const handleFuncDelete = (id) =>{
        const data = dataPageAdmin.filter(dt=> {
            return dt.pageId._id === id
        })
        if(data.length >0)
        {
            if(data[0].func !== undefined){
                switch(data[0].func){
                    case 0: 
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 6}
                            }
                            return dt
                        }))
                        break
                    case 1:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 3}
                            }
                            return dt
                        }))
                        break
                    case 2:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 7}
                            }
                            return dt
                        }))
                        break
                    case 3:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 1}
                            }
                            return dt
                        }))
                        break
                    case 4:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 5}
                            }
                            return dt
                        }))
                        break
                    case 5:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 4}
                            }
                            return dt
                        }))
                        break
                    case 6:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 0}
                            }
                            return dt
                        }))
                        break
                    case 7:
                        setDataPageAdmin(dataPageAdmin.map(dt => {
                            if(dt.pageId._id === id){
                                return {...dt,func: 2}
                            }
                            return dt
                        }))
                        break
                }
            }
        }
        
    }
    const handleUpdateAll = (e)=>{
        if(e.target.checked){
            const dataNew = dataListPage.map(dt => {
                const data = dataPageAdmin.filter(dtt => {
                    return dt._id === dtt.pageId._id
                })
                if(data.length>0){
                    if(data[0].func !== undefined && data[0].pageId !== undefined )
                    {   
                        return {pageId: data[0].pageId,func: data[0].func}
                    }
                   
                }
                return {pageId: dt,func: 1}
            })
            setDataPageAdmin(dataNew)
        }else{
            setDataPageAdmin([])
        }
    }
    const handleUploadData = (e) => {
        setDataLoadPage(e,dataPageAdmin)
        setTab(false)
    }
    const handleUploadList = (data,checked) => {
   
        if(checked){
            setDataPageAdmin([...dataPageAdmin,{pageId: {...data},func: 1}])
            
        }else
        {
           setDataPageAdmin(dataPageAdmin.filter(dt => {return dt.pageId._id !== data._id}))
        }
    }
  return (
    <>
      <div className='bg-white h-5/6 w-3/4 px-8 py-12 relative'>
        <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTab(false)}}>X</button>
            <div>
                <h1 className='font-semibold text-2xl'>Danh sách trang</h1>
            </div>
            <div className='table px-8 pt-4 w-full' >
                    <table className='w-full '>
                    <tbody>
                    <tr className='h-12'>
                                <th className='w-1/12'> <input checked={handleCheckAll()} onChange={handleUpdateAll} type='checkbox'/> </th>
                                <th className='w-1/12'>STT</th>
                                <th className='w-1/3'>Tên trang</th>
                                <th className='w-1/4'>URL</th>
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
                                <th className='w-1/12'></th>
                                <th className='w-1/3'></th>
                                <th className='w-1/4'></th>
                                <th className='w-1/4'></th>

                            </tr>                     
                    </tbody>
                    <tbody>
                            {  dataListPage.length>0 ?
                                dataListPage.map((dt,index) => {
                                    return(
                                        <tr key={dt._id}  className=' text-center font-medium'>
                                            <td> <input checked={handleCheck(dt._id)} onChange={(e)=>{handleUploadList(dt,e.target.checked)}} type='checkbox'/> </td>
                                            <td>{index + 1}</td>
                                            <td> {dt.name}</td>
                                            <td>{dt.url}</td>
                                            {
                                                handleCheck(dt._id) && 
                                                <td className='flex justify-around my-4 items-center'>
                                                    <button className={`px-4 py-2 font-bold shadow-2xl shadow-black rounded-lg ${handleCheckFuncCreate(dt._id)? 'bg-green-500' : 'bg-green-900'}`} onClick={(e)=>{handleFuncCreate(dt._id)}}>Thêm</button>
                                                    <button className={`px-4 py-2 font-bold shadow-2xl shadow-black rounded-lg ${handleCheckFuncDelete(dt._id)? 'bg-red-500' : 'bg-red-900'}`} onClick={(e)=>{handleFuncDelete(dt._id)}}>Xóa</button>
                                                    <button className={`px-4 py-2 font-bold shadow-2xl shadow-black rounded-lg ${handleCheckFuncUpdate(dt._id)? 'bg-yellow-500' : 'bg-yellow-900'}`} onClick={(e)=>{handleFuncUpdate(dt._id)}}>Sửa</button>
                                                </td>   
                                            }
                                                                     
                                        </tr>
                                        
                                    )
                                }) : <tr><td className='w-full text-red-500 font-bold text-3xl text-center'>NOT FOUND</td></tr>
                            }                           
                    </tbody>       
                    </table>
                    
            </div>
            <button className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' name='addPage' onClick={(e)=>{handleUploadData(e)}}>OK</button>
        
    </div>
    </>
  )
}

export default modal