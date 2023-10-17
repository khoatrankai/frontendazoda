"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const page = () => {
    const [imageSlide,setImageSlide] = useState('');
    const [nameSlide,setNameSlide] = useState('');
    const [urlSlide,setUrlSlide] = useState('');
    const readAsDataURL = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };
    const getBase64DataForFiles = async (fileList) => {
        const base64DataArray = await Promise.all(fileList.map((file) => readAsDataURL(file)));
        return base64DataArray;
      };
    const onChangeData = (e) => {
        switch(e.target.name){
            case 'image':
                getBase64DataForFiles(Array.from(e.target.files))
                .then((result) => {
                    setImageSlide(result[0])
                })
                .catch((error) => {
                    console.error(error);
                });
            case 'name':
                setNameSlide(e.target.value) 
            case 'url':
                setUrlSlide(e.target.value)

        }
    }
    const btnCreate = async() => {
        const newData = {name: nameSlide,url: urlSlide,image: imageSlide}
        const data = await axios.post(`${process.env.URL_API}/api/slideshow/create`,newData);
        if(data){
            console.log("tao thanh cong")
        }
    }
  return (
    <div className='border-solid border-gray-900 border-2 p-2'>
        <h1>Tạo slider</h1>
        <input placeholder='image' type='file' name='image' onChange={onChangeData}/>
        <input placeholder='name' type='text' name='name' onChange={onChangeData}/>
        <input placeholder='url' type='url'  name='url' onChange={onChangeData}/>
        {
            imageSlide == '' ? (<img src='https://png.pngtree.com/png-vector/20191113/ourlarge/pngtree-avatar-human-man-people-person-profile-user-abstract-circl-png-image_1983926.jpg'/>) : (<img src={imageSlide}/>)
        }
        <button onClick={btnCreate}>Tạo</button>
    </div>
  )
}

export default page