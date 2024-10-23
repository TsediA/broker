const express = require('express');
const router = express.Router();
const Property = require('../model/propertySchema');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { TaskRouterGrant } = require('twilio/lib/jwt/AccessToken');
const jwt = require('jsonwebtoken');

const uploadDir = path.join(__dirname, '../uploads'); // Update to correct path

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use updated upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// POST route for uploading images
router.post('/upload', upload.single('image'), (req, res) => {
    res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
});

// GET route to serve images
// GET route to serve images
router.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename); // Build the file path

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath); // Send the file if it exists
        console.log(filePath);
    } else {
        res.status(404).json({ error: 'File not found' }); // Return a 404 if not found
    }
});
// Route to upload multiple images
router.post('/upload-images', upload.array('images', 5), (req, res) => {
    // req.files will contain the uploaded files
    if (!req.files.length) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    // Map to get the filenames of the uploaded images
    const imageNames = req.files.map(file => file.filename);
    res.json({ message: 'Images uploaded successfully', images: imageNames });
});



// Get all properties
router.get('/all', async(req, res) => {
    try {
        const properties = await Property.find(); // Fetch all properties
        res.json(properties); // Send the properties as a response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});


const cookieParser = require('cookie-parser');
router.use(cookieParser());

// Add property route
router.post('/propertytype', upload.array('images', 5), async(req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const sellerId = decoded.userId; // Extract sellerId from the decoded token

        // Destructure property details from the request body
        const { title, description, price, bedrooms, bathrooms, location, phone, rent, buy } = req.body;
        const images = req.files.map(file => file.filename); // Extract filenames of uploaded images

        // Create a new property instance with sellerId
        const newProperty = new Property({
            title,
            description,
            location,
            price: Number(price),
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            images,
            phone,
            rent: Boolean(rent),
            buy: Boolean(buy),
            sellerId, // Store seller ID in the property
            status: 'available' // Default status
        });

        // Save the new property to the database
        await newProperty.save();

        // Set the property ID as a cookie
        res.cookie('propertyId', newProperty._id.toString(), {
            httpOnly: true, // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000 // Cookie expiration time (1 hour)
        });

        // Send response including propertyId and sellerId
        res.json({
            message: 'Property added successfully',
            propertyId: newProperty._id, // ID of the newly created property
            sellerId: newProperty.sellerId // Seller ID from the database
        });

        console.log('Request body:', req.body);
        console.log('Uploaded files:', req.files);
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ error: 'Failed to add property' });
    }
});

router.get('/propertytype/rent', async(req, res) => {
    try {
        // Query the database for properties that are for rent
        const properties = await Property.find({ rent: true });

        // Check if any properties were found
        if (properties.length === 0) {
            return res.status(404).json({ message: 'No rental properties found' });
        }

        // Return the properties as JSON
        res.json(properties);
    } catch (error) {
        console.error('Error fetching rental properties:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch rental properties', details: error.message });
    }
});
router.get('/propertytype/buy', async(req, res) => {
    try {
        console.log('Fetching properties where buy is true'); // Log before fetching
        const properties = await Property.find({ buy: true });

        console.log('Properties fetched:', properties); // Log fetched properties
        console.log('Number of properties:', properties.length);

        if (properties.length === 0) {
            return res.status(404).json({ message: 'No properties available for sale' });
        }

        res.json(properties);
    } catch (error) {
        console.error('Error fetching buy properties:', error);
        res.status(500).json({ error: 'Failed to fetch buy properties', details: error.message });
    }
});
router.get('/search', async(req, res) => {
    const { location } = req.query;

    // Check if the location parameter is provided
    if (!location) {
        return res.status(400).json({ message: 'Location query parameter is required.' });
    }

    let regex;
    try {
        // Attempt to create a case-insensitive regex for the location
        regex = new RegExp(location, 'i');
    } catch (regexError) {
        console.error('Regex creation error:', regexError); // Log regex creation errors
        return res.status(400).json({ message: 'Invalid location format provided.' });
    }

    try {
        // Search for properties using the regex
        const properties = await Property.find({ location: regex });

        // Log properties found for debugging
        console.log('Properties found:', properties);

        // If no properties found, return a 404 message
        if (properties.length === 0) {
            return res.status(404).json({ message: 'No properties found for the given location.' });
        }

        // Successfully found properties
        res.status(200).json(properties);
    } catch (error) {
        // Log the complete error object for debugging
        console.error('Error searching properties:', {
            message: error.message,
            stack: error.stack,
            name: error.name,
        });
        res.status(500).json({ message: 'Failed to search properties. Please try again later.' });
    }
});


//export default router;
module.exports = router;