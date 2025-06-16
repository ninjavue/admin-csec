import React from 'react'
import { useLocation } from "react-router-dom";

const HeaderBottom = () => {
    const location = useLocation()
  return (
    <div className={`bg-white shadow flex justify-between dark:bg-grays p-2 ${location.pathname == '/chat' || location.pathname == '/files'|| location.pathname == '/settings'?'hidden':''}`}>
      <p><strong className='text-gray-900 text-base capitalize dark:text-white'>{location.pathname.replace('/','')}</strong></p>
    </div>
  )
}

export default HeaderBottom