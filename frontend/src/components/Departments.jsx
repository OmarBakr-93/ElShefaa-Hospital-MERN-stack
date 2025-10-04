import React, { useEffect, useState } from 'react'


export default function Departments() {

  const [departments, setDepartments] = useState([])
  const [activeTap, setActiveTap] = useState(null)


  useEffect(() => {
    const fetchState = async () => {
      try {
        await fetch('http://localhost:5000/departments/allDepartments')  
        .then(res => res.json())
        .then(data => {
          setDepartments(data)
          if(data.length > 0){
            setActiveTap(data[0]._id)
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchState();
  }, []);

  const handleTapClick = (id) => () => {
    setActiveTap(id);
  };

  return (
    <section className='p-12 bg-white max-w-6xl mx-auto px-4'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl font-bold mb-2'>Departments</h2>
        <p className='max-w-xl mx-auto text-gray-600'>
          Explore Our Specialized Medical Departments Staffed with Expert Doctors
        </p>
      </div>
      <div className='flex flex-col md:flex-row gap-6'>
        <ul className='flex md:flex-col space-x-4 md:space-x-0 border-b md:border-b-0 md:border-r border-gray-300'>
          {departments.map((department) => (
            <li key={department._id}
            >
              <button onClick={()=> handleTapClick(department._id)} className={`w-40 mr-4 block mt-3 px-4 py-2 rounded-t md:rounded-tr-none md:rounded-1 ${activeTap === department._id ? 'bg-[#008e9b] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {department?.name}
              </button>
            </li>
          ))}
        </ul>
        {/* Tap Content */}
        <div className='flex-1 bg-gray-50 p-6 rounded shadow'>
          {departments?.map((department) => (
            department?._id === activeTap ? (
            <div key={department._id} className='flex flex-col md:flex-row items-center gap-6'>
              <div className=''>
                <h3 className='text-[#008e9b] font-bold text-2xl mb-2'>{department?.name}</h3>
                <p>{department?.description}</p>
              </div>
              <div>
                <img src={department?.image} alt={department?.name} />
              </div>
            </div>)
            : null
          ))}
        </div>
      </div>
    </section>
  )
}
