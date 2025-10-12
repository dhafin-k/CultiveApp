import { useEffect, useState } from 'react'
import BlogTableItem from '../../components/Client/BlogTableItem'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const ListBlogClient = () => {

const [blogs, setBlogs] = useState([])
const {axios} = useAppContext();

const fetchBlogs = async () => {
  try{
    const { data } = await axios.get('/api/client/get/blog')
    if(data.success){
      setBlogs(data.blogs)
    } else{
      toast.error(data.message || 'terjadi Error saat mengambil data berita')
    }
  } catch(err){
    console.log(err)
    toast.error(err.message || 'terjadi Error saat mengambil data berita')
  }
}

useEffect(() => {
    fetchBlogs()
  }, []) 

  return (
      <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
        <div>
        <h1>Seluruh Berita</h1>
        </div>

        <div className='relative h-4/5 mt-4 max-w-5xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
              <table className='w-full text-sm text-gray-500'>

                <thead className='text-xs text-gray-600 text-left uppercase'>
                  <tr>
                    <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                    <th scope='col' className='px-2 py-4'>Judul Berita</th>
                    <th scope='col' className='px-2 py-4 max-sm:hidden' >Tanggal</th>
                    <th scope='col' className='px-2 py-4 max-sm:hidden' >Status</th>
                    <th scope='col' className='px-2 py-4'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs && blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                      <BlogTableItem 
                        key={blog.id} 
                        blog={blog}
                        fetchBlogs={fetchBlogs} 
                        index={index + 1}
                      /> ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-500">
                        Belum ada berita
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
          </div>
      </div>
    )
}


export default ListBlogClient