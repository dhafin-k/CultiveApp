import pool from '../configjs/db.js';
import jwt from 'jsonwebtoken';

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) return res.json({ success: false, message: "User tidak ditemukan" });
    if (password !== user.password) return res.json({ success: false, message: "Password salah" });

    const token = jwt.sign({ id: user.id, role: 'user' }, process.env.JWT_SECRET);
    return res.json({ success: true, token, role: 'user' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nama, email, createdAt FROM users ORDER BY createdAt DESC'
    );

    return res.json({
      success: true,
      users: rows,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM users WHERE id = ?', [id])
    res.json({ success: true, message: 'User berhasil dihapus' })
  } catch (err) {
    res.json({ success: false, message: 'Gagal menghapus user', error: err.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    if (!nama || !email || !password) {
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
    }

    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email sudah digunakan' });
    }

    const [result] = await pool.query(
      'INSERT INTO users (nama, email, password, createdAt) VALUES (?, ?, ?, NOW())',
      [nama, email, password]
    );

    // Ambil user yang baru dibuat
    const [newUser] = await pool.query('SELECT id, nama, email, createdAt FROM users WHERE id = ?', [result.insertId]);

    return res.json({
      success: true,
      message: 'User berhasil ditambahkan',
      user: newUser[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { nama, email, password } = req.body

  try {
    let query = ''
    let values = []

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      query = 'UPDATE users SET nama = ?, email = ?, password = ? WHERE id = ?'
      values = [nama, email, hashedPassword, id]
    } else {
      query = 'UPDATE users SET nama = ?, email = ? WHERE id = ?'
      values = [nama, email, id]
    }

    await pool.query(query, values)

    const [updatedUser] = await pool.query('SELECT id, nama, email FROM users WHERE id = ?', [id])

    res.json({
      success: true,
      message: 'User berhasil diperbarui',
      user: updatedUser[0],
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: 'Gagal memperbarui user' })
  }
}