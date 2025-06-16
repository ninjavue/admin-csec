import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='p-4 flex flex-col justify-center items-center'>
        <img src="/images/404.png" alt="" />
        <h1 className='text-8xl text-gray-700 font-bold dark:text-gray-600'>404</h1>
        <h3 className='text-lg text-gray-700 dark:text-gray-500 font-medium'>Sahifa topilmadi?</h3>
        <button 
          onClick={() => navigate(-1)} 
          className='bg-tablebtn hover:bg-tablebtnh py-2 px-7 mt-4 rounded-sm text-white font-medium'
        >
          Orqaga
        </button>
    </div>
  )
}

export default NotFound
