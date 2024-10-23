// models/User.js
const mongoose = require('mongoose');

const AgentuserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    PayementMethod: {
        type: String,
        required: true,
    }
});

const UserAgent = mongoose.model('UserAgent', AgentuserSchema);

module.exports = UserAgent;