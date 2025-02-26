import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/DashBoard/Sidebar';
import Dashboard from './Dashboard';
import { FaSearch } from 'react-icons/fa';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
    const {user} = useAuth()
    if(!user) return <p>loading....</p>
    return (
        <div className="md:flex min-h-screen relative">
            <div className=''>

            <div className="fixed bg-[#ffedd5] text-blue-800 px-10 py-1 z-10 w-[85%] right-0 mb-40">
      <div className="flex items-center justify-between py-2 text-5x1">
        <div className="font-bold text-blue-900 text-xl">{user.accountType.toUpperCase()} <span className="text-orange-600">Panel</span></div>
        <div className="flex items-center text-gray-500">
          <span className="material-icons-outlined p-2" ><FaSearch /></span>
          <span className="material-icons-outlined p-2"><div className="relative w-16 bg-teal-100 p-2 rounded-lg">
    <svg className="w-8 h-8 text-teal-600 animate-wiggle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
            d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17" />
    </svg>
    <div className="px-1 py-0.5 bg-teal-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-2 -end-1 translate-x-1/4 text-nowrap">
        <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
        1
    </div>
</div></span>
          <div className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2" style={{backgroundImage: `url(${user.image})`}}></div>
        </div>
    </div>
  </div>
                <Sidebar/>
                {/* <Dashboard/> */}
            </div>
            <div className="flex-1  md:ml-64">
                <div className="p-5">
                <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;