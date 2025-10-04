const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctorSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Multer for uploading images
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' +ext);
  }
});
const upload = multer({ storage: storage });

// Register a new doctor

router.post('/addDoctor', upload.single('image'), async (req, res) => {
  
  try {
    const { name, specialization, experience, description } = req.body;
    const image = req.file? req.file.path : null;
  if (!name || !specialization || !experience || !description || !image) {
    return res.status(400).json({ message: 'all fields are required' });
  }

    const newDoctor = new Doctor({
      name,
      specialization,
      experience,
      description,
      image : req.file?.filename
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// Get all doctors

router.get('/alldoctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// Count total doctors

router.get('/count', async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// Get doctors by specialization
router.get('/specialization/:specialization', async (req, res) => {
  try {
    const {specialization} = req.params;
    const doctors = await Doctor.find({ specialization : {
      $regex: new RegExp(specialization, 'i')
    } });
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});

// Get a doctor by ID

router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
});



module.exports = router;