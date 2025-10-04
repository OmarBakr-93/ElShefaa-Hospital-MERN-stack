const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointmentSchema');
const auth = require('../auth/Middleware');


// BOOK APPOINTMENT
router.post('/book', auth(), async (req, res) => {
  const { doctor, date, reason } = req.body;
  if ( !doctor || !reason || !date) {
    return res.status(400).json({ message: 'All files are required' });
  }
  try {
    const appointment = await Appointment.create({ 
      user: req.user.id,
      doctor, 
      date, 
      reason 
    });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET APPOINTMENTS FOR A USER

router.get("/myAppointments", auth(), async(req,res)=>{
  const appointments = await Appointment.find({user:req.user.id}).populate("doctor")
  res.json(appointments).status(200);
})

// DELETE APPOINTMENT
router.delete('/deleteappointment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
