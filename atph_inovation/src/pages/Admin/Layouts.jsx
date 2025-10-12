import { assets } from '../../assets/assets';
import { Outlet, replace, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar';
import axios from 'axios';
import { useAppContext } from '../../context/AppContext';

const Layouts = () => {

        const  {logout ,navigate} = useAppContext();

        const handleLogout = () => {
            logout();       // clear token & user
            setTimeout(() => navigate("/", { replace: true }), 50);
        };


  return (
    <>
        <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200'>
            <img alt=""
                src={assets.logo}  
                className='w-32 sm:w-40 cursor-pointer'
                onClick={()=> navigate('/')}/>

            <p className='text-lg font-medium text-primary'
                >Dashboard Admin</p>
            <div className='flex items-center gap-4'>
            <button 
                onClick={handleLogout}
                className='text-base px-8 py-2 bg-primary text-white rounded-full cursor-pointer'
                >Logout</button>
            </div>
        </div>
        <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar />
            <Outlet />
        </div>
    </>
  )
}

export default Layouts