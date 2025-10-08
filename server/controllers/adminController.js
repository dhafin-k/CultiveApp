import jwt from 'jsonwebtoken'
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import pool from '../configjs/db.js';

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
        console.log("📡 Memanggil Blog.findAll...");
        const blogs = await Blog.findAll({
            order: [['createdAt', 'DESC']]
        })
        console.log("✅ Jumlah blog:", blogs.length);
        res.json({success: true, blogs})
    } catch (err){
        console.log(err);
        return res.json({success: false, message: err.message})
    }
}


export const getDashboard = async (req, res) => {
  try {
    const blogs = await Blog.countAll();
    const drafts = await Blog.countDrafts();

    const [commentsCountResult] = await pool.query("SELECT COUNT(*) as total FROM comments");
    const comments = commentsCountResult[0].total;

    const recentBlogs = await Blog.findLatest(5);

    const dashboardData = {
      blogs,
      comments,
      drafts,
      recentBlogs,
    };

    return res.json({ success: true, dashboardData });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllComments = async (req, res) =>{
  try{
      const comments = await Comment.findAllWithBlog()
      res.json({success: true, comments})
  }catch(err){
      console.log(err);
      return res.status(500).json({success: false, message: err.message})
  }
}

export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM comments WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.json({ success: false, message: "Komentar tidak ditemukan" });
    }

    return res.json({ success: true, message: "Komentar berhasil dihapus" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

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
