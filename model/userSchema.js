const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure unique usernames
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['buyer', 'seller', 'Admin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' // Reference to Users model for sellers
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' // Reference to Users model for buyers
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;