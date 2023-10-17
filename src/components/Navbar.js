"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Navbar = () => {
    const [tabProduct,setTabProduct] = useState(false)
    const [tabCategory,setTabCategory] = useState(false)
    // const [tabPolicy,setTabPolicy] = useState(false)
  return (
    <div className='h-full w-1/6 bg-black flex flex-col font-semibold'>
        <div className='logo text-center w-full flex justify-center p-2 bg-slate-300'>
            <img src='https://azoda.vn/wp-content/uploads/2020/12/logo-head23.png'/>
        </div>
        <ul className='overflow-hidden flex-1 text-white'>
            <li className={tabCategory?'justify-center text-center inline-flex items-center w-200% -translate-x-1/2 transition-all  hover:bg-yellow-500' :'justify-center text-center inline-flex items-center w-200% transition-transform'} onMouseOver={()=>{setTabCategory(true)}} onMouseOut={()=>{setTabCategory(false)}}>
                <h2 className='w-full'>Quản lý chung</h2>
                <div className='w-full'>
                        <Link href='/admin/category'>
                            <h2 className='mb-0.3 hover:text-black'>Danh mục</h2>
                        </Link>
                        <Link href='/admin/brand'>
                            <h2 className='mt-0.3 hover:text-black'>Thương hiệu</h2>
                        </Link>
                        <Link href='/admin/vat'>
                            <h2 className='mt-0.3 hover:text-black'>Thuế</h2>
                        </Link>
                        <Link href='/admin/slideshow'>
                            <h2 className='mt-0.3 hover:text-black'>Slider</h2>
                        </Link>
                        <Link href='/admin/partner'>
                            <h2 className='mt-0.3 hover:text-black'>Đối tác</h2>
                        </Link>
                </div>
            </li>
            <li className='h-14 flex items-center justify-center hover:bg-yellow-500 transition-colors'>
                <Link href='/admin'>
                    <h2 className='hover:text-black'>Trang chủ</h2>
                </Link>
            </li>
            <li className={tabProduct?'h-20 justify-center text-center inline-flex items-center w-200% -translate-x-1/2 transition-all  hover:bg-yellow-500' :'h-20 justify-center text-center inline-flex items-center w-200% transition-transform'} onMouseOver={()=>{setTabProduct(true)}} onMouseOut={()=>{setTabProduct(false)}}>
                <h2 className='w-full'>Sản phẩm</h2>
                <div className='w-full'>
                        <Link href='/admin/listproduct'>
                            <h2 className='mb-0.5 hover:text-black'>Liệt kê sản phẩm</h2>
                        </Link>
                        <Link href='/admin/listcategory'>
                            <h2 className='mt-0.5 hover:text-black'>Phân loại sản phẩm</h2>
                        </Link>
                </div>
            </li>
            <li className='h-14 flex items-center justify-center  hover:bg-yellow-500 transition-colors'>
                <Link href='/admin/order'><h2 className='hover:text-black'>Đơn hàng</h2></Link>
            </li>
            
            <li className='h-14 flex items-center justify-center hover:bg-yellow-500 transition-colors'>
                <Link href='/admin/customer'><h2 className='hover:text-black'>Khách hàng</h2></Link>
            </li>
            <li className='h-14 flex items-center justify-center hover:bg-yellow-500 transition-colors'>
                <Link href='/admin/discount'><h2 className='hover:text-black'>Mã giảm giá</h2></Link>
            </li>
            <li className='h-14 flex items-center justify-center hover:bg-yellow-500 transition-colors'>
                <Link href='/admin/policy'><h2 className='hover:text-black'>Chính sách</h2></Link>
            </li>
            <li className='h-14 flex items-center justify-center  hover:bg-yellow-500 transition-colors'>
                <Link href='/admin/permission'><h2 className='hover:text-black'>Phân quyền</h2></Link>
            </li>
            <li className='h-14 flex items-center justify-center  hover:bg-yellow-500 transition-colors'>
                <Link href='/admin/paging'><h2 className='hover:text-black'>Phân trang</h2></Link>
            </li>
            <li className='h-14 flex items-center justify-center hover:bg-yellow-500 transition-colors'>
                <Link href='/admin/infocompany'>
                    <h2 className='hover:text-black'>Thông tin công ty</h2>
                </Link>
            </li>
            
        </ul>
    </div>
  )
}

export default Navbar