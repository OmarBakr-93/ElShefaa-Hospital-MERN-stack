import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const {login} = useContext(AuthContext)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError(null)
    const response = await fetch('http://localhost:5000/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    const data = await response.json()
    if(!response.ok){
      setError(data.message||'Something went wrong')
    }
    if(data.token){
      login(data.token)
      navigate('/')
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <form className='bg-white p-6 rounded shadow-md' onSubmit={handleSubmit}>
        <h2 className='text-2xl text-center font-bold mb-4'>Login</h2>
        {error && <p className='text-red-500 mb-3'>{error}</p>}
        <input type="email" name='email' placeholder='Email' className='border rounded p-2 mb-3 w-full' onChange={handleChange} />
        <input type="password" name='password' placeholder='Password' className='border rounded p-2 mb-3 w-full' onChange={handleChange} />
        <button type='submit' className=' text-white rounded py-2 w-full '>Login</button>
      </form>
    </div>
  )
}
