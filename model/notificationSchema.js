const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },

    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property'
    },
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        // Example for a 10-digit phone number
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Chapa', 'Other', ],
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;