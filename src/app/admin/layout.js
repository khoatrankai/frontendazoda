"use client"
import React from 'react'
import Layout from '@/components/layout'
import AuthProvider from '@/Context/AuthProvider'
import AppProvider from '@/Context/AppProvider'
import { ToastContainer } from 'react-toastify'
const layout = ({children}) => {
  
  return (
    <>

    <ToastContainer
          className="max-lg:mt-[4rem] right-0 top-0"
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
    />

      <AuthProvider>
      
      <AppProvider>
        <Layout children={children}/>

      </AppProvider>

      </AuthProvider>
     

    </>
  )
}

export default layout