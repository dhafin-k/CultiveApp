import fs from 'fs'
import imagekit from '../configjs/imageKit.js'; // Make sure this exports an instance of ImageKit, not the class itself
import Blog from '../models/Blog.js'
import { error } from 'console';
import Comment from '../models/Comment.js';
import path from 'path';
import axios from 'axios';

export const addBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = req.body;
        const imageFile = await req.file;

        // Validasi input
        if(!title || !description || !category || !subTitle || !imageFile){
            return res.status(422).json('Kolom wajib diisi')
        }

        // Memastikan isPublished adalah integer 0 atau 1
        const isPublishedInt = parseInt(isPublished) === 1 ? 1 : 0;

        const image = imageFile.filename;

        await Blog.create({
            title, subTitle, 
            description, category, image,
            isPublished: isPublishedInt});

        return res.status(201).json({success: true , message: 'Berhasil menambahkan data'})
        
    } catch(err) {
        console.log(err);
        return res.status(500).json('Gagal menambahkan data')
    }
}

export const getAllBlogs = async(req, res)=> {
    try{
        const blogs = await Blog.findAll({
            where: { isPublished: 1 },
            order: [['createdAt', 'DESC']],
        })
        res.json({success: true, blogs})
    } catch(err){
        console.log(err)
        return res.status(500).json('Gagal Mengambil data Berita')
    }
}

export const getAllBlogsPublished = async (req, res) => {
  try {
    // ambil hanya yang sudah dipublish
    const blogs = await Blog.findAllPublished();

    // kalau gak ada data
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Belum ada berita yang dipublikasikan",
      });
    }

    // kirim hasil
    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (err) {
    console.error("Error saat mengambil data blog:", err);
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data berita",
    });
  }
};

export const getBlogById = async (req, res)=>{
    try{
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message:"Blog tidak ditemukan" })
        }
        res.json({ success: true, blog})
    } catch(err){
        res.json({success: false, message: error.message})
    }
}

export const deleteBlogById = async (req, res) =>{
    try{
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        // Hapus semua komentar yang terkait dengan blog tersebut
        await Comment.deleteMany({blog: id});

        res.json({success: true, message: 'Berita Berhasil di Hapus'})
    } catch (err){
        res.json({success: false, message: error.message})
    }
}

export const togglePublish = async(req, res) =>{
    try{
        const { id }= req.body;
        const blog = await Blog.findById(id);
        
        if(!blog) return res.status(404).json({success: false, message: 'Berita Tidak Ditemukan'})

        if(blog.isPublished == null) {
            await Blog.update(id, {isPublished: 0});
        } else {
            await Blog.update(id, {isPublished: null});
        }
        
        return res.json({success: true, message: 'Status Berita Sudah Di update'})
        
    } catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: err.message})
    }
}

export const addComment = async (req, res) =>{
    try{
        const {blog, name, content} = req.body;
        const isApproved = true; // Setujui komentar secara otomatis
        await Comment.create({blog_id: blog, name, content, isApproved});
        res.json({success: true, message: "Comment Berhasil di Tambahkan"})
    } catch(err){
        console.log(err)
        return res.status(500).json({success: false, message: err.message})
    }
}


export const getBlogComments = async (req, res) =>{
    try{
        const {blogId} = req.params;
        const comments = await Comment.findAllByBlog(blogId);
        res.json({success: true, comments})
    }catch (err){
        res.status(500).json({success: false, message: err.message})
    }
}