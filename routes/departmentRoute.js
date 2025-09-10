const express = require('express');
const router = express.Router();
const auth = require('../auth/Middleware');
const Department = require('../models/departmentSchema');

// Image upload handling (if needed in future)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix );
  }
});
const upload = multer({ storage: storage });

// CREATE a new department

router.post('/add', auth('admin'), upload.single('image'), async (req, res) => {
  try {
    // if (!req.user.role !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied' });
    // }
    const { name, description } = req.body;
    const image = req.file? req.file.path : null;
    if (!name ) {
      return res.status(400).json({ message: 'all fields are required' });
    }
    const newDepartment = await Department.create({ name, description, image: req.file?.filename });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;


