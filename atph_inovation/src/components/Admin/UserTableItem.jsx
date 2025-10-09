import React from 'react'
import { assets } from '../../assets/assets'
const UserTableItem = ({user, index, onDelete, onEdit}) => {

    const formatDate = (dateString) => {
        if (!dateString) return '-'
    const d = new Date(dateString)
        if (isNaN(d)) return dateString
        return d.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        })
    }
  
  return (
     <tr className='border-y border-gray-300'>
                 <th className='px-2 py-4'>{index}</th>  
                 <td className='px-2 py-4'>{user.nama} </td>
                 <td className='px-2 py-4 max-sm:hidden'>{formatDate(user.createdAt)}</td>
                 <td className='px-2 py-4 max-sm:hidden'>
                     <p className=''
                     >Aktif</p>
                 </td>
                 <td className='px-2 py-4 flex text-xs gap-3'>
                     <button 
                        onClick={() => onEdit(user)}
                         className='border px-2 py-0.5 mt-1 rounded cursor-pointer'
                     >edit
                     </button>
                     <img 
                        src={assets.cross_icon} 
                        onClick={() => onDelete(user.id)}
                        alt="hapus"
                        title='hapus user'
                        className='w-8 hover:scale-110 transition-all cursor-pointer'/>
                 </td>
             </tr>
  )
}

export default UserTableItem