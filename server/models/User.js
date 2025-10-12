import pool from "../configjs/db.js";

class User {
  // Membuat user baru
  static async create({ nama, email, password }) {
    const [result] = await pool.query(
      `INSERT INTO users (nama, email, password) VALUES (?, ?, ?)`,
      [nama, email, password]
    );
    return result.insertId;
  }

  // Ambil semua user
  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM users ORDER BY createdAt DESC");
    return rows;
  }

  // Ambil user berdasarkan ID
  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  // Ambil user berdasarkan email (untuk login)
  static async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  // Update data user
  static async update(id, data) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(data)) {
      fields.push(`${key}=?`);
      values.push(value);
    }

    values.push(id);

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id=?`;
    await pool.query(sql, values);
    return true;
  }

  // Hapus user
  static async delete(id) {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return true;
  }

  static async countUsers() {
    const [rows] = await pool.query("SELECT COUNT(*) as total FROM users");
    return rows[0].total;
  }
}

export default User;
