import express from "express";
import { adminLogin, ApproveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";
import { getAllBlogs } from "../controllers/blogController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth ,getAllComments);
adminRouter.get("/blog", auth ,getAllBlogs);
adminRouter.post("/comment-delete/:id", auth ,deleteCommentById);
adminRouter.post("/comment-approve", auth ,ApproveCommentById);
adminRouter.get("/dashboard", auth ,getDashboard);

export default adminRouter;