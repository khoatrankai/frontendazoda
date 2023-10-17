import React, { useEffect, useReducer, useState } from 'react'
import TextEditor from '@/components/TextEditor.js'
import axios from 'axios'
import LayoutModal from './layout.modal.js'
import AlertconfirmModal from './alertconfirm.modal.js'


const Addproduct = ({setTabProduct,typeProduct,idProduct=null,setCheckLoadData}) => {
    const [dataBrand,setDataBrand] = useState([])
    const [dataCategory,setDataCategory] = useState([])
    const [dataVat,setDataVat] = useState([])
    const [dataProduct,setDataProduct] = useState(null)
    const [disabled,setDisabled] = useState(false)
    const [key,setKey] = useState(Date.now())
    const [listImage,setListImage] = useState([])
    const [loadImg,setLoadImg] = useState(false)
    const [loadAvatar,setLoadAvatar] = useState("")
    const [alertName,setAlertName] = useState('')
    const [alertType,setAlertType] = useState('')
    const [resultAlert,setResultAlert] = useState(false)
    const [tabAlert,setTabAlert] = useState(false)
    const [dataDescription,setDataDescription] = useState('')
    const handleImageUpload = (event) => {
      setLoadImg(true)
      const selectedFiles = Array.from(event.target.files);
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));
      if(event.target.name === 'listImage'){
        setListImage(urls);
      }else
      {
        setLoadAvatar(urls[0])
      }
    };

    const handleDeleteImage = (index) => {
      setListImage(listImage.filter((dt,i)=> {return i != index}))
      setDataProduct({...dataProduct,listImage: dataProduct.listImage.filter((dt,i)=> {return i != index})})
    }
    // const convertToBase64 = (files) => {
    //   const fileList = Array.from(files);
    //   const arrayList = [];

    //   fileList.forEach((file) => {
    //     if (file instanceof Blob) {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onloadend = () => {
    //         arrayList.push(reader.result);
    //       };
    //     }})
    //     return arrayList
    // }
    const checkLinkImg = (value) => {
      try{
        return value.includes("/uploads")
      }catch(err){
        return false
      }
    }
    // const convertToBaseOne = (file) => {
    //     const formdata = new FormData()
    //     formdata.append("file",file)
    //     console.log(formdata)
    //     return formdata
      // return new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(file);
      //   reader.onloadend = () => {
      //     resolve(reader.result);
      //   };
      //   reader.onerror = () => {
      //     reject(new Error("Could not convert the file to Base64."));
      //   };
      // });
    // }
    const updateDataProduct = async(type,data) => {
        switch(type){
          case 'name':
            setDataProduct({...dataProduct,name:data})
            break;
          case 'avatar':
            setDataProduct({...dataProduct,avatar: data})
            break;
          case 'deleteAvatar':
            setDataProduct({...dataProduct,avatar: ''})
            setLoadAvatar(null)
            break;
          case 'code':
            setDataProduct({...dataProduct,code:data})
            break;
          case 'price':
            setDataProduct({...dataProduct,price:Number(data)})
            break;
          case 'quantity':
            setDataProduct({...dataProduct,quantity:Number(data)})
            break;

          case 'listImage':
            setKey(Date.now())
            setDataProduct({...dataProduct,listImage: Array.from(data)})
            break;

          case 'sale':
            setDataProduct({...dataProduct,sale:Number(data)})
            break;

          case 'enable':
            setDataProduct({...dataProduct,enable:data})
            break;

          case 'brand':
            setDataProduct({...dataProduct,brand:data})
            break;

          case 'category':
            setDataProduct({...dataProduct,category:data})
            break;

          case 'vat':
            setDataProduct({...dataProduct,vat:data})
            break;

          case 'sourceCode':
            setDataProduct({...dataProduct,sourceCode:data})
            break;

          case 'keyWord':
            setDataProduct({...dataProduct,keyWord:data})
            break;
          case 'urlProduct':
            setDataProduct({...dataProduct,urlProduct:data})
            break;

            
        }
    }

    const createProduct = async() => {
        const formdata = new FormData()
        Object.keys(dataProduct).forEach(key => {
          if(key === "listImage")
          {
            for(let i = 0; i<dataProduct[key].length;i++){
              formdata.append(key,dataProduct[key][i])

            }
          }else{
            formdata.append(key,dataProduct[key])

          }
        })
        console.log(formdata)
        const dataUp = await axios.post(`${process.env.URL_API}/api/product/create`,formdata)
        console.log(dataUp)
        if(dataUp){
          console.log(dataUp.data)
        }    
        const config = {
          Headers: {
              'content-type': 'multipart/form-data'
          }
        }
    }
    const updateProduct = async() => {
      const formdata = new FormData()
      Object.keys(dataProduct).forEach(key => {
        if(key === "listImage")
        {
          for(let i = 0; i<dataProduct[key].length;i++){
            formdata.append(key,dataProduct[key][i])

          }
        }else{
          formdata.append(key,dataProduct[key])

        }
      })
        const dataUp = await axios.put(`${process.env.URL_API}/api/product/update/${idProduct}`,formdata)
        if(dataUp){
          console.log(dataUp.data)
        }  
    }

  useEffect(()=>{
    if(resultAlert){
      switch(alertType){
        case 'create':
          createProduct();
          setTabProduct(false)
          break;
        case 'update':
          updateProduct()
          setTabProduct(false)
          break;
        default:
          console.log('error')
      }
      setTimeout(() => {
        setCheckLoadData(true)
        
      },100);
    }
    
  },[tabAlert,resultAlert])

   useEffect(()=>{
    if(typeProduct == 1){
      setDisabled(true)
    }
    if(typeProduct === 0){
      setDataProduct({name: '',avatar: '',code: '',price: '',quantity: '',listImage: [],sale: '',
      enable: false,brand: '',category: '',vat: '',sourceCode: '',urlProduct: '',urlVideo: '',
      keyWord: ''})
    }
   },[typeProduct])
   useEffect(()=>{
    
      const loaddata = async() => {
        if(idProduct){
          const data = await axios.get(`${process.env.URL_API}/api/product/list/${idProduct}`);
          if(data){
            setDataProduct(data.data.data)
          }
        }
        
        const datab = await axios.get(`${process.env.URL_API}/api/brand/list`);
        if(datab){
          setDataBrand(datab.data.data)
        }
        const datac = await axios.get(`${process.env.URL_API}/api/category/list`);
        if(datac){
          setDataCategory(datac.data.data)
        }
        const datav = await axios.get(`${process.env.URL_API}/api/vat/list`);
        if(datac){
          setDataVat(datav.data.data)
        }
      }
      loaddata()
    
   },[])
   useEffect(()=>{
    const time = new Date().getTime()
    console.log(dataProduct,time)
    if(dataProduct && !loadImg){
      setListImage(dataProduct.listImage)
      setLoadAvatar(dataProduct.avatar)
    }
    if(dataProduct){
      setDataDescription(dataProduct.sourceCode)
    }
  },[dataProduct])
  useEffect(()=>{
    // console.log( dataCategory[0])
    if(typeProduct === 0){
      if(dataBrand.length > 0 && dataCategory.length>0 && dataVat.length>0)
        setDataProduct({...dataProduct,brand: dataBrand[0]._id,category: dataCategory[0]._id,vat: dataVat[0]._id})
    }
  },[dataBrand,dataCategory,dataVat])
  return (
    <>
      <div className='bg-white h-5/6 w-3/5 overflow-y-scroll px-16 py-12 relative'>
      <button className='absolute right-8 top-6 text-2xl font-bold text-red-600' onClick={()=>{setTabProduct(false)}}>X</button>
      {typeProduct === 0?
        <h1 className='font-bold text-xl mb-12'>Thông tin tạo mới</h1>:
        <h1 className='font-bold text-xl mb-12'>Thông tin ID: {dataProduct?dataProduct._id: ''} </h1>
      } 
      {
        dataProduct?
        <ul>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Tên sản phẩm*</label>
          <input name='name' disabled={disabled} value={dataProduct.name}  onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}} className='outline-none bg-slate-200 p-3' placeholder='Tên sản phẩm' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Mã sản phẩm*</label>
          <input name='code' disabled={disabled} value={dataProduct.code}  onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}} className='outline-none bg-slate-200 p-3' placeholder='Tên sản phẩm' type='text'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Số lượng</label>
          <input name='quantity' disabled={disabled} defaultValue={dataProduct.quantity} onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}} className='outline-none bg-slate-200 p-3' placeholder='Số lượng' type='number'/>
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Avatar*</label>
          <input disabled={disabled} name='avatar' className='outline-none bg-slate-200 p-3' onChange={(e)=>{
            updateDataProduct(e.target.name,e.target.files[0])
            handleImageUpload(e)
            }
            } type='file'/>
          {
            loadAvatar?
            <div className='w-32 h-56 relative mr-4'>
                    <img className='w-full h-full' src={checkLinkImg(loadAvatar) ? `${process.env.URL_API}${loadAvatar}`:loadAvatar}/>
                    {
                      typeProduct === 2 ?<button name='deleteAvatar' className='absolute top-2 right-2 w-8 h-8 font-bold bg-white rounded-full' onClick={(e)=>{updateDataProduct(e.target.name)}}>X</button>: ''
                    }
                    
          </div> : ''
          }
          
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Ảnh mô tả</label>
          <input name='listImage' key={key} disabled={disabled} onChange={(e)=>{
          
            handleImageUpload(e)
            
            updateDataProduct(e.target.name,e.target.files)
          }} className='outline-none bg-slate-200 p-3' placeholder='Số lượng' type='file' multiple />
          <div className='mt-2 flex'>
            { listImage.map((dt,index) => {
                return(
                  <div className='w-32 h-56 relative mr-4' key={index}>
                    <img className='w-full h-full' src={checkLinkImg(dt) ? `${process.env.URL_API}${dt}`:dt}/>
                    {
                      typeProduct != 1 ?<button className='absolute top-2 right-2 w-8 h-8 font-bold bg-white rounded-full' onClick={()=>handleDeleteImage(index)}>X</button>: ''
                    }
                    
                  </div> 
          
                )
              }) 
            }
          </div>
        </li>
        <li className='flex flex-col mb-9'>
        <label className='font-semibold'>Thương hiệu</label>
          <select name='brand' disabled={disabled} className='outline-none bg-slate-200 p-3' value={dataProduct.brand?._id ?? ''} onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}}>
              {
                dataBrand.map((dt,index) => {
                  return(
                    <option key={index} value={dt._id} >
                      {dt.name}
                    </option>
                  )
                }) 
              }
          </select>
        </li>
        <li className='flex flex-col mb-9'>
        <label className='font-semibold'>Danh mục</label>
          <select name='category' disabled={disabled} className='outline-none bg-slate-200 p-3' value={dataProduct.category?._id ?? ''} onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}}>
              {
                dataCategory.map((dt,index) => {
                  return(
                    <option key={index} value={dt._id} >
                      {dt.name}
                    </option>
                  )
                }) 
              }
          </select>
        </li>
        <li className='flex flex-col mb-9'>
        <label className='font-semibold'>Vat</label>
          <select name='vat' className='outline-none bg-slate-200 p-3' disabled={disabled} value={dataProduct.vat?._id ?? ''} onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}}>
              {
                dataVat.map((dt,index) => {
                  return(
                    <option key={index} value={dt._id} >
                      {dt.percent}
                    </option>
                  )
                }) 
              }
          </select>
        </li>
        <li className='flex flex-col mb-9'> 
          <label className='font-semibold'>Giá Gốc</label>
          <input name='price' disabled={disabled} defaultValue={dataProduct.price}  onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}} className='outline-none bg-slate-200 p-3' placeholder='Giá gốc' type='number'/>
        </li>
        <li className='flex flex-col mb-9'> 
          <label className='font-semibold'>Giá Giảm </label>
          <div>
            <input name='enable' disabled={disabled} checked={dataProduct.enable}  onChange={(e)=>{updateDataProduct(e.target.name,e.target.checked)}}  className='mr-4 w-4 h-4' placeholder='Enable' type='checkbox'/>
            <input name='sale' disabled={disabled} defaultValue={dataProduct.sale}  onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}} className={`outline-none  p-3 ${dataProduct.enable?'bg-slate-200': 'bg-gray-700'}`} placeholder='Giá giảm' type='number' readOnly={!dataProduct.enable}/>
          </div>                  
        </li>
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>URL sản phẩm</label>
          <input name='urlProduct' disabled={disabled} value={dataProduct.urlProduct}  onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}} className='outline-none bg-slate-200 p-3' placeholder='URL sản phẩm' type='url'/>
        </li> 
        <li className='flex flex-col mb-9'>
          <label className='font-semibold'>Keyword</label>
          <textarea name='keyWord' disabled={disabled} value={dataProduct.keyWord}  onChange={(e)=>{updateDataProduct(e.target.name,e.target.value)}} className='outline-none bg-slate-200 p-3' rows="10" cols="40" />
        </li> 
        <li  className='flex flex-col mb-9'>
        <label className='font-semibold'>Mô tả</label>
        <TextEditor disabled={disabled} value={dataDescription} name={'sourceCode'}   setDataChange={updateDataProduct}/>
        </li>
      </ul>
        :''
      }
      
      {
        typeProduct == 0 ? <button name='create' className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' onClick={(e)=>{
          setTabAlert(true)
          setAlertType(e.target.name)
        }} type='submit'>Thêm</button> : typeProduct == 2 ? <button className='py-3 px-4 bg-yellow-400 rounded-sm float-right font-bold' name='update' onClick={(e)=>{
          setTabAlert(true)
          setAlertType(e.target.name)
          setAlertName(idProduct)
        }} type='submit'>Cập nhật</button> : ''
      }
                
      </div>
      {
        tabAlert ? <LayoutModal children={<AlertconfirmModal name={alertName} type={alertType} result={setResultAlert} setTab={setTabAlert}/>} /> : ''
      }
    </>
    
  )
}

export default Addproduct