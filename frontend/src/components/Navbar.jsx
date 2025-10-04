import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react';


export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-white shadow-md text-[#008e9b] flex justify-between">
      <div>
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <ul className="flex space-x-6 items-center px-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about">About</Link></li>

        {user?.role === 'admin' && (
          <>
          <li><Link to="/addDoctor">Add Doctor</Link></li>
          <li><Link to="/">Add Department</Link></li>
          </>
        )}
        {user?.role === 'user' && (
          <>
            <li><Link to="/add-appointment">Add Appointment</Link></li>
            <li><Link to="/myAppointments">My Appointments</Link></li>
          </>
        )}
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {user && (
          <li><button onClick={() => {logout()}}>Logout</button></li>
        )}
      </ul>
    </nav>
  )
}
