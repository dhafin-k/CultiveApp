import fs from 'fs'
import imagekit from '../configjs/imageKit.js'; // Make sure this exports an instance of ImageKit, not the class itself
import Blog from '../models/Blog.js'
import { error } from 'console';
import Comment from '../models/Comment.js';

export const addBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = req.body;
        const imageFile = await req.file;

        // Check apakah semua field telah terisi
        if(!isPublished) {
            isPublished = true;
        }

        if(!title || !description || !category || !subTitle ||  !imageFile){
            return res.status(422).json('Kolom wajib diisi')
        }

        const response = await imagekit.files.upload({
            file: fs.createReadStream(imageFile.path),
            fileName: imageFile.originalname,
            folder: "/blogs",
        });

        const image = response.filePath
        const isPublishedInt = isPublished ? 1 : 0;

        await Blog.create({title, subTitle, description, category, image,
            isPublishedInt});

        return res.status(201).json('Berhasil menambahkan data')
        
    } catch(err) {
        console.log(err);
        return res.status(500).json('Gagal menambahkan data')
    }
}


export const getAllBlogs = async(req, res)=> {
    try{
        const blogs = await Blog.findAll({isPublished: true})
        res.json({success: true, blogs})
    } catch(err){
        console.log(err)
        return res.status(500).json('Gagal Mengambil data Berita')
    }
}

export const getBlogById = async (req, res)=>{
    try{
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message:"Blog tidak ditemukan" })
        }
        res.json({ success: true, blog})
    } catch(err){
        res.json({success: false, massage: error.massage})
    }
}

export const deleteBlogById = async (req, res) =>{
    try{
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        res.json({success: true, massage: 'Berita Berhasil di Hapus'})
    } catch (err){
        res.json({success: false, massage: error.massage})
    }
}

export const togglePublish = async(req, res) =>{
    try{
        const { id }= req.body;
        const blog = await Blog.findById(id);
        
        if(!blog) return res.status(404).json({success: false, massage: 'Berita Tidak Ditemukan'})

        if(blog.isPublished == null) {
            await Blog.update(id, {isPublished: 0});
        } else {
            await Blog.update(id, {isPublished: null});
        }
        
        return res.json({success: true, massage: 'Status Berita Sudah Di update'})
        
    } catch(err){
        console.log(err);
        return res.status(500).json({success: false, massage: err.massage})
    }
}

export const addComment = async (req, res) =>{
    try{
        const {blog, name, content} =req.body;
        await Comment.create({blog, name, content, isProved});
        res.json({success: true, massage: "Comment Berhasil di Setujui"})
    } catch(err){
        console.log(err)
        res.status(500).json({success: false, massage: err.massage})
    }
}


export const getBlogComments = async (req, res) =>{
    try{
        const {blogId} = req.body;
        const comments = await Comment.find({blog: blogId, isAproved: true}).sort({createdAt: -1});
        res.json({success: true, comments})
    }catch (err){
        res.status(500).json({success: false, massage: err.massage})
    }
}