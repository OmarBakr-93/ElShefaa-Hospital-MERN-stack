import React, { useState, useEffect } from 'react'


export default function States() {

  const [doctorCount, setDoctorCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const doctorState = await fetch('http://localhost:5000/doctors/count');
        const departmentState = await fetch('http://localhost:5000/departments/count');
        const doctorData = await doctorState.json();
        const departmentData = await departmentState.json();
        setDoctorCount(doctorData.count);
        setDepartmentCount(departmentData.count||0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchState();
  }, []);


  const Status = [
    { icon: 'fas fa-user-md', count: doctorCount, label: 'Doctors' },
    { icon: 'far fa-hospital', count: departmentCount, label: 'Departments' },
    { icon: 'fas fa-flask', count: 8, label: 'Research' },
    { icon: 'fas fa-award', count: 150, label: 'Awards' },

  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className='max-w-6xl mx-auto px-4'>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {Status.map((state, index) => (
            <div key={index} className="group cursor-pointer pflex items-center justify-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg  duration-300  hover:bg-[#008e9b] transition-colors ">
              <i className={`${state.icon} text-4xl text-[#46daea]`}></i>
              <div>
                <h3 className="text-3xl font-bold block text-gray-600">{state.count}</h3>
                <p className="text-gray-600 group-hover:text-white">{state.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
