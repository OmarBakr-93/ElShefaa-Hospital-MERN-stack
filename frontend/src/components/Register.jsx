import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const {login} = useContext(AuthContext)
    const [form, setForm] = useState({
      email: '',
      password: '',
      name: ''
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = async(e) => {
      e.preventDefault()
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      const data = await response.json()
      if(data.token){
        login(data.token)
        navigate('/')
      }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <form className='bg-white p-6 rounded shadow-md' onSubmit={handleSubmit}>
        <h2 className='text-2xl text-center font-bold mb-4'>Signup</h2>
        <input type="text" name='name' placeholder='Name' className='border rounded p-2 mb-3 w-full' onChange={handleChange} />
        <input type="email" name='email' placeholder='Email' className='border rounded p-2 mb-3 w-full' onChange={handleChange} />
        <input type="password" name='password' placeholder='Password' className='border rounded p-2 mb-3 w-full' onChange={handleChange} />
        <button type='submit' className=' text-white rounded py-2 w-full '>Signup</button>
      </form>
    </div>
  )
}
