import { useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcMoneyTransfer, FcSettings } from 'react-icons/fc'

import { AiOutlineBars } from 'react-icons/ai'

import { Link, useNavigate } from 'react-router-dom'
import { MdHomeWork } from 'react-icons/md'
// import MenuItem from './Menu/MenuItem'

import { CgProfile } from 'react-icons/cg'
import { FaHome } from 'react-icons/fa'
import useAuth from '../../Hooks/useAuth'
import MenuItem from './Menu/MenuItem'
import UserMenu from './Menu/UserMenu'
import AgentMenu from './Menu/AgentMenu'
import AdminMenu from './Menu/AdminMenu'


const Sidebar = () => {
  const { logout , user} = useAuth()
  const navigate = useNavigate()
  const [isActive, setActive] = useState(false)
//   const [role, isLoading] = useRole()

  if(user== null){
    navigate('/')
  }
  if(!user) return <p>loading</p>

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
            <FaHome size={30}/>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <Link to='/' className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto'>
              
                <FaHome size={30}/>
              
            </Link>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
          
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* my profile common*/}
              <MenuItem label='My Account' address='/dashboard' icon={CgProfile}/>

              {
                user.accountType == 'admin'? undefined : <MenuItem label='My Transaction' address='transaction' icon={FcMoneyTransfer}/>
              }

              {/* Add Room */}

              {user.accountType=== 'user' && <UserMenu/>}
              {user.accountType=== 'agent' && <AgentMenu/>}
              {user.accountType=== 'admin' && <AdminMenu/>}  

              {/* My Listing */}

            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          
          <button
            onClick={logout}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar