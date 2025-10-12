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

export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization

  // Cek apakah token ada
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Access Denied: No Token Provided" 
    })
  }

  try {
    // Pisahkan "Bearer " dari token
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token

    // Verify token dan SIMPAN decoded data ke req.user
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET)
    
    // ⚠️ INI YANG PENTING - Simpan user info ke req.user
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    }

    console.log('User authenticated:', req.user) // Debug log

    next() // Lanjut ke controller

  } catch (error) {
    console.error('Auth error:', error.message)
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: "Token has expired. Please login again." 
      })
    }
    
    return res.status(401).json({ 
      success: false, 
      message: "Invalid Token" 
    })
  }
}

    // Verif Admin
export const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "User not authenticated" 
    })
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: "Access Denied: Admin only" 
    })
  }

  next()
}

    // Verif Reporter(client)
export const verifyReporter = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "User not authenticated" 
    })
  }

  if (req.user.role !== 'reporter' && req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: "Access Denied: Reporter only" 
    })
  }

  next()
}

export default auth;