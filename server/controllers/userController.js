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
