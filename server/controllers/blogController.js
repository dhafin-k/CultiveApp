import fs from 'fs'
import imagekit from '../configjs/imageKit.js'; // Make sure this exports an instance of ImageKit, not the class itself
import Blog from '../models/Blog.js'
import { error } from 'console';

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


export default getAllBlogs = async(res, req) =>{
    try{
        const blog = await Blog.find({isPublished: true})
        res.json({succes: true, blogs})
    } catch(err){
        return res.status(500).json('Gagal menambahkan data')
    }
}

export const getBlogById = async (req, res)=>{
    try{
        const { blogId } = req.parse;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({succes: false, message:"Blog tidak ditemukan" })
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
        res.json({succes: true, blog})
    } catch (err){
        res.json({succes: false, massage: error.massage})
    }
}

export const togglePublish = async(req, res) =>{
    try{
        const { id }= req.body;
        const blog= await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({succes: true, massage: 'Status Berita Sudah Di update'})
    } catch(err){
        res.json({succes: false, massage: error.massage}) 
    }
}
// export const addBlog = async (req, res)=>{
//     try {
//         const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
//         const imageFile = await req.file;

//         // Check apakah semua field telah terisi
//         if(!title || !description || !category || !imageFile){
                // return res.status(422).json('Kolom wajib diisi')
//         }

//         const fileBuffer = fs.readFileSync(imageFile.path)
//         // Upload Image ke ImageKit
//         const response = await imagekit.files.upload({
//             file: fileBuffer,
//             fileName: imageFile.originalname,
//             folder: "/blogs"
//         })

//         const optimizationImageUrl = await imagekit.url({
//             path: response.filePath,
//             transformation: [
//                 {quality: 'auto'},  //auto compression
//                 {format: 'webp'},   //convert to modern convert
//                 {width: '1280'}     //Width resizing
//             ]
//         });

//         const image = optimizationImageUrl;

//         await Blog.create({title, subTitle, description, category, image,
//             isPublished})

//         }catch (error){
//             console.error(error);
//     }
// }