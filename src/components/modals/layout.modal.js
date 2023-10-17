import React from 'react'

const layout = ({children}) => {
  return (
    <div className='modal-order fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-10'>
      {children}
    </div>
  )
}

export default layout