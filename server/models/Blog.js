// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema({
//     title: {type: String, required: true},
//     subTitle: {type: String},
//     description: {type: String, required: true},
//     category: {type: String, required: true},
//     Image: {type: String, required: true},
//     isPublished: {type: Boolean, required: true},
// },{timestamps: true});

// const Blog = mongoose.model('blog', blogSchema);

// export default Blog;

import pool from "../configjs/db.js"

class Blog {
  static async create({ title, subTitle, description, category, image, isPublished }) {
    const [result] = await pool.query(
      `INSERT INTO blogs (title, subTitle, description, category, image, isPublished) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, subTitle, description, category, image, isPublished]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM blogs ORDER BY createdAt DESC");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
    return rows[0];
  }

  static async update(id, data) {
    const { title, subTitle, description, category, image, isPublished } = data;
    await pool.query(
      `UPDATE blogs 
       SET title=?, subTitle=?, description=?, category=?, image=?, isPublished=? 
       WHERE id=?`,
      [title, subTitle, description, category, image, isPublished, id]
    );
    return true;
  }

  static async delete(id) {
    await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
    return true;
  }
}

export default Blog;
