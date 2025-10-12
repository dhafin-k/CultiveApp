import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'  

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
        <NavLink end={true} to='/client' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.home_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >Dashboard</p>
        </NavLink>

        <NavLink end={true} to='/client/addBlog' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.add_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >Tambah Berita</p>
        </NavLink>

         <NavLink end={true} to='/client/listBlog' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.list_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >List Data Berita</p>
        </NavLink>

        <NavLink end={true} to='/client/comments' 
            className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer 
                      ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img alt=""
                src={assets.comment_icon} 
                className='min-w-4 w-5' />
            <p className='hidden md:inline-block'
                >Komentar</p>
        </NavLink>

        
    </div>
  )
}

export default Sidebar