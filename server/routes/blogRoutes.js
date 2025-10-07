import express from "express";
import { addBlog, addComment, deleteBlogById, getAllBlogs, getAllBlogsPublished, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js"


const blogRouter = express.Router();

blogRouter.post('/add', upload.single('image'), auth, addBlog);
blogRouter.get('/all', getAllBlogsPublished);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete',auth, deleteBlogById);
blogRouter.put('/toggle-publish',auth, togglePublish);
// blogRouter.post("/add", auth, upload.single('image'), addBlog)

blogRouter.post('/add-comment', addComment);
blogRouter.get('/comment/:blogId', getBlogComments);


export default blogRouter;

