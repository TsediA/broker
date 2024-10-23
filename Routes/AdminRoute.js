// Update a buyer
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema')
const Admin = require('../model/AdminSchema');
const Property = require('../model/propertySchema');


// Middleware for authentication (optional)
const authenticate = (req, res, next) => {
    // Implement authentication logic (e.g., JWT)
    next();
};

// 1. Read: List all users with details
router.get('/users', authenticate, async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


// Delete a user by ID
router.delete('/users/:id', async(req, res) => {
    const userId = req.params.id; // Get the user ID from the URL parameters

    try {
        // Attempt to find and delete the user
        const deletedUser = await User.findByIdAndDelete(userId);

        // Check if the user was found and deleted
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Successfully deleted the user
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user.' });
    }
});

router.post('/login', async(req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return user ID along with the token
        res.json({
            message: 'Login successful',
            userId: user._id, // Include the user ID
            token,
            user
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});
// Delete a property by ID
router.delete('/properties/:id', async(req, res) => {
    const propertyId = req.params.id; // Get the property ID from the URL parameters

    try {
        // Attempt to find and delete the property
        const deletedProperty = await Property.findByIdAndDelete(propertyId);

        // Check if the property was found and deleted
        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Successfully deleted the property
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Failed to delete property.' });
    }
});



router.get('/propertyhistory', async(req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    try {
        // Verify the token
        // const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
        const sellerId = "66feed7761fdf4f558b38af8"; // Extract sellerId from the decoded token

        // Fetch properties for the seller
        const propertyHistory = await Property.find({ sellerId: sellerId });

        if (!propertyHistory.length) {
            return res.status(404).json({ message: 'No properties found for this seller' });
        }

        res.status(200).json({
            message: 'Property history fetched successfully',
            propertyHistory // Include property history in the response
        });
    } catch (error) {
        console.error('Error verifying token or fetching property history:', error);
        res.status(500).json({ error: 'Failed to fetch property history' });
    }
});
// Get all properties except images
router.get('/all', async(req, res) => {
    try {
        // Fetch all properties, excluding the images field
        const properties = await Property.find({}, { images: 0 }); // The second argument is the projection

        res.json(properties); // Send the properties as a response
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});
// Fetch buyer history by buyerId
// Fetch buyer history with user and property details
router.get('/buyerHistory/:userId', async(req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const usersId = decoded.usersId;

        const buyerId = req.params.buyerId;
        console.log('Fetching buyer with ID:', buyerId); // Debug log

        const buyer = await User.findById(buyerId).populate({
            path: 'properties',
            select: 'location price' // Select only location and price fields
        });

        if (!buyer) {
            return res.status(404).json({ error: 'Buyer not found' });
        }

        // Prepare the response data
        const buyerHistory = {
            buyerName: buyer.name,
            properties: buyer.properties // This now contains only location and price
        };

        res.json(buyerHistory);
    } catch (error) {
        console.error('Error fetching buyer history:', error);
        res.status(500).json({ error: 'Failed to fetch buyer history', details: error.message });
    }
});

// Fetch seller history by userId
router.get('/sellerHistory/:userId', async(req, res) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const sellerId = req.params.userId; // Use userId from the URL
        console.log('Fetching seller with ID:', sellerId); // Debug log

        const seller = await Seller.findById(sellerId).populate({
            path: 'properties', // Assuming 'properties' is the field in the Seller model
            select: 'location price' // Select only location and price fields
        });

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        // Prepare the response data
        const sellerHistory = {
            sellerName: seller.name,
            properties: seller.properties // This now contains only location and price
        };

        res.json(sellerHistory);
    } catch (error) {
        console.error('Error fetching seller history:', error);
        res.status(500).json({ error: 'Failed to fetch seller history', details: error.message });
    }
});

module.exports = router;