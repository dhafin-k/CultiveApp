
import pool from "../configjs/db.js"

class Blog {
  static async create(blogData) {
    console.log('📝 Creating blog with data:', blogData);
    
    const [result] = await pool.query(
      `INSERT INTO blogs (user_id, title, subTitle, description, category, image, isPublished, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        blogData.user_id, blogData.title,
        blogData.subTitle, blogData.description,
        blogData.category, blogData.image,
        blogData.isPublished
      ]
    );
    
    return result.insertId;
  }
  
  static async findByIdWithAuthor(id) {
    const [rows] = await pool.query(
      `SELECT b.*, u.nama as author_name, u.email as author_email
      FROM blogs b 
      LEFT JOIN users u ON b.user_id = u.id 
      WHERE b.id = ? AND b.isPublished = 1`,  // ⚠️ Filter hanya yang published
      [id]
    );
    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM blogs ORDER BY createdAt DESC ");
    return rows;
  }

  static async findLatest(limit = 1) {
    const [rows] = await pool.query(
      "SELECT * FROM blogs WHERE isPublished = 1 ORDER BY createdAt DESC LIMIT ?",
      [limit]
    );
    return rows;
  }

  static async findAllPublished() {
    const [rows] = await pool.query(
      "SELECT * FROM blogs WHERE isPublished = 1 ORDER BY createdAt DESC");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM blogs WHERE id = ?", [id]);
    return rows[0];
  }
  
  static async findLatest(limit = 5) {
    const [rows] = await pool.query(
      "SELECT * FROM blogs ORDER BY createdAt DESC LIMIT ?",
      [limit]
    );
    return rows;
  }

  static async countAll() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM blogs");
    return rows[0].total;
  }

  static async countDrafts() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM blogs WHERE isPublished = 0");
    return rows[0].total;
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

  static async findByUserId(userId) {
    const [rows] = await pool.query(
      "SELECT * FROM blogs WHERE user_id = ? ORDER BY createdAt DESC",
      [userId]
    )
    return rows
  }

  static async countByUserId(userId) {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total FROM blogs WHERE user_id = ?",
      [userId]
    )
    return rows[0].total
  }

  static async countDraftsByUserId(userId) {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total FROM blogs WHERE user_id = ? AND isPublished = 0",
      [userId]
    )
    return rows[0].total
  }

  static async countPublishedByUserId(userId) {
    const [rows] = await pool.query(
      "SELECT COUNT(*) as total FROM blogs WHERE user_id = ? AND isPublished = 1",
      [userId]
    )
    return rows[0].total
  }

  static async findLatestByUserId(userId, limit = 5) {
    const [rows] = await pool.query(
      "SELECT * FROM blogs WHERE user_id = ? ORDER BY createdAt DESC LIMIT ?",
      [userId, limit]
    )
    return rows
  }
}

export default Blog;
