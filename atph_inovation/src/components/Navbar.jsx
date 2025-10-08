import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const {navigate, token} = useAppContext()

  return (
    <div className='sticky flex justify-between items-center py-5 mx-8 sm:mx-8 xl:mx-32 '>
        <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-32 sm:w-44' />
        <button onClick={()=>navigate('/admin')} className='flex items-center font-family gap-2 bg-primary rounded-full cursor-pointer text-white px-10 py-2.5'>
          {token ? 'Dashboard' : 'Login'}
            <img src={assets.arrow} alt="arrow" className='w-3'/>
        </button>
    </div>
  )
}

export default Navbar