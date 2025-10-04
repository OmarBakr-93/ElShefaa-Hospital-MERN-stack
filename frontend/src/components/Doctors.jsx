import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


export default function Doctors() {
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/doctors/alldoctors');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch doctors');
        }
        setDoctors(data.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    }
    fetchDoctors();
  }, [])
  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <h2 className='text-3xl font-bold text-center mb-8 text-[#008e9b]'>Our Doctors
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        {doctors.map((doctor) => (
          <div key={doctor._id} className='bg-white p-4 rounded-lg shadow text-center'>
            <Link to={`/doctor/${doctor._id}`} >
            <img
              src={`http://localhost:5000/uploads/${doctor.image}`}
              alt={doctor.name}
              className='w-32 h-32 object-cover rounded-full mx-auto border mb-4'
            />
            <h3 className='text-xl font-semibold mb-2 text-[#008e9b]'>{doctor.name}</h3>
            <p className='text-gray-600 mb-1'><span className='font-semibold'>Specialization:</span> {doctor.specialization}</p>
            <p className='text-gray-600 mb-1'><span className='font-semibold'>Experience:</span> {doctor.experience} years</p>
            </Link>
          </div>
        ))}
      </div>

        <div className='flex items-center justify-center mt-8 '> 
          <Link to="/allDoctors" className='flex items-center font-bold px-6 p-3 gap-3 bg-[#46daea] text-black rounded hover:bg-[#43b0ba] transition'>
            See All Doctors <ArrowRight  />
          </Link>
        </div>
    </div>
  )
}
