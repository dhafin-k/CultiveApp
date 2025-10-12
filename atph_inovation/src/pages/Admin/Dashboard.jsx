import { useState, useEffect } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../components/Admin/BlogTableItem'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    users: 0,
    recentBlogs: []
  })

  const { axios } = useAppContext()

  const fetchDashboard = async () => {
    try{
      const { data } = await axios.get('api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch(err){
      toast.error(err.message)
    }
  }

  useEffect(()=> {
    fetchDashboard()
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
      <div className='flex flex-wrap gap-4'>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <div className='p-4 rounded-xl bg-gray-50'>
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="30" height="29" viewBox="0 0 24 24" fill="none" 
            stroke="#009A42" strokeWidth="1.75" strokeLinecap="round" 
            strokeLinejoin="round" className="lucide lucide-users-round-icon lucide-users-round">
              <path d="M18 21a8 8 0 0 0-16 0"/><circle cx="10" cy="8" r="5"/><path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"/>
            </svg>
          </div>
          <div>
            <p className='text-xl font-semibold text-gray-600'
              >{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'
              >Pengguna</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'
              >{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'
              >Berita</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'
              >{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'
              >Komentar</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'
              >{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'
              >Darft</p>
          </div>
        </div>

      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Data Berita</p>
        </div>

        <div className='relative max-w-6xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
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
                {dashboardData.recentBlogs.map((blog, index) => {
                  return <BlogTableItem 
                            key={blog.id} 
                            blog={blog}
                            fetchBlogs={fetchDashboard} 
                            index={index + 1}/>
                })}
              </tbody>

            </table>
        </div>
      </div>



      <div></div>
    </div>
  )
}

export default Dashboard