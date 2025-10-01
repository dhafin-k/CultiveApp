import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { div, li, link } from 'motion/react-client'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
            <div>
                <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />
                <p className='max-w-[410px] mt-6'>Temukan bakat serta dedikasi siswa-siswi kami. Memberdayakan generasi muda melalui keterampilan, inovasi, dan kolaborasi.
                </p>
            </div>
            
            <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
                {footer_data.map((section, index)=> (
                    <div key={index}>
                        <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
                            {section.title}
                        </h3>
                        <ul className='text-sm space-y-1'>
                            {section.links.map((link, i, directory)=> {
                                return(
                                <li key={i}>
                                    <a href={directory} className='hover:underline transition'
                                    >{link}</a>
                                </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
        <p className='py-4 text-center text-sm md:text-base text-gray-500'>
        Copyright 2025 © dhafin_k - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer