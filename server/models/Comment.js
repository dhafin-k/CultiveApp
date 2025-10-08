
import pool from "../configjs/db.js"

class Comment {
  static async create({ blog_id, name, content, isApproved }) {
    const [result] = await pool.query(
      `INSERT INTO comments (blog_id, name, content, isApproved) 
       VALUES (?, ?, ?, ?)`,
      [blog_id, name, content, isApproved ?? false]
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
    await pool.query("UPDATE comments SET isApproved = ? WHERE id = ?", [true, id]);
    return true;
  }

  static async delete(id) {
    await pool.query("DELETE FROM comments WHERE id = ?", [id]);
    return true;
  }
  
  static async deleteByBerita(id) {
    await pool.query("DELETE FROM comments WHERE blog_id = ?", [id]);
    return true;
  }
  
  static async findAllWithBlog() {
    const [rows] = await pool.query(`
      SELECT comments.*, blogs.title AS blog_title 
      FROM comments
      LEFT JOIN blogs ON comments.blog_id = blogs.id
      ORDER BY comments.createdAt DESC
    `);
    return rows;
  }

  static async countAll() {
    return pool.query("SELECT COUNT(*) as total FROM comments");
  }

  static async delete(id) {
    return pool.query("DELETE FROM comments WHERE id = ?", [id]);
  }

  static async approve(id) {
    return pool.query("UPDATE comments SET isApproved = 1 WHERE id = ?", [id]);
  }
}

export default Comment;
