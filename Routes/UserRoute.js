const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../model/userSchema');
const UserAgent = require('../model/AgentUserSchema');
const Admin = require('../model/AdminSchema');

const cookieParser = require('cookie-parser'); // Ensure you have cookie-parser included
router.use(cookieParser());
const isAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.userId = decoded.userId; // Attach userId to request
        next();
    });
};

// User registration route
router.post('/register', async(req, res) => {
    const { username, name, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await Users.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user without sellerId and buyerId
    const newUser = new Users({
        username,
        name,
        password: hashedPassword,
        phone,
        role,
    });

    try {
        // Save the user
        const savedUser = await newUser.save();

        // Assign sellerId or buyerId based on role
        if (role === 'seller') {
            savedUser.sellerId = savedUser._id;
        } else if (role === 'buyer') {
            savedUser.buyerId = savedUser._id;
        }

        // Save the updated user with sellerId or buyerId
        await savedUser.save();

        // Generate a token (optional)
        const token = jwt.sign({ userId: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});


// Login existing user
// Login existing user
// Login existing user
router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token with user role
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Set the userId in cookies
        res.cookie('userId', user._id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict'
        });

        // Send response
        res.json({
            message: 'Login successful',
            userId: user._id,
            token,
            user: {
                username: user.username,
                name: user.name,
                phone: user.phone,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});


// Update profile route
router.put('/update', isAuthenticated, async(req, res) => {
    try {
        const { username, name, phone, password } = req.body;

        // Find the user by ID
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.username = username || user.username; // Only update if provided
        user.name = name || user.name;
        user.phone = phone || user.phone;

        // If password is provided, hash it before saving
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ error: 'Failed to update profile', details: error.message });
    }
});

module.exports = router;


//export default router;
//module.exports = router;