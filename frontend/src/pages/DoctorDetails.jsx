import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';



export default function DoctorDetails() {

  const {id} = useParams();

  const [doctor, setDoctor] = useState([])

  const [relatedDoctors, setRelatedDoctors] = useState([])
  
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await fetch(`http://localhost:5000/doctors/${id}`);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch doctors');
          }
          setDoctor(data); 
          fetchRelatedDoctors(data?.specialization.toLowerCase(), data?._id)
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      }
      const fetchRelatedDoctors = async (specialization, id) => {
        try {
          const response = await fetch(`http://localhost:5000/doctors/specialization/${specialization}`);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch doctors');
          }
          const filteredData = data.filter(doctor => doctor?._id !== id && doctor?.specialization.toLowerCase() === specialization);
          setRelatedDoctors(filteredData); 
        } catch (error) {
          console.error('Error fetching doctors:', error);
        }
      }
      fetchDoctors();
    }, [id])

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 p-8 items-center justify-center max-w-7xl m-auto bg-gray-50 min-h-screen mx-auto'>
      <div className='md:col-span-2 flex flex-col md:flex-row items-center rounded-lg shadow-md'>
      <img src={`http://localhost:5000/uploads/${doctor?.image}`} className='w-64 h-64 object-cover shadow-md rounded-lg mb-6 md:mb-0 md:mr-10 '/>
      <div className='space-y-4'>
        <h2 className='text-4xl font-bold text-[#008e9b]'>{doctor?.name}</h2>
        <p className='text-xl text-gray-700'>{doctor?.specialization}</p>
        <p className='text-lg text-gray-600'>Experience: {doctor?.experience} years</p>
        <p className='text-gray-600 max-w-lg'>{doctor?.description}</p>
      </div>
      </div>
      <div className=''>
        <h3 className='mb-4 text-2xl text-[#008e9b]'>Other {doctor?.specialization} Doctors</h3>
        <div className="space-y-4">

          {relatedDoctors.length > 0 ? relatedDoctors.map((doc) => (
            <Link to={`/doctors/${doc._id}`}>
            <div key={doc._id} className='flex items-center p-4 bg-white rounded-lg shadow-md mb-4'>
              <img src={`http://localhost:5000/uploads/${doc?.image}`} className='w-16 h-16 object-cover rounded-full border mr-4'/>
              <div>
                <h4 className='text-lg font-semibold text-[#008e9b]'>{doc?.name}</h4>
                <p className='text-gray-600'>{doc?.specialization}</p>
                <p className='text-gray-600'>Experience: {doc?.experience} years</p>
              </div>
            </div>
            </Link>
          )) : <p className='text-gray-600'>No related doctors found.</p>}

        </div>
      </div>
    </div>
  )
}
