const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure that usernames are unique
        trim: true, // Remove whitespace from both ends
        minlength: 3, // Minimum length for the username
        maxlength: 30 // Maximum length for the username
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for the password
    },
});

// Create the review model
const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;