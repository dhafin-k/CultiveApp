import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useEffect, useState } from 'react';

const Navbar = () => {
  
    const {navigate, token} = useAppContext();
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg py-1' 
            : 'bg-transparent '
        }`}
        >
        <div className=' flex justify-between items-center py-5 mx-8 sm:mx-8 xl:mx-32 '>
            <button onClick={()=>navigate('/')} className='flex items-center font-family gap-2 bg-primary rounded-full cursor-pointer text-white px-10 py-2.5'>
                <img src={assets.arrow} alt="arrow" className='w-4 scale-x-[-1]'/>
            Kembali
            </button>
            <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44' />
            {/* <button onClick={()=>navigate('/admin')} className='flex items-center font-family gap-2 bg-primary rounded-full cursor-pointer text-white px-10 py-2.5'>
            {token ? "Dashboard" : "Login"}
                <img src={assets.arrow} alt="arrow" className='w-3'/>
            </button> */}
        </div>
    </div>
  )
}

export default Navbar