import dotenv from "dotenv";
import pool from "../configjs/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ 1. Cek kredensial admin dari ENV
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { role: "admin", email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // kasih delay dikit biar async nggak bentrok (opsional)
      await new Promise((r) => setTimeout(r, 50));

      return res.status(200).json({
        success: true,
        message: "Login admin berhasil",
        token,
        user: { email, role: "admin" },
      });
    }

    // ✅ 2. Jika bukan admin, cek ke database
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }

    const user = rows[0];

    // pastiin password di database udah di-hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Password salah" });
    }

    // ✅ generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "client" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await new Promise((r) => setTimeout(r, 50)); // biar async lebih stabil

    return res.status(200).json({
      success: true,
      message: "Login user berhasil",
      token,
      user: {
        id: user.id,
        email: user.email,
        nama: user.nama,
        role: "client",
      },
    });

  } catch (err) {
    console.error("❌ Error login:", err);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan server",
      error: err.message,
    });
  }
};
