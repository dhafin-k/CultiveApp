import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='mx-8 sm:mx-8 xl:mx-32 relative'>
        <div className='text-center mb-8 mt-20'>
            <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/50 bg-primary/10 rounded-full text-sm text-primary'>
                <p>Make Innovation Greater Impact</p>
                <img src={assets.star_icon} className='w-2.5 rotate-90' alt="" />
            </div>
            <h1 className='font-semibold text-3xl sm:text-5xl lg:text-6xl mb-6 leading-16 text-gray-800'>Empowering <span className='text-primary'> Innovation </span> <br /> for a Better Tomorrow</h1>

            <p className='text-gray-600 max-w-2xl my-6 sm:my-8 m-auto max-sm:text-xs'>
                Melalui inovasi, kami mengubah praktik agribisnis holtikultura untuk menghasilkan produk yang unggul dan berkelanjutan.
            </p>

            <form action="" className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden">
                <input type="text" placeholder='Cari inovasi holtikultura...' required
                className="w-full pl-4 outline-none"/>
                <button type='submit' className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer" >Cari</button>
            </form>
        </div>

        <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 animasi-3'/>    
    </div>
  )
}

export default Header