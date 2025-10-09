import  { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { User, X } from 'lucide-react'
import UserTableItem from '../../components/Admin/UserTableItem'
import toast from 'react-hot-toast'

const UserManage = () => {

const [users, setUsers] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false)
const [isEditModalOpen, setIsEditModalOpen] = useState(false)
const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
})
const [editFormData, setEditFormData] = useState({
    id: '',
    nama: '',
    email: '',
    password: '',
})

const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value

    })
}

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3000/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success('User berhasil ditambahkan!');
      setUsers((prev) => [...prev, data.user]);
      setFormData({ nama: '', email: '', password: '' });
      setIsModalOpen(false);
    } else {
      alert(data.message || 'Gagal menambahkan user');
    }
  } catch (err) {
    console.error(err);
    alert('Terjadi kesalahan server');
  }
};

const handleUpdateUser = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`http://localhost:3000/api/user/update/${editFormData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: editFormData.nama,
        email: editFormData.email,
        ...(editFormData.password && { password: editFormData.password }),
      }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success('User berhasil diupdate!');
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editFormData.id ? { ...user, ...data.user } : user
        )
      );
      setEditFormData({ id: '', nama: '', email: '', password: '' });
      setIsEditModalOpen(false);
    } else {
      toast.error(data.message || 'Gagal mengupdate user');
    }
  } catch (err) {
    console.error(err);
    toast.error('Terjadi kesalahan server');
  }
};


const handleEditInputChange = (e) => {
    setEditFormData({
        ...editFormData,
        [e.target.name]: e.target.value
    })
}

const handleEditUser = (user) => {
  setEditFormData({
    id: user.id,
    nama: user.nama,
    email: user.email,
    password: '', // password kosong untuk keamanan
  });
  setIsEditModalOpen(true);
};

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/user/all');
    const data = await res.json();

    if (data.success) {
      setUsers(data.users);
    } else {
      alert(data.message || 'Gagal mengambil data user');
    }
  } catch (err) {
    console.error(err);
    alert('Terjadi kesalahan saat mengambil data user');
  }
};

const handleDeleteUser = async (id) => {
  if (!window.confirm('Yakin ingin menghapus user ini?')) return;

  try {
    const res = await fetch(`http://localhost:3000/api/user/delete/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    if (data.success) {
      toast.success('User berhasil dihapus!');
      setUsers((prev) => prev.filter((user) => user.id !== id)); // ✅ update tanpa reload
    } else {
      toast.error(data.message || 'Gagal menghapus user');
    }
  } catch (err) {
    console.error(err);
    toast.error('Terjadi kesalahan server');
  }
};


useEffect(() => {
  fetchUsers();
}, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

        <div className='flex  bg-white rounded-lg transition-colors w-full p-3 mb-2 max-w-6xl items-end justify-between'>
            <div className='flex items-center gap-3 pb-2.5 text-gray-600'>
            <img src={assets.dashboard_icon_4}
                  className=' w-5 h-5' 
                  alt="" />
            <p className='font-medium'>Data User</p>
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className='bg-primary text-white px-2 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2'
                >
                <div className='flex items-center gap-2 px-2'>        
                    <User size={18} />
                    Tambah User
                </div>
            </button>
        </div>
        <div>

            <div className='relative max-w-6xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
                <table className='w-full text-sm text-gray-500'>
                    <thead className='text-xs text-gray-600 text-left uppercase'>
                        <tr>
                        <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                        <th scope='col' className='px-2 py-4'>Nama Pengguna</th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden' >Tanggal Bergabung</th>
                        <th scope='col' className='px-2 py-4 max-sm:hidden' >Status</th>
                        <th scope='col' className='px-2 py-4'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                          <UserTableItem key={user.id} 
                          user={user} index={index + 1} 
                          onDelete={handleDeleteUser}
                          onEdit={handleEditUser}
                          />
                        ))}
                    </tbody>
                </table>
            </div>
      </div>

    {/* MODAL CREATE*/}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
            {/* Header Modal */}
            <div className='flex items-center justify-between p-6 border-b'>
              <h3 className='text-xl font-semibold text-gray-800'>Tambah User Baru</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <X size={24} />
              </button>
            </div>

            {/* Form */}
            <div className='p-6'>
              <div className='space-y-4'>
                {/* Nama */}
                <div>
                  <label htmlFor='nama' className='block text-sm font-medium text-gray-700 mb-2'>
                    Nama Pengguna
                  </label>
                  <input
                    type='text'
                    id='nama'
                    name='nama'
                    value={formData.nama}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                    placeholder='Masukkan nama pengguna'
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                    placeholder='contoh@email.com'
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                    Password
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                    placeholder='Minimal 6 karakter'
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className='flex gap-3 mt-6'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  className='flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                >
                  Tambah User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    {/* MODAL EDIT */}
    {isEditModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
            <div className='flex items-center justify-between p-6 border-b'>
              <h3 className='text-xl font-semibold text-gray-800'>Edit User</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className='text-gray-400 hover:text-gray-600 transition-colors'
              >
                <X size={24} />
              </button>
            </div>

            <div className='p-6'>
              <div className='space-y-4'>
                <div>
                  <label htmlFor='edit-nama' className='block text-sm font-medium text-gray-700 mb-2'>
                    Nama Pengguna
                  </label>
                  <input
                    type='text'
                    id='edit-nama'
                    name='nama'
                    value={editFormData.nama}
                    onChange={handleEditInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                    placeholder='Masukkan nama pengguna'
                  />
                </div>

                <div>
                  <label htmlFor='edit-email' className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='edit-email'
                    name='email'
                    value={editFormData.email}
                    onChange={handleEditInputChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                    placeholder='contoh@email.com'
                  />
                </div>

                <div>
                  <label htmlFor='edit-password' className='block text-sm font-medium text-gray-700 mb-2'>
                    Password Baru
                  </label>
                  <input
                    type='password'
                    id='edit-password'
                    name='password'
                    value={editFormData.password}
                    onChange={handleEditInputChange}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all'
                    placeholder='Kosongkan jika tidak ingin mengubah'
                  />
                  <p className='text-xs text-gray-500 mt-1'>*Kosongkan jika tidak ingin mengubah password</p>
                </div>
              </div>

              <div className='flex gap-3 mt-6'>
                <button
                  type='button'
                  onClick={() => setIsEditModalOpen(false)}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                >
                  Batal
                </button>
                <button
                  onClick={handleUpdateUser}
                  className='flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors'
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManage