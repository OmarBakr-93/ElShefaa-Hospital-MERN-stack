import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import avatar from '../assets/images/avatar.jpg'


export default function AddDoctor() {
  const { user } = useContext(AuthContext);

  const [preview, setPreview] =useState(null);

  const [error, setError] =useState(null);

  const [form, setForm] =useState({
    name: '',
    specialization: '',
    experience: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
    else {
      setForm({ ...form, [name]: value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('specialization', form.specialization);
      formData.append('experience', form.experience);
      formData.append('description', form.description);
      if (form.image) {
        formData.append('image', form.image);
      }

      const res = await fetch('http://localhost:5000/doctors/addDoctor', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to add doctor');
      }
      alert('Doctor added successfully');
      setForm({
        name: '',
        specialization: '',
        experience: '',
        description: '',
        image: null
      });
    } catch (err) {
      setError(err.message);
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-100'>
        <h2 className='text-2xl font-bold text-center text-red-500'>Access Denied. Admins Only.</h2>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='flex bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl gap-8' encType='multipart/form-data'>
        <div className='flex flex-col items-center w-1/3'>
          <div className='w-32 h-32 rounded-full overflow-hidden  border-grey-300'>
            { preview ? (
              <img src={preview}  className='object-cover w-full h-full' /> ):(
              <img src={avatar} />
            )}
          </div>
          <button type='button' onClick={()=>{
            document.getElementById('fileInput').click();
          }} className='mt-4'>Choose Image</button>
          <input onChange={handleChange} id='fileInput' className='hidden' type="file" accept='image/*' />
        </div>
        <div className='w-2/3'>
          <h2 className='mb-6 text-2xl font-bold text-center text-[#008e9b]'>Add New Doctor</h2>
            {error && <p className='text-red-500 mb-4'>{error}</p>
            }
          <label className='block mb-2 font-semibold'>Full Name</label>
          <input value={form.name} onChange={handleChange} className='w-full mb-4 p-2 border border-gray-300 rounded' type="text" required name='name' />

          <label className='block mb-2 
          font-semibold'>Specialization</label>
          <input value={form.specialization} onChange={handleChange} className='w-full mb-4 p-2 border border-gray-300 rounded' type="text" required name='specialization' />

          <label className='block mb-2 font-semibold'>Experience Years</label>
          <input value={form.experience} onChange={handleChange} className='w-full mb-4 p-2 border border-gray-300 rounded' type="number" required name='experience' />

          <label className='block mb-2 font-semibold'>Description </label>
          <input value={form.description} onChange={handleChange} className='w-full mb-4 p-2 border border-gray-300 rounded' type="text" required name='description' />

        <button className='bg-[#008e9b] text-white px-4 py-2 rounded hover:bg-[#005f63] transition-colors' type='submit'>Add Doctor</button>
        </div>
      </form>
    </div>
  )
}
