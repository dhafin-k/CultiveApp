import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import BlogNavbar from '../components/BlogNavbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { tr } from 'motion/react-client'


const Blog = () => {
  const {id} = useParams()

  const {axios} = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])

  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchComments = async () => {
    try{
      const {data} = await axios.get(`/api/blog/comment/${id}`);
      if(data.success){
        setComments(data.comments) 
      }else{
        toast.error(data.message)
      }
    } catch(err){
      toast.error(err.message)
      console.log(err);
    }
  }

  const fetchBlogData = async () => {
    try{
      const {data} = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch(err){
      toast.error(err.message)
      console.log(err);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/blog/add-comment', {
        blog: id, name, content})

      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
        fetchComments()
      }else{
        toast.error(data.message)
      }
    } catch(err){
      toast.error(err.message || "Erorcuy")
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
},[])

  return data ? (
    <div 
      className='relative'>
        <img src={ assets.gradientBackground } 
              alt="" 
              className='absolute -top-50 -z-1 opacity-50' />
      <BlogNavbar />
      
      <div className='text-center mt-12 text-gray-600'>
          <p className='text-primary py-4 font-medium'>
            Di Publikasikan pada {Moment(data.createdAt).format('MMMM Do YYYY')}
          </p>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>
            {data.title}</h1>
          <h2 className='my-5 max-w-lg truncate mx-auto'>
            {data.subTitle}</h2>
          <p className='inline-block py-1 px-4 rounded-full mb-6 border text-base border-primary/35 bg-primary/5 font-medium text-primary'>
          {data.author_name || 'Admin'}</p>
      </div>

      <div className="mx-5 max-w-3xl md:mx-auto my-10 mt-6"> 
        <div className='flex justify-center items-center flex-col'>
        <img src={import.meta.env.VITE_IMAGE_BLOG + data.image} 
              alt=""
              className='rounded-3xl mb-5' />
        </div>
        
        <div className='rich-text max-w-3xl mx-auto'
          dangerouslySetInnerHTML={{ __html: data.description }}>
        </div>
      
        {/* Comment section */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">

        <p className='font-semibold mb-4'>
          Komentar ({comments.length})</p>
        <div className='flex flex-col gap-4 '>

          {comments.map((item, index) => (
            <div key={index} 
                 className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
              <div className='flex items-center gap-2 mb-2'>
                <img src={assets.user_icon} alt="" className='w-6'/>
                <p className='font-medium'>
                  {item.name}
                </p>
              </div>

              <p className='text-sm max-w-md ml-8'>
                {item.content}</p>
              <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'
                  >{Moment(item.createdAt).fromNow()}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Comment form */}
      <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Tambahkan Komentar</p>
          <form action="" 
                onSubmit={addComment}
                className='flex flex-col items-start gap-4 max-w-lg'>

                  <input onChange={(e)=> setName(e.target.value)} value={name}
                  type="text" placeholder='Nama' required 
                  className='w-full p-2 border border-gray-300 rounded outline-none'/>

                  <textarea onChange={(e)=> setContent(e.target.value)} value={content}
                  name="" id="" required
                  placeholder='Comment' 
                  className='w-full p-2 border border-gray-300 rounded outline-none h-48' 
                  ></textarea>

                  <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'
                  >Kirim</button>
          </form>
        </div>
          
        {/* Share Section */}
          <div className='my-24 max-w-3xl mx-auto'>
            <p className='font-semibold my-4'>
              Bagikan Artikel Ini
            </p>
            <div className='flex'>
              <img src={assets.facebook_icon} width={50} alt=""/>
              <img src={assets.twitter_icon}  width={50} alt="" />
              <img src={assets.googleplus_icon} width={50} alt="" />
            </div>
          </div>
      </div>

      <Footer />

      
    </div>
  ) : <Loader />;
}

export default Blog