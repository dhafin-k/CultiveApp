import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'  

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
        <NavLink end={true} to='/admin' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.home_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >Dashboard</p>
        </NavLink>

        <NavLink end={true} to='/admin/addBlog' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.add_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >Tambahkan Berita</p>
        </NavLink>

        <NavLink end={true} to='/admin/listBlog' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.list_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >List Data Berita</p>
        </NavLink>

        <NavLink end={true} to='/admin/comments' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.comment_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >Komentar</p>
        </NavLink>

        <NavLink end={true} to='/admin/userData' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>

            <svg xmlns="http://www.w3.org/2000/svg" 
                    width="24" height="24" viewBox="0 0 24 24" 
                    fill="none" stroke="currentColor" strokeWidth="1.25" 
                    strokeLinecap="round" strokeLinejoin="round" 
                    className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
                    ><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>

            <p className='hidden md:inline-block'
                >User Data</p>
        </NavLink>
    </div>
  )
}

export default Sidebar