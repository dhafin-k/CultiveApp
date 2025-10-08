import express from "express";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getAllBlogsPublished, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js"


const blogRouter = express.Router();

blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogsPublished);
blogRouter.delete('/delete/:id', auth, deleteBlogById);
blogRouter.get('/:blogId', getBlogById);
blogRouter.put('/toggle-publish/:id',auth, togglePublish);

blogRouter.post('/add-comment', addComment);
blogRouter.get('/comment/:blogId', getBlogComments);


export default blogRouter;

