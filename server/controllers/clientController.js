import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import pool from '../configjs/db.js'
import auth from '../middleware/auth.js'

// ============================================
// TAMBAH BERITA CLIENT
// ============================================
export const addBlogClient = async (req, res) => {
  try {
    console.log('🔍 req.user:', req.user);
    
    const clientId = req.user.id
    console.log('🔍 clientId:', clientId);
    const { title, subTitle, description, category, isPublished } = req.body
    const imageFile = req.file

    // Validasi
    if (!title || !description || !category || !subTitle || !imageFile) {
      return res.status(422).json({ 
        success: false, 
        message: 'Kolom wajib diisi' 
      })
    }

    // Convert isPublished ke integer
    const isPublishedInt = parseInt(isPublished) === 1 ? 1 : 0
    const image = imageFile.filename

    // Simpan ke database
    await Blog.create({
      user_id: clientId,
      title,
      subTitle,
      description,
      category,
      image,
      isPublished: isPublishedInt
    })

    return res.status(201).json({ 
      success: true, 
      message: 'Berhasil menambahkan berita' 
    })

  } catch (err) {
    console.error('Error addBlogClient:', err)
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal menambahkan berita' 
    })
  }
}

// ============================================
// AMBIL SEMUA BERITA CLIENT
// ============================================
export const getAllBlogsClient = async (req, res) => {
  try {
    const clientId = req.user.id
    
    // Pakai function baru dari model
    const blogs = await Blog.findByUserId(clientId)

    res.json({ 
      success: true, 
      blogs,
      total: blogs.length 
    })

  } catch (err) {
    console.error('Error getAllBlogsClient:', err)
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil data berita' 
    })
  }
}

// ============================================
// AMBIL BLOG TERTENTU CLIENT
// ============================================
export const getBlogByIdClient = async (req, res) => {
  try {
    const clientId = req.user.id
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)
    
    // Cek apakah blog milik user ini
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog tidak ditemukan' 
      })
    }

    if (blog.user_id !== clientId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Anda tidak memiliki akses ke blog ini' 
      })
    }

    res.json({ success: true, blog })

  } catch (err) {
    console.error('Error getBlogByIdClient:', err)
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil data blog' 
    })
  }
}

// ============================================
// HAPUS BERITA CLIENT
// ============================================
export const deleteBlogClient = async (req, res) => {
  try {
    const clientId = req.user.id
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)
    
    // Cek apakah blog milik user ini
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog tidak ditemukan' 
      })
    }

    if (blog.user_id !== clientId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Anda tidak memiliki akses untuk menghapus blog ini' 
      })
    }

    // Hapus blog dan komentar terkait
    await Blog.delete(blogId)
    await Comment.deleteByBerita(blogId)

    res.json({ 
      success: true, 
      message: 'Blog berhasil dihapus' 
    })

  } catch (err) {
    console.error('Error deleteBlogClient:', err)
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal menghapus blog' 
    })
  }
}

// ============================================
// TOGGLE PUBLISH/UNPUBLISH BERITA CLIENT
// ============================================
export const togglePublishClient = async (req, res) => {
  try {
    const clientId = req.user.id
    const { blogId } = req.params

    const blog = await Blog.findById(blogId)
    
    // Cek apakah blog milik user ini
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: 'Blog tidak ditemukan' 
      })
    }

    if (blog.user_id !== clientId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Anda tidak memiliki akses untuk mengubah blog ini' 
      })
    }

    // Toggle status publish
    const newStatus = blog.isPublished === 1 ? 0 : 1
    await Blog.update(blogId, { isPublished: newStatus })

    res.json({ 
      success: true, 
      message: `Status berita diubah menjadi ${newStatus === 1 ? 'Published' : 'Draft'}` 
    })

  } catch (err) {
    console.error('Error togglePublishClient:', err)
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal mengubah status berita' 
    })
  }
}

// ============================================
// AMBIL KOMENTAR MILIK BERITA CLIENT
// ============================================
export const getCommentsClient = async (req, res) => {
  try {
    const clientId = req.user.id

    // Ambil semua blog milik client
    const blogs = await Blog.findByUserId(clientId)
    const blogIds = blogs.map(b => b.id)

    // Kalau tidak ada blog, return empty
    if (blogIds.length === 0) {
      return res.json({ 
        success: true, 
        comments: [],
        total: 0 
      })
    }

    // Ambil komentar dari blog-blog tersebut
    const [comments] = await pool.query(
      `SELECT c.*, b.title as blog_title 
       FROM comments c 
       JOIN blogs b ON c.blog_id = b.id 
       WHERE c.blog_id IN (?) 
       ORDER BY c.createdAt DESC`,
      [blogIds]
    )

    res.json({ 
      success: true, 
      comments,
      total: comments.length 
    })

  } catch (err) {
    console.error('Error getCommentsClient:', err)
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil data komentar' 
    })
  }
}

// ============================================
// HAPUS KOMENTAR MILIK BERITA CLIENT
// ============================================
export const deleteCommentClient = async (req, res) => {
  try {
    const clientId = req.user.id
    const { commentId } = req.params

    // Cek apakah komentar ada
    const comment = await Comment.findById(commentId)
    if (!comment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Komentar tidak ditemukan' 
      })
    }

    // Cek apakah blog milik user ini
    const blog = await Blog.findById(comment.blog_id)
    if (!blog || blog.user_id !== clientId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Anda tidak memiliki akses untuk menghapus komentar ini' 
      })
    }

    // Hapus komentar
    await Comment.delete(commentId)
    
    res.json({ 
      success: true, 
      message: 'Komentar berhasil dihapus' 
    })

  } catch (err) {
    console.error('Error deleteCommentClient:', err)
    return res.status(500).json({ 
      success: false, 
      message: 'Gagal menghapus komentar' 
    })
  }
}

// ============================================
// DASHBOARD CLIENT (STATISTIK)
// ============================================
export const getDashboardClient = async (req, res) => {
  try {
    const clientId = req.user.id

    // Gunakan function baru dari model
    const blogsCount = await Blog.countByUserId(clientId)
    const draftsCount = await Blog.countDraftsByUserId(clientId)
    const publishedCount = await Blog.countPublishedByUserId(clientId)

    // Hitung total komentar
    const [commentsResult] = await pool.query(
      `SELECT COUNT(*) as total 
       FROM comments c 
       JOIN blogs b ON c.blog_id = b.id 
       WHERE b.user_id = ?`,
      [clientId]
    )
    const commentsCount = commentsResult[0].total

    // Ambil 5 blog terbaru
    const latestBlogs = await Blog.findLatestByUserId(clientId, 5)

    res.json({ 
      success: true, 
      dashboardData: { 
        blogs: blogsCount,
        drafts: draftsCount,
        published: publishedCount,
        comments: commentsCount
      },
      latestBlogs
    })

  } catch (err) {
    console.error('Error getDashboardClient:', err)
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil data dashboard' 
    })
  }
}