
// import mongoose from "mongoose";

// const commentSchema  = new mongoose.Schema({
//     blog: {type: mongoose.Schema.Types.ObjectId, ref: 'blog', required: true},
//     name: {type: string, required: true},
//     content: {type: string, required: true},
//     isProved: {type: Boolean, default: false},
// },{timestamps: true});

// const Comment = mongoose.model('Comment', comment);

// export default Comment;

import pool from "../configjs/db.js"

class Comment {
  static async create({ blog_id, name, content, isProved }) {
    const [result] = await pool.query(
      `INSERT INTO comments (blog_id, name, content, isProved) 
       VALUES (?, ?, ?, ?)`,
      [blog_id, name, content, isProved ?? false]
    );
    return result.insertId;
  }

  static async findAllByBlog(blog_id) {
    const [rows] = await pool.query(
      "SELECT * FROM comments WHERE blog_id = ? ORDER BY createdAt DESC",
      [blog_id]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [id]);
    return rows[0];
  }

  static async approve(id) {
    await pool.query("UPDATE comments SET isProved = ? WHERE id = ?", [true, id]);
    return true;
  }

  static async delete(id) {
    await pool.query("DELETE FROM comments WHERE id = ?", [id]);
    return true;
  }
}

export default Comment;
