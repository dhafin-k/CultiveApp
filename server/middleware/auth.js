import jwt from 'jsonwebtoken'

const auth = (req, res, next)=>{
    const token = req.headers.authorization;

    // Tambahkan pengecekan token awal jika token hilang
    if (!token) {
        // Status 401: Unauthorized (Token tidak disediakan)
        return res.status(401).json({ succes: false, massage: "Access Denied: No Token Provided" });
    }

    try {
        // Asumsi token berbentuk "Bearer xxxxxx", jadi kita pisahkan
        const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token;

        jwt.verify(tokenValue, process.env.JWT_SECRET)
        next();
    } catch (error) {
        // Status 401: Unauthorized (Token tidak valid/kadaluarsa)
        return res.status(401).json({ succes: false, massage: "Invalid Token" }); // <-- Perbaikan ada di sini
    }
}

export default auth;