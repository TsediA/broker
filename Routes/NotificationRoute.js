const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Notification = require("../model/notificationSchema");
const Property = require("../model/propertySchema");

// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }
        req.userId = decoded.userId; // Attach userId to the request
        next();
    });
};

// Send request route
router.post("/sendRequest", authenticateToken, async(req, res) => {
    const { name, phone, description, paymentMethod, email, propertyId } = req.body;

    console.log("Request data:", {
        name,
        phone,
        description,
        email,
        paymentMethod,
        propertyId,
    });

    // Validate input
    if (!propertyId || !name || !phone || !description || !email || !paymentMethod) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Fetch the property using the propertyId
        const property = await Property.findById(propertyId);
        if (!property) {
            console.log(`Property not found for ID: ${propertyId}`);
            return res.status(404).json({ message: "Property not found." });
        }

        // Create a new request
        const newRequest = new Notification({
            buyerId: req.userId, // Use the userId from the token
            propertyId: property._id,
            name,
            phone,
            description,
            paymentMethod,
            email
        });

        await newRequest.save();
        res.status(201).json({ message: "Request sent successfully.", request: newRequest });
        console.log("Request received at /sendRequest:", newRequest);
    } catch (error) {
        console.error("Error sending request:", error);
        res.status(500).json({ error: "Failed to send request" });
    }
});

// Get all requests route
router.get("/allRequest", async(req, res) => {
    try {
        const requests = await Notification.find(); // Fetch all requests from the database
        res.status(200).json(requests);
        console.log(">>Requests all:", requests);
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ error: "Failed to fetch requests" });
    }
});

// Get all requests based on sellerId from Property model
router.get("/allRequestSeller", authenticateToken, async(req, res) => {
    const sellerId = "6702ce30cb30051177bc36f6"; // Extract sellerId from the token (assuming req.userId is set in authenticateToken middleware)

    try {
        // Fetch properties associated with the sellerId
        const properties = await Property.find({ sellerId: sellerId });

        if (properties.length === 0) {
            console.log(`No properties found for seller ID: ${sellerId}`);
            return res.status(404).json({ message: "No properties found for this seller" });
        }

        // Extract property IDs from the found properties
        const propertyIds = properties.map(property => property._id);
        console.log("Properties found for seller:", propertyIds);

        // Fetch notifications where propertyId is in the list of propertyIds (notifications related to the seller's properties)
        const requests = await Notification.find({ propertyId: { $in: propertyIds } })
            .populate('buyerId', 'name email') // Optionally populate buyer details
            .populate('propertyId', 'title location'); // Optionally populate property details like title, location

        // Check if requests exist
        if (requests.length === 0) {
            console.log(`No requests found for properties owned by seller ID: ${sellerId}`);
            return res.status(404).json({ message: "No requests found for this seller" });
        }

        // Send the requests in the response
        res.status(200).json(requests);
        console.log("Requests returned for seller ID:", sellerId);
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'JsonWebTokenError') {
            console.error("Invalid token:", error);
            return res.status(401).json({ message: "Invalid token." });
        } else if (error.name === 'TokenExpiredError') {
            console.error("Token expired:", error);
            return res.status(401).json({ message: "Token has expired." });
        }

        // Handle other potential errors
        console.error("Error verifying token or fetching requests:", error);
        res.status(500).json({ error: "Failed to fetch requests" });
    }
});

module.exports = router;