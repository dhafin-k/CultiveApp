import { useEffect, useState } from "react"
import { comments_data } from "../../assets/assets"
import CommentTableItem from "../../components/Client/CommentTableItem"
import { useAppContext } from '../../context/AppContext'
import toast from "react-hot-toast"

const CommentsClient = () => {

  const { axios } = useAppContext()

  const [comments, setComments] = useState([])

  const fetchComments = async () => {
    try{
      const { data } = await axios.get('/api/client/comments')
      data.success ? setComments(data.comments) : toast.err(data.message)
    } catch(err){
      toast.error(err.message)
    }
  }

  useEffect (() => {
    fetchComments()
  },[])


  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <div className="flex justify-between items-center max-w-4xl">
        <h1>Komentar</h1>
        <div className="flex gap-4">
          
        </div>
      </div>
      <div className="relative h-4/5 max-w-4xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide table-responsive">
        <table className="w-full text-sm text-gray-500">

          <thead className="text-xs text-gray-700  text-left uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">Judul Berita & Komentar</th>
              <th scope="col" className="px-6 py-3">Tanggal</th>
              <th scope="col" className="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
           {comments.length > 0 ? (
              comments.map((comment, index) => (
                <CommentTableItem
                  key={comment.id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  Belum ada komentar di berita Anda
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
      </div>
    </div>
  )
}

export default CommentsClient