import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { X } from 'lucide-react'
import { toast } from 'react-toastify'


export default function MyAppointments() {

  const { user } = useContext(AuthContext)

  const [appointments, setAppointments] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchAppointments = async () =>{
      try {
          const token = localStorage.getItem('token') 
          const res = await fetch('http://localhost:5000/appointments/myAppointments', {
            headers: {
              method: 'POST',
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          const data = await res.json()
          if(!res.ok){
            throw new Error('Failed to delete appointment')
          }
          setAppointments(data)
        } catch (err) {
          setError(err.message)
          toast.error(err.message)
        }
      }
      fetchAppointments()
  }, [user])

  const cancelAppointment = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/appointments/deleteappointment/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if(!res.ok){
        throw new Error('Failed to cancel appointment')
      }
      setAppointments(appointments.filter(appointment => appointment?._id !== id))
      toast.success('Appointment cancelled successfully')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <h2 className='text-3xl font-bold text-center mb-8 text-[#008e9b]'>My Appointments</h2>
      {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
      <div className='space-y-6 max-w-3xl mx-auto'>
        {appointments?.length === 0 ? (
          <p className='text-gray-600 text-center'>No Appointments Found .</p>
        ) : (
          appointments?.map((appointment) => (
            <div key={appointment?._id} className='flex items-center justify-between bg-white p-4 rounded-lg shadow-md'>
              <div className='flex items-center gap-4'>

                <img className='w-20 h-20 rounded-full object-cover border ' src={`http://localhost:5000/uploads/${appointment?.doctor?.image}`}/>
                <div className=''>
                  <h3 className='text-xl font-semibold'>
                    {appointment.doctor?.name}
                  </h3>
                  <p className='text-gray-600'>
                    {appointment.doctor?.reason}
                  </p>
                  <p className='text-[#008e9b]'>
                    {new Date(appointment?.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {if( window.confirm('Are you sure you want to cancel this appointment?')) cancelAppointment(appointment?._id)}} 
                className='text-white ' >
                <X style={{fontSize: '24px'}} />
              </button>
            </div>
          ))
        )}



  
      </div>
    </div>
  )
}
