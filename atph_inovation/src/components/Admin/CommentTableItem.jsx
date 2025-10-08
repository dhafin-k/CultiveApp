import { assets } from '../../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';


const CommentTableItem = ({comment, fetchComments}) => {
  
  const {blog, createdAt, id } = comment;
  const BlogDate = new Date(createdAt);

  const deleteBlog = async () =>{
    try{
        const confirm = window.confirm('Yakin ingin menghapus komentar ini?')
        
        const {data} = await axios.post(`/api/admin/comment-delete/${id}`)
        if(data.success){
            toast.success(data.message || 'Berhasil menghapus komentar')
            fetchComments();
        } else{
            toast.error(data.message || 'Gagal menghapus komentar')
        }
    } catch(err){
        toast.error(err.message || 'Terjadi Error saat menghapus komentar')
    }
  }

    return (
    <tr className='order-y border-gray-300'>
        <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>
                Berita</b> : {comment.blog_title || 'Tidak ada judul'}
            <br />
            <br />
            <b className='font-medium text-gray-600'>
                Nama</b> : {comment.name}
            <br />
            <b className='font-medium text-gray-600'>
                Komen</b> : {comment.content}
        </td>
        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>
        <td className='px-6 py-4'>
            <div className='inline-flex gap-4 items-center'>
                {
                !comment.isApproved ?
                <img src={assets.tick_icon} 
                    className='w-5 hover:scale-110 transition-all cursor-pointer'/> : <p 
                    className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'
                    >Approved</p>
                }
                <img src={assets.bin_icon} alt=""
                    onClick={deleteBlog}
                    className='w-5 hover:scale-110 transition-all cursor-pointer' />
            </div>
        </td>
    </tr>
  )
}

export default CommentTableItem