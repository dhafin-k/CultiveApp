import { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div 
      className='flex items-center justify-center h-screen'>
      <div 
        className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
          
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span 
              className='text-primary'>Admin </span>Login
              </h1>
            <p className='text-light'>Isi email dan password Anda untuk mengakses dashboard admin.</p>
          </div>

          <form action=""
            onSubmit={handleSubmit}
            className='mt-6 w-full sm:max-w-md text-gray-600'>
              
              <div className='flex flex-col'>
                <label>Email</label>
                <input onChange={e=> setEmail(e.target.value)}
                value={email}
                required placeholder="your email id" 
                  class="border-b-2 border-gray-300 p-2 outline-none mb-6" 
                  type="email">
                  </input>
              </div>

              <div className='flex flex-col'>
                <label>Password</label>
                <input onChange={e=> setPassword(e.target.value)}
                value={password}
                required placeholder="your password" 
                  class="border-b-2 border-gray-300 p-2 outline-none mb-6" 
                  type="password" >
                  </input>
              </div>
              <button type="submit" 
                class="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
                > Login </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login