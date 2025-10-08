import { create, title, tr } from 'motion/react-client';
import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import {Trash2} from 'lucide-react';
import toast from 'react-hot-toast';

const BlogTableItem = ({blog, fetchBlogs, index}) => {
  
    const {title ,createdAt } = blog;
    const BlogDate = new Date(createdAt)

    const {axios} = useAppContext();

    const deleteBlog = async () =>{
        const confirm = window.confirm('Yakin ingin menghapus berita ini?')
        if(!confirm) return;
        try{
            const {data} = await axios.delete(`/api/blog/delete/${blog.id}`)
            if(data.success){
                toast.success(data.message || 'Berhasil menghapus berita')
                await fetchBlogs();
            }else{
                toast.error(data.message || 'Gagal menghapus berita')
            }
        } catch(err){
            toast.error(err.message || 'Terjadi Error saat menghapus berita')
        }
    }

    const togglePublish = async () =>{
        try{
            const {data} = await axios.put(`/api/blog/toggle-publish/${blog.id}`)
            if(data.success){
                toast.success(data.message || 'Berhasil Merubah status berita')
                await fetchBlogs();
            }else{
                toast.error(data.message || 'Gagal Merubah status berita')
            }
        } catch(err){
            toast.error(err.message || 'Terjadi Error saat Merubah status berita')
        }
        }
    return (
        <tr className='border-y border-gray-300'>
            <th className='px-2 py-4'>{index}</th>  
            <td className='px-2 py-4'>{title}</td>
            <td className='px-2 py-4 max-sm:hidden'>{BlogDate.toDateString()}</td>
            <td className='px-2 py-4 max-sm:hidden'>
                <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}
                >{blog.isPublished ? 'Published' : 'Unpublised'}</p>
            </td>
            <td className='px-2 py-4 flex text-xs gap-3'>
                <button 
                    onClick={togglePublish}
                    className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
                >{blog.isPublished ? 'Unpublised' : 'Published'}</button>
                <img src={assets.cross_icon} alt=""
                    onClick={deleteBlog} 
                    className='w-8 hover:scale-110 transition-all cursor-pointer'/>
            </td>
        </tr>
    )
}

export default BlogTableItem