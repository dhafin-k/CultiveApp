import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
  
    const {navigate, token} = useAppContext();

  return (
    <div className='sticky top-0 bg-white shadow-sm z-10'>
        <div className=' flex justify-between items-center py-5 mx-8 sm:mx-8 xl:mx-32 '>
            <button onClick={()=>navigate('/')} className='flex items-center font-family gap-2 bg-primary rounded-full cursor-pointer text-white px-10 py-2.5'>
                <img src={assets.arrow} alt="arrow" className='w-4 scale-x-[-1]'/>
            Kembali
            </button>
            <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44' />
            <button onClick={()=>navigate('/admin')} className='flex items-center font-family gap-2 bg-primary rounded-full cursor-pointer text-white px-10 py-2.5'>
            {token ? "Dashboard" : "Login"}
                <img src={assets.arrow} alt="arrow" className='w-3'/>
            </button>
        </div>
    </div>
  )
}

export default Navbar