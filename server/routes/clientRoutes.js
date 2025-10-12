import express from 'express';
import { addBlogClient, getBlogByIdClient, getCommentsClient, deleteBlogClient, togglePublishClient,deleteCommentClient,
        getDashboardClient,getAllBlogsClient
    } from '../controllers/clientController.js';
import { verifyUser } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const clientRouter = express.Router();

// Semua route ini butuh autentikasi
clientRouter.use(verifyUser);

// Blog routes
clientRouter.post('/add/blog', upload.single('image'), addBlogClient);
clientRouter.get('/get/blog', getAllBlogsClient);               // Ambil semua blog milik client
clientRouter.get('/blog/:blogId', getBlogByIdClient);       // Ambil blog tertentu
clientRouter.delete('/blog/:blogId', deleteBlogClient);     // Hapus blog
clientRouter.patch('/blog/:blogId/publish', togglePublishClient); // Toggle publish/unpublish

// Comment routes
clientRouter.get('/comments', getCommentsClient);           // Ambil komentar milik client
clientRouter.delete('/comment/:commentId', deleteCommentClient);  // Hapus komentar

// Dashboard
clientRouter.get('/dashboard', getDashboardClient);

export default clientRouter;
