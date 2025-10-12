import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layouts from './pages/Admin/Layouts'
import Dashboard from './pages/Admin/Dashboard'
import AddBlog from './pages/Admin/AddBlog'
import ListBlog from './pages/Admin/ListBlog'
import Comments from './pages/Admin/Comments'
import Login from './components/Admin/Login'
import 'quill/dist/quill.snow.css'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import UserManage from './pages/Admin/UserManage'
import ClientDashboard from './pages/Client/ClientDashboard'
import LayoutsClient from './pages/Client/Layouts'
import AddBlogClient from './pages/Client/AddBlogClient'
import ListBlogClient from './pages/Client/ListBlogClient'

const App = () => {

  const {token, user} = useAppContext()

  return (
    <div>
      <Toaster/>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/blog/:id" element={<Blog/>} />

        <Route path='/login' element={<Login />}/>

        {/* Admin Routes */}
        <Route
          path="/admin/*" element={
            token && user ? (
              user.role === "admin" ? <Layouts /> : <Navigate to="/client" replace />
            ) : (
              <Navigate to="/login" replace />
            )}
        >
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<AddBlog />} />
          <Route path="listBlog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
          <Route path="userData" element={<UserManage />} />
        </Route>

        {/* Client Routes */}
        <Route
          path="/client/*" element={
            token && user ? (
              user.role === "client" ? <LayoutsClient /> : <Navigate to="/admin" replace />
            ) : (
              <Navigate to="/login" replace />
            )}
        >
          <Route index element={<ClientDashboard />} />
            <Route path='addblog' element={<AddBlogClient />} />
            <Route path="listBlog" element={<ListBlogClient />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App