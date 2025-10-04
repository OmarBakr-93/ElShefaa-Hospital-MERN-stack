const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user

router.post('/register', async (req, res) => {
    const { name, email, password, role="user" } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'all fields are required' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword, role });

        let token = jwt.sign({email, id: newUser._id, role: newUser.role }, process.env.SECRET_KEY, { expiresIn: '1w' });

        return res.status(201).json({message: "user register successfully", token, user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
);

// Sign in a user

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'all fields are required' });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1w' });

        return res.status(200).json({message: "user sign in successfully", token, user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;