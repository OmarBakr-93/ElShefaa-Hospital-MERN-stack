const express = require('express');
const app = express();

const cors = require('cors');
// Load environment variables
require('dotenv').config();
const connectDB = require('./config/DataBase');
connectDB();

app.use(express.json());
app.use(cors());

// Serve static files from the "uploads" directory
app.use('/files', express.static('uploads'));

// ROUTES
const User = require('./routes/userRoute');
app.use('/users', User);

const Doctor = require('./routes/doctorRoute');
app.use('/doctors', Doctor);

const Appointment = require('./routes/appointmentRoute');
app.use('/appointments', Appointment);

const Department = require('./routes/departmentRoute');
app.use('/departments', Department);

// APP LISTEN

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
