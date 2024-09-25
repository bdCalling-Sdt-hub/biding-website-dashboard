import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='flex justify-between items-center gap-0 bg-[#F2F2F2] '>

    <div className='w-[300px] bg-[#2e2e2e]  h-screen overflow-y-scroll  '>
        <SideBar />
    </div>
    
    <div className=' w-full h-screen  overflow-y-scroll'>
        <Header />
        <div className='p-6 bg-[#F2F2F2] '>
            <Outlet />
        </div>
    </div>
</div>
  )
}

export default DashboardLayout