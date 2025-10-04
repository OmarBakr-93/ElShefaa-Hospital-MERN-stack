import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function AddAppointment() {


  const { user } = useContext(AuthContext)
  const [doctors, setDoctors] = useState([])
  const [form, setForm] = useState({
    doctor: '',
    date: '',
    reason: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem('token')

    const res = await fetch('http://localhost:5000/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) {
      alert('Appointment booked successfully')
      setForm({
        doctor: '',
        date: '',
        reason: ''
      })
    } else {
      alert("Failed to book appointment: " + data.message)
    }
  }

  useEffect(() => {
    const fetchDoctors = async () => {
    const res = await fetch('http://localhost:5000/doctors/alldoctors')
    const data = await res.json()
    setDoctors(data)
    }
    fetchDoctors()
  }, []);

  if (!user) {
    return <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center'>
        <h2 className='text-2xl font-bold mb-4'>Please log in to book an appointment</h2>
        <a href="/login" className='text-blue-500 underline'>Go to Login</a>
      </div>
    </div>
  }
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <label className='block text-sm font-semibold mb-2' htmlFor='doctor'>Doctor</label>
        <select
          name='doctor'
          value={form.doctor}
          onChange={handleChange}
          required
          className='w-full mb-4 border rounded'
        >
          <option value=''>Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>
              {doctor?.name} {doctor?.specialization}
            </option>
          ))}
        </select>
        <label className='block text-sm font-semibold mb-2' htmlFor='date'>Date:</label>
        <input
          type='date'
          name='date'
          value={form.date}
          onChange={handleChange}
          className='w-full mb-4 border rounded'
        />
        <label className='block text-sm font-semibold mb-2' htmlFor='reason'>Reason:</label>
        <textarea
          name='reason'
          value={form.reason}
          onChange={handleChange}
          className='w-full mb-4 border rounded'
        ></textarea>
        <button type='submit' className='w-ful py-2 rounded '>
          Submit
        </button>
      </form>
    </div>
  )
}
