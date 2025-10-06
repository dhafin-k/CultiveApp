import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layouts from './pages/Admin/Layouts'
import Dashboard from './pages/Admin/Dashboard'
import AddBlog from './pages/Admin/AddBlog'
import ListBlog from './pages/Admin/ListBlog'
import Comments from './pages/Admin/Comments'
import Login from './components/Admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {token} = useAppContext();

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/blog/:id" element={<Blog/>} />
        <Route path="/admin" element={token ? <Layouts/> : <Login />}>
          <Route index element={<Dashboard/>} /> 
          <Route path="addBlog" element={<AddBlog/>} />
          <Route path="listBlog" element={<ListBlog/>} />
          <Route path="comments" element={<Comments/>} />
        </Route>
        <Route  />
      </Routes>
    </div>
  )
}

export default App