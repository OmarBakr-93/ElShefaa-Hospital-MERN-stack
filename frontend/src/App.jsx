import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Register from "./components/Register"
import AddAppointment from "./pages/AddAppointment"
import AddDoctor from "./pages/AddDoctor"
import AllDoctors from "./pages/AllDoctors"
import DoctorDetails from "./pages/DoctorDetails"
import MyAppointments from "./pages/MyAppointments"
import { ToastContainer } from "react-toastify"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-appointment" element={<AddAppointment />}/>
        <Route path="/addDoctor" element={<AddDoctor />}/>
        <Route path="/allDoctors" element={<AllDoctors />}/>
        <Route path="/myAppointments" element={<MyAppointments />}/>
        <Route path="/doctors/:id" element={<DoctorDetails />}/>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000}  />
    </>
  )
}
export default App
