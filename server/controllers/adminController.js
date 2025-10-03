import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import { Component } from 'react';

export const adminLogin = async (req, res)=>{
    try{
        const {email, password} = req.body;
        
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({succes: false, massage: "Invalid Credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({succes: true, token})
    }catch (error){
        res.json({succes: false, massage: error.massage})
    }
}

export const getAllBlogsAdmin = async (req, res) =>{
    try{
        const blogs = await Blog.findAll({}).sort({createdAt: -1})
        res.json({success: true, blogs})
    } catch (err){
        console.log(err);
        res.json({success: false, massage: error.massage})
    }
}

export const getAllComments = async (req, res) =>{
    try{
        const comments = await Comment.findAll({}).populate("blog").sort({createdAt: -1})
        res.json({success: true, massage: comments})
    }catch(err){
        console.log(err);
        req.status(500).json({succes: false, massage: error.massage})
    }
}

export const getDashboard = async (req, res) =>{
    try{
        const recentBlogs = await Blog.findById({}).sort({ createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Component.countDocuments()
        const draft = await blogs.countDocuments({isPublished: false})

        const dashboardData = {
            blogs, comments, drafts, recentBlogs
        }
        res.json({success: true, dashboardData})
    }catch(err){
        console.log(err);
        req.status(500).json({succes: false, massage: error.massage})
    }
}

export const deleteCommentById = async (req, res)=>{
    try{
        const { id } = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, massage: "Komentar Berhasil di Hapus"})
    }catch(err){
        console.log(err);
        res.status(500).json({success: false, massage: err.massage})
    }
}

// export const getAllComments = async (req, res) =>{
//     try{

//     }catch(err){

//     }
// }