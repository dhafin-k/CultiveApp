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
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key}=?`);
      values.push(value);
    }

    values.push(id);

    const sql = `UPDATE blogs SET ${fields.join(", ")} WHERE id=?`;
    await pool.query(sql, values);

    return true;
  }


  static async delete(id) {
    await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
    return true;
  }
}

export default Blog;
