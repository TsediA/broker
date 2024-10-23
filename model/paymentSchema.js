// models/Payment.js
const mongoose = require('mongoose');

// Define the Payment schema
const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true }, // Amount in the smallest currency unit (e.g., cents)
    email: { type: String, required: true }, // Customer's email
    phone: { type: String, required: true }, // Customer's phone number
    first_name: { type: String, required: true }, // Customer's first name
    last_name: { type: String, required: true }, // Customer's last name
    transactionId: { type: String, required: true }, // Transaction ID from Chapa
    currency: { type: String, default: 'ETB' }, // Currency, default is ETB
    createdAt: { type: Date, default: Date.now }, // Date of payment creation
});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

// Export the model
module.exports = Payment;