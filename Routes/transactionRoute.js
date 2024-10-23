//const Transaction = require('../models/transactionSchema'); // Adjust the path as necessary
const Property = require('../model/propertySchema'); // Adjust the path as necessary
const UserAgent = require('../model/AgentUserSchema'); // Adjust the path as necessary
const Payment = require('../model/paymentSchema');
const express = require('express');
const axios = require('axios');
const router = express.Router();


// Chapa API endpoint and credentials
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';
const CHAPA_SECRET_KEY = 'CHASECK_TEST-8V1HXNaL01Q7ADUvBwkHnR1uLWVIC2vo'; // Replace with your actual secret key

// Endpoint for creating a new payment
router.post('/pays', async(req, res) => {
    const { amount, email, phone, firstName, lastName } = req.body;
    console.log(amount, email, phone, firstName, lastName);

    try {
        const response = await axios.post(CHAPA_API_URL, {
            amount,
            email,
            phone,
            txt_ref: "1234567453",
            first_name: firstName,
            last_name: lastName,
            currency: 'ETB',
        }, {
            headers: {
                'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        // Instead of saving to the database, just return the response
        res.status(200).json(response.data);
        console.log(response.data);

    } catch (error) {
        console.error('Chapa payment error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Payment initialization failed', error: error.message });
    }
});


// Endpoint for verifying a payment
router.post('/verify', async(req, res) => {
    const { id } = req.body; // Payment ID from Chapa

    try {
        const response = await axios.get(`https://api.chapa.co/CHAPUBK_TEST-wRSg9ccz7T6cdWqcQRrqWEKtYPTE87aS/${id}`, {
            headers: {
                'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Payment verification error:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Payment verification failed', error: error.message });
    }
});

module.exports = router;