import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

export const adminLogin = async (req, res)=>{
    // console.log("ENV Email:", process.env.ADMIN_EMAIL);
    // console.log("ENV Password:", process.env.ADMIN_PASSWORD);
    try{
        const {email, password} = req.body;
        
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})
    }catch (error){
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogsAdmin = async (req, res) =>{
    try{
        const blogs = await Blog.findAll({
            order: [['createdAt', 'DESC']]
        })
        res.json({success: true, blogs})
    } catch (err){
        console.log(err);
        return res.json({success: false, message: err.message})
    }
}

export const getAllComments = async (req, res) =>{
    try{
        const comments = await Comment.findAll({}).populate("blog").sort({createdAt: -1})
        res.json({success: true, message: comments})
    }catch(err){
        console.log(err);
        return req.status(500).json({success: false, message: error.message})
    }
}

export const getDashboard = async (req, res) =>{
    try{
        const recentBlogs = await Blog.findById({}).sort({ createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments()
        const draft = await blogs.countDocuments({isPublished: false})

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        return res.json({success: true, dashboardData})
    }catch(err){
        console.log(err);
        return req.status(500).json({success: false, message: error.message})
    }
}

export const deleteCommentById = async (req, res)=>{
    try{
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        return res.json({success: true, message: "Komentar Berhasil di Hapus"})
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: err.message})
    }
}

export const ApproveCommentById = async (req, res)=>{
    try{
        const { id } = req.body;
        await Comment.approve(id, {isApproved: true});
        return res.json({success: true, message: "Komentar telah Disetujui"})
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: err.message})
    }
}



// export const getAllComments = async (req, res) =>{
//     try{

//     }catch(err){

//     }
// }